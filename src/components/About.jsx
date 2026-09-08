import Section from './Section'
import { Arc } from './ui'

export default function About({ t }) {
  return (
    <Section id="about" eyebrow={t.about.eyebrow} title={t.about.title}>
      <Arc className="-top-[20rem] -left-[34rem] size-[64rem]" />

      <div className="relative grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          {/*
           * La frase con más peso comercial de la sección: es el argumento por
           * el que un cliente elige a una persona y no a tres proveedores. Va
           * en display y con filete lateral para que se lea antes que el resto.
           */}
          <blockquote className="reveal border-l border-line-strong pl-6 md:pl-8">
            <p className="display text-xl text-balance text-bright sm:text-2xl md:text-[1.75rem]">
              {t.about.quote}
            </p>
          </blockquote>

          <div className="reveal mt-8 space-y-5">
            {t.about.body.map((paragraph, i) => (
              <p
                key={i}
                className={
                  i === 0 ? 'leading-relaxed text-soft md:text-lg' : 'leading-relaxed text-soft'
                }
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* El alcance real del trabajo, enumerado sin adornos. */}
          <div className="reveal mt-9">
            <p className="eyebrow">{t.about.scopeLabel}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {t.about.scope.map((item) => (
                <li key={item} className="pill">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <ul className="stagger grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {t.about.pillars.map((pillar, i) => (
              <li key={i} className="reveal card px-6 py-5">
                <h3 className="font-mono text-sm text-bright">{pillar.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{pillar.text}</p>
              </li>
            ))}
          </ul>

          {/*
           * Formación y herramientas: contexto, no argumento de venta. Por eso
           * va al pie, en cuerpo pequeño y detrás de un filete.
           */}
          <p className="reveal mt-8 border-t border-line pt-6 text-xs leading-relaxed text-muted sm:text-[0.8125rem]">
            {t.about.note}
          </p>
        </div>
      </div>
    </Section>
  )
}
