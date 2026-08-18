import Section from './Section'
import { ArrowRight } from './icons'
import { Arc } from './ui'

export default function Services({ t }) {
  return (
    <Section
      id="services"
      eyebrow={t.services.eyebrow}
      title={t.services.title}
      subtitle={t.services.subtitle}
    >
      <Arc className="-top-[28rem] -right-[30rem] size-[64rem]" />

      <div className="stagger relative grid gap-3 md:grid-cols-3">
        {t.services.items.map((item, i) => (
          <article key={item.title} className="reveal card flex flex-col p-7 md:p-8">
            <span className="font-mono text-xs tracking-widest text-muted">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-5 font-mono text-base leading-snug text-bright">
              {item.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted">{item.text}</p>
          </article>
        ))}
      </div>

      {/* La lista de rubros es la prueba de "para cualquier tipo de negocio". */}
      <div className="reveal relative mt-12">
        <p className="eyebrow">{t.services.sectorsLabel}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {t.services.sectors.map((sector) => (
            <li key={sector} className="pill">
              {sector}
            </li>
          ))}
        </ul>
      </div>

      <div className="reveal relative mt-10">
        <a
          href="#contact"
          className="btn-primary group inline-flex items-center gap-3 rounded-full bg-bright py-3.5 pr-3.5 pl-7 font-mono text-sm text-ink transition-opacity hover:opacity-85"
        >
          {t.services.cta}
          <span className="flex size-8 items-center justify-center rounded-full bg-ink text-bright">
            <ArrowRight width={15} height={15} />
          </span>
        </a>
      </div>
    </Section>
  )
}
