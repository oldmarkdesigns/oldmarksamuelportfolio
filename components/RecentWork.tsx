'use client'

import Link from 'next/link'
import Image from 'next/image'

const recentWork = [
  {
    id: 'mymedicaldata',
    title: 'Product Designer @ MyMedicalData',
    company: 'MyMedicalData',
    coverImage: '/Portfolio Assets/Work/MMD/MMDCover.png',
    href: '/work/mymedicaldata',
  },
  {
    id: 'bontouch',
    title: 'Internship @ Bontouch',
    company: 'Bontouch',
    coverImage: '/Portfolio Assets/Work/Bontouch/Assets/DesignSystem.png',
    href: '/work/bontouch',
  },
]

export default function RecentWork() {
  return (
    <section className="py-20 md:py-32 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Recent work</h2>
          <Link
            href="/work"
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            See all work →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {recentWork.map((work) => (
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
              <h3 className="text-xl font-semibold mb-1 text-white">{work.title}</h3>
              <p className="text-gray-400">{work.company}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

