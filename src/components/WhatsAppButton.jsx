import { useEffect, useState } from 'react'
import { whatsappUrl } from '../data/content'
import { WhatsApp } from './icons'

// Botón flotante. Aparece recién pasado el hero: en la primera pantalla ya hay
// un CTA, y taparlo con otro sólo resta.
export default function WhatsAppButton({ t }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      href={whatsappUrl(t.contact.whatsappMessage)}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={t.contact.whatsappAria}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`fixed right-[calc(1.25rem+env(safe-area-inset-right))] bottom-[calc(1.25rem+env(safe-area-inset-bottom))] z-50 flex size-14 items-center justify-center rounded-full bg-bright text-ink shadow-[0_8px_30px_rgba(0,0,0,0.6)] transition-all duration-300 md:right-8 md:bottom-8 ${
        visible
          ? 'translate-y-0 scale-100 opacity-100'
          : 'pointer-events-none translate-y-3 scale-90 opacity-0'
      }`}
    >
      <WhatsApp width={24} height={24} />
    </a>
  )
}
