import Section from './Section'
import { ArrowRight } from './icons'

/*
 * Beneficios, no métricas. Aquí no hay un solo número: inventarlos sería lo
 * fácil y lo primero que un cliente con criterio detecta como relleno. Lo que
 * se enseña es el salto —de una situación a otra—, que es lo que de verdad
 * compra quien contrata esto.
 *
 * Una línea por salto, con la flecha como único elemento gráfico. Cero tarjetas.
 */
export default function Outcomes({ t }) {
  return (
    <Section
      id="outcomes"
      eyebrow={t.outcomes.eyebrow}
      title={t.outcomes.title}
      subtitle={t.outcomes.subtitle}
    >
      <div className="stagger">
        {/* Cabecera de la tabla: sólo en pantallas donde hay dos columnas. */}
        <div className="hidden grid-cols-[1fr_auto_1fr] items-center gap-x-8 pb-4 md:grid">
          <p className="eyebrow eyebrow-plain">{t.outcomes.fromLabel}</p>
          <span aria-hidden className="w-9" />
          <p className="eyebrow eyebrow-plain">{t.outcomes.toLabel}</p>
        </div>

        <ul>
          {t.outcomes.items.map((item, i) => (
            <li
              key={i}
              className="reveal block-top grid grid-cols-[1fr_auto_1fr] items-center gap-x-4 border-t border-line py-6 md:gap-x-8 md:py-8"
            >
              <span className="display-light text-base text-ink-soft sm:text-xl md:text-2xl">
                {item.from}
              </span>

              <span
                aria-hidden
                className="flex size-8 shrink-0 items-center justify-center rounded-full border border-line text-accent md:size-9"
              >
                <ArrowRight width={15} height={15} />
              </span>

              <span className="block-title display-light text-base text-ink sm:text-xl md:text-2xl">
                {item.to}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
