import React, { useState } from 'react'
import Logo from '../ui/Logo'
import MobileNavDrawer from './MobileNavDrawer'

const Navbar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <nav className="w-full max-w-full mx-auto bg-bg-primary flex flex-col items-start justify-center px-5 py-3 relative z-10 text-left text-base text-text-dark font-sans">
        <div className="self-stretch flex items-center justify-between gap-2 flex-shrink-0 min-w-0">
          <a href="/" className="flex-shrink-0" aria-label="Groupr home">
            <Logo />
          </a>
          <div className="flex items-center gap-1 flex-shrink-0">
            <a
              href="#account"
              className="flex flex-col items-center gap-0 py-1.5 px-1 text-[10px] text-text-dark hover:underline leading-tight"
              aria-label="Account"
            >
              <img
                src="/images/icons/account-icon.svg"
                alt=""
                className="w-6 h-6 flex-shrink-0"
                aria-hidden
              />
            </a>
            <a
              href="#cart"
              className="flex flex-col items-center gap-0 py-1.5 px-1 text-[10px] text-text-dark hover:underline leading-tight"
              aria-label="Cart"
            >
              <img
                src="/images/icons/cart-icon.svg"
                alt=""
                className="w-6 h-6 flex-shrink-0"
                aria-hidden
              />
            </a>
            <button
              type="button"
              className="p-2 -m-2 rounded hover:bg-bg-light-green/30 transition-colors"
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen(true)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      <MobileNavDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}

export default Navbar
