import { Eyebrow } from './ui'

/*
 * Envoltorio común. La cabecera no está centrada: el título ocupa siete de las
 * doce columnas por la izquierda y el subtítulo cae a la derecha alineado abajo,
 * así que ambos textos no comparten eje vertical ni línea de base.
 *
 * Todas las secciones van sobre blanco: el ritmo lo marca el espacio vertical,
 * no un fondo alterno.
 */
export default function Section({ id, eyebrow, title, subtitle, children }) {
  return (
    <section
      id={id}
      className="relative scroll-mt-20 overflow-hidden py-20 md:py-28"
    >
      <div className="shell">
        <div className="grid gap-x-10 gap-y-6 lg:grid-cols-12 lg:items-end">
          <header className="reveal lg:col-span-7">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="display mt-5 text-[2rem] sm:text-[2.5rem] lg:text-[3.25rem]">
              {title}
            </h2>
          </header>

          {subtitle && (
            <p className="reveal leading-relaxed text-ink-soft lg:col-span-4 lg:col-start-9 lg:pb-2">
              {subtitle}
            </p>
          )}
        </div>

        <div className="mt-14 md:mt-20">{children}</div>
      </div>
    </section>
  )
}
