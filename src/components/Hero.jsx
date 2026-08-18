import { PROFILE } from '../data/content'
import { ArrowRight } from './icons'

export default function Hero({ t }) {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-20"
    >
      {/* Halo tenue detrás del titular; mantiene el negro sin que sea plano. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/3 left-1/2 size-[46rem] -translate-x-1/2 rounded-full bg-white/[0.045] blur-[130px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent"
      />

      <div className="shell relative">
        <p className="reveal flex items-center gap-2.5 font-mono text-xs tracking-widest text-soft uppercase">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-bright opacity-60" />
            <span className="relative inline-flex size-1.5 rounded-full bg-bright" />
          </span>
          {t.hero.status}
        </p>

        <h1 className="reveal mt-8 text-[2.75rem] leading-[0.98] font-light tracking-[-0.045em] text-balance sm:text-6xl md:text-7xl lg:text-[5.25rem]">
          {t.hero.headline.map((line, i) => (
            <span
              key={line}
              className="block"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              {line}
            </span>
          ))}
        </h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-end">
          <p className="reveal max-w-xl text-base leading-relaxed text-soft md:text-lg">
            {t.hero.lead}
          </p>

          <div className="reveal flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-bright px-6 py-3 text-sm font-medium text-ink transition-opacity hover:opacity-85"
            >
              {t.hero.ctaPrimary}
              <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={`mailto:${PROFILE.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 text-sm text-soft transition-colors hover:border-bright hover:text-bright"
            >
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>

        <dl className="mt-16 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3 md:mt-24">
          {t.hero.metrics.map((metric) => (
            <div key={metric.value} className="reveal bg-ink px-6 py-6">
              <dt className="text-lg font-medium tracking-tight text-bright">
                {metric.value}
              </dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-muted">
                {metric.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
