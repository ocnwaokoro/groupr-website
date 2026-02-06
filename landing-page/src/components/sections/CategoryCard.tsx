import React from 'react';
import Card from '../ui/Card';

interface CategoryCardProps {
  name: string;
  icon?: string;
  selected?: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, icon, selected = false }) => {
  return (
    <Card variant="category" className="w-[144px] flex flex-col items-center flex-shrink-0">
      <div
        className={`shadow-[0px_4px_8px_-2px_rgba(126,141,120,0.01),0px_2px_4px_-2px_rgba(0,0,0,0.03)] rounded-card overflow-hidden flex items-center justify-center p-3 w-[120px] h-[120px] ${selected ? 'bg-[#FFBA55]' : 'bg-bg-category'}`}
      >
        {icon ? (
          <img src={icon} alt={name} className="w-full h-full object-contain" />
        ) : (
          <div className="w-full h-full bg-accent-lime/30 rounded-lg flex items-center justify-center">
            <span className="text-text-brown font-semibold">{name[0]}</span>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center p-3 w-full min-w-0">
        <div className="flex flex-col items-center justify-center w-full min-w-0">
          <div
            className="relative text-sm leading-[145%] font-semibold text-text-brown text-center whitespace-nowrap overflow-hidden text-ellipsis w-full block"
            title={name}
          >
            {name}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CategoryCard;
