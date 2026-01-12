'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function DailyUI() {
  return (
    <section className="py-20 md:py-32 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Daily UI</h2>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            Daily UI is a series of design challenges sent out every day. I've gathered some of the designs I've created from these challenges and compiled them into a collection that I plan to keep updated as I complete more. These are smaller design projects that have helped me explore and develop a variety of solutions.
          </p>
          <Link
            href="/work/uigoodies"
            className="inline-block px-6 py-3 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            Have a look!
          </Link>
        </div>
      </div>
    </section>
  )
}

