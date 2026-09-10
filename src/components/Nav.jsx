import { useEffect, useRef, useState } from 'react'
import { PROFILE, whatsappUrl } from '../data/content'
import { ArrowRight, Close, Menu } from './icons'
import ThemeSwitch from './ThemeSwitch'

// Cinco destinos, los mismos en escritorio y en móvil: son todas las secciones
// que hay. La home ya no tiene nada que esconder detrás de un menú más largo.
const SECTIONS = ['services', 'styles', 'projects', 'process', 'contact']

const MENU = ['services', 'styles', 'projects', 'process', 'contact']

/*
 * Dónde se dibuja el subrayado dentro de un enlace, en píxeles: metido
 * 0.875rem por cada lado y levantado 0.375rem del borde inferior. Los dos
 * primeros son los mismos números que usa `.nav-link::after` para el trazo del
 * hover y tienen que seguir siéndolo, porque los dos dibujan la misma línea.
 * El tercero es el alto del riel, que va en `.nav-rail`.
 */
const SANGRIA = 14
const ALTURA = 6
const GROSOR = 1

export default function Nav({ t, onToggleLang, theme, onThemeChange }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const lista = useRef(null)
  const [riel, setRiel] = useState(null)

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

  /*
   * Dónde tiene que estar la línea del menú. Se mide en píxeles porque el riel
   * es uno solo y se desplaza de una sección a la siguiente en vez de
   * encenderse y apagarse en cada enlace: así la navegación se lee como un
   * recorrido y no como un parpadeo.
   *
   * Se vuelve a medir al cambiar de sección y al cambiar de idioma —las
   * palabras no miden lo mismo en los dos—, y el `ResizeObserver` cubre lo
   * demás: el ancho de la ventana y la fuente cuando termina de cargar.
   */
  useEffect(() => {
    const ul = lista.current
    if (!ul) return

    const medir = () => {
      const enlace = ul.querySelector('[data-active="true"]')
      if (!enlace || !enlace.offsetWidth) return
      /*
       * Con `getBoundingClientRect` y no con `offsetLeft`/`offsetTop`: hacen
       * falta los decimales. `.nav-link::after` cae en una posición
       * fraccionaria y el navegador la ajusta a una fila de píxeles limpia;
       * con las medidas redondeadas, el riel caía medio píxel al lado y la
       * misma línea se repartía entre dos filas y se veía más blanda.
       */
      const caja = enlace.getBoundingClientRect()
      const base = ul.getBoundingClientRect()
      setRiel({
        x: caja.left - base.left + SANGRIA,
        y: Math.round(caja.bottom - base.top - ALTURA - GROSOR),
        w: Math.max(caja.width - SANGRIA * 2, 0),
      })
    }

    medir()
    const ro = new ResizeObserver(medir)
    ro.observe(ul)
    return () => ro.disconnect()
  }, [active, t])

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
        className={`barra-fija fixed inset-x-0 top-0 z-50 border-b pt-[env(safe-area-inset-top)] transition-colors duration-300 ${
          scrolled || open
            ? 'border-line bg-page md:bg-[var(--glass)] md:backdrop-blur-xl'
            : 'border-transparent bg-transparent'
        }`}
      >
        <nav className="shell flex h-16 items-center justify-between gap-3 md:h-20 md:gap-4">
          {/*
            La marca es tipográfica, no un logotipo: dos pesos en la misma
            palabra bastan para que se lea como marca y no como un nombre suelto.
          */}
          <a href="#top" className="tap group flex items-baseline" aria-label={PROFILE.brand}>
            <span className="wordmark text-lg tracking-tight md:text-xl">Ruben</span>
            <span className="wordmark text-lg tracking-tight text-accent md:text-xl">Dev</span>
          </a>

          <div className="flex items-center gap-1">
            <ul ref={lista} className="relative hidden items-center gap-0.5 lg:flex">
              {SECTIONS.map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    data-active={active === id}
                    aria-current={active === id ? 'true' : undefined}
                    className={`nav-link nav-slide rounded-full px-3.5 py-2 text-sm transition-colors ${
                      active === id ? 'text-ink' : 'text-ink-soft hover:text-ink'
                    }`}
                  >
                    {t.nav[id]}
                  </a>
                </li>
              ))}

              {/*
                La línea que viaja. Va como `<li>` y no como `<span>` porque un
                `<ul>` sólo admite `<li>`; al estar posicionada no ocupa hueco
                ni cuenta para el `gap`. Se estira con `scaleX` desde un píxel:
                animar el ancho repintaría la barra en cada paso.
              */}
              <li
                aria-hidden
                className="nav-rail"
                style={{
                  transform: `translate(${riel?.x ?? 0}px, ${riel?.y ?? 0}px) scaleX(${riel?.w ?? 0})`,
                  opacity: active && riel ? 1 : 0,
                }}
              />
            </ul>

            {/*
              Los cuatro estilos, siempre a la vista y a la altura de la marca.
              Estuvieron detrás de un desplegable: se abría sobre el hero y hacía
              falta un toque de más para algo que es una seña de identidad.
            */}
            <div className="mx-0.5 md:mx-1">
              <ThemeSwitch theme={theme} onChange={onThemeChange} labels={t.theme} />
            </div>

            <button
              type="button"
              onClick={onToggleLang}
              aria-label={t.langAria}
              className="hidden h-11 items-center rounded-full px-2 text-xs font-bold tracking-widest text-ink-soft transition-colors min-[360px]:flex hover:text-ink md:h-9 md:px-3"
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
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? t.nav.close : t.nav.menu}
              aria-expanded={open}
              className="ml-1 flex size-11 items-center justify-center rounded-full border border-edge text-ink-soft transition-[color,border-color,transform] duration-200 hover:border-ink hover:text-ink active:scale-95 lg:hidden"
            >
              {open ? <Close width={18} height={18} /> : <Menu width={18} height={18} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Menú móvil a pantalla completa. */}
      <div
        className={`fixed inset-0 z-40 bg-page transition-opacity duration-300 lg:hidden ${
          open ? 'menu-open opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="shell flex h-full flex-col pt-[calc(4.75rem+env(safe-area-inset-top))] pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
          <ul className="overflow-y-auto">
            {/*
              Los enlaces suben escalonados mientras el fondo se funde. El
              retardo va en línea porque depende del índice, y se apaga al
              cerrar para que el menú desaparezca de una pieza: escalonar
              también la salida deja la sensación de que se atasca.
            */}
            {MENU.map((id, i) => (
              <li
                key={id}
                className="menu-item"
                style={{ transitionDelay: open ? `${60 + i * 45}ms` : '0ms' }}
              >
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
            El idioma también aquí: en la barra desaparece por debajo de 360px,
            donde las cuatro muestras y el menú ya la llenan.
          */}
          <button
            type="button"
            onClick={onToggleLang}
            aria-label={t.langAria}
            className="mt-6 flex min-h-11 items-center gap-3 self-start text-sm text-ink-soft transition-colors hover:text-ink"
          >
            <span className="eyebrow eyebrow-plain">{t.langLabel}</span>
            <span>{t.nav.language}</span>
          </button>

          <a
            href={whatsappUrl(t.contact.whatsappMessage)}
            target="_blank"
            rel="noreferrer noopener"
            onClick={() => setOpen(false)}
            className="btn-primary mt-4 justify-center px-7"
          >
            {t.nav.talk}
            <ArrowRight width={16} height={16} />
          </a>
        </div>
      </div>
    </>
  )
}
