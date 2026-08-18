import { useEffect, useState } from 'react'
import { PROFILE } from '../data/content'
import { Close, Menu } from './icons'

const SECTIONS = ['about', 'projects', 'process', 'stack', 'contact']

export default function Nav({ t, onToggleLang }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  // Barra sólida sólo después de salir del hero.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Marca en el nav la sección que domina la pantalla.
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

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
          scrolled || open
            ? 'border-line bg-ink/80 backdrop-blur-xl'
            : 'border-transparent bg-transparent'
        }`}
      >
        <nav className="shell flex h-16 items-center justify-between md:h-20">
          <a
            href="#top"
            className="group flex items-center gap-3"
            aria-label={PROFILE.name}
          >
            <span className="flex size-9 items-center justify-center rounded-md border border-line-strong font-mono text-xs tracking-widest text-bright transition-colors group-hover:border-bright">
              {PROFILE.initials}
            </span>
            <span className="hidden font-mono text-sm tracking-tight sm:block">
              {PROFILE.name}
            </span>
          </a>

          <div className="flex items-center gap-1">
            <ul className="hidden items-center gap-1 md:flex">
              {SECTIONS.map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className={`rounded-full px-3.5 py-2 font-mono text-sm transition-colors ${
                      active === id
                        ? 'text-bright'
                        : 'text-muted hover:text-bright'
                    }`}
                  >
                    {t.nav[id]}
                  </a>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={onToggleLang}
              aria-label={t.langAria}
              className="ml-2 rounded-full border border-line-strong px-3 py-1.5 font-mono text-xs tracking-widest text-soft transition-colors hover:border-bright hover:text-bright"
            >
              {t.langLabel}
            </button>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? t.nav.close : t.nav.menu}
              aria-expanded={open}
              className="ml-1 flex size-9 items-center justify-center rounded-full border border-line-strong text-soft transition-colors hover:border-bright hover:text-bright md:hidden"
            >
              {open ? <Close width={18} height={18} /> : <Menu width={18} height={18} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Menú móvil a pantalla completa. */}
      <div
        className={`fixed inset-0 z-40 bg-ink transition-opacity duration-300 md:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <ul className="shell flex h-full flex-col justify-center gap-2">
          {SECTIONS.map((id, i) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={() => setOpen(false)}
                className="display flex items-baseline gap-4 border-b border-line py-5 text-3xl text-bright"
              >
                <span className="font-mono text-xs text-muted">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {t.nav[id]}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
