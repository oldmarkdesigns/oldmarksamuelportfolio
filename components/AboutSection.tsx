'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export default function AboutSection() {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true })
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true, delay: 100 })

  return (
    <section id="about" className="py-12 md:py-16 bg-transparent relative scroll-mt-12">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        <h2 ref={sectionRef} className={`text-xl md:text-2xl font-serif font-medium mb-8 text-white transition-all duration-700 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>About me</h2>
        
        <div ref={contentRef} className={`flex flex-col md:flex-row gap-8 items-start transition-all duration-700 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Profile Picture */}
          <div className="flex-shrink-0 w-full md:w-96">
            <div className="relative w-full rounded-xl overflow-hidden">
              <Image
                src="/Portfolio Assets/ProfilePicLarge.png"
                alt="Samuel Oldmark"
                width={400}
                height={600}
                className="object-cover w-full h-auto"
                sizes="(max-width: 768px) 100vw, 384px"
              />
            </div>
          </div>
          
          {/* Text Content */}
          <div className="flex-1 prose prose-lg max-w-none">
            <p className="text-base text-gray-300 leading-relaxed mb-6">
              Hello there! I'm Samuel, a creative product designer based in Stockholm, Sweden. 
              I'm passionate about designing web and mobile apps that are not only beautiful but 
              also user-friendly and effective at converting target audiences.
            </p>
            
            <p className="text-base text-gray-300 leading-relaxed mb-6">
              My journey in design started at Chas Academy, where I completed a two-year program 
              in UX/UI Design with Frontend Competence. This unique combination of design and 
              development skills has helped me become a well-rounded product designer who understands 
              both the creative and technical aspects of digital products.
            </p>
            
            <p className="text-base text-gray-300 leading-relaxed">
              Currently, I'm working as a Product Designer at My Medical Data, where I'm the 
              sole designer working on Hälsa+, a health-focused mobile app. When I'm not designing, 
              I enjoy participating in Daily UI challenges to explore new design solutions and keep 
              my skills sharp.
            </p>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 dark:border-gray-800 border-gray-300 border-r-0 border-b-0 border-l-0">
          <h3 className="text-xl md:text-2xl font-serif font-medium mb-8 text-white">Skills & Expertise</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* UX Design Column */}
            <div>
              <h4 className="font-semibold mb-4 text-white text-lg">UX Design</h4>
              <div className="flex flex-col gap-3">
                {/* Figma */}
                <div className="flex items-center gap-3 px-4 py-2.5 border border-gray-700/50 rounded-lg">
                  <Image
                    src="/Portfolio Assets/Tool Icons/figma.png"
                    alt="Figma"
                    width={24}
                    height={24}
                    className="w-6 h-6 flex-shrink-0"
                  />
                  <span className="text-white text-sm font-medium">Figma</span>
                </div>
                
                {/* Research */}
                <div className="flex items-center gap-3 px-4 py-2.5 border border-gray-700/50 rounded-lg">
                  <svg className="w-5 h-5 flex-shrink-0 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="text-white text-sm font-medium">Research</span>
                </div>
                
                {/* Prototyping */}
                <div className="flex items-center gap-3 px-4 py-2.5 border border-gray-700/50 rounded-lg">
                  <svg className="w-5 h-5 flex-shrink-0 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  <span className="text-white text-sm font-medium">Prototyping</span>
                </div>
                
                {/* User testing */}
                <div className="flex items-center gap-3 px-4 py-2.5 border border-gray-700/50 rounded-lg">
                  <svg className="w-5 h-5 flex-shrink-0 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-white text-sm font-medium">User testing</span>
                </div>
                
                {/* EAA / WCAG 2.2 */}
                <div className="flex items-center gap-3 px-4 py-2.5 border border-gray-700/50 rounded-lg">
                  <svg className="w-5 h-5 flex-shrink-0 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span className="text-white text-sm font-medium">EAA / WCAG 2.2</span>
                </div>
              </div>
            </div>
            
            {/* Frontend Column */}
            <div>
              <h4 className="font-semibold mb-4 text-white text-lg">Frontend</h4>
              <div className="flex flex-col gap-3">
                {/* HTML */}
                <div className="flex items-center gap-3 px-4 py-2.5 border border-gray-700/50 rounded-lg">
                  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="#E34F26">
                    <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm17.09 4.413L3.736 4.41l.213 2.622h10.125l-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.955-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"/>
                  </svg>
                  <span className="text-white text-sm font-medium">HTML</span>
                </div>
                
                {/* CSS / Tailwind */}
                <div className="flex items-center gap-3 px-4 py-2.5 border border-gray-700/50 rounded-lg">
                  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="#1572B6">
                    <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L3.736 4.41l.213 2.622h10.125l-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.955-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"/>
                  </svg>
                  <span className="text-white text-sm font-medium">CSS / Tailwind</span>
                </div>
                
                {/* JavaScript / TypeScript */}
                <div className="flex items-center gap-3 px-4 py-2.5 border border-gray-700/50 rounded-lg">
                  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="#F7DF1E">
                    <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.57 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.755 4.096 1.665 5.046 1.005.99-.695 1.155-1.815 1.005-2.835-.15-.915-.525-1.38-1.005-1.755-.48-.39-1.05-.585-1.47-.42-.36.15-.585.39-.705.75-.24.66-.165.915.045 1.14.24.24.75.36 1.2.24 1.14-.36 1.755-1.14 1.755-2.205 0-1.14-.75-1.755-1.755-2.205-.99-.42-2.34-.585-3.36-.36l-1.14.21c-1.14.24-1.965.78-2.34 1.755-.75 1.755-.24 4.185 1.14 5.046.99.6 2.34.75 3.36.36.99-.36 1.755-1.14 2.205-2.205.24-.66.36-1.38.24-2.205z"/>
                  </svg>
                  <span className="text-white text-sm font-medium">Javascript / Typescript</span>
                </div>
                
                {/* React */}
                <div className="flex items-center gap-3 px-4 py-2.5 border border-gray-700/50 rounded-lg">
                  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="#61DAFB">
                    <circle cx="12" cy="12" r="2" fill="#61DAFB"/>
                    <ellipse cx="12" cy="12" rx="11" ry="4.2" fill="none" stroke="#61DAFB" strokeWidth="1"/>
                    <ellipse cx="12" cy="12" rx="11" ry="4.2" fill="none" stroke="#61DAFB" strokeWidth="1" transform="rotate(60 12 12)"/>
                    <ellipse cx="12" cy="12" rx="11" ry="4.2" fill="none" stroke="#61DAFB" strokeWidth="1" transform="rotate(-60 12 12)"/>
                  </svg>
                  <span className="text-white text-sm font-medium">React</span>
                </div>
                
                {/* Git */}
                <div className="flex items-center gap-3 px-4 py-2.5 border border-gray-700/50 rounded-lg">
                  <svg className="w-5 h-5 flex-shrink-0 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span className="text-white text-sm font-medium">Git</span>
                </div>
              </div>
            </div>
            
            {/* Web Column */}
            <div>
              <h4 className="font-semibold mb-4 text-white text-lg">Web</h4>
              <div className="flex flex-col gap-3">
                {/* Framer */}
                <div className="flex items-center gap-3 px-4 py-2.5 border border-gray-700/50 rounded-lg">
                  <Image
                    src="/Portfolio Assets/Tool Icons/framer.png"
                    alt="Framer"
                    width={24}
                    height={24}
                    className="w-6 h-6 flex-shrink-0"
                  />
                  <span className="text-white text-sm font-medium">Framer</span>
                </div>
                
                {/* Webflow */}
                <div className="flex items-center gap-3 px-4 py-2.5 border border-gray-700/50 rounded-lg">
                  <Image
                    src="/Portfolio Assets/Tool Icons/webflow.png"
                    alt="Webflow"
                    width={24}
                    height={24}
                    className="w-6 h-6 flex-shrink-0"
                  />
                  <span className="text-white text-sm font-medium">Webflow</span>
                </div>
                
                {/* WordPress */}
                <div className="flex items-center gap-3 px-4 py-2.5 border border-gray-700/50 rounded-lg">
                  <Image
                    src="/Portfolio Assets/Tool Icons/wordpress.png"
                    alt="WordPress"
                    width={24}
                    height={24}
                    className="w-6 h-6 flex-shrink-0"
                  />
                  <span className="text-white text-sm font-medium">WordPress</span>
                </div>
                
                {/* Cursor */}
                <div className="flex items-center gap-3 px-4 py-2.5 border border-gray-700/50 rounded-lg">
                  <Image
                    src="/Portfolio Assets/Tool Icons/cursor.png"
                    alt="Cursor"
                    width={24}
                    height={24}
                    className="w-6 h-6 flex-shrink-0"
                  />
                  <span className="text-white text-sm font-medium">Cursor</span>
                </div>
                
                {/* Antigravity */}
                <div className="flex items-center gap-3 px-4 py-2.5 border border-gray-700/50 rounded-lg">
                  <Image
                    src="/Portfolio Assets/Tool Icons/antigravity.png"
                    alt="Antigravity"
                    width={24}
                    height={24}
                    className="w-6 h-6 flex-shrink-0"
                  />
                  <span className="text-white text-sm font-medium">Antigravity</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* AI Tools Section */}
          <div className="mt-8">
            <h4 className="font-semibold mb-6 text-white text-lg">AI Tools & How I Use Them</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* AI for Ideation, Specifications & Visuals */}
              <div className="px-4 py-4 border border-gray-700/50 rounded-lg">
                <h5 className="font-semibold mb-4 text-white text-base">AI for Ideation, Specifications & Visuals</h5>
                <div className="flex flex-col gap-3 mb-4">
                  {/* Claude */}
                  <div className="flex items-center gap-3 px-4 py-2.5 border border-gray-700/50 rounded-lg">
                    <Image
                      src="/Portfolio Assets/Tool Icons/claude.png"
                      alt="Claude"
                      width={20}
                      height={20}
                      className="w-5 h-5 flex-shrink-0"
                    />
                    <span className="text-white text-sm font-medium">Claude</span>
                  </div>
                  
                  {/* ChatGPT */}
                  <div className="flex items-center gap-3 px-4 py-2.5 border border-gray-700/50 rounded-lg">
                    <Image
                      src="/Portfolio Assets/Tool Icons/chatgpt.png"
                      alt="ChatGPT"
                      width={20}
                      height={20}
                      className="w-5 h-5 flex-shrink-0"
                    />
                    <span className="text-white text-sm font-medium">ChatGPT</span>
                  </div>
                  
                  {/* Gemini */}
                  <div className="flex items-center gap-3 px-4 py-2.5 border border-gray-700/50 rounded-lg">
                    <Image
                      src="/Portfolio Assets/Tool Icons/gemini.png"
                      alt="Gemini"
                      width={20}
                      height={20}
                      className="w-5 h-5 flex-shrink-0"
                    />
                    <span className="text-white text-sm font-medium">Gemini</span>
                  </div>
                </div>
                <ul className="text-sm text-gray-300 space-y-1.5 list-disc list-inside">
                  <li>Brainstorm UX concepts and interaction flows</li>
                  <li>Write and refine product and technical specifications</li>
                  <li>Generate and explore visual ideas and imagery during the design phase</li>
                </ul>
              </div>
              
              {/* AI for Rapid Prototyping & Development */}
              <div className="px-4 py-4 border border-gray-700/50 rounded-lg">
                <h5 className="font-semibold mb-4 text-white text-base">AI for Rapid Prototyping & Development</h5>
                <div className="flex flex-col gap-3 mb-4">
                  {/* Cursor */}
                  <div className="flex items-center gap-3 px-4 py-2.5 border border-gray-700/50 rounded-lg">
                    <Image
                      src="/Portfolio Assets/Tool Icons/cursor.png"
                      alt="Cursor"
                      width={20}
                      height={20}
                      className="w-5 h-5 flex-shrink-0"
                    />
                    <span className="text-white text-sm font-medium">Cursor</span>
                  </div>
                  
                  {/* Antigravity */}
                  <div className="flex items-center gap-3 px-4 py-2.5 border border-gray-700/50 rounded-lg">
                    <Image
                      src="/Portfolio Assets/Tool Icons/antigravity.png"
                      alt="Antigravity"
                      width={20}
                      height={20}
                      className="w-5 h-5 flex-shrink-0"
                    />
                    <span className="text-white text-sm font-medium">Antigravity</span>
                  </div>
                </div>
                <ul className="text-sm text-gray-300 space-y-1.5 list-disc list-inside">
                  <li>Quickly build and iterate on web app prototypes</li>
                  <li>Explore multiple implementation approaches efficiently</li>
                  <li>Reduce time from concept to working prototype</li>
                </ul>
              </div>
              
              {/* AI for Documentation & Knowledge Management */}
              <div className="px-4 py-4 border border-gray-700/50 rounded-lg">
                <h5 className="font-semibold mb-4 text-white text-base">AI for Documentation & Knowledge Management</h5>
                <div className="flex flex-col gap-3 mb-4">
                  {/* Notion AI */}
                  <div className="flex items-center gap-3 px-4 py-2.5 border border-gray-700/50 rounded-lg">
                    <Image
                      src="/Portfolio Assets/Tool Icons/notion.png"
                      alt="Notion AI"
                      width={20}
                      height={20}
                      className="w-5 h-5 flex-shrink-0"
                    />
                    <span className="text-white text-sm font-medium">Notion AI</span>
                  </div>
                </div>
                <ul className="text-sm text-gray-300 space-y-1.5 list-disc list-inside">
                  <li>Structuring project documentation and design systems</li>
                  <li>Writing and summarizing technical notes</li>
                  <li>Maintaining clear, searchable product knowledge</li>
                </ul>
              </div>
              
              {/* AI for Website Creation & Client Work */}
              <div className="px-4 py-4 border border-gray-700/50 rounded-lg">
                <h5 className="font-semibold mb-4 text-white text-base">AI for Website Creation & Client Work</h5>
                <div className="flex flex-col gap-3 mb-4">
                  {/* Webflow AI */}
                  <div className="flex items-center gap-3 px-4 py-2.5 border border-gray-700/50 rounded-lg">
                    <Image
                      src="/Portfolio Assets/Tool Icons/webflow.png"
                      alt="Webflow AI"
                      width={20}
                      height={20}
                      className="w-5 h-5 flex-shrink-0"
                    />
                    <span className="text-white text-sm font-medium">Webflow AI</span>
                  </div>
                </div>
                <ul className="text-sm text-gray-300 space-y-1.5 list-disc list-inside">
                  <li>Generating layouts and sections from prompts</li>
                  <li>Speeding up content creation and iteration</li>
                  <li>Delivering high-quality, production-ready websites faster</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
