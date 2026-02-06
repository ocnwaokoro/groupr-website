import React from 'react';
import Logo from '../ui/Logo';
import NavLink from '../ui/NavLink';
import SearchBar from '../ui/SearchBar';
import Button from '../ui/Button';

const Navbar: React.FC = () => {
  return (
    <nav className="w-full bg-bg-primary flex flex-col items-start justify-center px-section py-1 relative z-10 text-left text-base text-text-dark font-sans">
      <div className="self-stretch flex items-center justify-between gap-0 py-1 z-0 flex-shrink-0">
        {/* Left: Logo + Nav Links */}
        <div className="flex items-center gap-16">
          <Logo />
          <div className="w-[530px] flex items-center justify-between gap-5">
            <NavLink href="#shop">Shop</NavLink>
            <NavLink href="#pickup-locations">Pickup Locations</NavLink>
            <NavLink href="#learn-more">Learn more</NavLink>
            <NavLink href="#contact-us">Contact us</NavLink>
          </div>
        </div>

        {/* Center: Search Bar */}
        <SearchBar />

        {/* Right: Log in, Sign up, Cart */}
        <div className="flex items-center justify-end gap-8">
          <div className="flex items-center gap-3">
            <NavLink href="#login">Log in</NavLink>
            <div className="flex items-start">
              <Button variant="primary" size="sm">
                Sign up
              </Button>
            </div>
          </div>
          <a href="#cart" className="flex flex-col items-center gap-0 py-1.5 text-[10px] text-text-dark hover:underline leading-tight">
            <img 
              src="/images/icons/cart-icon.svg" 
              alt="Cart" 
              className="w-6 h-6 flex-shrink-0"
            />
            <span>cart</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
