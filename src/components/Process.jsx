import Section from './Section'

/*
 * Proceso y acompañamiento en una sola sección, no en dos. Cinco pasos en una
 * fila: el recorrido completo se lee de un vistazo, sin scroll.
 *
 * El quinto va destacado a propósito. "No te dejamos solo después del
 * lanzamiento" es el argumento comercial que más separa a RuberpDev de quien
 * entrega un proyecto y desaparece, así que no puede parecer un paso más.
 */
export default function Process({ t }) {
  const ultimo = t.process.steps.length - 1

  return (
    <Section
      id="process"
      eyebrow={t.process.eyebrow}
      title={t.process.title}
      subtitle={t.process.subtitle}
    >
      {/*
        PRUEBA «rectángulos»: cada paso en su caja con el número en un círculo
        lleno. En móvil el círculo va a la izquierda del texto; en escritorio,
        encima, para que quepan los cinco en una fila. El quinto conserva su
        señal: caja con filete y fondo de acento.
      */}
      <ol className="stagger relative grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {t.process.steps.map((step, i) => {
          const destacado = i === ultimo
          return (
            <li
              key={i}
              className={`reveal block box flex gap-4 p-6 lg:flex-col ${
                destacado ? 'box-accent sm:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <span aria-hidden className="num-dot">
                {i + 1}
              </span>
              <div>
                <h3
                  className={`block-title display-light text-lg leading-snug ${
                    destacado ? 'text-accent' : 'text-heading'
                  }`}
                >
                  {step.title}
                </h3>
                <p
                  className={`mt-2 text-sm leading-relaxed ${
                    destacado ? 'text-ink' : 'text-ink-soft'
                  }`}
                >
                  {step.text}
                </p>
              </div>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
