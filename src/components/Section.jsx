import { Eyebrow } from './ui'

/*
 * Envoltorio común. La cabecera no está centrada: el título ocupa siete de las
 * doce columnas por la izquierda y el subtítulo cae a la derecha alineado abajo,
 * así que ambos textos no comparten eje vertical ni línea de base.
 *
 * El ritmo entre secciones lo marca el espacio vertical. `muted` pinta el fondo
 * de superficie y se usa con cuentagotas —dos secciones en toda la página— para
 * que el ojo tenga dónde descansar sin recurrir a franjas de color.
 */
export default function Section({ id, eyebrow, title, subtitle, muted = false, children }) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-20 overflow-hidden py-16 md:py-24 ${
        muted ? 'bg-surface-2' : ''
      }`}
    >
      <div className="shell">
        <div className="grid gap-x-10 gap-y-6 lg:grid-cols-12 lg:items-end">
          <header className="reveal lg:col-span-7">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="display mt-5 text-[2.25rem] text-heading sm:text-[2.75rem] lg:text-[3.5rem]">
              {title}
            </h2>
          </header>

          {subtitle && (
            <p className="reveal leading-relaxed text-ink-soft lg:col-span-4 lg:col-start-9 lg:pb-2">
              {subtitle}
            </p>
          )}
        </div>

        <div className="mt-12 md:mt-16">{children}</div>
      </div>
    </section>
  )
}
