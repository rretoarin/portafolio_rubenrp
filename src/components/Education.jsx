import { EDUCATION } from '../data/content'
import { ArrowUpRight } from './icons'

// Credencial PUCP: dato verificable, por eso lleva el código y el enlace oficial.
export default function Education({ t }) {
  const e = t.about.education

  const facts = [
    { label: e.hoursLabel, value: EDUCATION.hours },
    { label: e.gradeLabel, value: EDUCATION.grade },
    { label: e.periodLabel, value: EDUCATION.period },
  ]

  return (
    <section
      aria-label={e.label}
      className="reveal mt-14 overflow-hidden rounded-lg border border-line md:mt-20"
    >
      <div className="grid gap-8 border-b border-line bg-surface p-7 md:grid-cols-[1.4fr_1fr] md:items-center md:gap-10 md:p-9">
        <div>
          <p className="eyebrow">{e.label}</p>
          <h3 className="mt-4 text-xl leading-snug font-normal tracking-tight text-bright text-balance md:text-2xl">
            {e.program}
          </h3>
          <p className="mt-3 text-sm text-soft">
            {EDUCATION.institution}
            <span className="text-muted"> · {e.faculty}</span>
          </p>
        </div>

        <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-md border border-line bg-line">
          {facts.map((fact) => (
            <div key={fact.label} className="bg-ink px-3 py-4 text-center">
              <dt className="eyebrow text-[0.625rem]">{fact.label}</dt>
              <dd className="mt-1.5 font-mono text-sm text-bright">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="p-7 md:p-9">
        <p className="eyebrow">{e.modulesLabel}</p>
        <ul className="mt-5 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
          {e.modules.map((mod, i) => (
            <li key={mod} className="flex gap-3 text-sm text-soft">
              <span className="font-mono text-xs text-muted tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              {mod}
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-line pt-6">
          <a
            href={EDUCATION.verifyUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="group inline-flex items-center gap-2 text-sm text-bright"
          >
            <span className="border-b border-line-strong pb-0.5 transition-colors group-hover:border-bright">
              {e.verify}
            </span>
            <ArrowUpRight
              width={14}
              height={14}
              className="text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
          <p className="font-mono text-xs text-muted">
            {e.codeLabel}: <span className="text-soft">{EDUCATION.verifyCode}</span>
          </p>
        </div>
      </div>
    </section>
  )
}
