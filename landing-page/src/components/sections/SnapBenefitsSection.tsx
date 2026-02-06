import React from 'react';
import Button from '../ui/Button';

const SnapBenefitsSection: React.FC = () => {
  return (
    <section className="self-stretch bg-bg-cream overflow-hidden flex flex-col items-center px-section py-16 pb-20 relative isolation-isolate gap-10 z-[7] text-xl text-text-brown">
      <div className="w-[1046px] flex flex-col items-center px-[120px] py-6 box-border gap-11 z-0 flex-shrink-0">
        <div className="flex flex-col items-center">
          <b className="relative text-xl leading-[140%] text-text-brown">
            Stretching your SNAP benefits each month can be tough. We're here to help you make the most of your budget—all our items are SNAP-eligible, so everything you see is covered!
          </b>
        </div>
        
        <div className="flex items-start gap-4 text-base text-text-light font-sans">
          <Button variant="primary" size="sm" className="h-12 box-border bg-bg-dark text-text-light hover:bg-bg-dark-alt">
            Sign up
          </Button>
          <Button variant="outline" size="sm" className="h-12 box-border border-2 border-bg-dark text-bg-dark bg-transparent hover:bg-bg-dark hover:text-text-light">
            Shop now
          </Button>
        </div>
      </div>

      {/* Decorative Bread Icon */}
      <div className="absolute top-[25.27%] right-[8.22%] bottom-[13.78%] left-[77.99%] w-[13.79%] h-[60.95%] max-w-full overflow-hidden max-h-full object-contain z-[1] flex-shrink-0">
        <img 
          src="/images/decorative/bread-icon.svg" 
          alt="" 
          className="w-full h-full object-contain"
          aria-hidden="true"
        />
      </div>
    </section>
  );
};

export default SnapBenefitsSection;
