import { PROFILE } from '../data/content'
import { ArrowUp, LinkedIn, Mail } from './icons'
import { Arc } from './ui'

const LINKS = ['about', 'projects', 'process', 'stack', 'contact']

export default function Footer({ t }) {
  return (
    <footer className="relative overflow-hidden border-t border-line pt-20 pb-10 md:pt-28">
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
            <p className="mt-6 font-mono text-sm text-muted">{t.footer.role}</p>

            <div className="mt-8 flex flex-wrap gap-2.5">
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
            <nav aria-label={t.nav.menu}>
              <ul className="flex flex-wrap gap-x-6 gap-y-3">
                {LINKS.map((id) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className="font-mono text-sm text-muted transition-colors hover:text-bright"
                    >
                      {t.nav[id]}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="card mt-7 px-6 py-6">
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

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-muted">
            © {new Date().getFullYear()} {PROFILE.name} · {t.footer.rights}
          </p>
          <a
            href="#top"
            aria-label={t.footer.top}
            className="flex size-9 items-center justify-center rounded-full border border-line-strong text-muted transition-colors hover:border-bright hover:text-bright"
          >
            <ArrowUp width={15} height={15} />
          </a>
        </div>
      </div>
    </footer>
  )
}
