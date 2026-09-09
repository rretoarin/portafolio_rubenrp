import { useState } from 'react'
import { PROFILE, whatsappUrl } from '../data/content'
import { ArrowRight, WhatsApp } from './icons'
import { Arc, Eyebrow } from './ui'

/*
 * El cierre. Es también la única presencia personal de la home: la cara y una
 * frase, justo donde se toma la decisión. La sección "Sobre mí" completa ya no
 * existe — el cliente no necesita mi trayectoria para entender qué gana.
 *
 * Los canales (WhatsApp, correo, LinkedIn) estaban aquí Y en el pie. Se quedan
 * sólo en el pie.
 */
export default function Contact({ t }) {
  const [nombre, setNombre] = useState('')
  const [mensaje, setMensaje] = useState('')

  /*
   * El formulario no envía a ningún servidor: arma el mensaje y abre WhatsApp
   * con él ya escrito. Es la vía de menor fricción para quien no se atreve a
   * abrir un chat en blanco, y evita montar un backend y una política de datos
   * para dos campos.
   */
  const enviar = (event) => {
    event.preventDefault()
    const texto = nombre.trim()
      ? `${t.contact.whatsappMessage} Soy ${nombre.trim()}. ${mensaje.trim()}`
      : `${t.contact.whatsappMessage} ${mensaje.trim()}`
    window.open(whatsappUrl(texto), '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden py-16 md:py-24">
      <Arc className="-top-[26rem] left-1/2 size-[56rem] -translate-x-1/2" />

      <div className="shell relative">
        <div className="grid gap-x-12 gap-y-12 lg:grid-cols-12 lg:items-start">
          <div className="reveal lg:col-span-6">
            <Eyebrow>{t.contact.eyebrow}</Eyebrow>

            <h2 className="display mt-5 text-[2.25rem] text-heading sm:text-[2.75rem] lg:text-[3.25rem]">
              {t.contact.title}
            </h2>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">{t.contact.text}</p>

            <a
              href={whatsappUrl(t.contact.whatsappMessage)}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-primary magnetic group mt-8 pr-3 pl-7"
            >
              {t.contact.cta}
              <span className="btn-badge flex size-9 items-center justify-center rounded-full transition-transform group-hover:translate-x-0.5">
                <ArrowRight width={16} height={16} />
              </span>
            </a>

            <p className="mt-4 text-sm text-ink-soft">{t.contact.ctaNote}</p>

            {/* La cara y una frase. Toda la parte personal de la home cabe aquí. */}
            <div className="mt-10 flex gap-5 border-t border-line pt-8">
              {PROFILE.photo && (
                <img
                  src={PROFILE.photo}
                  alt={PROFILE.name}
                  width="400"
                  height="400"
                  loading="lazy"
                  decoding="async"
                  className="size-16 shrink-0 rounded-full border border-line object-cover"
                />
              )}
              <div>
                <p className="max-w-md leading-relaxed text-ink-soft">{t.contact.about}</p>
                <p className="mt-2 text-sm font-semibold text-ink">{PROFILE.name}</p>
              </div>
            </div>
          </div>

          <div className="reveal lg:col-span-5 lg:col-start-8">
            <form onSubmit={enviar} className="card p-6 md:p-7">
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
          </div>
        </div>
      </div>
    </section>
  )
}
