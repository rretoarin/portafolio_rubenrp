import Section from './Section'
import { Arc } from './ui'

/*
 * Línea temporal, no tarjetas: cuatro filas separadas por un filete, con el
 * número a gran escala a la izquierda. Es la sección que tiene que leerse como
 * un método ordenado, y una rejilla de cajas lo convertiría en otro catálogo.
 */
export default function Process({ t }) {
  return (
    <Section
      id="process"
      eyebrow={t.process.eyebrow}
      title={t.process.title}
      subtitle={t.process.subtitle}
    >
      <Arc className="-top-[30rem] -right-[32rem] size-[66rem]" />

      <ol className="stagger relative border-t border-line">
        {t.process.steps.map((step, i) => (
          <li
            key={i}
            className="reveal grid gap-x-8 gap-y-3 border-b border-line py-8 md:grid-cols-[7rem_1fr] md:py-10"
          >
            <span
              aria-hidden
              className="display text-[2rem] leading-none text-line-strong md:text-[3rem]"
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="max-w-2xl">
              <h3 className="font-mono text-lg text-bright md:text-xl">{step.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
