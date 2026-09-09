import { PROFILE, whatsappUrl } from '../data/content'
import { ArrowUp, LinkedIn, Mail, WhatsApp } from './icons'

// Una sola columna de atajos: seis enlaces en dos columnas de tres eran más
// rejilla que ayuda, y el pie de una marca personal no es un mapa del sitio.
const LINKS = ['services', 'styles', 'projects', 'process', 'contact']

export default function Footer({ t }) {
  return (
    <footer className="relative overflow-hidden border-t border-line pt-12 pb-[calc(2.5rem+env(safe-area-inset-bottom))] md:pt-16">
      <div className="shell relative">
        {/*
          Sin nombre gigante. El cierre de marca ya lo hace la sección de
          contacto; repetirlo aquí sólo añadía media pantalla de altura.
        */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:gap-x-10 lg:grid-cols-3">
          <nav className="reveal row-span-2 lg:row-span-1" aria-label={t.nav.menu}>
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

          <div className="reveal">
            <p className="eyebrow eyebrow-plain">{t.footer.contact}</p>
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
                  className="flex min-h-11 items-start gap-2.5 py-2 text-sm text-ink-soft transition-colors hover:text-ink"
                >
                  <Mail width={15} height={15} className="text-ink-soft" />
                  <span className="break-all">{PROFILE.email}</span>
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

          </div>

          <div className="reveal">
            <p className="eyebrow eyebrow-plain">{t.footer.site.label}</p>
            <ul className="mt-4 space-y-1.5">
              {t.footer.site.lines.map((line) => (
                <li key={line} className="text-sm text-ink-soft">
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="reveal mt-10 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          {/*
            El cierre de marca es esta línea y nada más. El nombre a gran escala
            que había aquí ocupaba media pantalla sin decir nada nuevo.
          */}
          <p className="text-xs text-ink-soft">
            <span className="font-bold text-ink">Ruben</span>
            <span className="font-bold text-accent">Dev</span>
            <span> · © {new Date().getFullYear()} {PROFILE.name} · {t.footer.rights}</span>
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
