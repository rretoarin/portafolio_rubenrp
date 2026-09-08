import { PROFILE, whatsappUrl } from '../data/content'
import { ArrowUp, LinkedIn, Mail, WhatsApp } from './icons'
import { Arc } from './ui'

const LINKS = ['services', 'projects', 'process', 'about', 'stack', 'contact']

export default function Footer({ t }) {
  return (
    <footer className="relative overflow-hidden border-t border-line pt-20 pb-[calc(2.5rem+env(safe-area-inset-bottom))] md:pt-28">
      <Arc className="-bottom-[38rem] -left-[22rem] size-[60rem]" />

      <div className="shell relative">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-16">
          <div className="reveal">
            <h2 className="display text-[3rem] sm:text-[4.5rem] md:text-[6rem] lg:text-[7rem]">
              {PROFILE.nameLines.map((line, i) => (
                <span key={line} className={i === 1 ? 'block pl-[0.6em]' : 'block'}>
                  {line}
                </span>
              ))}
            </h2>
            <p className="mt-6 font-mono text-sm text-soft">{t.footer.role}</p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
              {t.footer.tagline}
            </p>

            {/* Mismo orden y misma jerarquía que en el hero: WhatsApp primero. */}
            <div className="mt-8 flex flex-wrap gap-2.5">
              <a
                href={whatsappUrl(t.contact.whatsappMessage)}
                target="_blank"
                rel="noreferrer noopener"
                className="pill pill-strong"
              >
                <WhatsApp width={14} height={14} />
                WhatsApp
              </a>
              <a href={`mailto:${PROFILE.email}`} className="pill">
                <Mail width={14} height={14} />
                Email
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

          <div className="reveal">
            <div className="card px-6 py-6">
              <p className="font-mono text-sm text-bright">{t.footer.site.label}</p>
              <ul className="mt-4 space-y-1.5">
                {t.footer.site.lines.map((line, i) => (
                  <li key={line} className="font-mono text-xs text-muted">
                    {line}
                    {i < t.footer.site.lines.length - 1 && (
                      <span className="text-line-strong"> /</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/*
          Cierre del pie: primero los atajos a todas las secciones, debajo el
          aviso legal y el botón de volver arriba. Los enlaces llevan altura
          real de 44px y no la utilidad `.tap`: pegados entre sí, los
          pseudo-elementos de `.tap` se solapan y el toque cae en el vecino.
        */}
        <div className="reveal mt-16 border-t border-line pt-6">
          <nav aria-label={t.nav.menu}>
            <ul className="flex flex-wrap gap-x-7 gap-y-1">
              {LINKS.map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="flex min-h-11 items-center font-mono text-sm text-muted transition-colors hover:text-bright"
                  >
                    {t.nav[id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-4 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-xs text-muted">
              © {new Date().getFullYear()} {PROFILE.name} · {t.footer.rights}
            </p>
            <a
              href="#top"
              aria-label={t.footer.top}
              className="flex size-11 items-center justify-center rounded-full border border-line-strong text-muted transition-colors hover:border-bright hover:text-bright"
            >
              <ArrowUp width={15} height={15} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
