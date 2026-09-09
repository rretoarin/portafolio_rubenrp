import Section from './Section'
import ThemeSwitch from './ThemeSwitch'
import { Frame } from './ui'

/*
 * Miniatura de un sitio, dibujada entera con tokens. No es una imagen: cada
 * barra es un elemento con `bg-ink`, `bg-accent` o `border-line`, así que se
 * repinta sola con el estilo que esté puesto. Por eso demuestra algo — enseña
 * el sistema de diseño funcionando, no una captura de cuatro plantillas.
 */
function Preview({ label }) {
  return (
    <Frame as="div" label={label} className="bg-page shadow-[var(--shadow-card)]">
      <div className="p-6 md:p-8">
        {/* Titular y texto, como bloques: lo que importa aquí es el color. */}
        <span className="block h-1.5 w-16 rounded-full bg-accent-2" />
        <span className="mt-4 block h-4 w-full rounded-sm bg-ink md:h-5" />
        <span className="mt-2.5 block h-4 w-3/5 rounded-sm bg-ink md:h-5" />
        <span className="mt-5 block h-2 w-full rounded-full bg-ink-soft/35" />
        <span className="mt-2 block h-2 w-4/5 rounded-full bg-ink-soft/35" />

        <div className="mt-6 flex flex-wrap items-center gap-2.5">
          <span className="inline-flex h-9 items-center rounded-full bg-ink px-5">
            <span className="h-2 w-14 rounded-full bg-page" />
          </span>
          <span className="inline-flex h-9 items-center rounded-full border border-edge px-5">
            <span className="h-2 w-10 rounded-full bg-ink-soft/50" />
          </span>
        </div>

        {/* Tres bloques editoriales, el recurso que usa todo el sitio. */}
        <div className="mt-8 grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="border-t border-line pt-3">
              <span className="block h-1.5 w-6 rounded-full bg-accent" />
              <span className="mt-2.5 block h-2 w-full rounded-full bg-ink-soft/45" />
              <span className="mt-1.5 block h-2 w-2/3 rounded-full bg-ink-soft/25" />
            </div>
          ))}
        </div>
      </div>
    </Frame>
  )
}

// Los cinco colores que definen el estilo, leídos del tema que esté activo.
const PALETA = [
  { key: 'page', className: 'bg-page border-line' },
  { key: 'surface-2', className: 'bg-surface-2 border-line' },
  { key: 'accent-soft', className: 'bg-accent-soft border-line' },
  { key: 'accent', className: 'bg-accent border-transparent' },
  { key: 'ink', className: 'bg-ink border-transparent' },
]

/*
 * La sección diferenciadora. No es un interruptor de modo oscuro: es la prueba
 * de que el mismo sitio —mismo contenido, misma estructura, mismo código—
 * sostiene cuatro identidades visuales.
 *
 * El selector cambia la página ENTERA, no sólo la previsualización. Esa es toda
 * la demostración: quien pulsa "Azul" no ve una maqueta de cómo sería, ve cómo
 * es. La miniatura está para que haya algo concreto que mirar sin desplazarse.
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
      <div className="grid gap-x-14 gap-y-10 lg:grid-cols-12 lg:items-start">
        <div className="reveal lg:col-span-5">
          <p className="max-w-xl text-lg leading-relaxed text-ink-soft">{t.styles.lead}</p>

          <p className="eyebrow eyebrow-plain mt-10">{t.styles.hint}</p>
          <div className="mt-4">
            <ThemeSwitch
              theme={theme}
              onChange={onThemeChange}
              labels={t.theme}
              variant="full"
            />
          </div>

          {/* La paleta del estilo activo, sin nombres de color: se ve, no se lee. */}
          <div className="mt-8 flex items-center gap-2" aria-hidden>
            {PALETA.map((c) => (
              <span
                key={c.key}
                className={`size-7 rounded-full border ${c.className}`}
                title={c.key}
              />
            ))}
          </div>
        </div>

        <div className="reveal lg:col-span-6 lg:col-start-7">
          <p className="eyebrow eyebrow-plain">{t.styles.previewLabel}</p>
          <div className="mt-4">
            <Preview label={t.theme.names[theme]} />
          </div>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-ink-soft">
            {t.styles.previewNote}
          </p>
        </div>
      </div>
    </Section>
  )
}
