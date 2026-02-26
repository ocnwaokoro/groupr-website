import React from 'react'
import ProductCard from './ProductCard'
import { PRODUCTS } from '../../data/products'
import { useMediaQuery } from '../../hooks/useMediaQuery'

const ProductGrid: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 767px)')
  return (
    <div className="w-full max-w-full flex flex-col gap-6 md:gap-10">
      <h2 className="font-display font-semibold text-2xl md:text-[36px] md:leading-[120%] leading-[120%] text-text-primary px-0">
        All Products
      </h2>
      <div
        className="grid grid-cols-2 gap-x-3 gap-y-4 md:gap-x-5 md:gap-y-10 px-0"
        style={
          isMobile
            ? undefined
            : { gridTemplateColumns: 'repeat(4, 300px)' }
        }
      >
        {PRODUCTS.map((p) => (
          <ProductCard
            key={p.id}
            name={p.name}
            price={p.price}
            description={p.description}
            image={p.image}
            fillWidth={isMobile}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductGrid
