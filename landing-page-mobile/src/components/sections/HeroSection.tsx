import React from 'react';
import Button from '../ui/Button';

/** Visible height of the hero illustration (px). Lower = more cropped at bottom, higher = less cropped. */
const HERO_ILLUSTRATION_HEIGHT = 260;
/** Fixed width of the hero illustration (px). Prevents scaling with viewport. */
const HERO_ILLUSTRATION_WIDTH = 375;

const HeroSection: React.FC = () => {
  return (
    <section className="w-full max-w-full bg-bg-dark overflow-hidden flex flex-col items-start relative z-[9] text-left text-base text-text-light font-sans px-0">
      <div className="w-full flex flex-col items-start pt-16 px-5 pb-5 gap-6 mb-0">
        <div className="flex flex-col gap-5">
          <h1 className="text-hero font-display font-bold leading-[125%]">
            Affordable Grocery Delivery for NYC Residents
          </h1>
          <p className="leading-[160%]">
            Groupr makes it easy for you to buy the groceries you need using your EBT card, with no
            hidden fees and free delivery* directly to your building.
          </p>
          <p className="leading-[160%]">
            We currently deliver to several pickup locations in NYC. Check out our{' '}
            <a href="#pickup-locations" className="underline">
              pickup locations
            </a>{' '}
            to find the one nearest to you!
          </p>
        </div>
        <div className="w-full flex flex-col gap-6 text-center">
          <Button variant="primary" size="lg" className="w-full">
            Shop now
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full border-2 border-accent-orange text-accent-orange hover:bg-accent-orange hover:text-text-brown"
          >
            Sign up
          </Button>
        </div>
        <p className="text-sm leading-[150%]">*Free delivery on orders over $75</p>
      </div>
      <div
        className="relative flex-shrink-0 overflow-hidden"
        style={{ width: `${HERO_ILLUSTRATION_WIDTH}px`, height: `${HERO_ILLUSTRATION_HEIGHT}px` }}
      >
        {/* Image sized to container width, then scaled/shifted; container clips so only bottom (and right) crop */}
        <img
          src="/images/sections/group-2.svg"
          alt="SNAP/EBT accepted – Groupr grocery delivery"
          className="block scale-[1.4] -translate-x-[18%] origin-top-left"
          style={{ width: `${HERO_ILLUSTRATION_WIDTH}px`, height: 'auto' }}
          aria-hidden
        />
      </div>
    </section>
  );
};

export default HeroSection;
