import { useEffect, useState } from 'react'
import { PROFILE } from '../data/content'
import { ArrowUpRight, Check, Copy, LinkedIn, Mail } from './icons'
import { Arc, SectionLabel } from './ui'

export default function Contact({ t }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const id = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(id)
  }, [copied])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email)
      setCopied(true)
    } catch {
      // Sin permiso de portapapeles el mailto sigue siendo la vía válida.
      window.location.href = `mailto:${PROFILE.email}`
    }
  }

  return (
    <section id="contact" className="relative scroll-mt-24 py-20 md:py-28">
      <Arc className="-top-[24rem] left-1/2 size-[68rem] -translate-x-1/2" />

      <div className="shell relative">
        <SectionLabel className="reveal text-center">{t.contact.eyebrow}</SectionLabel>

        <div className="mt-10 grid gap-12 md:mt-14 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div className="reveal">
            <h2 className="display text-[2rem] text-balance sm:text-[2.75rem] md:text-[3.5rem]">
              {t.contact.title}
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-soft">{t.contact.body}</p>

            <a
              href={`mailto:${PROFILE.email}`}
              className="group mt-9 inline-flex items-center gap-3 rounded-full bg-bright py-3.5 pr-3.5 pl-7 font-mono text-sm text-ink transition-opacity hover:opacity-85"
            >
              {t.contact.cta}
              <span className="flex size-8 items-center justify-center rounded-full bg-ink text-bright">
                <Mail width={14} height={14} />
              </span>
            </a>
          </div>

          <ul className="reveal grid gap-3 self-start">
            <li className="card flex items-center justify-between gap-4 px-6 py-6">
              <div className="min-w-0">
                <p className="eyebrow">{t.contact.emailLabel}</p>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="mt-2.5 block truncate font-mono text-sm text-bright underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-bright md:text-base"
                >
                  {PROFILE.email}
                </a>
              </div>
              <button
                type="button"
                onClick={copyEmail}
                aria-label={t.contact.copy}
                className="flex size-10 shrink-0 items-center justify-center rounded-full border border-line-strong text-muted transition-colors hover:border-bright hover:text-bright"
              >
                {copied ? <Check width={15} height={15} /> : <Copy width={15} height={15} />}
              </button>
              <span aria-live="polite" className="sr-only">
                {copied ? t.contact.copied : ''}
              </span>
            </li>

            <li className="card px-6 py-6">
              <p className="eyebrow">{t.contact.linkedinLabel}</p>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="group mt-2.5 inline-flex items-center gap-2.5 font-mono text-sm text-bright md:text-base"
              >
                <LinkedIn width={15} height={15} className="text-muted" />
                <span className="underline decoration-line-strong underline-offset-4 transition-colors group-hover:decoration-bright">
                  {PROFILE.linkedinLabel}
                </span>
                <ArrowUpRight
                  width={14}
                  height={14}
                  className="text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
