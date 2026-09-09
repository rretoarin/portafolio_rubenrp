import { useEffect, useRef, useState } from 'react'
import { PROFILE, whatsappUrl } from '../data/content'
import { ArrowRight, Close, Menu } from './icons'
import ThemeSwitch, { Swatch } from './ThemeSwitch'

// Cinco destinos, los mismos en escritorio y en móvil: son todas las secciones
// que hay. La home ya no tiene nada que esconder detrás de un menú más largo.
const SECTIONS = ['services', 'styles', 'projects', 'process', 'contact']

const MENU = ['services', 'styles', 'projects', 'process', 'contact']

export default function Nav({ t, onToggleLang, theme, onThemeChange }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [estilos, setEstilos] = useState(false)
  const [active, setActive] = useState('')
  const cajaEstilos = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Marca en el menú la sección que domina la pantalla.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  // Con el menú móvil abierto, el fondo no debe desplazarse.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // El desplegable de estilos se cierra al pulsar fuera. `pointerdown` y no
  // `click`: en táctil el click llega tarde y el panel parpadea.
  useEffect(() => {
    if (!estilos) return
    const fuera = (e) => {
      if (!cajaEstilos.current?.contains(e.target)) setEstilos(false)
    }
    document.addEventListener('pointerdown', fuera)
    return () => document.removeEventListener('pointerdown', fuera)
  }, [estilos])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      setOpen(false)
      setEstilos(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b pt-[env(safe-area-inset-top)] transition-colors duration-300 ${
          scrolled || open
            ? 'border-line bg-[var(--glass)] backdrop-blur-xl'
            : 'border-transparent bg-transparent'
        }`}
      >
        <nav className="shell flex h-16 items-center justify-between gap-4 md:h-20">
          {/*
            La marca es tipográfica, no un logotipo: dos pesos en la misma
            palabra bastan para que se lea como marca y no como un nombre suelto.
          */}
          <a href="#top" className="tap group flex items-baseline" aria-label={PROFILE.brand}>
            <span className="display text-lg tracking-tight md:text-xl">Ruben</span>
            <span className="display text-lg tracking-tight text-accent md:text-xl">Dev</span>
          </a>

          <div className="flex items-center gap-1">
            <ul className="hidden items-center gap-0.5 lg:flex">
              {SECTIONS.map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    data-active={active === id}
                    aria-current={active === id ? 'true' : undefined}
                    className={`nav-link rounded-full px-3.5 py-2 text-sm transition-colors ${
                      active === id ? 'text-ink' : 'text-ink-soft hover:text-ink'
                    }`}
                  >
                    {t.nav[id]}
                  </a>
                </li>
              ))}
            </ul>

            {/* El selector de estilo, a mano desde la primera pantalla. */}
            <div className="mx-1 hidden md:block">
              <ThemeSwitch theme={theme} onChange={onThemeChange} labels={t.theme} />
            </div>

            {/*
              En móvil las cuatro muestras no caben junto al logo, el idioma y el
              menú, así que una sola —la del estilo puesto— abre las otras tres.
              Sigue estando en la cabecera, que es donde se busca.
            */}
            <div ref={cajaEstilos} className="md:hidden">
              <button
                type="button"
                onClick={() => setEstilos((v) => !v)}
                aria-label={t.theme.aria}
                aria-expanded={estilos}
                className={`flex size-11 items-center justify-center rounded-full transition-colors ${
                  estilos ? 'bg-page-soft' : ''
                }`}
              >
                <Swatch theme={theme} className="size-5" />
              </button>

              {estilos && (
                <div className="panel-estilos absolute top-full right-[calc(1.25rem+env(safe-area-inset-right))] z-50 mt-1.5 rounded-full border border-line bg-[var(--glass)] p-1 shadow-[var(--shadow-card-hover)] backdrop-blur-xl">
                  <ThemeSwitch
                    theme={theme}
                    onChange={onThemeChange}
                    labels={t.theme}
                    onPick={() => setEstilos(false)}
                  />
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={onToggleLang}
              aria-label={t.langAria}
              className="flex h-11 items-center rounded-full px-3 text-xs font-bold tracking-widest text-ink-soft transition-colors hover:text-ink md:h-9"
            >
              {t.langLabel}
            </button>

            <a
              href={whatsappUrl(t.contact.whatsappMessage)}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-primary group ml-1 hidden h-11 min-h-0 pr-2.5 pl-5 text-sm lg:inline-flex"
            >
              {t.nav.talk}
              <span className="flex size-7 items-center justify-center rounded-full btn-badge transition-transform group-hover:translate-x-0.5">
                <ArrowRight width={13} height={13} />
              </span>
            </a>

            <button
              type="button"
              onClick={() => {
                setOpen((v) => !v)
                setEstilos(false)
              }}
              aria-label={open ? t.nav.close : t.nav.menu}
              aria-expanded={open}
              className="ml-1 flex size-11 items-center justify-center rounded-full border border-edge text-ink-soft transition-colors hover:border-ink hover:text-ink lg:hidden"
            >
              {open ? <Close width={18} height={18} /> : <Menu width={18} height={18} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Menú móvil a pantalla completa. */}
      <div
        className={`fixed inset-0 z-40 bg-page transition-opacity duration-300 lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="shell flex h-full flex-col justify-center pt-[calc(4rem+env(safe-area-inset-top))] pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
          <ul className="overflow-y-auto">
            {MENU.map((id, i) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  className="block-top display-light flex items-baseline gap-4 border-b border-line py-3.5 text-xl sm:text-2xl"
                >
                  <span className="block-num text-xs font-bold">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="block-title">{t.nav[id]}</span>
                </a>
              </li>
            ))}
          </ul>

          {/*
            El selector también aquí: en móvil la barra no tiene sitio y es
            justamente donde más se agradece poder probar los cuatro estilos.
          */}
          {/* Sin filete propio: el último enlace de la lista ya trae el suyo. */}
          <div className="mt-6">
            <p className="eyebrow eyebrow-plain">{t.theme.label}</p>
            <div className="mt-3">
              <ThemeSwitch theme={theme} onChange={onThemeChange} labels={t.theme} />
            </div>
          </div>

          <a
            href={whatsappUrl(t.contact.whatsappMessage)}
            target="_blank"
            rel="noreferrer noopener"
            onClick={() => setOpen(false)}
            className="btn-primary mt-6 justify-center px-7"
          >
            {t.nav.talk}
            <ArrowRight width={16} height={16} />
          </a>
        </div>
      </div>
    </>
  )
}
