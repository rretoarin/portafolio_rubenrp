import { useCallback, useEffect, useState } from 'react'
import { CONTENT, PROFILE, UNIVERSITY } from './data/content'
import { useReveal } from './hooks/useReveal'
import { useParallax } from './hooks/useParallax'
import { useMagnetic } from './hooks/useMagnetic'
import { useTheme } from './hooks/useTheme'
import Nav from './components/Nav'
import ScrollProgress from './components/ScrollProgress'
import Hero from './components/Hero'
import Services from './components/Services'
import Styles from './components/Styles'
import Process from './components/Process'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

const STORAGE_KEY = 'portfolio-lang'

// Español por defecto; si el navegador no es hispanohablante, arranca en inglés.
function initialLang() {
  if (typeof window === 'undefined') return 'es'
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === 'es' || saved === 'en') return saved
  } catch {
    // Sin almacenamiento se decide por el idioma del navegador.
  }
  return navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'en'
}

export default function App() {
  const [lang, setLang] = useState(initialLang)
  const [theme, setTheme] = useTheme()
  const t = CONTENT[lang]

  useReveal()
  useParallax()
  useMagnetic()

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // El idioma simplemente no sobrevive a la recarga.
    }
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

      <Nav t={t} onToggleLang={toggleLang} theme={theme} onThemeChange={setTheme} />

      {/*
        Seis secciones y ninguna más. La historia es: qué resuelvo → qué puedes
        encargarme → cómo se vería tu marca → cómo trabajo y hasta dónde te
        acompaño → ya lo he hecho → hablemos.

        Lo que se quitó de aquí —el problema, los resultados, las tecnologías,
        un CTA intermedio y una sección entera sobre mí— no se sustituyó por
        nada: la home tenía demasiado contenido, no poco.
      */}
      <main>
        <Hero t={t} theme={theme} />
        <Services t={t} />
        <Styles t={t} theme={theme} onThemeChange={setTheme} />
        <Process t={t} />
        <Projects t={t} theme={theme} />
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
            alternateName: PROFILE.brand,
            jobTitle: t.footer.role,
            url: PROFILE.site,
            image: `${PROFILE.site}${PROFILE.photo.slice(1)}`,
            email: `mailto:${PROFILE.email}`,
            telephone: `+${PROFILE.whatsapp}`,
            sameAs: [PROFILE.linkedin],
            description: t.hero.lead,
            knowsAbout: [
              'Diseno y desarrollo web',
              'Sistemas web a medida',
              'Automatizacion de procesos',
              'Integracion de sistemas',
              'Aplicaciones web',
              'Paneles de control y reportes',
            ],
            knowsLanguage: ['es', 'en'],
            alumniOf: {
              '@type': 'CollegeOrUniversity',
              name: UNIVERSITY,
            },
            makesOffer: t.services.items.map((item) => ({
              '@type': 'Offer',
              itemOffered: { '@type': 'Service', name: item.title, description: item.text },
            })),
          }),
        }}
      />
    </>
  )
}
