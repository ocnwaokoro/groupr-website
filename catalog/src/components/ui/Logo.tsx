import React from 'react'

interface LogoProps {
  className?: string
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  const sizeClasses = className ?? 'h-8 w-[37px] md:h-[52px] md:w-[60px]'
  return (
    <div className={`${sizeClasses} relative flex-shrink-0`}>
      <img
        src="/images/logo/groupr-logo.svg"
        alt="Groupr Logo"
        className="w-full h-full object-contain"
      />
    </div>
  )
}

export default Logo
