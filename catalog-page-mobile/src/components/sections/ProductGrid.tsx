import React from 'react'
import ProductCard from './ProductCard'
import { PRODUCTS } from '../../data/products'

const ProductGrid: React.FC = () => (
  <div className="w-full max-w-full flex flex-col gap-6">
    <h2 className="font-display font-semibold text-2xl leading-[120%] text-text-primary px-0">
      All Products
    </h2>
    <div className="grid grid-cols-2 gap-x-3 gap-y-4 px-0">
      {PRODUCTS.map((p) => (
        <ProductCard
          key={p.id}
          name={p.name}
          price={p.price}
          description={p.description}
          image={p.image}
          fillWidth
        />
      ))}
    </div>
  </div>
)

export default ProductGrid
