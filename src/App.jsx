import { useCallback, useEffect, useState } from 'react'
import { CONTENT, PROFILE, UNIVERSITY } from './data/content'
import { useReveal } from './hooks/useReveal'
import { useParallax } from './hooks/useParallax'
import { useMagnetic } from './hooks/useMagnetic'
import Nav from './components/Nav'
import ScrollProgress from './components/ScrollProgress'
import Problems from './components/Problems'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import Projects from './components/Projects'
import Process from './components/Process'
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
  useParallax()
  useMagnetic()

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
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-page"
      >
        {lang === 'es' ? 'Saltar al contenido' : 'Skip to content'}
      </a>

      <ScrollProgress />
      <div aria-hidden className="grain" />

      <Nav t={t} onToggleLang={toggleLang} />

      {/*
        Orden del recorrido: propuesta de valor, que problemas resuelvo, trabajo
        real, como lo hago, quien responde, con que herramientas y como contactar.
        La cinta de tecnologias entra recien antes del stack: es soporte tecnico,
        no la primera cosa que tiene que leer un cliente.
      */}
      {/*
        Recorrido de decisión: qué gano → me reconozco en el problema → puedes
        resolverlo → ya lo has hecho → cómo trabajas → quién eres → con qué →
        cómo empiezo. La tecnología entra la penúltima a propósito.
      */}
      <main>
        <Hero t={t} />
        <Problems t={t} />
        <Services t={t} />
        <Projects t={t} lang={lang} />
        <Process t={t} />
        <About t={t} />
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
            url: PROFILE.site,
            image: `${PROFILE.site}${PROFILE.photo.slice(1)}`,
            email: `mailto:${PROFILE.email}`,
            telephone: `+${PROFILE.whatsapp}`,
            sameAs: [PROFILE.linkedin],
            description: t.hero.lead,
            knowsAbout: [
              'Diseno y desarrollo web',
              'Digitalizacion de procesos',
              'Automatizacion de procesos',
              'Sistemas internos a medida',
              'Integracion de sistemas',
              'Paneles de control y reportes',
              'Desarrollo web a medida',
            ],
            alumniOf: {
              '@type': 'CollegeOrUniversity',
              name: UNIVERSITY,
            },
          }),
        }}
      />
    </>
  )
}
