import React from 'react'
import Card from '../ui/Card'

interface CategoryCardProps {
  name: string
  icon?: string
  selected?: boolean
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, icon, selected = false }) => {
  return (
    <Card
      variant="category"
      className="w-24 md:w-[144px] flex-shrink-0 flex flex-col items-center"
    >
      <div
        className={`rounded-[24px] md:rounded-card overflow-hidden flex items-center justify-center p-2 w-20 h-20 md:p-3 md:w-[120px] md:h-[120px] ${
          selected ? 'bg-[#FFBA55]' : 'bg-bg-category'
        }`}
        style={{
          boxShadow: '0px 4px 8px -2px rgba(126,141,120,0.01), 0px 2px 4px -2px rgba(0,0,0,0.03)',
        }}
      >
        {icon ? (
          <img src={icon} alt={name} className="w-full h-full object-contain" />
        ) : (
          <span className="text-text-brown font-semibold text-sm md:text-base">{name[0]}</span>
        )}
      </div>
      <div className="flex flex-col items-center px-1 py-2 md:p-3 w-full min-w-0">
        <span className="text-xs md:text-sm leading-[150%] font-semibold text-text-brown text-center break-words md:whitespace-nowrap md:overflow-hidden md:text-ellipsis w-full block">
          {name}
        </span>
      </div>
    </Card>
  )
}

export default CategoryCard
