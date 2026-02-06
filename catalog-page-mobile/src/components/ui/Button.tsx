import React from 'react'

interface ButtonProps {
  variant?: 'primary' | 'outline' | 'light' | 'dark'
  size?: 'sm' | 'lg'
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  className?: string
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'lg',
  children,
  onClick,
  type = 'button',
  className = '',
}) => {
  const baseClasses = 'rounded-button font-sans font-semibold transition-colors text-center flex items-center justify-center'

  const variantClasses: Record<string, string> = {
    primary: 'bg-accent-orange text-text-brown hover:bg-accent-orange-dark',
    outline: 'border-2 border-accent-orange-dark text-accent-orange-dark bg-transparent hover:bg-accent-orange hover:text-text-brown',
    light: 'bg-text-light text-text-brown hover:bg-white',
    dark: 'bg-bg-dark text-text-light hover:bg-bg-dark-alt',
  }

  const sizeClasses: Record<string, string> = {
    sm: 'px-4 py-2 text-base',
    lg: 'px-6 py-5 text-xl h-16',
  }

  const outlineLightClasses = 'border-2 border-text-light text-text-light bg-transparent hover:bg-text-light hover:text-bg-dark'

  const getOutlineClasses = () => {
    if (className.includes('border-') && className.includes('text-')) {
      return ''
    }
    if (className.includes('dark') || className.includes('bg-bg-dark')) {
      return outlineLightClasses
    }
    return variant === 'outline' ? variantClasses.outline : ''
  }

  const getVariantClasses = () => {
    if (variant === 'light' || variant === 'dark') {
      return variantClasses[variant]
    }
    if (variant === 'primary') {
      return variantClasses.primary
    }
    return getOutlineClasses() || variantClasses.outline
  }

  const classes = `
    ${baseClasses}
    ${getVariantClasses()}
    ${sizeClasses[size]}
    ${className}
  `.trim().replace(/\s+/g, ' ')

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
    >
      {children}
    </button>
  )
}

export default Button
