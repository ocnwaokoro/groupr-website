import React, { useState } from 'react'
import Logo from '../ui/Logo'
import NavLink from '../ui/NavLink'
import Input from '../ui/Input'
import Button from '../ui/Button'

const Footer: React.FC = () => {
  const [email, setEmail] = useState('')

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setEmail('')
  }

  return (
    <footer className="w-full bg-bg-footer overflow-hidden z-0">
      <div className="w-full max-w-[1440px] mx-auto flex flex-col items-start px-section py-20 box-border gap-10 text-left text-base text-text-brown font-sans">
        <div className="self-stretch h-[248px] flex items-start gap-32">
          <div className="flex-1 flex items-start gap-10">
            <div className="flex-1 overflow-hidden flex flex-col items-start">
              <div className="flex items-start">
                <Logo className="h-[104px] w-[120px]" />
              </div>
            </div>

            <div className="flex-1 overflow-hidden flex flex-col items-start gap-4">
              <div className="self-stretch relative text-base leading-[150%] font-semibold">
                Quick Links
              </div>
              <div className="self-stretch flex flex-col items-start">
                <NavLink href="#shop-now" className="self-stretch flex items-start py-2 pl-0 pr-4">
                  Shop Now
                </NavLink>
                <NavLink href="#how-it-works" className="self-stretch flex items-start py-2 pl-0 pr-4">
                  How It Works
                </NavLink>
                <NavLink href="#faqs" className="self-stretch flex items-start py-2 pl-0 pr-4">
                  FAQs
                </NavLink>
                <NavLink href="#pickup-locations" className="self-stretch flex items-start py-2 pl-0 pr-4">
                  Pickup Locations
                </NavLink>
              </div>
            </div>

            <div className="flex-1 overflow-hidden flex flex-col items-start gap-4">
              <div className="self-stretch relative text-base leading-[150%] font-semibold">
                Stay Connected
              </div>
              <div className="self-stretch flex flex-col items-start">
                <NavLink href="#sign-up" className="self-stretch flex items-start py-2 pl-0 pr-4">
                  Sign Up
                </NavLink>
                <NavLink href="#contact-us" className="self-stretch flex items-start py-2 pl-0 pr-4">
                  Contact Us
                </NavLink>
                <NavLink href="#customer-support" className="self-stretch flex items-start py-2 pl-0 pr-4">
                  Customer Support
                </NavLink>
                <NavLink href="#refer" className="self-stretch flex items-start py-2 pl-0 pr-4">
                  Refer a Friend
                </NavLink>
              </div>
            </div>
          </div>

          <div className="w-[400px] flex flex-col items-start gap-6">
            <div className="self-stretch flex flex-col items-start gap-4">
              <div className="self-stretch relative text-base leading-[150%] font-semibold">
                Join
              </div>
              <p className="self-stretch relative text-base leading-[160%]">
                Join our newsletter for updates on products and special offers.
              </p>
            </div>

            <form onSubmit={handleNewsletterSubmit} className="self-stretch flex flex-col items-start gap-3 text-text-placeholder">
              <div className="self-stretch flex items-start gap-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                />
                <div className="self-stretch rounded-button flex items-start text-center text-text-light">
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    className="bg-text-brown text-text-light hover:bg-text-border"
                  >
                    Subscribe
                  </Button>
                </div>
              </div>
              <p className="self-stretch relative text-sm leading-[150%] text-text-brown">
                By subscribing, you agree to our Privacy Policy and consent to updates.
              </p>
            </form>
          </div>
        </div>

        <div className="self-stretch flex flex-col items-start gap-8 text-sm">
          <div className="self-stretch h-px relative bg-bg-dark border border-bg-dark box-border" />
          <div className="self-stretch flex items-start justify-between gap-5">
            <div className="flex items-center gap-6">
              <span className="relative leading-[150%]">© 2026 Groupr. All rights reserved.</span>
              <a href="#privacy" className="relative underline leading-[150%]">
                Privacy Policy
              </a>
              <a href="#terms" className="relative underline leading-[150%]">
                Terms of Service
              </a>
              <a href="#cookies" className="relative underline leading-[150%]">
                Cookie Settings
              </a>
            </div>
            <div className="flex items-start gap-3">
              <a href="#facebook" aria-label="Facebook">
                <img src="/images/social/facebook-icon.svg" alt="Facebook" className="h-6 w-6" />
              </a>
              <a href="#instagram" aria-label="Instagram">
                <img src="/images/social/instagram-icon.svg" alt="Instagram" className="h-6 w-6" />
              </a>
              <a href="#linkedin" aria-label="LinkedIn">
                <img src="/images/social/linkedin-icon.svg" alt="LinkedIn" className="h-6 w-6" />
              </a>
              <a href="#x" aria-label="X (Twitter)">
                <img src="/images/social/x-icon.svg" alt="X" className="h-6 w-6" />
              </a>
              <a href="#youtube" aria-label="YouTube">
                <img src="/images/social/youtube-icon.svg" alt="YouTube" className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
