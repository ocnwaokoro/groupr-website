import React from 'react';
import HowItWorksCard from './HowItWorksCard';

const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      step: 1,
      title: 'Place Your Order',
      description:
        'Select your SNAP-eligible groceries and choose a delivery day and time. We deliver on the 3rd, 6th, and 9th of every month.',
    },
    {
      step: 2,
      title: 'Checkout Securely',
      description:
        'Pay with your EBT card or other payment method.',
    },
    {
      step: 3,
      title: 'Pick Up Your Order',
      description:
        'Groupr will deliver orders to a central pickup location at your building. Show your QR code to claim your groceries!',
    },
  ];

  return (
    <section className="self-stretch bg-bg-light-green overflow-hidden flex flex-col items-center px-section py-16 pb-20 relative isolation-isolate gap-8 z-[8]">
      {/* Decorative Orange Slice Icon */}
      <div className="absolute top-[13.35%] right-[89.38%] bottom-[56.43%] left-[1.94%] w-[8.67%] h-[30.22%] max-w-full overflow-hidden max-h-full z-0 flex-shrink-0">
        <img 
          src="/images/decorative/orange-slice-icon.svg" 
          alt="" 
          className="w-full h-full object-contain"
          aria-hidden="true"
        />
      </div>

      <h2 className="w-[768px] relative text-heading-lg leading-[125%] inline-block z-[1] flex-shrink-0 font-display">
        How it works:
      </h2>

      <div className="self-stretch flex flex-col items-start z-[2] flex-shrink-0 text-heading-sm text-text-border">
        <div className="self-stretch flex items-start justify-center gap-6">
          {steps.map((step) => (
            <HowItWorksCard
              key={step.step}
              step={step.step}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
