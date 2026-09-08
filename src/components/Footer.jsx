import { PROFILE, whatsappUrl } from '../data/content'
import { ArrowUp, LinkedIn, Mail, WhatsApp } from './icons'

// Una sola columna de atajos: seis enlaces en dos columnas de tres eran más
// rejilla que ayuda, y el pie de una marca personal no es un mapa del sitio.
const LINKS = ['problems', 'services', 'projects', 'process', 'about', 'contact']

export default function Footer({ t }) {
  return (
    <footer className="relative overflow-hidden border-t border-line pt-16 pb-[calc(2.5rem+env(safe-area-inset-bottom))] md:pt-24">
      <div className="shell relative">
        <div className="grid gap-x-10 gap-y-12 lg:grid-cols-12">
          <div className="reveal lg:col-span-5">
            {/* La segunda línea sangra: el nombre entra en diagonal, no en bloque. */}
            <h2 className="display text-[2.75rem] sm:text-[3.5rem] lg:text-[4rem]">
              {PROFILE.nameLines.map((line, i) => (
                <span key={line} className={i === 1 ? 'block pl-[0.4em]' : 'block'}>
                  {line}
                </span>
              ))}
            </h2>
            <p className="eyebrow eyebrow-plain mt-6">{t.footer.role}</p>
            <p className="mt-3 max-w-sm leading-relaxed text-ink-soft">{t.footer.tagline}</p>
          </div>

          <nav className="reveal lg:col-span-3" aria-label={t.nav.menu}>
            <ul>
              {LINKS.map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="nav-link nav-link-plain flex min-h-11 items-center text-sm text-ink-soft transition-colors hover:text-ink"
                  >
                    {t.nav[id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="reveal lg:col-span-4">
            <p className="eyebrow eyebrow-plain">{t.nav.contact}</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={whatsappUrl(t.contact.whatsappMessage)}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex min-h-11 items-center gap-2.5 text-sm text-ink-soft transition-colors hover:text-ink"
                >
                  <WhatsApp width={15} height={15} className="text-ink" />
                  {PROFILE.whatsappDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="flex min-h-11 items-center gap-2.5 text-sm text-ink-soft transition-colors hover:text-ink"
                >
                  <Mail width={15} height={15} className="text-ink-soft" />
                  <span className="truncate">{PROFILE.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex min-h-11 items-center gap-2.5 text-sm text-ink-soft transition-colors hover:text-ink"
                >
                  <LinkedIn width={15} height={15} className="text-ink-soft" />
                  {PROFILE.linkedinLabel}
                </a>
              </li>
            </ul>

            <ul className="mt-6 space-y-1">
              {t.footer.site.lines.map((line) => (
                <li key={line} className="text-xs text-ink-soft">
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="reveal mt-16 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-semibold text-ink-soft">
            © {new Date().getFullYear()} {PROFILE.name} · {t.footer.rights}
          </p>
          <a
            href="#top"
            aria-label={t.footer.top}
            className="flex size-11 items-center justify-center rounded-full border border-edge text-ink-soft transition-colors hover:border-ink hover:text-ink"
          >
            <ArrowUp width={15} height={15} />
          </a>
        </div>
      </div>
    </footer>
  )
}
