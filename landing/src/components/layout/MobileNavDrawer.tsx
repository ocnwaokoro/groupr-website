import React, { useState, useEffect, useRef } from 'react'

const ANIM_DURATION_MS = 280

interface MobileNavDrawerProps {
  isOpen: boolean
  onClose: () => void
}

const navLinks = [
  { href: '#pickup-locations', label: 'Pickup locations' },
  { href: '#cart', label: 'Your cart' },
  { href: '#shop', label: 'Shop now' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#about', label: 'About Groupr' },
  { href: '#customer-support', label: 'Customer Support' },
  { href: '#contact-us', label: 'Contact us' },
]

const MobileNavDrawer: React.FC<MobileNavDrawerProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [entered, setEntered] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const visible = isOpen || isClosing

  useEffect(() => {
    if (!isOpen) return
    setEntered(false)
    const id = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(id)
  }, [isOpen])

  const handleClose = () => {
    if (isClosing) return
    setIsClosing(true)
    closeTimeoutRef.current = setTimeout(() => {
      onClose()
      setIsClosing(false)
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
    }, ANIM_DURATION_MS)
  }

  useEffect(() => () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
  }, [])

  if (!visible) return null

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-[100] transition-opacity duration-300 ease-out ${isClosing ? 'opacity-0' : 'opacity-100'}`}
        aria-hidden
        onClick={handleClose}
      />
      <div
        className={`fixed top-0 right-0 h-full w-[311px] max-w-[85vw] bg-bg-category flex flex-col items-stretch pt-20 px-5 pb-5 z-[101] overflow-y-auto shadow-[-4px_0_24px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-out ${entered && !isClosing ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog"
        aria-label="Navigation menu"
      >
        <button
          type="button"
          className="absolute top-3 right-3 w-12 h-12 flex items-center justify-center rounded-lg hover:bg-white/20 transition-colors"
          onClick={handleClose}
          aria-label="Close menu"
        >
          <img src="/images/icons/close-icon.svg" alt="" className="w-6 h-6" />
        </button>
        <div className="flex flex-col gap-6 flex-1">
          <div className="w-full">
            <div className="w-full rounded-full bg-bg-primary border border-text-border flex items-center gap-2 px-3 py-2">
              <img src="/images/icons/search-icon.svg" alt="" className="w-5 h-5 flex-shrink-0" aria-hidden />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                className="flex-1 min-w-0 bg-transparent border-none outline-none text-base text-text-brown placeholder:text-text-placeholder"
              />
            </div>
          </div>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleClose}
              className="flex items-center gap-2 py-2 px-4 rounded-lg text-text-dark font-medium leading-[150%] hover:bg-white/30 transition-colors"
            >
              {link.label === 'Your cart' && <img src="/images/icons/cart-icon.svg" alt="" className="w-5 h-5 flex-shrink-0" aria-hidden />}
              <span>{link.label}</span>
            </a>
          ))}
          <div className="self-stretch h-px border-t border-accent-border" />
          <a href="#login" onClick={handleClose} className="flex items-center py-2 px-4 rounded-lg text-text-dark font-medium leading-[150%] hover:bg-white/30 transition-colors">
            Log in
          </a>
          <a
            href="#sign-up"
            onClick={handleClose}
            className="w-full rounded-button bg-accent-orange text-text-brown font-sans font-semibold text-center flex items-center justify-center py-3 px-4 hover:bg-accent-orange-dark transition-colors shadow-[0px_1px_2px_rgba(0,0,0,0.05)]"
          >
            Sign up
          </a>
        </div>
      </div>
    </>
  )
}

export default MobileNavDrawer
