import { PROFILE } from '../data/content'
import Section from './Section'
import { Arc, Tick } from './ui'

/*
 * Humaniza la marca sin convertirse en un CV. El retrato va en arco —
 * redondeado arriba, recto abajo — y desplazado respecto al texto: la persona
 * aparece, pero la cita de negocio sigue siendo lo primero que se lee.
 */
export default function About({ t }) {
  return (
    <Section id="about" eyebrow={t.about.eyebrow} title={t.about.title}>
      <Arc className="-bottom-[30rem] -right-[26rem] size-[54rem]" />

      <div className="relative grid gap-x-10 gap-y-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <blockquote className="reveal border-l-2 border-ink pl-6 md:pl-8">
            <p className="display-light text-[1.5rem] sm:text-[1.875rem] lg:text-[2.125rem]">
              {t.about.quote}
            </p>
          </blockquote>

          <div className="reveal mt-10 max-w-xl space-y-5">
            {t.about.body.map((paragraph, i) => (
              <p key={i} className="text-lg leading-relaxed text-ink-soft">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 lg:col-start-9">
          <div className="reveal ml-auto w-[min(15rem,66%)] lg:ml-0 lg:w-full">
            {PROFILE.photo ? (
              <img
                src={PROFILE.photo}
                alt={PROFILE.name}
                width="400"
                height="400"
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full rounded-t-full rounded-b-2xl border border-line bg-surface object-cover object-top"
              />
            ) : (
              /* Hueco listo para el retrato el día que haya uno. */
              <div className="aspect-[4/5] w-full rounded-t-full rounded-b-2xl border border-dashed border-edge bg-surface" />
            )}
            <p className="display-light mt-5 text-xl">{PROFILE.name}</p>
            <p className="eyebrow eyebrow-plain mt-1.5">{t.footer.role}</p>
          </div>

          <div className="reveal mt-10 flex gap-5">
            <Tick className="shrink-0 self-stretch pt-1.5" />
            <p className="text-sm leading-relaxed text-ink-soft">{t.about.note}</p>
          </div>
        </div>
      </div>
    </Section>
  )
}
