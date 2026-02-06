import React from 'react';
import Button from '../ui/Button';

const CtaSection: React.FC = () => {
  return (
    <section className="w-full max-w-full bg-bg-dark-alt overflow-hidden relative isolation-isolate z-[1] min-h-[420px]">
      {/* Green base with Food Background on top – padded from edges */}
      <div className="absolute inset-6 sm:inset-8 z-0">
        <img
          src="/images/sections/food-background.svg"
          alt=""
          className="w-full h-full object-contain object-center rounded-lg"
          aria-hidden
        />
      </div>
      <div className="relative w-full flex flex-col items-center px-5 py-[120px] pb-[140px] gap-8 text-text-light z-[1]">
        <div className="flex flex-col items-center gap-6">
          <b className="text-heading-lg font-display leading-[125%] text-center">
            Get Your Groceries Delivered
          </b>
          <p className="text-lg leading-[150%] font-sans text-center">
            Join our community and enjoy convenient grocery delivery tailored for your needs and
            budget.
          </p>
        </div>
        <div className="w-full flex flex-col gap-4 text-base font-sans">
          <Button
            variant="primary"
            size="sm"
            className="w-full h-12 bg-text-light text-text-brown hover:bg-bg-primary"
          >
            Sign up
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full h-12 border-2 border-text-light text-text-light hover:bg-text-light hover:text-bg-dark"
          >
            Shop now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
