import React from 'react';
import Button from '../ui/Button';

const HeroSection: React.FC = () => {
  return (
    <section className="self-stretch h-[638px] relative bg-bg-dark overflow-hidden flex-shrink-0 z-[9] text-xl font-lexend">
      {/* English selector - top left of hero */}
      <div className="absolute top-0 left-section bg-bg-primary flex flex-col items-center justify-center z-[1] flex-shrink-0 text-sm text-text-brown font-normal">
        <div className="w-full border border-accent-border box-border flex items-center justify-center px-3 py-2 gap-1 max-w-full font-normal">
          <span className="text-sm leading-[150%] font-normal">English</span>
          <img 
            src="/images/icons/dropdown-icon.svg" 
            alt="Dropdown" 
            className="w-5 h-5"
          />
        </div>
      </div>

      {/* SNAP/EBT Badge */}
      <div className="absolute top-11 left-[1238px] w-[127px] h-[127px] flex-shrink-0">
        <img 
          src="/images/sections/snap-ebt-badge.svg" 
          alt="SNAP/EBT Accepted" 
          className="w-full h-full object-contain"
        />
      </div>

      {/* Hero Illustration */}
      <div className="absolute top-[132.81px] left-[791.75px] w-[633.5px] h-[600.7px] flex-shrink-0">
        <img 
          src="/images/sections/hero-illustration.svg" 
          alt="Hero Illustration" 
          className="w-full h-full object-contain"
        />
      </div>

      {/* Left Column Content */}
      <div className="absolute top-[121px] left-section w-[723px] flex flex-col items-start gap-5 flex-shrink-0 text-left text-base text-text-light font-sans">
        <h1 className="self-stretch relative text-hero leading-[125%] font-display font-extrabold">
          Affordable Grocery Delivery for NYC Residents
        </h1>
        
        <p className="w-[646px] relative leading-[160%] inline-block">
          Groupr makes it easy for you to buy the groceries you need using your EBT card, with no hidden fees and free delivery* directly to your building.
        </p>
        
        <p className="w-[646px] relative leading-[160%] inline-block">
          We currently deliver to several pickup locations in NYC. Check out our{' '}
          <a href="#pickup-locations" className="underline">
            pickup locations
          </a>{' '}
          to find the one nearest to you!
        </p>
        
        <div className="flex items-start gap-6 text-xl text-text-brown">
          <Button variant="primary" size="lg" className="text-center">
            Shop now
          </Button>
          <Button variant="outline" size="lg" className="text-center text-accent-orange border-2 border-accent-orange bg-transparent hover:bg-accent-orange hover:text-text-brown">
            Sign up
          </Button>
        </div>
        
        <p className="w-[646px] relative text-sm leading-[150%] inline-block">
          *Free delivery on orders over $75
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
