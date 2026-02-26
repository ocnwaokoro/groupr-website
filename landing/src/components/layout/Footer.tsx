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
      <div className="w-full max-w-full md:max-w-[1440px] mx-auto flex flex-col items-start px-5 py-16 md:px-section md:py-20 box-border gap-10 text-left text-base text-text-brown font-sans">
        <div className="self-stretch flex flex-col md:flex-row md:h-[248px] md:items-start gap-10 md:gap-32">
          <div className="flex flex-col md:flex-1 md:flex-row md:items-start gap-10">
            <div className="flex flex-col items-start">
              <Logo className="h-[78px] w-[90px] md:h-[104px] md:w-[120px]" />
            </div>
            <div className="self-stretch flex flex-wrap justify-start gap-10 md:flex-1 md:flex-nowrap">
              <div className="flex flex-col items-start gap-4 min-w-[120px] md:flex-1">
                <div className="text-base leading-[150%] font-semibold">Quick Links</div>
                <div className="flex flex-col gap-0">
                  <NavLink href="#shop-now" className="py-2 md:pl-0 md:pr-4">Shop Now</NavLink>
                  <NavLink href="#how-it-works" className="py-2 md:pl-0 md:pr-4">How It Works</NavLink>
                  <NavLink href="#faqs" className="py-2 md:pl-0 md:pr-4">FAQs</NavLink>
                  <NavLink href="#pickup-locations" className="py-2 md:pl-0 md:pr-4">Pickup Locations</NavLink>
                </div>
              </div>
              <div className="flex flex-col items-start gap-4 min-w-[120px] md:flex-1">
                <div className="text-base leading-[150%] font-semibold">Stay Connected</div>
                <div className="flex flex-col gap-0">
                  <NavLink href="#sign-up" className="py-2 md:pl-0 md:pr-4">Sign Up</NavLink>
                  <NavLink href="#contact-us" className="py-2 md:pl-0 md:pr-4">Contact Us</NavLink>
                  <NavLink href="#customer-support" className="py-2 md:pl-0 md:pr-4">Customer Support</NavLink>
                  <NavLink href="#refer" className="py-2 md:pl-0 md:pr-4">Refer a Friend</NavLink>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-[400px] flex flex-col items-start gap-6">
            <div className="flex flex-col items-start gap-4">
              <div className="font-semibold">Join</div>
              <p className="text-base leading-[160%]">Join our newsletter for updates on products and special offers.</p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="self-stretch flex flex-col gap-4 md:gap-3 text-text-placeholder">
              <div className="self-stretch flex flex-col md:flex-row items-stretch gap-4">
                <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="flex-1 w-full md:flex-1" />
                <Button type="submit" variant="primary" size="sm" className="w-full md:w-auto bg-text-brown text-text-light hover:bg-text-border">Subscribe</Button>
              </div>
              <p className="text-sm leading-[150%] text-text-brown">By subscribing, you agree to our Privacy Policy and consent to updates.</p>
            </form>
          </div>
        </div>
        <div className="self-stretch flex flex-col gap-8 text-sm">
          <div className="self-stretch h-px bg-bg-dark border border-bg-dark" />
          <div className="self-stretch flex flex-col items-center gap-4 sm:flex-row sm:justify-between sm:flex-wrap">
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
              <span className="leading-[150%]">© 2026 Groupr. All rights reserved.</span>
              <a href="#privacy" className="underline leading-[150%]">Privacy Policy</a>
              <a href="#terms" className="underline leading-[150%]">Terms of Service</a>
              <a href="#cookies" className="underline leading-[150%]">Cookie Settings</a>
            </div>
            <div className="flex items-center justify-center gap-3">
              <a href="#facebook" aria-label="Facebook"><img src="/images/social/facebook-icon.svg" alt="" className="h-6 w-6" /></a>
              <a href="#instagram" aria-label="Instagram"><img src="/images/social/instagram-icon.svg" alt="" className="h-6 w-6" /></a>
              <a href="#linkedin" aria-label="LinkedIn"><img src="/images/social/linkedin-icon.svg" alt="" className="h-6 w-6" /></a>
              <a href="#x" aria-label="X (Twitter)"><img src="/images/social/x-icon.svg" alt="" className="h-6 w-6" /></a>
              <a href="#youtube" aria-label="YouTube"><img src="/images/social/youtube-icon.svg" alt="" className="h-6 w-6" /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
