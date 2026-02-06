import React, { useState } from 'react';
import CategoryCard from './CategoryCard';

const CATEGORIES = [
  { id: 'all', label: 'All', icon: '/images/categories/all-category-icon.svg' },
  { id: 'produce', label: 'Produce', icon: '/images/categories/produce-category-icon.svg' },
  { id: 'meat-seafood', label: 'Meat & Seafood', icon: '/images/categories/meat-seafood-category-icon.svg' },
  { id: 'pantry-staples', label: 'Pantry Staples', icon: '/images/categories/pantry-staples-category-icon.svg' },
  { id: 'dairy-eggs', label: 'Dairy & Eggs', icon: '/images/categories/dairy-eggs-category-icon.svg' },
  { id: 'cereals-snacks', label: 'Cereals & Snacks', icon: '/images/categories/cereals-snacks-category-icon.svg' },
  { id: 'breads-bakery', label: 'Breads & Bakery', icon: '/images/categories/breads-bakery-category-icon.svg' },
  { id: 'beverages', label: 'Beverages', icon: '/images/categories/beverages-category-icon.svg' },
];

const CategoryStrip: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('all');

  return (
    <div className="w-full flex items-center justify-between gap-5 text-sm flex-nowrap text-center text-text-primary">
      {CATEGORIES.map((cat) => (
        <a
          key={cat.id}
          href={`#${cat.id}`}
          className="flex-shrink-0 inline-block w-[144px]"
          onClick={(e) => {
            e.preventDefault();
            setSelectedId(cat.id);
          }}
        >
          <CategoryCard name={cat.label} icon={cat.icon} selected={selectedId === cat.id} />
        </a>
      ))}
    </div>
  );
};

export default CategoryStrip;
