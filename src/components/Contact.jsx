import { useEffect, useState } from 'react'
import { PROFILE, whatsappUrl } from '../data/content'
import { ArrowUpRight, Check as CheckIcon, Copy, LinkedIn, WhatsApp } from './icons'
import { Arc, Eyebrow } from './ui'

/*
 * Cierre de la experiencia. La pregunta es el titular y ocupa el ancho de siete
 * columnas: es la última oportunidad de que alguien se reconozca. Los canales
 * van a la derecha como lista, con WhatsApp arriba y en el acento.
 */
export default function Contact({ t }) {
  const [copied, setCopied] = useState(false)
  const [nombre, setNombre] = useState('')
  const [mensaje, setMensaje] = useState('')

  /*
   * El formulario no envía a ningún servidor: arma el mensaje y abre WhatsApp
   * con él ya escrito. Es la vía de menor fricción para quien no se atreve a
   * abrir un chat en blanco con un desconocido, y a la vez evita montar un
   * backend, un servicio de terceros y una política de datos para dos campos.
   */
  const enviar = (event) => {
    event.preventDefault()
    const texto = nombre.trim()
      ? `${t.contact.whatsappMessage} Soy ${nombre.trim()}. ${mensaje.trim()}`
      : `${t.contact.whatsappMessage} ${mensaje.trim()}`
    window.open(whatsappUrl(texto), '_blank', 'noopener,noreferrer')
  }

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
      className="relative scroll-mt-20 overflow-hidden py-14 md:py-20"
    >
      <Arc className="-top-[28rem] left-1/2 size-[60rem] -translate-x-1/2" />

      <div className="shell relative">
        <div className="grid gap-x-10 gap-y-14 lg:grid-cols-12">
          <div className="reveal lg:col-span-7">
            <Eyebrow>{t.contact.eyebrow}</Eyebrow>

            <h2 className="display mt-5 text-[2.125rem] sm:text-[2.75rem] lg:text-[3.5rem]">
              {t.contact.title}
            </h2>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft">
              {t.contact.body}
            </p>
            <p className="mt-4 max-w-xl leading-relaxed text-ink-soft">
              {t.contact.bodySecondary}
            </p>

            {/*
              Los tres pasos van ANTES del botón: la duda que frena a alguien no
              es dónde pulsar, es en qué se está metiendo si pulsa.
            */}
            <div className="mt-10 border-t border-line pt-6">
              <p className="eyebrow eyebrow-plain">{t.contact.stepsLabel}</p>
              <ol className="mt-5 space-y-3">
                {t.contact.steps.map((paso, i) => (
                  <li key={i} className="flex gap-4 leading-relaxed text-ink-soft">
                    <span
                      aria-hidden
                      className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-ink text-[0.6875rem] font-semibold text-page tabular-nums"
                    >
                      {i + 1}
                    </span>
                    {paso}
                  </li>
                ))}
              </ol>
            </div>

            <a
              href={whatsappUrl(t.contact.whatsappMessage)}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-primary magnetic group mt-8 pr-3 pl-7"
            >
              {t.contact.cta}
              <span className="flex size-9 items-center justify-center rounded-full btn-badge">
                <WhatsApp width={16} height={16} />
              </span>
            </a>

            <p className="mt-4 text-sm text-ink-soft">{t.contact.ctaNote}</p>
          </div>

          <div className="reveal lg:col-span-4 lg:col-start-9">
            <form onSubmit={enviar} className="card p-6">
              <p className="eyebrow eyebrow-plain">{t.contact.formLabel}</p>

              <label htmlFor="nombre" className="mt-5 block text-sm font-medium">
                {t.contact.formName}
              </label>
              <input
                id="nombre"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder={t.contact.formNamePlaceholder}
                className="mt-2 w-full rounded-[var(--radius-tile)] border border-edge bg-page px-3 py-2.5 text-sm placeholder:text-ink-soft/70"
              />

              <label htmlFor="mensaje" className="mt-4 block text-sm font-medium">
                {t.contact.formMessage}
              </label>
              <textarea
                id="mensaje"
                required
                rows={3}
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                placeholder={t.contact.formMessagePlaceholder}
                className="mt-2 w-full resize-y rounded-[var(--radius-tile)] border border-edge bg-page px-3 py-2.5 text-sm placeholder:text-ink-soft/70"
              />

              <button type="submit" className="btn-primary mt-5 w-full justify-center px-6">
                <WhatsApp width={16} height={16} />
                {t.contact.formSend}
              </button>

              <p className="mt-3 text-xs leading-relaxed text-ink-soft">{t.contact.formNote}</p>
            </form>

            <ul className="mt-10">
            <li className="border-t border-line py-6">
              <div className="flex items-baseline justify-between gap-4">
                <p className="eyebrow eyebrow-plain">{t.contact.whatsappLabel}</p>
                <span className="text-[0.6875rem] font-medium text-ink-soft">
                  {t.contact.whatsappHint}
                </span>
              </div>
              <a
                href={whatsappUrl(t.contact.whatsappMessage)}
                target="_blank"
                rel="noreferrer noopener"
                className="tap link group mt-3 inline-flex items-center gap-2.5 text-lg font-medium"
              >
                <WhatsApp width={17} height={17} className="text-ink" />
                {PROFILE.whatsappDisplay}
                <ArrowUpRight
                  width={14}
                  height={14}
                  className="text-ink-soft transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </li>

            <li className="flex items-center justify-between gap-4 border-t border-line py-6">
              <div className="min-w-0">
                <p className="eyebrow eyebrow-plain">{t.contact.emailLabel}</p>
                <a href={`mailto:${PROFILE.email}`} className="link mt-3 block truncate">
                  {PROFILE.email}
                </a>
              </div>
              <button
                type="button"
                onClick={copyEmail}
                aria-label={t.contact.copy}
                className="flex size-11 shrink-0 items-center justify-center rounded-full border border-edge text-ink-soft transition-colors hover:border-ink hover:text-ink"
              >
                {copied ? <CheckIcon width={15} height={15} /> : <Copy width={15} height={15} />}
              </button>
              <span aria-live="polite" className="sr-only">
                {copied ? t.contact.copied : ''}
              </span>
            </li>

            <li className="border-t border-b border-line py-6">
              <p className="eyebrow eyebrow-plain">{t.contact.linkedinLabel}</p>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="tap link group mt-3 inline-flex items-center gap-2.5"
              >
                <LinkedIn width={15} height={15} className="text-ink-soft" />
                {PROFILE.linkedinLabel}
                <ArrowUpRight
                  width={14}
                  height={14}
                  className="text-ink-soft transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
