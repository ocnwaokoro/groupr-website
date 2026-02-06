import React from 'react'

interface LogoProps {
  className?: string
}

const Logo: React.FC<LogoProps> = ({ className = 'h-8 w-[37px]' }) => {
  return (
    <div className={`${className} relative flex-shrink-0`}>
      <img
        src="/images/logo/groupr-logo.svg"
        alt="Groupr"
        className="w-full h-full object-contain"
      />
    </div>
  )
}

export default Logo
