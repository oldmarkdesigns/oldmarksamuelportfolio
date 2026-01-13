import Image from 'next/image'
import Link from 'next/link'

const allWork = [
  {
    id: 'mymedicaldata',
    title: 'MyMedicalData | Hälsa+',
    description: 'UX & UI Design Intern - Health app design',
    coverImage: '/Portfolio Assets/Work/MMD/MMDCover.png',
    href: '/work/mymedicaldata',
  },
  {
    id: 'bontouch',
    title: 'Bontouch (Framna)',
    description: 'UI Design Intern - Product design',
    coverImage: '/Portfolio Assets/Work/Bontouch/Assets/DesignSystem.png',
    href: '/work/bontouch',
  },
  {
    id: 'uigoodies',
    title: 'UI Goodies',
    description: 'Daily UI Design Challenges',
    coverImage: '/Portfolio Assets/Work/UIGoodies/PortfolioUIGoodiesCover.png',
    href: '/work/uigoodies',
  },
  {
    id: 'hypertype',
    title: 'Hypertype',
    description: 'Product design project',
    coverImage: '/Portfolio Assets/Work/Hypertype/Hypertype Pre.png',
    href: '/work/hypertype',
  },
  {
    id: 'moments',
    title: 'Moments',
    description: 'Plugin and pricing design',
    coverImage: '/Portfolio Assets/Work/Moments/Landing.png',
    href: '/work/moments',
  },
  {
    id: 'djungelbyran',
    title: 'Djungelbyrån',
    description: 'Brand and web design',
    coverImage: '/Portfolio Assets/Work/Djungelbyran/Work Cover.png',
    href: '/work/djungelbyran',
  },
]

export default function WorkPage() {
  return (
    <main className="pt-20 md:pt-24 min-h-screen bg-transparent relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-white">Work</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allWork.map((work) => (
            <Link
              key={work.id}
              href={work.href}
              className="group block"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-4 bg-gray-900">
                <Image
                  src={work.coverImage}
                  alt={work.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h2 className="text-xl font-semibold mb-1 group-hover:underline text-white">
                {work.title}
              </h2>
              <p className="text-gray-400 text-sm">{work.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}

