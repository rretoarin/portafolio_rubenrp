import { SectionLabel } from './ui'

// Envoltorio común de sección: mismo ritmo vertical y mismo encabezado en todas.
export default function Section({ id, eyebrow, title, subtitle, children }) {
  return (
    <section id={id} className="relative scroll-mt-24 py-20 md:py-28">
      <div className="shell">
        <SectionLabel className="reveal text-center">{eyebrow}</SectionLabel>

        <header className="reveal mt-10 max-w-3xl md:mt-14">
          <h2 className="display text-[1.625rem] text-balance sm:text-[2rem] md:text-[2.5rem]">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-5 max-w-xl leading-relaxed text-muted">{subtitle}</p>
          )}
        </header>

        <div className="mt-12 md:mt-16">{children}</div>
      </div>
    </section>
  )
}
