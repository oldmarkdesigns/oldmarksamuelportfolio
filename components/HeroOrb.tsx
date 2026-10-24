'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from '@/contexts/ThemeContext'

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`

/* A soft blob, raymarched. The surface is a sphere pushed around by a few slow waves; the cursor tilts
   it, pulls a bump toward itself and stirs the waves while it is close. Colours come from the
   "& Builder" gradient. */
const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;   // smoothed pointer, -1..1 across the canvas
uniform float uEnergy; // 0..1, rises while the pointer is near the orb
uniform vec3 uColA;
uniform vec3 uColB;
uniform float uDark;

mat3 rotY(float a) { float c = cos(a), s = sin(a); return mat3(c, 0.0, -s, 0.0, 1.0, 0.0, s, 0.0, c); }
mat3 rotX(float a) { float c = cos(a), s = sin(a); return mat3(1.0, 0.0, 0.0, 0.0, c, s, 0.0, -s, c); }

float waves(vec3 p, float t) {
  float amp = 0.11 + 0.04 * uEnergy;
  float w = sin(p.x * 2.1 + t * 0.9) * sin(p.y * 2.4 + t * 0.7) * sin(p.z * 1.9 + t * 1.1);
  w += 0.5 * sin(p.x * 3.7 - t * 1.3 + p.z * 1.4) * sin(p.y * 3.1 + t * 0.6);
  return w * amp;
}

float map(vec3 p) {
  vec3 q = rotX(uMouse.y * 0.5 + sin(uTime * 0.21) * 0.25) * rotY(uTime * 0.18 + uMouse.x * 0.7) * p;
  float d = length(q) - 1.0 + waves(q, uTime);
  // a bump that leans toward the pointer
  vec3 dir = normalize(vec3(uMouse.x, uMouse.y, 0.9));
  float pull = exp(-pow(length(normalize(p) - dir), 2.0) * 3.0);
  d -= pull * (0.06 + 0.07 * uEnergy);
  return d;
}

vec3 calcNormal(vec3 p) {
  vec2 e = vec2(0.002, 0.0);
  return normalize(vec3(
    map(p + e.xyy) - map(p - e.xyy),
    map(p + e.yxy) - map(p - e.yxy),
    map(p + e.yyx) - map(p - e.yyx)));
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / min(uRes.x, uRes.y);
  // the orb drifts a little toward the pointer
  uv -= uMouse * 0.035;

  vec3 ro = vec3(0.0, 0.0, 4.0);
  vec3 rd = normalize(vec3(uv, -1.15));

  // closest pass of the ray to the centre, used to skip pixels that miss
  float tc = -dot(ro, rd);
  float closest = length(ro + rd * tc);
  vec4 col = vec4(0.0);

  if (closest < 1.45) {
    float t = tc - 1.6;
    float hit = -1.0;
    for (int i = 0; i < 80; i++) {
      float d = map(ro + rd * t);
      if (d < 0.001) { hit = t; break; }
      t += d * 0.6;
      if (t > tc + 1.6) break;
    }
    if (hit > 0.0) {
      vec3 p = ro + rd * hit;
      vec3 n = calcNormal(p);
      float ndv = max(dot(n, -rd), 0.0);

      float g = clamp(0.5 + 0.45 * n.x - 0.25 * n.y + 0.15 * sin(uTime * 0.4 + p.y * 2.0), 0.0, 1.0);
      vec3 base = mix(uColA, uColB, g);
      // flat colour, no light or shadow: the gradient alone. Dark theme sits deeper so white type
      // stays readable; light theme is pale so dark type does.
      vec3 c = uDark > 0.5 ? base * 0.5 : mix(base, vec3(1.0), 0.5);
      // the silhouette fades out instead of ending in a hard edge
      float a = smoothstep(0.0, 0.55, ndv);
      col = vec4(c * a, a);
    }
  }

  gl_FragColor = vec4(col.rgb, col.a);
}
`

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.trim().replace('#', '')
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  const n = parseInt(full, 16)
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!
  gl.shaderSource(s, src)
  gl.compileShader(s)
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(s))
    gl.deleteShader(s)
    return null
  }
  return s
}

