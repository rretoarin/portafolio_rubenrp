import { useEffect, useState } from 'react'
import { PROFILE } from '../data/content'
import { ArrowUpRight, Check, Copy, LinkedIn, Mail } from './icons'

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
    <section
      id="contact"
      className="scroll-mt-24 border-t border-line py-20 md:py-28"
    >
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div className="reveal">
            <p className="eyebrow flex items-center gap-3">
              <span>05</span>
              <span aria-hidden className="h-px w-8 bg-line-strong" />
              <span>{t.contact.eyebrow}</span>
            </p>
            <h2 className="mt-5 text-3xl font-light tracking-[-0.035em] text-balance md:text-[3rem] md:leading-[1.05]">
              {t.contact.title}
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-soft">{t.contact.body}</p>

            <a
              href={`mailto:${PROFILE.email}`}
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-bright px-6 py-3 text-sm font-medium text-ink transition-opacity hover:opacity-85"
            >
              <Mail width={15} height={15} />
              {t.contact.cta}
            </a>
          </div>

          <ul className="reveal grid gap-px self-start overflow-hidden rounded-lg border border-line bg-line">
            <li className="flex items-center justify-between gap-4 bg-ink px-6 py-6">
              <div className="min-w-0">
                <p className="eyebrow">{t.contact.emailLabel}</p>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="mt-2 block truncate text-base text-bright underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-bright"
                >
                  {PROFILE.email}
                </a>
              </div>
              <button
                type="button"
                onClick={copyEmail}
                aria-label={t.contact.copy}
                className="flex size-9 shrink-0 items-center justify-center rounded-full border border-line-strong text-muted transition-colors hover:border-bright hover:text-bright"
              >
                {copied ? <Check width={15} height={15} /> : <Copy width={15} height={15} />}
              </button>
              <span aria-live="polite" className="sr-only">
                {copied ? t.contact.copied : ''}
              </span>
            </li>

            <li className="bg-ink px-6 py-6">
              <p className="eyebrow">{t.contact.linkedinLabel}</p>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="group mt-2 inline-flex items-center gap-2 text-base text-bright"
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
