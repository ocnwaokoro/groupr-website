import React from 'react';
import Card from '../ui/Card';

interface HowItWorksCardProps {
  step: number;
  title: string;
  description: string;
}

const HowItWorksCard: React.FC<HowItWorksCardProps> = ({ step, title, description }) => {
  return (
    <Card variant="how-it-works" className="w-full flex flex-col items-start p-6">
      <div className="flex flex-col gap-4">
        <b className="text-heading-sm leading-[140%] text-text-brown font-display">
          {step}. {title}
        </b>
        <p className="text-base leading-[160%] font-sans text-text-brown">{description}</p>
      </div>
    </Card>
  );
};

export default HowItWorksCard;