/** Interactive WebGL orb behind the hero headline. Falls back to a soft gradient circle without WebGL. */
export default function HeroOrb() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const colorsRef = useRef<{ a: [number, number, number]; b: [number, number, number]; dark: boolean } | null>(null)
  const redrawRef = useRef<() => void>(() => {})
  const { theme } = useTheme()

  // re-read the gradient tokens whenever the theme flips. The provider sets the <html> class in its
  // own effect, which runs after this one, so wait a frame before reading.
  useEffect(() => {
    const read = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      const cs = getComputedStyle(canvas)
      colorsRef.current = {
        a: hexToRgb(cs.getPropertyValue('--hero-grad-a') || '#3cc3f0'),
        b: hexToRgb(cs.getPropertyValue('--hero-grad-b') || '#52e39a'),
        dark: !document.documentElement.classList.contains('light'),
      }
      redrawRef.current()
    }
    read()
    const id = requestAnimationFrame(read)
    return () => cancelAnimationFrame(id)
  }, [theme])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl', { premultipliedAlpha: true, antialias: false, alpha: true })
    if (!gl) {
      canvas.dataset.fallback = 'true'
      return
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERT)
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG)
    if (!vs || !fs) {
      canvas.dataset.fallback = 'true'
      return
    }
    const prog = gl.createProgram()!
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(prog, 'aPos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const u = {
      res: gl.getUniformLocation(prog, 'uRes'),
      time: gl.getUniformLocation(prog, 'uTime'),
      mouse: gl.getUniformLocation(prog, 'uMouse'),
      energy: gl.getUniformLocation(prog, 'uEnergy'),
      colA: gl.getUniformLocation(prog, 'uColA'),
      colB: gl.getUniformLocation(prog, 'uColB'),
      dark: gl.getUniformLocation(prog, 'uDark'),
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const target = { x: 0, y: 0, near: 0 }
    const mouse = { x: 0, y: 0, energy: 0 }
    let raf = 0
    let visible = true
    let last = performance.now()
    let time = 0

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect()
      // full sharpness on small canvases, where it is cheap; capped on big ones
      const dpr = Math.min(window.devicePixelRatio || 1, width < 600 ? 2 : 1.5)
      canvas.width = Math.max(1, Math.round(width * dpr))
      canvas.height = Math.max(1, Math.round(height * dpr))
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    const draw = () => {
      const c = colorsRef.current
      if (!c) return
      gl.uniform2f(u.res, canvas.width, canvas.height)
      gl.uniform1f(u.time, time)
      gl.uniform2f(u.mouse, mouse.x, mouse.y)
      gl.uniform1f(u.energy, mouse.energy)
      gl.uniform3fv(u.colA, c.a)
      gl.uniform3fv(u.colB, c.b)
      gl.uniform1f(u.dark, c.dark ? 1 : 0)
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }
    redrawRef.current = draw

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      time += dt * (1 + mouse.energy * 0.8)
      const k = 1 - Math.exp(-dt * 4)
      mouse.x += (target.x - mouse.x) * k
      mouse.y += (target.y - mouse.y) * k
      mouse.energy += (target.near - mouse.energy) * (1 - Math.exp(-dt * 2.5))
      draw()
      raf = visible ? requestAnimationFrame(tick) : 0
    }

    const start = () => {
      if (reduce || raf) return
      last = performance.now()
      raf = requestAnimationFrame(tick)
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }

    const onPointer = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      const half = Math.min(r.width, r.height) / 2
      const x = (e.clientX - (r.left + r.width / 2)) / half
      const y = -(e.clientY - (r.top + r.height / 2)) / half
      target.x = Math.max(-1, Math.min(1, x))
      target.y = Math.max(-1, Math.min(1, y))
      // energy peaks over the orb and fades out by roughly twice its radius
      target.near = Math.max(0, Math.min(1, 1.6 - Math.hypot(x, y) * 1.4))
    }
    const onLeave = () => {
      target.x = 0
      target.y = 0
      target.near = 0
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && !document.hidden
      if (visible) start()
      else stop()
    })
    io.observe(canvas)
    const onVis = () => {
      visible = !document.hidden
      if (visible) start()
      else stop()
    }

    const ro = new ResizeObserver(() => {
      resize()
      draw()
    })
    ro.observe(canvas)

    resize()
    draw()
    start()
    window.addEventListener('pointermove', onPointer, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    document.addEventListener('visibilitychange', onVis)

    return () => {
      stop()
      io.disconnect()
      ro.disconnect()
      window.removeEventListener('pointermove', onPointer)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('visibilitychange', onVis)
      redrawRef.current = () => {}
      // no loseContext() here: a remount (strict mode, fast refresh) gets this same context back
      gl.deleteProgram(prog)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      gl.deleteBuffer(buf)
    }
  }, [])

  return <canvas ref={canvasRef} className="hero-orb" aria-hidden />
}
