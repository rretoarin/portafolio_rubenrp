import { THEMES } from '../hooks/useTheme'
import { shotFor } from '../data/content'
import Section from './Section'
import DeviceMock from './DeviceMock'

/*
 * Miniatura de un sitio, dibujada entera con tokens dentro de un `data-theme`
 * propio. No es una imagen ni una captura: cada barra es un elemento con
 * `bg-ink`, `bg-accent` o `border-line`, así que se pinta con los colores REALES
 * del tema al que lleva.
 *
 * Por eso las cuatro se ven a la vez sin duplicar nada ni repetir la paleta en
 * JavaScript: es el sistema de diseño funcionando delante del cliente.
 */
function MiniSite({ theme }) {
  return (
    <span
      data-theme={theme}
      aria-hidden
      className="block overflow-hidden rounded-[var(--radius-tile)] border border-line bg-page p-3.5"
    >
      <span className="flex items-center gap-1">
        <span className="size-1 rounded-full bg-edge/50" />
        <span className="size-1 rounded-full bg-edge/35" />
      </span>
      <span className="mt-3 block h-1 w-8 rounded-full bg-accent-2" />
      <span className="mt-2 block h-2.5 w-full rounded-sm bg-ink" />
      <span className="mt-1.5 block h-2.5 w-2/3 rounded-sm bg-ink" />
      <span className="mt-2.5 block h-1.5 w-full rounded-full bg-ink-soft/30" />
      <span className="mt-3 flex items-center gap-1.5">
        <span className="inline-flex h-5 w-14 items-center justify-center rounded-full bg-btn">
          <span className="h-1 w-7 rounded-full bg-on-btn" />
        </span>
        <span className="inline-flex h-5 w-10 rounded-full border border-edge" />
      </span>
      <span className="mt-3 grid grid-cols-3 gap-1.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className="block border-t border-line pt-1.5">
            <span className="block h-1 w-4 rounded-full bg-accent" />
            <span className="mt-1 block h-1 w-full rounded-full bg-ink-soft/25" />
          </span>
        ))}
      </span>
    </span>
  )
}

/*
 * La sección que vende la capacidad de adaptación mejor que cualquier párrafo:
 * no explica que el diseño se adapta, lo enseña. Las cuatro miniaturas son el
 * selector, así que ver y elegir son el mismo gesto.
 *
 * Al pulsar una cambia la página entera —incluidas las capturas de la maqueta,
 * que tienen su propio juego oscuro—, sin recargar y sin perder el scroll.
 */
export default function Styles({ t, theme, onThemeChange }) {
  return (
    <Section
      id="styles"
      muted
      eyebrow={t.styles.eyebrow}
      title={t.styles.title}
      subtitle={t.styles.subtitle}
    >
      <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12 lg:items-center">
        <div className="reveal lg:col-span-4">
          <p className="display-light text-[1.5rem] text-heading sm:text-[1.75rem]">
            {t.styles.note}
          </p>
          <p className="eyebrow eyebrow-plain mt-6">{t.styles.hint}</p>
        </div>

        <div className="reveal lg:col-span-7 lg:col-start-6" data-parallax="0.05">
          <DeviceMock
            laptop={{
              src: shotFor(theme, '/proyectos/jm-1.webp'),
              alt: t.projects.items['jm-consulting'].shots[0],
              label: 'jm-consulting-foods.netlify.app',
            }}
            phone={{
              src: shotFor(theme, '/proyectos/jm-movil.webp'),
              alt: t.hero.mock.phoneAlt,
            }}
          />
        </div>
      </div>

      {/* Las cuatro identidades a la vez. Ver y elegir, el mismo gesto. */}
      <div
        role="radiogroup"
        aria-label={t.theme.aria}
        className="stagger mt-16 grid grid-cols-2 gap-4 md:mt-20 lg:grid-cols-4"
      >
        {THEMES.map((id) => {
          const activo = id === theme
          return (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={activo}
              data-theme-option={id}
              onClick={() => onThemeChange(id)}
              className="reveal group text-left"
            >
              <span
                className={`block rounded-[var(--radius-card)] border p-1.5 transition-colors ${
                  activo ? 'border-ink' : 'border-line group-hover:border-edge'
                }`}
              >
                <MiniSite theme={id} />
              </span>

              <span className="mt-3 flex items-center gap-2.5">
                <span
                  className={`flex size-4 shrink-0 items-center justify-center rounded-full border transition-colors ${
                    activo ? 'border-ink' : 'border-edge'
                  }`}
                >
                  {activo && <span className="size-2 rounded-full bg-ink" />}
                </span>
                <span className={`text-sm ${activo ? 'font-semibold text-ink' : 'text-ink-soft'}`}>
                  {t.theme.names[id]}
                </span>
              </span>
            </button>
          )
        })}
      </div>
    </Section>
  )
}
