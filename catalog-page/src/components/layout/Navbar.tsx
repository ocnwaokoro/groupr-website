import React from 'react'
import Logo from '../ui/Logo'
import NavLink from '../ui/NavLink'
import SearchBar from '../ui/SearchBar'

const Navbar: React.FC = () => {
  return (
    <nav className="w-full bg-bg-primary flex flex-col items-start justify-center px-section py-1 relative z-10 text-left text-base text-text-dark font-sans">
      <div className="self-stretch flex items-center justify-between gap-4 py-1 z-0 flex-shrink-0 flex-nowrap min-w-0">
        <div className="flex items-center gap-16 flex-shrink-0 flex-nowrap">
          <a href="/" className="flex-shrink-0">
            <Logo />
          </a>
          <div className="w-[530px] flex items-center justify-between gap-5 flex-shrink-0 flex-nowrap">
            <NavLink href="#shop">Shop</NavLink>
            <NavLink href="#pickup-locations">Pickup Locations</NavLink>
            <NavLink href="#about">About Groupr</NavLink>
            <NavLink href="#contact-us">Contact us</NavLink>
          </div>
        </div>

        <SearchBar className="flex-1 min-w-[200px] max-w-[440px]" />

        <div className="flex items-center justify-end gap-8 flex-shrink-0 flex-nowrap">
          <a href="#account" className="flex flex-col items-center gap-0 py-1.5 px-1 text-[10px] text-text-dark hover:underline leading-tight whitespace-nowrap">
            <img
              src="/images/icons/account-icon.svg"
              alt="Account"
              className="w-6 h-6 flex-shrink-0"
            />
            <span>account</span>
          </a>
          <a href="#cart" className="flex flex-col items-center gap-0 py-1.5 px-1 text-[10px] text-text-dark hover:underline leading-tight whitespace-nowrap">
            <img
              src="/images/icons/cart-icon.svg"
              alt="Cart"
              className="w-6 h-6 flex-shrink-0"
            />
            <span>cart</span>
          </a>
        </div>
      </div>

      <div className="absolute left-8 top-[94px] flex items-center justify-center gap-1 border border-accent-border rounded-sm px-3 py-2 text-sm text-text-brown bg-bg-primary z-[1] whitespace-nowrap">
        <span>English</span>
        <img src="/images/icons/dropdown-icon.svg" alt="" className="w-5 h-5" aria-hidden />
      </div>
    </nav>
  )
}

export default Navbar
