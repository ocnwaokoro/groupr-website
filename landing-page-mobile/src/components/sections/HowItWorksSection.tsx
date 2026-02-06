import React from 'react';
import HowItWorksCard from './HowItWorksCard';

const STEPS = [
  {
    step: 1,
    title: 'Place Your Order',
    description:
      'Select your SNAP-eligible groceries and choose a delivery day and time. We deliver on the 3rd, 6th, and 9th of every month.',
  },
  {
    step: 2,
    title: 'Checkout Securely',
    description: 'Pay with your EBT card or other payment method.',
  },
  {
    step: 3,
    title: 'Pick Up Your Order',
    description:
      'Groupr will deliver orders to a central pickup location at your building. Show your QR code to claim your groceries!',
  },
];

const HowItWorksSection: React.FC = () => {
  return (
    <section className="w-full max-w-full bg-bg-light-green overflow-hidden flex flex-col items-center px-5 pt-8 pb-20 relative z-[8] gap-10">
      <img
        src="/images/decorative/orange-slice-icon.svg"
        alt=""
        className="absolute top-[10%] left-0 w-1/4 max-w-[100px] h-auto opacity-80 z-0"
        aria-hidden
      />
      <h2 className="relative text-heading-lg font-display leading-[125%] text-text-primary z-[1]">
        How it works:
      </h2>
      <div className="w-full flex flex-col gap-6 z-[2] text-heading-sm text-text-border">
        {STEPS.map((s) => (
          <HowItWorksCard
            key={s.step}
            step={s.step}
            title={s.title}
            description={s.description}
          />
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;
