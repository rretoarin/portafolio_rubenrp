import { shotFor, whatsappUrl } from '../data/content'
import { ArrowRight, Browser, Code, Gear, Link } from './icons'
import { Arc, Words } from './ui'
import DeviceMock from './DeviceMock'

// Mismo orden que `hero.services` en content.js.
const ICONOS = [Browser, Code, Gear, Link]

/*
 * El hero es la sección que más se juega la visita, así que dice cuatro cosas y
 * ninguna más: qué hago, para quién, con qué valor y por dónde se sigue.
 *
 * Lo que había antes y ya no está: seis píldoras de tipos de cliente, un segundo
 * párrafo de apoyo, una nota de contacto y un trío de afirmaciones. Todo eso
 * empujaba la prueba visual fuera de la primera pantalla, que es exactamente lo
 * que no puede pasar.
 */
export default function Hero({ t, theme }) {
  return (
    <section
      id="top"
      className="hero-fill relative flex min-h-svh flex-col overflow-hidden pt-24 pb-10 md:pt-28 md:pb-12"
    >
      <Arc className="-top-[30rem] -right-[24rem] size-[52rem]" />

      <div className="shell relative">
        <div className="grid gap-x-12 gap-y-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <p className="reveal eyebrow">{t.hero.kicker}</p>

            <h1 className="reveal-words display mt-6 text-[2.5rem] text-heading sm:text-[3.25rem] lg:text-[3.75rem]">
              <Words text={t.hero.headline} />
            </h1>

            <p className="reveal mt-7 max-w-lg text-lg leading-relaxed text-ink-soft">
              {t.hero.lead}
            </p>

            <div className="reveal mt-9 flex flex-wrap items-center gap-3">
              <a
                href={whatsappUrl(t.contact.whatsappMessage)}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-primary magnetic group pr-3 pl-7"
              >
                {t.hero.ctaPrimary}
                <span className="btn-badge flex size-9 items-center justify-center rounded-full transition-transform group-hover:translate-x-0.5">
                  <ArrowRight width={16} height={16} />
                </span>
              </a>

              <a href="#process" className="btn-ghost">
                {t.hero.ctaSecondary}
              </a>
            </div>
          </div>

          {/*
            La prueba visual. Grande, pero en su columna: a ancho completo se
            comía la primera pantalla y el titular dejaba de mandar.
          */}
          <div className="reveal lg:col-span-6" data-parallax="0.08">
            <DeviceMock
              priority
              laptop={{
                src: shotFor(theme, '/proyectos/muestras-1.webp'),
                alt: t.hero.mock.laptopAlt,
                label: t.hero.mock.label,
              }}
              phone={{
                src: shotFor(theme, '/proyectos/jm-movil.webp'),
                alt: t.hero.mock.phoneAlt,
              }}
            />
          </div>
        </div>

      </div>

      {/*
        Las cuatro soluciones en una línea: adelantan la sección siguiente sin
        pedir un scroll, y sustituyen a la fila de tipos de cliente. Van con
        `mt-auto`, ancladas al pie de la primera pantalla: así el espacio que
        sobra cae aquí y no encima del titular.
      */}
      <div className="shell relative mt-auto pt-14 md:pt-16">
        <ul className="stagger grid gap-x-8 gap-y-5 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {t.hero.services.map((item, i) => {
            const Icono = ICONOS[i]
            return (
              <li key={i} className="reveal flex items-center gap-3">
                <Icono width={20} height={20} className="shrink-0 text-accent" aria-hidden />
                <span className="text-sm leading-snug text-ink-soft">{item}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
