import React from 'react';
import CategoryStrip from './CategoryStrip';
import ProductCard from './ProductCard';
import Button from '../ui/Button';

const FEATURED = [
  {
    name: '$50 Assortment Bag',
    price: '$50.00',
    description: '9 items',
    image: '/images/products/featured/assortment-bag-50.png',
  },
  {
    name: '$75 Assortment Bag',
    price: '$75.00',
    description: '14 items',
    image: '/images/products/featured/assortment-bag-75.png',
  },
  {
    name: '$100 Assortment Bag',
    price: '$100.00',
    description: '18 items',
    image: '/images/products/featured/assortment-bag-100.png',
  },
];

const PRODUCE = [
  { name: 'Bananas', price: '$1.60', description: '3 lbs', image: '/images/products/produce/bananas-product.png' },
  { name: 'Red Apples', price: '$5.30', description: '4 lbs', image: '/images/products/produce/red-apples-product.png' },
  { name: 'Mandarin Oranges', price: '$7.40', description: '5 lbs', image: '/images/products/produce/mandarin-oranges-product.png' },
  { name: 'Green Seedless Grapes', price: '$9.50', description: '4 lbs', image: '/images/products/produce/green-seedless-grapes-product.png' },
];

const MEAT_SEAFOOD = [
  { name: "Libby's Vienna Sausages", price: '$0.80', description: '4.6 oz - 1 can', image: '/images/products/meat-seafood/vienna-sausages-product.png' },
  { name: 'Sliced Bacon', price: '$3.60', description: '1 lb', image: '/images/products/meat-seafood/sliced-bacon-product.png' },
  { name: 'Jumbo Uncooked Shrimp', price: '$11.10', description: '1.5 lbs', image: '/images/products/meat-seafood/jumbo-shrimp-product.png' },
  { name: 'Beef Hot Dogs', price: '$14.70', description: '28 franks (3.5 lbs)', image: '/images/products/meat-seafood/beef-hot-dogs-product.png' },
];

const ProductsSection: React.FC = () => {
  return (
    <section className="w-full max-w-full bg-bg-primary overflow-hidden z-[6]">
      <div className="w-full flex flex-col items-center pt-16 pb-20 gap-16 text-base font-sans">
        <div className="w-full">
          <CategoryStrip />
        </div>
        <div className="w-full flex flex-col items-center gap-2 text-center px-5">
          <b className="text-heading-lg font-display leading-[125%]">Featured products</b>
          <a href="#shop" className="text-sm underline leading-[150%] text-text-brown">
            Shop the full store
          </a>
        </div>

        <div className="w-full flex flex-col gap-10 text-text-brown px-5">
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5" style={{ scrollSnapType: 'x mandatory' }}>
            {FEATURED.map((p) => (
              <div key={p.name} style={{ scrollSnapAlign: 'start' }} className="flex-shrink-0">
                <ProductCard name={p.name} price={p.price} description={p.description} image={p.image} />
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-end justify-between">
              <span className="text-heading-md font-semibold leading-[120%]">Produce</span>
              <a href="#produce" className="text-base underline font-semibold">View All</a>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {PRODUCE.map((p) => (
                <ProductCard
                  key={p.name}
                  name={p.name}
                  price={p.price}
                  description={p.description}
                  image={p.image}
                  fillWidth
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-end justify-between">
              <span className="text-heading-md font-semibold leading-[120%]">Meat & Seafood</span>
              <a href="#meat-seafood" className="text-base underline font-semibold">View All</a>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {MEAT_SEAFOOD.map((p) => (
                <ProductCard
                  key={p.name}
                  name={p.name}
                  price={p.price}
                  description={p.description}
                  image={p.image}
                  fillWidth
                />
              ))}
            </div>
          </div>

          <Button
            variant="primary"
            size="sm"
            className="w-full bg-bg-dark text-text-light hover:bg-bg-dark-alt"
          >
            See the full store
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
