import React from 'react';
import Button from '../ui/Button';

const CtaSection: React.FC = () => {
  return (
    <section className="w-full bg-bg-dark-alt overflow-hidden relative isolation-isolate z-[1]">
      {/* Background Image - full width */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/sections/cta-background-image.svg" 
          alt="" 
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
      </div>

      <div className="relative w-full max-w-[1440px] mx-auto flex flex-col items-center px-section py-[136px] box-border gap-20 text-text-light">
      <div className="w-[768px] flex flex-col items-center gap-8 z-[1] flex-shrink-0">
        <div className="self-stretch flex flex-col items-center gap-6">
          <b className="self-stretch relative text-heading-lg leading-[125%] font-display text-center">
            Get Your Groceries Delivered
          </b>
          <p className="self-stretch relative text-lg leading-[150%] font-sans text-center">
            Join our community and enjoy convenient grocery delivery tailored for your needs and budget.
          </p>
        </div>

        <div className="flex items-start gap-4 text-base text-text-brown font-sans">
          <Button variant="primary" size="sm" className="h-12 box-border bg-text-light text-text-brown hover:bg-bg-primary">
            Sign up
          </Button>
          <Button variant="outline" size="sm" className="h-12 box-border border-2 border-text-light text-text-light hover:bg-text-light hover:text-bg-dark">
            Shop now
          </Button>
        </div>
      </div>
      </div>
    </section>
  );
};

export default CtaSection;
