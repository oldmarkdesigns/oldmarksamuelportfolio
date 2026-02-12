exports.id=422,exports.ids=[422],exports.modules={7794:(s,e,c)=>{Promise.resolve().then(c.bind(c,2171))},2171:(s,e,c)=>{"use strict";c.r(e),c.d(e,{default:()=>CaseStudyPage});var a=c(784),r=c(3745),i=c.n(r),t=c(2451),l=c.n(t),o=c(1440),d=c.n(o),n=c(9885);let m=`
/* Case study design tokens and shared layout */
.cs-page {
  --cs-max-width: 1180px;
  --cs-content-width: 780px;
  --cs-space-1: 0.25rem;
  --cs-space-2: 0.5rem;
  --cs-space-3: 0.75rem;
  --cs-space-4: 1rem;
  --cs-space-5: 1.5rem;
  --cs-space-6: 2rem;
  --cs-space-7: 3rem;
  --cs-space-8: 4rem;
  --cs-space-9: 5rem;
  --cs-type-eyebrow: 0.75rem;
  --cs-type-body: 1rem;
  --cs-type-h3: 1.125rem;
  --cs-type-h2: clamp(1.5rem, 2.8vw, 2rem);
  --cs-type-h1: clamp(2rem, 4.8vw, 3.5rem);
  --cs-weight-medium: 500;
  --cs-weight-semibold: 600;
  --cs-weight-bold: 700;
  --cs-radius-sm: 0.75rem;
  --cs-radius-md: 1rem;
  --cs-radius-lg: 1.25rem;
  --cs-shadow-sm: 0 8px 24px rgba(2, 6, 23, 0.16);
  --cs-shadow-md: 0 20px 40px rgba(2, 6, 23, 0.22);
  --cs-text-primary: #f8fafc;
  --cs-text-secondary: #cbd5e1;
  --cs-text-muted: #94a3b8;
  --cs-border: rgba(148, 163, 184, 0.22);
  --cs-divider: rgba(148, 163, 184, 0.24);
  --cs-surface-1: rgba(10, 10, 10, 0.38);
  --cs-surface-2: rgba(10, 10, 10, 0.28);
  --cs-button-bg: rgba(15, 23, 42, 0.82);
  --cs-button-bg-hover: rgba(30, 41, 59, 0.95);
  --cs-glass-blur: blur(22px) saturate(145%);
  --cs-glass-highlight: inset 0 1px 0 rgba(255, 255, 255, 0.06);
}

.light .cs-page {
  --cs-text-primary: #0f172a;
  --cs-text-secondary: #334155;
  --cs-text-muted: #475569;
  --cs-border: rgba(148, 163, 184, 0.33);
  --cs-divider: rgba(148, 163, 184, 0.34);
  --cs-surface-1: rgba(243, 244, 246, 0.45);
  --cs-surface-2: rgba(243, 244, 246, 0.34);
  --cs-button-bg: rgba(248, 250, 252, 0.95);
  --cs-button-bg-hover: rgba(241, 245, 249, 1);
  --cs-glass-highlight: inset 0 1px 0 rgba(255, 255, 255, 0.62);
}

.cs-page {
  min-height: 100vh;
  padding-top: 5.5rem;
}

.cs-shell {
  margin: 0 auto;
  max-width: var(--cs-max-width);
  padding: var(--cs-space-6) var(--cs-space-5) var(--cs-space-9);
}

@media (min-width: 640px) {
  .cs-shell {
    padding-left: var(--cs-space-6);
    padding-right: var(--cs-space-6);
  }
}

@media (min-width: 1024px) {
  .cs-shell {
    padding-top: var(--cs-space-7);
  }
}

.cs-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--cs-space-6);
}

@media (min-width: 1024px) {
  .cs-grid {
    grid-template-columns: 232px minmax(0, var(--cs-content-width));
    justify-content: center;
    align-items: start;
    column-gap: var(--cs-space-7);
  }
}

.cs-main {
  min-width: 0;
}

.cs-toc {
  display: none;
}

@media (min-width: 1024px) {
  .cs-toc {
    display: block;
    position: sticky;
    top: 6.5rem;
    align-self: start;
  }
}

.cs-toc-card {
  border: 1px solid var(--cs-border);
  border-radius: var(--cs-radius-md);
  background: var(--cs-surface-2);
  backdrop-filter: var(--cs-glass-blur);
  -webkit-backdrop-filter: var(--cs-glass-blur);
  box-shadow: var(--cs-glass-highlight), var(--cs-shadow-sm);
  padding: var(--cs-space-5);
  transition: background-color 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease;
}

.cs-toc-title {
  color: var(--cs-text-primary);
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: var(--cs-weight-semibold);
  margin-bottom: var(--cs-space-4);
}

.cs-toc-link {
  display: block;
  color: var(--cs-text-muted);
  font-size: 0.92rem;
  line-height: 1.35;
  font-weight: var(--cs-weight-medium);
  padding: var(--cs-space-2) 0;
  transition: color 0.2s ease;
}

.cs-toc-link:hover {
  color: var(--cs-text-primary);
}

.cs-toc-link.is-active {
  color: var(--cs-text-primary);
}

.cs-hero,
.cs-section {
  scroll-margin-top: 6.5rem;
}

.cs-hero {
  display: grid;
  gap: var(--cs-space-5);
  margin-bottom: var(--cs-space-8);
}

.cs-eyebrow {
  color: var(--cs-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: var(--cs-type-eyebrow);
  font-weight: var(--cs-weight-semibold);
}

.cs-title {
  color: var(--cs-text-primary);
  font-size: var(--cs-type-h1);
  line-height: 1.08;
  font-weight: var(--cs-weight-bold);
  max-width: 18ch;
}

.cs-subtitle {
  color: var(--cs-text-secondary);
  font-size: 1.1rem;
  line-height: 1.55;
  max-width: 62ch;
}

.cs-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--cs-space-3);
}

.cs-button {
  border-radius: 999px;
  border: 1px solid var(--cs-border);
  color: var(--cs-text-primary);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.75rem;
  padding: 0 var(--cs-space-5);
  font-size: 0.95rem;
  font-weight: var(--cs-weight-semibold);
  transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}

.cs-button-primary {
  background: var(--cs-button-bg);
}

.cs-button-primary:hover {
  background: var(--cs-button-bg-hover);
}

.cs-button-secondary {
  background: transparent;
}

.cs-button-secondary:hover {
  background: var(--cs-surface-2);
}

.cs-media-frame {
  border: 1px solid var(--cs-border);
  border-radius: var(--cs-radius-lg);
  overflow: hidden;
  background: var(--cs-surface-1);
  box-shadow: var(--cs-glass-highlight), var(--cs-shadow-md);
  backdrop-filter: var(--cs-glass-blur);
  -webkit-backdrop-filter: var(--cs-glass-blur);
  transition: background-color 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease;
}

.cs-media-image {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
}

.cs-caption {
  color: var(--cs-text-muted);
  font-size: 0.86rem;
  line-height: 1.4;
  padding: var(--cs-space-3) var(--cs-space-4) var(--cs-space-4);
  border-top: 1px solid var(--cs-divider);
}

.cs-section {
  margin-bottom: var(--cs-space-7);
}

.cs-section-divider {
  border-top: 1px solid var(--cs-divider);
  padding-top: var(--cs-space-7);
}

.cs-section-title {
  color: var(--cs-text-primary);
  font-size: var(--cs-type-h2);
  line-height: 1.2;
  margin-bottom: var(--cs-space-5);
  font-weight: var(--cs-weight-semibold);
}

.cs-card-title {
  color: var(--cs-text-primary);
  font-size: var(--cs-type-h3);
  line-height: 1.35;
  margin-bottom: var(--cs-space-3);
  font-weight: var(--cs-weight-semibold);
}

.cs-copy {
  color: var(--cs-text-secondary);
  font-size: var(--cs-type-body);
  line-height: 1.65;
}

.cs-prose p + p {
  margin-top: var(--cs-space-4);
}

.cs-prose p {
  color: var(--cs-text-secondary);
  font-size: var(--cs-type-body);
  line-height: 1.7;
}

.cs-label {
  color: var(--cs-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.72rem;
  font-weight: var(--cs-weight-semibold);
  margin-bottom: var(--cs-space-2);
}

.cs-list {
  margin-left: 1.1rem;
  color: var(--cs-text-secondary);
  display: grid;
  gap: var(--cs-space-3);
  line-height: 1.65;
}

.cs-list-compact {
  gap: var(--cs-space-2);
}

.cs-callout,
.cs-surface-card,
.cs-snapshot-item,
.cs-before-after {
  border: 1px solid var(--cs-border);
  border-radius: var(--cs-radius-md);
  background: var(--cs-surface-1);
  box-shadow: var(--cs-glass-highlight), var(--cs-shadow-sm);
  backdrop-filter: var(--cs-glass-blur);
  -webkit-backdrop-filter: var(--cs-glass-blur);
  transition: background-color 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease;
}

.cs-callout,
.cs-surface-card,
.cs-snapshot-item,
.cs-before-after,
.cs-metric-card {
  padding: var(--cs-space-5);
}

.cs-snapshot-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--cs-space-4);
  margin-bottom: var(--cs-space-4);
}

@media (min-width: 768px) {
  .cs-snapshot-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.cs-ownership-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--cs-space-4);
}

.cs-decision-grid {
  display: grid;
  gap: var(--cs-space-4);
  margin-bottom: var(--cs-space-5);
}

.cs-dl {
  display: grid;
  gap: var(--cs-space-4);
}

.cs-before-after {
  display: grid;
  gap: var(--cs-space-5);
  margin-bottom: var(--cs-space-5);
}

.cs-before-after-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--cs-space-4);
}

@media (min-width: 768px) {
  .cs-before-after-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.cs-media-panel {
  display: grid;
  gap: var(--cs-space-3);
}

.cs-media-label {
  color: var(--cs-text-primary);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: var(--cs-weight-semibold);
}

.cs-visual-grid {
  display: grid;
  gap: var(--cs-space-4);
}

@media (min-width: 768px) {
  .cs-visual-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.cs-metric-grid {
  display: grid;
  gap: var(--cs-space-4);
  margin-top: var(--cs-space-5);
}

.cs-metric-type {
  color: var(--cs-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.7rem;
  font-weight: var(--cs-weight-semibold);
  margin-bottom: var(--cs-space-2);
}

.cs-metric-value {
  color: var(--cs-text-primary);
  font-size: clamp(1.5rem, 4vw, 2rem);
  line-height: 1.1;
  font-weight: var(--cs-weight-bold);
  margin-bottom: var(--cs-space-3);
}

.cs-note {
  margin-top: var(--cs-space-4);
  color: var(--cs-text-muted);
  font-size: 0.9rem;
  line-height: 1.6;
}
`;function CaseStudyPage({caseStudy:s}){let e=(0,n.useMemo)(()=>[{id:"project-overview",label:"Project overview"},{id:"snapshot",label:"Outcome snapshot"},{id:"summary",label:"30-second summary"},{id:"problem",label:"Problem + constraints"},{id:"role",label:"My role + ownership"},{id:"decisions",label:"Key decisions"},{id:"outcomes",label:"Outcomes"},{id:"next",label:"What I'd improve"}],[]),[c,r]=(0,n.useState)(e[0].id);(0,n.useEffect)(()=>{let updateActiveSection=()=>{let s=window.scrollY+180,c=e[0].id;for(let a of e){let e=document.getElementById(a.id);e&&s>=e.offsetTop&&(c=a.id)}r(c)};return window.addEventListener("scroll",updateActiveSection,{passive:!0}),window.addEventListener("resize",updateActiveSection),updateActiveSection(),()=>{window.removeEventListener("scroll",updateActiveSection),window.removeEventListener("resize",updateActiveSection)}},[e]);let handleNavClick=(s,e)=>{s.preventDefault();let c=document.getElementById(e);if(!c)return;let a=c.getBoundingClientRect().top+window.pageYOffset-92;window.scrollTo({top:a,behavior:"smooth"}),r(e)};return(0,a.jsxs)("main",{className:"cs-page",children:[a.jsx("div",{className:"cs-shell",children:(0,a.jsxs)("div",{className:"cs-grid",children:[a.jsx("aside",{"aria-label":"On this page",className:"cs-toc",children:a.jsx("div",{className:"cs-toc-card",children:a.jsx("nav",{children:e.map(s=>a.jsx("a",{href:`#${s.id}`,onClick:e=>handleNavClick(e,s.id),className:`cs-toc-link ${c===s.id?"is-active":""}`,children:s.label},s.id))})})}),(0,a.jsxs)("article",{className:"cs-main",children:[(0,a.jsxs)("header",{id:"project-overview",className:"cs-hero",children:[a.jsx("p",{className:"cs-eyebrow",children:"Case Study"}),a.jsx("h1",{className:"cs-title",children:s.title}),a.jsx("p",{className:"cs-subtitle",children:s.tagline}),(0,a.jsxs)("div",{className:"cs-actions",children:[a.jsx(d(),{href:s.backHref,className:"cs-button cs-button-secondary",children:"Back to Work"}),s.liveHref?a.jsx("a",{href:s.liveHref,target:"_blank",rel:"noopener noreferrer",className:"cs-button cs-button-primary",children:s.liveLabel||"Visit project"}):null]}),(0,a.jsxs)("figure",{className:"cs-media-frame",children:[a.jsx(l(),{src:s.heroImage.src,alt:s.heroImage.alt,width:s.heroImage.width,height:s.heroImage.height,className:"cs-media-image",sizes:"(max-width: 1024px) 100vw, 760px"}),s.heroCaption?a.jsx("figcaption",{className:"cs-caption",children:s.heroCaption}):null]})]}),(0,a.jsxs)("section",{id:"snapshot",className:"cs-section cs-section-divider",children:[a.jsx("h2",{className:"cs-section-title",children:"Outcome Snapshot"}),(0,a.jsxs)("div",{className:"cs-snapshot-grid",children:[(0,a.jsxs)("div",{className:"cs-snapshot-item",children:[a.jsx("p",{className:"cs-label",children:"Role"}),a.jsx("p",{className:"cs-copy",children:s.snapshot.role})]}),(0,a.jsxs)("div",{className:"cs-snapshot-item",children:[a.jsx("p",{className:"cs-label",children:"Timeline"}),a.jsx("p",{className:"cs-copy",children:s.snapshot.timeline})]}),(0,a.jsxs)("div",{className:"cs-snapshot-item",children:[a.jsx("p",{className:"cs-label",children:"Team"}),a.jsx("p",{className:"cs-copy",children:s.snapshot.team})]}),(0,a.jsxs)("div",{className:"cs-snapshot-item",children:[a.jsx("p",{className:"cs-label",children:"Problem"}),a.jsx("p",{className:"cs-copy",children:s.snapshot.problem})]})]}),(0,a.jsxs)("div",{className:"cs-callout",children:[a.jsx("p",{className:"cs-label",children:"Measurable outcomes"}),a.jsx("ul",{className:"cs-list",children:s.snapshot.measurableOutcomes.map(s=>a.jsx("li",{children:s},s))})]})]}),(0,a.jsxs)("section",{id:"summary",className:"cs-section cs-section-divider",children:[a.jsx("h2",{className:"cs-section-title",children:"1. 30-second summary"}),a.jsx("div",{className:"cs-prose",children:s.summary.map(s=>a.jsx("p",{children:s},s))})]}),(0,a.jsxs)("section",{id:"problem",className:"cs-section cs-section-divider",children:[a.jsx("h2",{className:"cs-section-title",children:"2. Problem + constraints"}),a.jsx("div",{className:"cs-prose",children:a.jsx("p",{children:s.problemStatement})}),a.jsx("ul",{className:"cs-list cs-list-compact",children:s.constraints.map(s=>a.jsx("li",{children:s},s))})]}),(0,a.jsxs)("section",{id:"role",className:"cs-section cs-section-divider",children:[a.jsx("h2",{className:"cs-section-title",children:"3. My role + ownership boundaries"}),(0,a.jsxs)("div",{className:"cs-ownership-grid",children:[(0,a.jsxs)("div",{className:"cs-surface-card",children:[a.jsx("h3",{className:"cs-card-title",children:"I owned"}),a.jsx("ul",{className:"cs-list cs-list-compact",children:s.ownership.owned.map(s=>a.jsx("li",{children:s},s))})]}),(0,a.jsxs)("div",{className:"cs-surface-card",children:[a.jsx("h3",{className:"cs-card-title",children:"I shared"}),a.jsx("ul",{className:"cs-list cs-list-compact",children:s.ownership.shared.map(s=>a.jsx("li",{children:s},s))})]}),(0,a.jsxs)("div",{className:"cs-surface-card",children:[a.jsx("h3",{className:"cs-card-title",children:"Out of scope"}),a.jsx("ul",{className:"cs-list cs-list-compact",children:s.ownership.outOfScope.map(s=>a.jsx("li",{children:s},s))})]})]})]}),(0,a.jsxs)("section",{id:"decisions",className:"cs-section cs-section-divider",children:[a.jsx("h2",{className:"cs-section-title",children:"4. Key decisions"}),a.jsx("div",{className:"cs-decision-grid",children:s.decisions.map((s,e)=>(0,a.jsxs)("article",{className:"cs-surface-card",children:[(0,a.jsxs)("h3",{className:"cs-card-title",children:[e+1,". ",s.title]}),(0,a.jsxs)("dl",{className:"cs-dl",children:[(0,a.jsxs)("div",{children:[a.jsx("dt",{className:"cs-label",children:"Decision"}),a.jsx("dd",{className:"cs-copy",children:s.decision})]}),(0,a.jsxs)("div",{children:[a.jsx("dt",{className:"cs-label",children:"Why"}),a.jsx("dd",{className:"cs-copy",children:s.why})]}),(0,a.jsxs)("div",{children:[a.jsx("dt",{className:"cs-label",children:"Result"}),a.jsx("dd",{className:"cs-copy",children:s.result})]})]})]},s.title))}),(0,a.jsxs)("figure",{className:"cs-before-after",children:[a.jsx("h3",{className:"cs-card-title",children:s.beforeAfter.title}),s.beforeAfter.description?a.jsx("p",{className:"cs-copy",children:s.beforeAfter.description}):null,(0,a.jsxs)("div",{className:"cs-before-after-grid",children:[(0,a.jsxs)("div",{className:"cs-media-panel",children:[a.jsx("p",{className:"cs-media-label",children:"Before"}),(0,a.jsxs)("div",{className:"cs-media-frame",children:[a.jsx(l(),{src:s.beforeAfter.before.src,alt:s.beforeAfter.before.alt,width:s.beforeAfter.before.width,height:s.beforeAfter.before.height,className:"cs-media-image",sizes:"(max-width: 1024px) 100vw, 360px"}),s.beforeAfter.before.caption?a.jsx("figcaption",{className:"cs-caption",children:s.beforeAfter.before.caption}):null]})]}),(0,a.jsxs)("div",{className:"cs-media-panel",children:[a.jsx("p",{className:"cs-media-label",children:"After"}),(0,a.jsxs)("div",{className:"cs-media-frame",children:[a.jsx(l(),{src:s.beforeAfter.after.src,alt:s.beforeAfter.after.alt,width:s.beforeAfter.after.width,height:s.beforeAfter.after.height,className:"cs-media-image",sizes:"(max-width: 1024px) 100vw, 360px"}),s.beforeAfter.after.caption?a.jsx("figcaption",{className:"cs-caption",children:s.beforeAfter.after.caption}):null]})]})]}),(0,a.jsxs)("div",{className:"cs-callout",children:[a.jsx("p",{className:"cs-label",children:"Annotations"}),a.jsx("ul",{className:"cs-list cs-list-compact",children:s.beforeAfter.annotations.map(s=>a.jsx("li",{children:s},s))})]})]}),s.supportingVisuals&&s.supportingVisuals.length>0?a.jsx("div",{className:"cs-visual-grid",children:s.supportingVisuals.map(s=>(0,a.jsxs)("figure",{className:"cs-media-frame",children:[a.jsx(l(),{src:s.src,alt:s.alt,width:s.width,height:s.height,className:"cs-media-image",sizes:"(max-width: 1024px) 100vw, 360px"}),s.caption?a.jsx("figcaption",{className:"cs-caption",children:s.caption}):null]},s.src))}):null]}),(0,a.jsxs)("section",{id:"outcomes",className:"cs-section cs-section-divider",children:[a.jsx("h2",{className:"cs-section-title",children:"5. Outcomes"}),a.jsx("p",{className:"cs-copy",children:s.outcomes.intro}),a.jsx("div",{className:"cs-metric-grid",children:s.outcomes.metrics.map(s=>(0,a.jsxs)("article",{className:"cs-surface-card cs-metric-card",children:[a.jsx("p",{className:"cs-metric-type",children:s.type}),a.jsx("p",{className:"cs-metric-value",children:s.value}),a.jsx("h3",{className:"cs-card-title",children:s.label}),a.jsx("p",{className:"cs-copy",children:s.context})]},`${s.value}-${s.label}`))}),s.outcomes.note?a.jsx("p",{className:"cs-note",children:s.outcomes.note}):null]}),(0,a.jsxs)("section",{id:"next",className:"cs-section cs-section-divider",children:[a.jsx("h2",{className:"cs-section-title",children:"6. What I’d improve next"}),a.jsx("ul",{className:"cs-list",children:s.nextImprovements.map(s=>a.jsx("li",{children:s},s))})]})]})]})}),a.jsx(i(),{id:m.__hash,children:m})]})}},6935:(s,e,c)=>{"use strict";c.d(e,{ZP:()=>o});var a=c(5153);let r=(0,a.createProxy)(String.raw`/Users/samueloldmark/Desktop/Desktop/UI Stuff/Portfolio 2026/components/CaseStudyPage.tsx`),{__esModule:i,$$typeof:t}=r,l=r.default,o=l}};