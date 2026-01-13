import Image from 'next/image'

export default function AboutPage() {
  return (
    <main className="pt-20 md:pt-24 min-h-screen bg-transparent relative">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-white">About me</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-300 leading-relaxed mb-8">
            Hello there! I'm Samuel, a creative product designer based in Stockholm, Sweden. 
            I'm passionate about designing web and mobile apps that are not only beautiful but 
            also user-friendly and effective at converting target audiences.
          </p>
          
          <p className="text-lg text-gray-300 leading-relaxed mb-8">
            My journey in design started at Chas Academy, where I completed a two-year program 
            in UX/UI Design with Frontend Competence. This unique combination of design and 
            development skills has helped me become a well-rounded product designer who understands 
            both the creative and technical aspects of digital products.
          </p>
          
          <p className="text-lg text-gray-300 leading-relaxed mb-8">
            I've had the opportunity to work at Bontouch as a UI Design Intern, where I collaborated 
            with experienced designers and developers on real client projects. Currently, I'm working 
            as a Product Designer at My Medical Data, where I'm the sole designer working on 
            Hälsa+, a health-focused mobile app.
          </p>
          
          <p className="text-lg text-gray-300 leading-relaxed mb-8">
            When I'm not designing, I enjoy participating in Daily UI challenges to explore new 
            design solutions and keep my skills sharp. I believe in continuous learning and pushing 
            the boundaries of what's possible in digital design.
          </p>
          
          <div className="mt-12 pt-8 border-t border-gray-800">
            <h2 className="text-2xl font-bold mb-6 text-white">Skills & Expertise</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2 text-white">Design</h3>
                <ul className="text-gray-300 space-y-1">
                  <li>• UI/UX Design</li>
                  <li>• Interaction Design</li>
                  <li>• Design Systems</li>
                  <li>• Prototyping</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-white">Development</h3>
                <ul className="text-gray-300 space-y-1">
                  <li>• Frontend Development</li>
                  <li>• React</li>
                  <li>• HTML/CSS</li>
                  <li>• JavaScript/TypeScript</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

