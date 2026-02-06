import React from 'react';
import Card from '../ui/Card';

interface HowItWorksCardProps {
  step: number;
  title: string;
  description: string;
}

const HowItWorksCard: React.FC<HowItWorksCardProps> = ({
  step,
  title,
  description,
}) => {
  return (
    <Card variant="how-it-works" className="self-stretch flex-1 overflow-hidden flex flex-col items-start p-6">
      <div className="self-stretch flex flex-col items-start gap-4">
        <b className="self-stretch relative text-heading-sm leading-[140%] text-text-brown">
          {step}. {title}
        </b>
        <p className="self-stretch relative text-base leading-[160%] font-sans text-text-brown">
          {description}
        </p>
      </div>
    </Card>
  );
};

export default HowItWorksCard;
