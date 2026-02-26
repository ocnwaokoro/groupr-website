import React from 'react'
import Button from '../ui/Button'

const CtaSection: React.FC = () => (
  <section className="w-full max-w-full bg-bg-dark-alt overflow-hidden relative z-[1] min-h-[420px] md:min-h-0">
    <div className="absolute inset-0 z-0 md:inset-0">
      <img src="/images/sections/cta-background-image.svg" alt="" className="hidden md:block w-full h-full object-cover" aria-hidden />
    </div>
    <div className="absolute inset-6 sm:inset-8 z-0 md:hidden">
      <img src="/images/sections/food-background.svg" alt="" className="w-full h-full object-contain object-center rounded-lg" aria-hidden />
    </div>
    <div className="relative w-full flex flex-col items-center px-5 py-[120px] pb-[140px] gap-8 md:max-w-[1440px] md:mx-auto md:px-section md:py-[136px] md:gap-20 text-text-light z-[1]">
      <div className="flex flex-col items-center gap-6 md:w-[768px] md:gap-8">
        <b className="text-heading-lg font-display leading-[125%] text-center">Get Your Groceries Delivered</b>
        <p className="text-lg leading-[150%] font-sans text-center">Join our community and enjoy convenient grocery delivery tailored for your needs and budget.</p>
      </div>
      <div className="w-full flex flex-col gap-4 md:flex-row md:gap-4 md:justify-center items-center text-base text-text-brown font-sans">
        <Button variant="primary" size="sm" className="w-full md:w-auto h-12 bg-text-light text-text-brown hover:bg-bg-primary">Sign up</Button>
        <Button variant="outline" size="sm" className="w-full md:w-auto h-12 border-2 border-text-light text-text-light hover:bg-text-light hover:text-bg-dark">Shop now</Button>
      </div>
    </div>
  </section>
)

export default CtaSection
