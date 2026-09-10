import { Eyebrow } from './ui'

/*
 * Envoltorio común. La cabecera no está centrada: el título ocupa siete de las
 * doce columnas por la izquierda y el subtítulo cae a la derecha alineado abajo,
 * así que ambos textos no comparten eje vertical ni línea de base.
 *
 * El ritmo entre secciones lo marca el espacio vertical, pero medido: con
 * `py-24` quedaban unos 200px entre el final de una sección y el título de la
 * siguiente y se leía como un hueco, no como ritmo. `muted` pinta el fondo de
 * superficie y se usa con cuentagotas —dos secciones en toda la página— para que
 * el ojo tenga dónde descansar sin recurrir a franjas de color.
 */
export default function Section({ id, eyebrow, title, subtitle, muted = false, children }) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-16 overflow-hidden py-12 md:py-16 ${
        muted ? 'bg-surface-2' : ''
      }`}
    >
      <div className="shell">
        <div className="grid gap-x-10 gap-y-6 lg:grid-cols-12 lg:items-end">
          {/*
            La cabecera entra en el orden en que se lee —etiqueta, título,
            subtítulo— y no de una pieza. Es el mismo retardo escalonado en las
            cinco secciones, así que el sitio entero se mueve igual. En móvil el
            paso se acorta a la mitad: la cabecera cabe entera en pantalla y una
            cascada larga se nota mucho más.
          */}
          <header className="lg:col-span-7">
            <Eyebrow className="reveal">{eyebrow}</Eyebrow>
            <h2 className="reveal display mt-5 text-[2.25rem] text-heading delay-75 sm:text-[2.75rem] md:delay-100 lg:text-[3.5rem]">
              {title}
            </h2>
          </header>

          {subtitle && (
            <p className="reveal leading-relaxed text-ink-soft delay-100 md:delay-200 lg:col-span-4 lg:col-start-9 lg:pb-2">
              {subtitle}
            </p>
          )}
        </div>

        <div className="mt-10 md:mt-12">{children}</div>
      </div>
    </section>
  )
}
