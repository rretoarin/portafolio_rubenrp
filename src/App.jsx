import { useCallback, useEffect, useState } from 'react'
import { CONTENT, PROFILE, STACK, UNIVERSITY } from './data/content'
import { useReveal } from './hooks/useReveal'
import { useParallax } from './hooks/useParallax'
import { useMagnetic } from './hooks/useMagnetic'
import { useTheme } from './hooks/useTheme'
import Nav from './components/Nav'
import ScrollProgress from './components/ScrollProgress'
import Hero from './components/Hero'
import Problems from './components/Problems'
import Services from './components/Services'
import Styles from './components/Styles'
import Outcomes from './components/Outcomes'
import Projects from './components/Projects'
import CtaBand from './components/CtaBand'
import Process from './components/Process'
import About from './components/About'
import Stack from './components/Stack'
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
        Recorrido de decisión, de arriba abajo: qué hago por ti → me reconozco en
        el problema → esto es lo que puedes encargarme → el diseño se adapta a mi
        marca → qué gano → ya lo has hecho antes → hablemos → cómo trabajas →
        quién eres → con qué → cómo empiezo.

        La tecnología entra la penúltima a propósito: es soporte, no argumento de
        venta. Y el CTA aparece tres veces —hero, banda intermedia y cierre—
        porque nadie está obligado a leerlo todo para decidirse.
      */}
      <main>
        <Hero t={t} />
        <Problems t={t} />
        <Services t={t} />
        <Styles t={t} theme={theme} onThemeChange={setTheme} />
        <Outcomes t={t} />
        <Projects t={t} lang={lang} />
        <CtaBand t={t} />
        <Process t={t} />
        <About t={t} />
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
              'Digitalizacion de procesos',
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
            // Sólo lo que de verdad se usa en los casos y en este sitio.
            skills: STACK.join(', '),
          }),
        }}
      />
    </>
  )
}
