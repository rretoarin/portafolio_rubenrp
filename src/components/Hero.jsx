import { PROFILE, whatsappUrl } from '../data/content'
import { ArrowRight, LinkedIn, Mail, WhatsApp } from './icons'
import { Arc } from './ui'

function Metrics({ metrics, className = '' }) {
  return (
    <dl className={`stagger grid gap-3 ${className}`}>
      {metrics.map((metric, i) => (
        <div key={i} className="reveal card px-5 py-5">
          <dt className="font-mono text-base text-bright">{metric.value}</dt>
          <dd className="mt-1.5 text-sm leading-relaxed text-muted">{metric.label}</dd>
        </div>
      ))}
    </dl>
  )
}

export default function Hero({ t }) {
  return (
    <section
      id="top"
      className="hero-fill relative flex min-h-svh items-center overflow-hidden pt-32 pb-20 md:pt-40"
    >
      <Arc className="-top-[34rem] -right-[26rem] size-[62rem]" />
      <Arc className="-bottom-[46rem] -left-[30rem] size-[72rem]" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/4 left-1/2 size-[44rem] -translate-x-1/2 rounded-full bg-white/[0.05] blur-[140px]"
      />

      <div className="shell relative">
        <div className="reveal flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs tracking-widest uppercase">
          <span className="flex items-center gap-2.5 text-soft">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-cream opacity-60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-cream" />
            </span>
            {t.hero.status}
          </span>
          <span aria-hidden className="hidden h-3 w-px bg-line-strong sm:block" />
          <span className="text-muted">{t.hero.responseTime}</span>
        </div>

        <h1 className="reveal display mt-7 text-[2.25rem] text-balance sm:text-[3.5rem] md:text-[5rem] lg:text-[6.5rem]">
          {t.hero.headline.map((line, i) => (
            <span key={line} className="block" style={{ transitionDelay: `${i * 90}ms` }}>
              {line}
            </span>
          ))}
        </h1>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div className="reveal">
            <div className="flex items-start gap-5">
              {PROFILE.photo && (
                <img
                  src={PROFILE.photo}
                  alt={PROFILE.name}
                  width="275"
                  height="275"
                  fetchPriority="high"
                  className="size-16 shrink-0 rounded-full border border-line-strong object-cover grayscale transition-[filter,transform] duration-500 hover:scale-105 hover:grayscale-0 md:size-20"
                />
              )}
              <p className="max-w-lg leading-relaxed text-soft md:text-lg">{t.hero.lead}</p>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="btn-primary group inline-flex items-center gap-3 rounded-full bg-bright py-3.5 pr-3.5 pl-7 font-mono text-sm text-ink transition-opacity hover:opacity-85"
              >
                {t.hero.ctaPrimary}
                <span className="flex size-8 items-center justify-center rounded-full bg-ink text-bright">
                  <ArrowRight width={15} height={15} />
                </span>
              </a>

              <a href={`mailto:${PROFILE.email}`} className="pill py-3.5 pr-7 pl-7 text-sm">
                {t.hero.ctaSecondary}
              </a>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-2.5">
              <a href={`mailto:${PROFILE.email}`} className="pill">
                <Mail width={14} height={14} />
                Email
              </a>
              <a
                href={whatsappUrl(t.contact.whatsappMessage)}
                target="_blank"
                rel="noreferrer noopener"
                className="pill"
              >
                <WhatsApp width={14} height={14} />
                WhatsApp
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="pill"
              >
                <LinkedIn width={14} height={14} />
                LinkedIn
              </a>
            </div>
          </div>

          <Metrics
            metrics={t.hero.metrics}
            className="self-end sm:grid-cols-3 lg:grid-cols-1"
          />
        </div>
      </div>
    </section>
  )
}
