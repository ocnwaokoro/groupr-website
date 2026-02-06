import React from 'react';
import Card from '../ui/Card';

interface ProductCardProps {
  name: string;
  price: string;
  description: string;
  image?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  description,
  image,
}) => {
  return (
    <Card variant="product" className="overflow-hidden flex flex-col items-start">
      <div className="w-[300px] h-[280px] flex flex-col items-start px-3 pt-3 pb-0 box-border relative isolation-isolate">
        {image ? (
          <img
            src={image}
            alt={name}
            className="self-stretch flex-1 relative max-w-full overflow-hidden max-h-full object-contain z-0 flex-shrink-0 rounded-lg bg-bg-primary/30"
          />
        ) : (
          <div className="self-stretch flex-1 relative max-w-full overflow-hidden max-h-full bg-accent-lime/20 rounded-lg z-0 flex-shrink-0 flex items-center justify-center">
            <span className="text-text-brown">Product Image</span>
          </div>
        )}
        
        {/* Add to Cart Button */}
        <button
          className="absolute right-2 bottom-2 shadow-[0px_4px_12px_-2px_rgba(0,0,0,0.05),0px_2px_8px_-2px_rgba(0,0,0,0.06)] rounded-[40px] bg-accent-green flex items-center justify-center p-3 z-[1] flex-shrink-0 hover:bg-accent-lime transition-colors"
          aria-label={`Add ${name} to cart`}
        >
          <img 
            src="/images/icons/add-to-cart-icon.svg" 
            alt="Add to cart" 
            className="w-8 h-8"
          />
        </button>
      </div>
      
      <div className="self-stretch h-[140px] flex flex-col items-center justify-between px-3 py-3 box-border gap-3">
        <div className="text-text-brown text-xl font-semibold leading-[150%]">
          {name}
        </div>
        <div className="w-[276px] h-[55px] flex flex-col items-start gap-1 text-xl">
          <div className="relative leading-[150%] font-semibold text-text-brown">
            {price}
          </div>
          <div className="relative text-sm leading-[150%] text-text-brown">
            {description}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
