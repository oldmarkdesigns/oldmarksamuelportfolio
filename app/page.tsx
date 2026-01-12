import Hero from '@/components/Hero'
import WorkSection from '@/components/WorkSection'
import AboutSection from '@/components/AboutSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import LifeOutsideWorkSection from '@/components/LifeOutsideWorkSection'
import ExperienceEducationSection from '@/components/ExperienceEducationSection'
import ContactSection from '@/components/ContactSection'

export default function Home() {
  return (
    <main className="bg-transparent relative">
      <section id="home">
        <Hero />
      </section>
      <WorkSection />
      <AboutSection />
      <TestimonialsSection />
      <LifeOutsideWorkSection />
      <ExperienceEducationSection />
      <ContactSection />
    </main>
  )
}

