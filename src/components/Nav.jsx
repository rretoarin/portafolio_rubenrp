import { useEffect, useState } from 'react'
import { PROFILE, whatsappUrl } from '../data/content'
import { Close, Menu, WhatsApp } from './icons'

// Cuatro destinos: el recorrido de decisión, nada más. Herramientas y el
// diagnóstico completo quedan en el pie — no son razón de visita.
const SECTIONS = ['problems', 'services', 'projects', 'about']

// En pantalla completa sí caben todos: ahí no hay que economizar espacio.
const MENU = ['problems', 'services', 'projects', 'process', 'about', 'contact']

export default function Nav({ t, onToggleLang }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

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
        className={`fixed inset-x-0 top-0 z-50 border-b pt-[env(safe-area-inset-top)] transition-colors duration-300 ${
          scrolled || open
            ? 'border-line bg-page/90 backdrop-blur-xl'
            : 'border-transparent bg-transparent'
        }`}
      >
        <nav className="shell flex h-16 items-center justify-between md:h-20">
          <a href="#top" className="tap group flex items-center gap-3" aria-label={PROFILE.name}>
            {PROFILE.photo ? (
              <img
                src={PROFILE.photo}
                alt=""
                width="400"
                height="400"
                className="size-9 rounded-full border border-line object-cover transition-colors duration-300 group-hover:border-line"
              />
            ) : (
              <span className="flex size-9 items-center justify-center rounded-full border border-edge text-xs font-semibold tracking-widest">
                {PROFILE.initials}
              </span>
            )}
            <span className="hidden text-sm font-medium sm:block">{PROFILE.name}</span>
          </a>

          <div className="flex items-center gap-1">
            <ul className="hidden items-center gap-1 lg:flex">
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

            <a
              href={whatsappUrl(t.contact.whatsappMessage)}
              target="_blank"
              rel="noreferrer noopener"
              className="ml-2 hidden h-10 items-center gap-2 rounded-full bg-ink px-5 text-sm font-medium text-page transition-colors hover:bg-ink lg:flex"
            >
              <WhatsApp width={15} height={15} />
              {t.nav.talk}
            </a>

            <button
              type="button"
              onClick={onToggleLang}
              aria-label={t.langAria}
              className="ml-2 flex h-11 items-center rounded-full border border-edge px-4 text-xs font-semibold tracking-widest text-ink-soft transition-colors hover:border-ink hover:text-ink md:h-9"
            >
              {t.langLabel}
            </button>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
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
        <div className="shell flex h-full flex-col justify-center pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
          <ul>
            {MENU.map((id, i) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  className="block-top display-light flex items-baseline gap-4 border-b border-line py-4 text-2xl"
                >
                  <span className="block-num text-xs font-semibold">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="block-title">{t.nav[id]}</span>
                </a>
              </li>
            ))}
          </ul>

          <a
            href={whatsappUrl(t.contact.whatsappMessage)}
            target="_blank"
            rel="noreferrer noopener"
            onClick={() => setOpen(false)}
            className="btn-primary mt-8 justify-center px-7"
          >
            <WhatsApp width={16} height={16} />
            {t.nav.talk}
          </a>
        </div>
      </div>
    </>
  )
}
