import Section from './Section'
import { ArrowRight } from './icons'
import { Arc, Check } from './ui'

/*
 * Cuatro formas que suele tomar la solución. Cada una cierra con la línea de
 * ganancia (`gain`): es lo que convierte una descripción técnica en un motivo
 * de negocio, y va marcada con un check para que se lea de un vistazo.
 *
 * Dos columnas y nada más. Antes eran seis entradas en una rejilla de anchos
 * alternos, y con tanto reparto el ojo no sabía por dónde empezar.
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

      <div className="stagger relative grid max-w-5xl gap-x-16 gap-y-12 sm:grid-cols-2">
        {t.services.items.map((item, i) => (
          <article key={i} className="reveal block">
            <div className="flex items-baseline gap-4">
              <span className="block-num text-xs font-semibold tracking-widest">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span aria-hidden className="block-rule h-px flex-1 bg-line" />
            </div>

            <h3 className="block-title display-light mt-5 text-xl md:text-2xl">{item.title}</h3>
            <p className="mt-3 max-w-lg leading-relaxed text-ink-soft">{item.text}</p>

            <p className="mt-4 flex max-w-lg items-start gap-2.5 text-sm leading-relaxed text-ink">
              <Check className="mt-px text-ink" />
              {item.gain}
            </p>
          </article>
        ))}
      </div>

      <div className="reveal relative mt-16 border-t border-line pt-8 md:mt-20">
        <a href="#contact" className="btn-primary magnetic group pr-3 pl-7">
          {t.services.cta}
          <span className="flex size-9 items-center justify-center rounded-full bg-page text-ink transition-transform group-hover:translate-x-0.5">
            <ArrowRight width={16} height={16} />
          </span>
        </a>
      </div>
    </Section>
  )
}
