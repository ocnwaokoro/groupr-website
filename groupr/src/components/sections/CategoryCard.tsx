import React from 'react';
import Card from '../ui/Card';

interface CategoryCardProps {
  name: string;
  icon?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, icon }) => {
  return (
    <Card variant="category" className="w-[124px] flex flex-col items-center">
      <div className="shadow-[0px_4px_8px_-2px_rgba(126,141,120,0.01),0px_2px_4px_-2px_rgba(0,0,0,0.03)] rounded-card bg-bg-category overflow-hidden flex items-center justify-center p-3 w-[98px] h-[98px]">
        {icon ? (
          <img src={icon} alt={name} className="w-full h-full object-contain" />
        ) : (
          <div className="w-full h-full bg-accent-lime/30 rounded-lg flex items-center justify-center">
            <span className="text-text-brown font-semibold">{name[0]}</span>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center p-3 w-full">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="relative text-sm leading-[145%] font-semibold text-text-brown text-center">
            {name}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CategoryCard;
