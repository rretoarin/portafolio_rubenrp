import Section from './Section'
import { Browser, Code, Gear, Link } from './icons'
import { Arc } from './ui'

// Mismo orden que `services.items` en content.js.
const ICONOS = [Browser, Code, Gear, Link]

/*
 * Cuatro soluciones, cuatro columnas, dos líneas cada una. Sin tarjetas, sin
 * bordes y sin la línea de ganancia que había antes: el beneficio ya está dentro
 * de la propia descripción, y repetirlo alargaba la sección al doble.
 *
 * Aquí no aparece ni una tecnología. El cliente compra el resultado.
 */
export default function Services({ t }) {
  return (
    <Section
      id="services"
      eyebrow={t.services.eyebrow}
      title={t.services.title}
      subtitle={t.services.subtitle}
    >
      <Arc className="-top-[28rem] -right-[28rem] size-[52rem]" />

      <div className="stagger relative grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {t.services.items.map((item, i) => {
          const Icono = ICONOS[i]
          return (
            <article key={i} className="reveal block-top border-t border-line pt-6">
              <Icono width={26} height={26} className="text-accent" aria-hidden />
              <h3 className="block-title display-light mt-5 text-xl">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-soft">{item.text}</p>
            </article>
          )
        })}
      </div>
    </Section>
  )
}
