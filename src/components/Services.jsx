import Section from './Section'
import { ArrowRight } from './icons'
import { Arc, Check } from './ui'

/*
 * Cuatro formas que suele tomar la solución. Cada una cierra con la línea de
 * ganancia (`gain`): es lo que convierte una descripción técnica en un motivo de
 * negocio, y va marcada con un check para que se lea de un vistazo.
 *
 * Dos columnas y nada más. La tecnología no aparece: aquí se habla de lo que el
 * cliente consigue, no de con qué está hecho.
 */
export default function Services({ t }) {
  return (
    <Section
      id="services"
      eyebrow={t.services.eyebrow}
      title={t.services.title}
      subtitle={t.services.subtitle}
    >
      <Arc className="-top-[30rem] -right-[30rem] size-[56rem]" />

      <div className="stagger relative grid gap-x-16 gap-y-12 md:grid-cols-2">
        {t.services.items.map((item, i) => (
          <article key={i} className="reveal block">
            <div className="flex items-baseline gap-4">
              <span className="block-num text-xs font-bold tracking-widest">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span aria-hidden className="block-rule h-px flex-1 bg-line" />
            </div>

            <h3 className="block-title display-light mt-5 text-2xl md:text-[1.75rem]">
              {item.title}
            </h3>
            <p className="mt-3 max-w-lg leading-relaxed text-ink-soft">{item.text}</p>

            <p className="mt-5 flex max-w-lg items-start gap-2.5 leading-relaxed text-ink">
              <Check className="mt-0.5 text-accent" />
              {item.gain}
            </p>
          </article>
        ))}
      </div>

      <div className="reveal relative mt-14 border-t border-line pt-8">
        <a href="#contact" className="btn-primary magnetic group pr-3 pl-7">
          {t.services.cta}
          <span className="flex size-9 items-center justify-center rounded-full btn-badge transition-transform group-hover:translate-x-0.5">
            <ArrowRight width={16} height={16} />
          </span>
        </a>
      </div>
    </Section>
  )
}
