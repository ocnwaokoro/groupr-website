import React from 'react';

const BenefitsSection: React.FC = () => {
  return (
    <section className="w-full bg-bg-cream overflow-hidden z-[5]">
      <div className="w-full max-w-[1440px] mx-auto flex flex-col items-center px-section py-[112px] box-border text-left text-heading-sm">
      <div className="w-full flex items-center gap-20 max-w-full">
        <div className="flex-1 flex flex-col items-start justify-center gap-16">
          <h2 className="self-stretch relative text-heading-md leading-[120%] font-semibold text-text-brown">
            Simpler Shopping, Designed for You
          </h2>
          
          <div className="w-[632px] flex flex-col items-start gap-4">
            <b className="self-stretch relative text-heading-sm leading-[140%] text-text-brown">
              No extra costs. No surprise fees.{' '}
            </b>
            <p className="self-stretch relative text-base leading-[160%] font-sans text-text-brown">
              Groupr provides free delivery on all orders over $75, saving you time and money every month. We keep costs low by delivering orders to multiple customers in your building at the same time.
            </p>
          </div>
          
          <div className="w-[632px] flex flex-col items-start gap-4">
            <b className="self-stretch relative text-heading-sm leading-[140%] text-text-brown">
              Secure checkout with EBT payment options
            </b>
            <p className="self-stretch relative text-base leading-[160%] font-sans text-text-brown">
              Groupr provides safe and secure payment processing using your EBT card or other payment methods.
            </p>
          </div>
        </div>
        
        {/* Benefits Image */}
        <div className="h-[600px] w-[600px] relative rounded-[32px] overflow-x-hidden overflow-y-visible flex-shrink-0" style={{ backgroundColor: '#FFC073' }}>
          <img 
            src="/images/sections/benefits-image.png" 
            alt="Two women with Groupr bag" 
            className="w-full h-[632px] object-cover object-top -mt-8"
          />
        </div>
      </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
