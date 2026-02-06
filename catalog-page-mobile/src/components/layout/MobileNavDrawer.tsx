import React, { useState, useRef, useEffect } from 'react'

const ANIM_MS = 300

interface MobileNavDrawerProps {
  isOpen: boolean
  onClose: () => void
}

const navLinks = [
  { href: '#pickup-locations', label: 'Pickup locations', icon: 'nav-icon-0' },
  { href: '#cart', label: 'Your cart', icon: 'nav-icon-1' },
  { href: '#shop', label: 'Shop now', icon: 'nav-icon-2' },
  { href: '#how-it-works', label: 'How it works', icon: 'nav-icon-3' },
  { href: '#learn-more', label: 'Learn more', icon: 'nav-icon-4' },
  { href: '#customer-support', label: 'Customer Support', icon: 'nav-icon-5' },
  { href: '#contact-us', label: 'Contact us', icon: 'nav-icon-6' },
]

const MobileNavDrawer: React.FC<MobileNavDrawerProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [entered, setEntered] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const pendingNavRef = useRef<string | null>(null)
  const drawerRef = useRef<HTMLDivElement>(null)
  const exitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const visible = isOpen || isClosing

  // Enter: force reflow so the "closed" state is committed, then set "open" so the transition runs.
  // (Reading offsetWidth forces the browser to apply current styles before we change them.)
  useEffect(() => {
    if (!isOpen) return
    setEntered(false)
    const el = drawerRef.current
    if (el) {
      void el.offsetWidth // force reflow
      setEntered(true)
    } else {
      setEntered(true)
    }
  }, [isOpen])

  // Exit: after animation duration, notify parent and apply any pending hash
  useEffect(() => {
    if (!isClosing) return
    exitTimeoutRef.current = setTimeout(() => {
      exitTimeoutRef.current = null
      onClose()
      setIsClosing(false)
      const hash = pendingNavRef.current
      pendingNavRef.current = null
      if (hash) window.location.hash = hash
    }, ANIM_MS)
    return () => {
      if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current)
    }
  }, [isClosing, onClose])

  useEffect(() => () => {
    if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current)
  }, [])

  const handleClose = (e?: React.MouseEvent<HTMLAnchorElement>) => {
    if (e?.currentTarget?.href != null) {
      try {
        const url = new URL(e.currentTarget.href)
        if (url.hash) pendingNavRef.current = url.hash
      } catch {
        /* ignore */
      }
      e.preventDefault()
    }
    if (isClosing) return
    setIsClosing(true)
  }

  if (!visible) return null

  return (
    <>
      {/* Full-screen darkening overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-[100] transition-opacity ease-out ${
          isClosing ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ transitionDuration: `${ANIM_MS}ms` }}
        aria-hidden
        onClick={handleClose}
      />
      {/* Drawer – slides in/out from right */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full w-[311px] max-w-[85vw] bg-bg-category flex flex-col items-stretch pt-20 px-5 pb-5 z-[101] overflow-y-auto shadow-[-4px_0_24px_rgba(0,0,0,0.12)] transition-transform ease-out ${
          entered && !isClosing ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ transitionDuration: `${ANIM_MS}ms` }}
        role="dialog"
        aria-label="Navigation menu"
      >
        {/* Close button – MobileMenuWrapper style: 48×48, top 12px */}
        <button
          type="button"
          className="absolute top-3 left-[243px] h-12 w-12 flex items-center justify-center rounded-lg hover:bg-white/20 transition-colors"
          onClick={handleClose}
          aria-label="Close menu"
        >
          <img src="/images/icons/nav-close.svg" alt="" className="w-6 h-6" />
        </button>

        <div className="flex flex-col gap-6 flex-1">
          {/* Search */}
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

          {/* Nav links with _nav-link icons */}
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClose(e)}
              className="flex items-center gap-2 py-2 px-4 rounded-lg text-text-dark font-medium leading-[150%] hover:bg-white/30 transition-colors"
            >
              <img
                src={`/images/icons/${link.icon}.svg`}
                alt=""
                className="w-5 h-5 flex-shrink-0"
                aria-hidden
              />
              <span>{link.label}</span>
            </a>
          ))}

          {/* Divider */}
          <div className="self-stretch h-px border-t border-accent-border" />

          {/* Log in */}
          <a
            href="#login"
            onClick={(e) => handleClose(e)}
            className="flex items-center py-2 px-4 rounded-lg text-text-dark font-medium leading-[150%] hover:bg-white/30 transition-colors"
          >
            Log in
          </a>

          {/* Sign up button */}
          <a
            href="#sign-up"
            onClick={(e) => handleClose(e)}
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
