import { useCallback, useEffect, useState } from 'react'
import { CONTENT, EDUCATION, PROFILE } from './data/content'
import { useReveal } from './hooks/useReveal'
import { useSpotlight } from './hooks/useSpotlight'
import Nav from './components/Nav'
import ScrollProgress from './components/ScrollProgress'
import Marquee from './components/Marquee'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Process from './components/Process'
import Stack from './components/Stack'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

const STORAGE_KEY = 'portfolio-lang'

// Español por defecto; si el navegador no es hispanohablante, arranca en inglés.
function initialLang() {
  if (typeof window === 'undefined') return 'es'
  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (saved === 'es' || saved === 'en') return saved
  return navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'en'
}

export default function App() {
  const [lang, setLang] = useState(initialLang)
  const t = CONTENT[lang]

  useReveal()
  useSpotlight()

  useEffect(() => {
    document.documentElement.lang = lang
    window.localStorage.setItem(STORAGE_KEY, lang)
  }, [lang])

  const toggleLang = useCallback(() => {
    setLang((current) => (current === 'es' ? 'en' : 'es'))
  }, [])

  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60 focus:rounded-full focus:bg-bright focus:px-4 focus:py-2 focus:text-sm focus:text-ink"
      >
        {lang === 'es' ? 'Saltar al contenido' : 'Skip to content'}
      </a>

      <ScrollProgress />
      <div aria-hidden className="grain" />

      <Nav t={t} onToggleLang={toggleLang} />

      <main>
        <Hero t={t} />
        <Marquee />
        <About t={t} />
        <Projects t={t} />
        <Process t={t} />
        <Stack t={t} />
        <Contact t={t} />
      </main>

      <Footer t={t} />

      <WhatsAppButton t={t} />

      {/* Datos estructurados: ayudan a que Google muestre el perfil correctamente. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: PROFILE.name,
            jobTitle: t.footer.role,
            email: `mailto:${PROFILE.email}`,
            sameAs: [PROFILE.linkedin],
            knowsAbout: ['React', 'Node.js', 'MongoDB', 'Full stack web development'],
            alumniOf: {
              '@type': 'CollegeOrUniversity',
              name: EDUCATION.institution,
            },
            hasCredential: {
              '@type': 'EducationalOccupationalCredential',
              name: t.about.education.program,
              credentialCategory: 'certificate',
              recognizedBy: {
                '@type': 'CollegeOrUniversity',
                name: EDUCATION.institution,
              },
            },
          }),
        }}
      />
    </>
  )
}
