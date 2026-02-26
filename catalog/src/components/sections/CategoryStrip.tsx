import React, { useState, useRef } from 'react'
import CategoryCard from './CategoryCard'

const CATEGORIES = [
  { id: 'all', label: 'All', icon: '/images/categories/all-category-icon.svg' },
  { id: 'produce', label: 'Produce', icon: '/images/categories/produce-category-icon.svg' },
  { id: 'meat-seafood', label: 'Meat & Seafood', icon: '/images/categories/meat-seafood-category-icon.svg' },
  { id: 'pantry-staples', label: 'Pantry Staples', icon: '/images/categories/pantry-staples-category-icon.svg' },
  { id: 'dairy-eggs', label: 'Dairy & Eggs', icon: '/images/categories/dairy-eggs-category-icon.svg' },
  { id: 'cereals-snacks', label: 'Cereals & Snacks', icon: '/images/categories/cereals-snacks-category-icon.svg' },
  { id: 'breads-bakery', label: 'Breads & Bakery', icon: '/images/categories/breads-bakery-category-icon.svg' },
  { id: 'beverages', label: 'Beverages', icon: '/images/categories/beverages-category-icon.svg' },
]

const SCROLL_AMOUNT = 240

const CategoryStrip: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('all')
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    const amount = direction === 'left' ? -SCROLL_AMOUNT : SCROLL_AMOUNT
    el.scrollBy({ left: amount, behavior: 'smooth' })
  }

  return (
    <div className="w-full max-w-full mx-auto flex items-center gap-2 min-h-[130px] md:min-h-0 md:justify-between md:gap-5">
      {/* Mobile: left chevron */}
      <button
        type="button"
        className="flex-shrink-0 w-12 h-12 flex items-center justify-center text-text-brown md:hidden"
        aria-label="Scroll left"
        onClick={() => scroll('left')}
      >
        <img src="/images/icons/dropdown-icon.svg" alt="" className="w-10 h-10 rotate-90" />
      </button>

      {/* Scroll container (mobile) / flex row (desktop) */}
      <div
        ref={scrollRef}
        className="flex-1 min-w-0 w-full overflow-x-auto overflow-y-hidden flex items-start gap-5 px-2 scrollbar-hide touch-pan-x md:overflow-visible md:flex md:items-center md:justify-between md:gap-5"
        style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
      >
        {CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            style={{ scrollSnapAlign: 'start' }}
            className="flex-shrink-0 md:inline-block"
          >
            <a
              href={`#${cat.id}`}
              className="md:block"
              onClick={(e) => {
                e.preventDefault()
                setSelectedId(cat.id)
              }}
            >
              <CategoryCard name={cat.label} icon={cat.icon} selected={selectedId === cat.id} />
            </a>
          </div>
        ))}
      </div>

      {/* Mobile: right chevron */}
      <button
        type="button"
        className="flex-shrink-0 w-12 h-12 flex items-center justify-center text-text-brown md:hidden"
        aria-label="Scroll right"
        onClick={() => scroll('right')}
      >
        <img src="/images/icons/dropdown-icon.svg" alt="" className="w-10 h-10 -rotate-90" />
      </button>
    </div>
  )
}

export default CategoryStrip
