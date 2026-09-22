import { useEffect, useState } from 'react'
import { whatsappUrl } from '../data/content'
import { WhatsApp } from './icons'

// Botón flotante. Aparece recién pasado el hero: en la primera pantalla ya hay
// un CTA, y taparlo con otro sólo resta.
export default function WhatsAppButton({ t }) {
  const [pasadoElHero, setPasadoElHero] = useState(false)
  const [cierreALaVista, setCierreALaVista] = useState(false)

  useEffect(() => {
    const onScroll = () => setPasadoElHero(window.scrollY > window.innerHeight * 0.7)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /*
   * Y se retira en el último tramo de la página. Alineado a la columna, el
   * botón se montaba sobre la tarjeta del formulario y, más abajo, sobre la
   * flecha de «subir» del pie —16px a 1476px de ancho y 48 a 1008—. Tampoco
   * hace falta ahí: el formulario termina en «Enviar por WhatsApp» y el pie
   * repite el número en la lista de contacto. Tres botones al mismo sitio en la
   * misma pantalla compiten entre ellos.
   *
   * El `rootMargin` recorta el observador a la franja baja de la ventana, la
   * del propio botón. Observando la sección entera se apagaba demasiado pronto:
   * en una ventana de 900px el contacto ya asoma mientras se lee Proceso, y el
   * botón desaparecía con media pantalla aún por delante.
   */
  useEffect(() => {
    const zonas = [document.querySelector('#contact form'), document.querySelector('footer')].filter(
      Boolean,
    )
    if (!zonas.length) return
    const dentro = new Set()
    const obs = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => (e.isIntersecting ? dentro.add(e.target) : dentro.delete(e.target)))
        setCierreALaVista(dentro.size > 0)
      },
      { rootMargin: '-82% 0px 0px 0px' },
    )
    zonas.forEach((z) => obs.observe(z))
    return () => obs.disconnect()
  }, [])

  const visible = pasadoElHero && !cierreALaVista

  return (
    <a
      href={whatsappUrl(t.contact.whatsappMessage)}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={t.contact.whatsappAria}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`wa-fab fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] z-50 flex size-14 items-center justify-center rounded-full bg-[var(--color-btn)] text-[var(--color-on-btn)] shadow-[var(--shadow-float)] transition-all duration-300 hover:bg-[var(--color-btn-hover)] focus-visible:bg-[var(--color-btn-hover)] md:bottom-8 ${
        visible
          ? 'translate-y-0 scale-100 opacity-100'
          : 'pointer-events-none translate-y-3 scale-90 opacity-0'
      }`}
    >
      <WhatsApp width={24} height={24} />
    </a>
  )
}
