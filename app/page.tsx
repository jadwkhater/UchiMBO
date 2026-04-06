import Hero    from '@/components/Hero'
import About   from '@/components/About'
import WhyJoin from '@/components/WhyJoin'
import Team    from '@/components/Team'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <About />
        <WhyJoin />
        <Team />
        <Contact />
      </main>
    </>
  )
}