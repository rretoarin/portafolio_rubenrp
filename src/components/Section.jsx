// Envoltorio común de sección: garantiza que todas compartan el mismo ritmo
// vertical, el mismo encabezado numerado y la misma línea divisoria.
export default function Section({ id, index, eyebrow, title, subtitle, children }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-line py-20 md:py-28">
      <div className="shell">
        <header className="reveal max-w-2xl">
          <p className="eyebrow flex items-center gap-3">
            <span>{index}</span>
            <span aria-hidden className="h-px w-8 bg-line-strong" />
            <span>{eyebrow}</span>
          </p>
          <h2 className="mt-5 text-3xl font-light tracking-[-0.035em] text-balance md:text-[2.75rem] md:leading-[1.08]">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-base leading-relaxed text-muted">{subtitle}</p>
          )}
        </header>

        <div className="mt-12 md:mt-16">{children}</div>
      </div>
    </section>
  )
}
