import React from 'react';
import CategoryStrip from './CategoryStrip';
import ProductCard from './ProductCard';
import Button from '../ui/Button';

const ProductsSection: React.FC = () => {
  const featuredProducts = [
    { name: '$50 Assortment Bag', price: '$50.00', description: '9 items', image: '/images/products/featured/assortment-bag-50.png' },
    { name: '$75 Assortment Bag', price: '$75.00', description: '14 items', image: '/images/products/featured/assortment-bag-75.png' },
    { name: '$100 Assortment Bag', price: '$100.00', description: '18 items', image: '/images/products/featured/assortment-bag-100.png' },
  ];

  const produceProducts = [
    { name: 'Bananas', price: '$1.60', description: '3 lbs', image: '/images/products/produce/bananas-product.png' },
    { name: 'Red Apples', price: '$5.30', description: '4 lbs', image: '/images/products/produce/red-apples-product.png' },
    { name: 'Mandarin Oranges', price: '$7.40', description: '5 lbs', image: '/images/products/produce/mandarin-oranges-product.png' },
    { name: 'Green Seedless Grapes', price: '$9.50', description: '4 lbs', image: '/images/products/produce/green-seedless-grapes-product.png' },
  ];

  const meatSeafoodProducts = [
    { name: "Libby's Vienna Sausages", price: '$0.80', description: '4.6 oz - 1 can', image: '/images/products/meat-seafood/vienna-sausages-product.png' },
    { name: 'Sliced Bacon', price: '$3.60', description: '1 lb', image: '/images/products/meat-seafood/sliced-bacon-product.png' },
    { name: 'Jumbo Uncooked Shrimp', price: '$11.10', description: '1.5 lbs', image: '/images/products/meat-seafood/jumbo-shrimp-product.png' },
    { name: 'Beef Hot Dogs', price: '$14.70', description: '28 franks (3.5 lbs)', image: '/images/products/meat-seafood/beef-hot-dogs-product.png' },
  ];

  return (
    <section className="w-full bg-bg-primary overflow-hidden z-[6]">
      <div className="w-full max-w-[1440px] mx-auto flex flex-col items-center px-section py-[120px] box-border gap-16 text-base font-sans">
      {/* Category Row */}
      <div className="self-stretch flex items-center justify-center py-8">
        <CategoryStrip />
      </div>

      {/* Featured Products */}
      <div className="w-[1312px] flex items-end justify-end text-heading-lg font-display">
        <div className="flex-1 flex flex-col items-center">
          <b className="relative text-heading-lg leading-[125%]">Featured products</b>
          <button className="relative text-sm underline leading-[150%] font-sans text-text-brown text-left mt-2">
            Shop the full store
          </button>
        </div>
      </div>

      <div className="w-[1312px] flex flex-col items-start gap-10 text-left text-text-brown">
        {/* Featured Products Row */}
        <div className="self-stretch flex items-start gap-8">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.name}
              name={product.name}
              price={product.price}
              description={product.description}
              image={product.image}
            />
          ))}
        </div>

        {/* Produce Section */}
        <div className="w-[1312px] flex flex-col items-end justify-end text-center text-heading-md font-display">
          <div className="self-stretch flex items-end justify-between gap-5">
            <div className="relative text-heading-md leading-[120%] font-semibold">Produce</div>
            <button className="relative text-base underline leading-[150%] font-semibold font-sans text-left">
              View All
            </button>
          </div>
        </div>

        <div className="self-stretch flex items-start gap-8">
          {produceProducts.map((product) => (
            <ProductCard
              key={product.name}
              name={product.name}
              price={product.price}
              description={product.description}
              image={product.image}
            />
          ))}
        </div>

        {/* Meat & Seafood Section */}
        <div className="w-[1312px] flex flex-col items-end justify-end text-center text-heading-md font-display">
          <div className="self-stretch flex items-end justify-between gap-5">
            <div className="relative text-heading-md leading-[120%] font-semibold">Meat & Seafood</div>
            <button className="relative text-base underline leading-[150%] font-semibold font-sans text-left">
              View All
            </button>
          </div>
        </div>

        <div className="self-stretch flex items-start gap-8">
          {meatSeafoodProducts.map((product) => (
            <ProductCard
              key={product.name}
              name={product.name}
              price={product.price}
              description={product.description}
              image={product.image}
            />
          ))}
        </div>

        {/* See the full store button */}
        <div className="rounded-button flex items-start text-text-light">
          <Button variant="primary" size="sm" className="bg-bg-dark text-text-light hover:bg-bg-dark-alt">
            See the full store
          </Button>
        </div>
      </div>
      </div>
    </section>
  );
};

export default ProductsSection;
