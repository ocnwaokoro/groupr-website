import React from 'react';
import Card from '../ui/Card';

interface ProductCardProps {
  name: string;
  price: string;
  description: string;
  image?: string;
  /** When true, card fills container width (e.g. in a grid); otherwise fixed 160px for horizontal scroll */
  fillWidth?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, price, description, image, fillWidth }) => {
  return (
    <Card
      variant="product"
      className={`overflow-hidden flex flex-col min-w-0 ${fillWidth ? 'w-full' : 'w-[160px] flex-shrink-0'}`}
    >
      <div className="w-full h-[120px] flex flex-col pt-2 pr-2 pl-2 pb-0 relative">
        {image ? (
          <div className="w-full flex-1 min-h-0 flex items-center justify-center rounded-lg overflow-hidden z-0">
            <img
              src={image}
              alt={name}
              className="max-w-full max-h-full w-auto h-auto object-contain object-center rounded-lg"
            />
          </div>
        ) : (
          <div className="w-full flex-1 bg-accent-lime/20 rounded-lg flex items-center justify-center z-0 min-h-0">
            <span className="text-text-brown text-sm">Product</span>
          </div>
        )}
        <button
          type="button"
          className="absolute right-2 bottom-2 rounded-full bg-accent-green flex items-center justify-center p-2 z-[1] shadow-md"
          aria-label={`Add ${name} to cart`}
        >
          <img src="/images/icons/add-to-cart-icon.svg" alt="" className="w-5 h-5" />
        </button>
      </div>
      <div className="flex flex-col items-center justify-end p-3 gap-3 flex-1 min-h-[136px]">
        <div className="text-text-brown text-base font-semibold leading-[150%] text-center w-full line-clamp-2">
          {name}
        </div>
        <div className="w-full flex flex-col gap-1 text-left">
          <div className="text-base font-semibold leading-[150%] text-text-brown">{price}</div>
          <div className="text-sm leading-[150%] text-text-brown">{description}</div>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
