import React from 'react'
import Button from '../ui/Button'

const HERO_ILLUSTRATION_HEIGHT = 260
const HERO_ILLUSTRATION_WIDTH = 375

const HeroSection: React.FC = () => {
  return (
    <section className="w-full max-w-full md:self-stretch md:h-[638px] bg-bg-dark overflow-hidden flex flex-col items-start relative z-[9] text-left text-base text-text-light font-sans px-0 md:px-0">
      <div className="hidden md:block absolute top-11 left-[1238px] w-[127px] h-[127px]">
        <img src="/images/sections/snap-ebt-badge.svg" alt="SNAP/EBT Accepted" className="w-full h-full object-contain" />
      </div>
      <div className="hidden md:block absolute top-[132.81px] left-[791.75px] w-[633.5px] h-[600.7px]">
        <img src="/images/sections/hero-illustration.svg" alt="Hero Illustration" className="w-full h-full object-contain" />
      </div>
      <div className="w-full flex flex-col items-start pt-16 px-5 pb-5 gap-6 md:absolute md:top-[121px] md:left-section md:w-[723px] md:gap-5 md:pt-0 md:px-0 md:pb-0">
        <h1 className="text-[40px] md:text-hero leading-[125%] font-display font-bold md:font-extrabold">
          Affordable Grocery Delivery for NYC Residents
        </h1>
        <p className="leading-[160%] md:w-[646px]">
          Groupr makes it easy for you to buy the groceries you need using your EBT card, with no hidden fees and free delivery* directly to your building.
        </p>
        <p className="leading-[160%] md:w-[646px]">
          We currently deliver to several pickup locations in NYC. Check out our{' '}
          <a href="#pickup-locations" className="underline">pickup locations</a> to find the one nearest to you!
        </p>
        <div className="w-full flex flex-col gap-6 md:flex-row md:gap-6 text-center md:text-left">
          <Button variant="primary" size="lg" className="w-full md:w-auto">Shop now</Button>
          <Button variant="outline" size="lg" className="w-full md:w-auto text-accent-orange border-2 border-accent-orange bg-transparent hover:bg-accent-orange hover:text-text-brown">Sign up</Button>
        </div>
        <p className="text-sm leading-[150%] md:w-[646px]">*Free delivery on orders over $75</p>
      </div>
      <div className="md:hidden relative flex-shrink-0 overflow-hidden w-full" style={{ width: `${HERO_ILLUSTRATION_WIDTH}px`, height: `${HERO_ILLUSTRATION_HEIGHT}px`, margin: '0 auto' }}>
        <img
          src="/images/sections/group-2.svg"
          alt="SNAP/EBT accepted – Groupr grocery delivery"
          className="block scale-[1.4] -translate-x-[18%] origin-top-left"
          style={{ width: `${HERO_ILLUSTRATION_WIDTH}px`, height: 'auto' }}
          aria-hidden
        />
      </div>
    </section>
  )
}

export default HeroSection
