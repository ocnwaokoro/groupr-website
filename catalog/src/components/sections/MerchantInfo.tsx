import React from 'react'

const MerchantInfo: React.FC = () => (
  <div className="flex flex-col items-center gap-1 text-center px-4 md:px-0">
    <div className="flex items-center justify-center gap-2">
      <span className="text-sm md:text-base leading-[150%] text-text-brown">Items Fulfilled by:</span>
      <img
        src="/images/merchant/foodtown-logo.png"
        alt="Foodtown"
        className="h-6 md:h-8 object-contain"
      />
    </div>
    <p className="text-xs md:text-sm leading-[150%] text-text-brown">
      Foodtown, 47-33 Bell Blvd, Bayside, NY 11361
    </p>
  </div>
)

export default MerchantInfo
