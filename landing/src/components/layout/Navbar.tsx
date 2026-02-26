import React, { useState } from 'react'
import Logo from '../ui/Logo'
import NavLink from '../ui/NavLink'
import SearchBar from '../ui/SearchBar'
import MobileNavDrawer from './MobileNavDrawer'

const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
] as const

const Navbar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [language, setLanguage] = useState<'en' | 'es'>('en')
  return (
    <>
      <nav className="w-full max-w-full mx-auto bg-bg-primary flex flex-col items-start justify-center px-5 py-3 md:px-section md:py-1 relative z-10 text-left text-base text-text-dark font-sans">
        <div className="self-stretch flex items-center justify-between gap-2 md:gap-4 flex-shrink-0 min-w-0 py-0 md:py-1 md:z-0 md:flex-nowrap">
          <a href="/" className="flex-shrink-0" aria-label="Groupr home">
            <Logo />
          </a>
          {/* Desktop: same structure as catalog-page */}
          <div className="hidden md:flex items-center gap-16 flex-shrink-0 flex-nowrap">
            <div className="w-[530px] flex items-center justify-between gap-5 flex-shrink-0 flex-nowrap">
              <NavLink href="#shop">Shop</NavLink>
              <NavLink href="#pickup-locations">Pickup Locations</NavLink>
              <NavLink href="#about">About Groupr</NavLink>
              <NavLink href="#contact-us">Contact us</NavLink>
            </div>
          </div>
          <SearchBar className="hidden md:flex flex-1 min-w-[200px] max-w-[440px]" />
          <div className="flex items-center justify-end gap-1 md:gap-8 flex-shrink-0 md:flex-nowrap">
            <a href="#account" className="flex flex-col items-center gap-0 py-1.5 px-1 text-[10px] text-text-dark hover:underline leading-tight whitespace-nowrap" aria-label="Account">
              <img src="/images/icons/account-icon.svg" alt="" className="w-6 h-6 flex-shrink-0" aria-hidden />
              <span className="hidden md:inline">account</span>
            </a>
            <a href="#cart" className="flex flex-col items-center gap-0 py-1.5 px-1 text-[10px] text-text-dark hover:underline leading-tight whitespace-nowrap" aria-label="Cart">
              <img src="/images/icons/cart-icon.svg" alt="" className="w-6 h-6 flex-shrink-0" aria-hidden />
              <span className="hidden md:inline">cart</span>
            </a>
            <button
              type="button"
              className="md:hidden p-2 -m-2 rounded hover:bg-bg-light-green/30 transition-colors"
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
        {/* Desktop: language selector (English / Spanish dropdown) */}
        <div className="hidden md:flex absolute left-8 top-[94px] items-center gap-1 border border-accent-border rounded-sm pl-3 pr-2 py-1.5 text-sm text-text-brown bg-bg-primary z-[1] whitespace-nowrap">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as 'en' | 'es')}
            className="bg-transparent border-0 text-text-brown text-sm font-sans cursor-pointer appearance-none pr-5 py-1 focus:outline-none focus:ring-0"
            aria-label="Select language"
          >
            {LANGUAGES.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <img src="/images/icons/dropdown-icon.svg" alt="" className="w-5 h-5 pointer-events-none flex-shrink-0" aria-hidden />
        </div>
      </nav>
      <MobileNavDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}

export default Navbar
