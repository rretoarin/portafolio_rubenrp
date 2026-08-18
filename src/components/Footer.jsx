import { PROFILE } from '../data/content'
import { ArrowUp } from './icons'

export default function Footer({ t }) {
  return (
    <footer className="border-t border-line py-10">
      <div className="shell flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-bright">
            {PROFILE.name} <span className="text-muted">— {t.footer.role}</span>
          </p>
          <p className="mt-1.5 font-mono text-xs text-muted">
            © {new Date().getFullYear()} · {t.footer.rights}
          </p>
        </div>

        <div className="flex items-center gap-5">
          <p className="hidden font-mono text-xs text-muted sm:block">
            {t.footer.built}
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
