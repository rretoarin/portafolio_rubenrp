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
    <section aria-label={e.label} className="reveal card relative mt-14 md:mt-20">
      <div className="grid gap-8 border-b border-line p-7 md:grid-cols-[1.4fr_1fr] md:items-center md:gap-10 md:p-9">
        <div>
          <p className="eyebrow">{e.label}</p>
          <h3 className="display mt-5 text-lg leading-snug text-balance md:text-2xl">
            {e.program}
          </h3>
          <p className="mt-4 text-sm text-soft">
            {EDUCATION.institution}
            <span className="text-muted"> · {e.faculty}</span>
          </p>
        </div>

        <dl className="grid grid-cols-3 gap-2">
          {facts.map((fact) => (
            <div
              key={fact.label}
              className="rounded-[var(--radius-tile)] border border-line bg-ink px-2 py-4 text-center"
            >
              <dt className="eyebrow text-[0.5625rem]">{fact.label}</dt>
              <dd className="mt-2 font-mono text-sm text-bright">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="p-7 md:p-9">
        <p className="eyebrow">{e.modulesLabel}</p>
        <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {e.modules.map((mod, i) => (
            <li key={mod} className="flex gap-3.5 text-sm text-soft">
              <span className="font-mono text-xs text-muted tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              {mod}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-line pt-7">
          <a
            href={EDUCATION.verifyUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="pill"
          >
            {e.verify}
            <ArrowUpRight width={13} height={13} />
          </a>
          <span className="pill">
            {e.codeLabel}: <span className="text-bright">{EDUCATION.verifyCode}</span>
          </span>
        </div>
      </div>
    </section>
  )
}
