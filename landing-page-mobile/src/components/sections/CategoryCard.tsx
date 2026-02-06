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
      className="w-24 flex-shrink-0 flex flex-col items-center"
    >
      <div
        className={`rounded-[24px] overflow-hidden flex items-center justify-center p-2 w-20 h-20 ${
          selected ? 'bg-[#FFBA55]' : 'bg-bg-category'
        }`}
        style={{
          boxShadow: '0px 4px 8px -2px rgba(126,141,120,0.01), 0px 2px 4px -2px rgba(0,0,0,0.03)',
        }}
      >
        {icon ? (
          <img src={icon} alt={name} className="w-full h-full object-contain" />
        ) : (
          <span className="text-text-brown font-semibold text-sm">{name[0]}</span>
        )}
      </div>
      <div className="flex flex-col items-center px-1 py-2 w-full min-w-0">
        <span className="text-xs leading-[150%] font-semibold text-text-brown text-center break-words w-full block">
          {name}
        </span>
      </div>
    </Card>
  )
}

export default CategoryCard
