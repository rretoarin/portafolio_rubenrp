import { STACK } from '../data/content'
import Section from './Section'

/*
 * Las tecnologías, al final y en pequeño. Van después de Sobre mí porque son
 * soporte: importan para dar confianza técnica, no para vender.
 *
 * Texto en una línea, sin logotipos ni rejilla de tarjetas — eso es justo lo que
 * devolvería al sitio el aire de portafolio. Y sólo las que están de verdad en
 * los dos casos o en este mismo sitio: aquí no se rellena con lo que quedaría
 * bien en un currículum.
 */
export default function Stack({ t }) {
  return (
    <Section id="stack" eyebrow={t.stack.eyebrow} title={t.stack.title}>
      <div className="grid gap-x-14 gap-y-8 lg:grid-cols-12 lg:items-start">
        <p className="reveal max-w-xl leading-relaxed text-ink-soft lg:col-span-5">
          {t.stack.text}
        </p>

        <div className="reveal lg:col-span-6 lg:col-start-7">
          <ul className="flex flex-wrap items-center gap-x-2.5 gap-y-3">
            {STACK.map((item) => (
              <li key={item} className="tag normal-case tracking-normal">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-ink-soft">{t.stack.note}</p>
        </div>
      </div>
    </Section>
  )
}
