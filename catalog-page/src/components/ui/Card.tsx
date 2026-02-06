import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'how-it-works' | 'category' | 'product'
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
}) => {
  const variantClasses = {
    default: 'rounded-card shadow-[0px_4px_12px_-2px_rgba(0,0,0,0.05),0px_2px_8px_-2px_rgba(0,0,0,0.06)]',
    'how-it-works': 'rounded-[20px] shadow-[0px_4px_12px_-2px_rgba(0,0,0,0.05),0px_2px_8px_-2px_rgba(0,0,0,0.06)] bg-bg-card',
    category: 'drop-shadow-[0px_4px_8px_rgba(126,141,120,0.01)] drop-shadow-[0px_2px_4px_rgba(0,0,0,0.03)]',
    product: 'rounded-card shadow-[0px_4px_8px_-2px_rgba(126,141,120,0.01),0px_2px_4px_-2px_rgba(0,0,0,0.03)] bg-bg-product',
  }

  const classes = `
    ${variantClasses[variant]}
    ${className}
  `.trim().replace(/\s+/g, ' ')

  return (
    <div className={classes}>
      {children}
    </div>
  )
}

export default Card
