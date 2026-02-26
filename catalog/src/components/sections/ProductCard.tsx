import React from 'react'
import Card from '../ui/Card'

interface ProductCardProps {
  name: string
  price: string
  description: string
  image?: string
  /** When true, card fills container width (e.g. in a 2-col grid on mobile); desktop grid uses fixed width */
  fillWidth?: boolean
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  description,
  image,
  fillWidth,
}) => {
  const isCompact = fillWidth ?? false
  return (
    <Card
      variant="product"
      className={`overflow-hidden flex flex-col min-w-0 ${
        isCompact ? 'w-full' : 'w-[300px] flex-shrink-0'
      }`}
    >
      <div className={`w-full flex flex-col pt-2 pr-2 pl-2 pb-0 md:px-3 md:pt-3 relative ${
        isCompact ? 'h-[120px]' : 'h-[280px]'
      }`}>
        {image ? (
          isCompact ? (
            <div className="w-full flex-1 min-h-0 flex items-center justify-center rounded-lg overflow-hidden z-0">
              <img
                src={image}
                alt={name}
                className="max-w-full max-h-full w-auto h-auto object-contain object-center rounded-lg"
              />
            </div>
          ) : (
            <img
              src={image}
              alt={name}
              className="self-stretch flex-1 relative max-w-full overflow-hidden max-h-full object-contain z-0 flex-shrink-0 rounded-lg bg-bg-primary/30"
            />
          )
        ) : (
          <div className={`self-stretch flex-1 rounded-lg z-0 flex items-center justify-center bg-accent-lime/20 ${
            isCompact ? 'min-h-0' : ''
          }`}>
            <span className="text-text-brown text-sm md:text-base">Product Image</span>
          </div>
        )}
        <button
          type="button"
          className="absolute right-2 bottom-2 rounded-full md:rounded-[40px] bg-accent-green flex items-center justify-center p-2 md:p-3 z-[1] shadow-md hover:bg-accent-lime transition-colors"
          aria-label={`Add ${name} to cart`}
        >
          <img
            src="/images/icons/add-to-cart-icon.svg"
            alt=""
            className="w-5 h-5 md:w-8 md:h-8"
          />
        </button>
      </div>

      <div className={`flex flex-col items-center md:items-start justify-end p-3 gap-3 flex-1 min-h-[136px] md:min-h-0 md:h-[140px] md:justify-between ${
        isCompact ? '' : 'md:gap-3'
      }`}>
        <div className={`text-text-brown font-semibold leading-[150%] w-full text-center md:text-left ${
          isCompact ? 'text-base line-clamp-2' : 'text-xl'
        }`}>
          {name}
        </div>
        <div className="w-full flex flex-col gap-1 text-left">
          <div className={`font-semibold leading-[150%] text-text-brown ${
            isCompact ? 'text-base' : 'text-xl'
          }`}>
            {price}
          </div>
          <div className="text-sm leading-[150%] text-text-brown">{description}</div>
        </div>
      </div>
    </Card>
  )
}

export default ProductCard
