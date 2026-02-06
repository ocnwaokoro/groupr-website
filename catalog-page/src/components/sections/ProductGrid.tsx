import React from 'react'
import ProductCard from './ProductCard'
import { PRODUCTS } from '../../data/products'

const ProductGrid: React.FC = () => (
  <div className="w-full flex flex-col gap-10">
    <h2 className="font-display font-semibold text-[36px] leading-[120%] text-text-primary">
      All Products
    </h2>
    <div
      className="grid gap-x-5 gap-y-10"
      style={{ gridTemplateColumns: 'repeat(4, 300px)' }}
    >
      {PRODUCTS.map((p) => (
        <ProductCard
          key={p.id}
          name={p.name}
          price={p.price}
          description={p.description}
          image={p.image}
        />
      ))}
    </div>
  </div>
)

export default ProductGrid
