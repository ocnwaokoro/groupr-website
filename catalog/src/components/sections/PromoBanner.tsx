import React, { useState } from 'react'
import Button from '../ui/Button'

const PromoBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div className="w-full bg-bg-dark flex items-center justify-center py-4 px-5 md:py-3 md:px-section text-text-light relative overflow-hidden">
      <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-10 max-w-[1312px] w-full relative pr-8 md:pr-0">
        <span className="font-semibold leading-[160%] text-center md:text-left">Give $5, get $5</span>
        <span className="text-sm md:text-base leading-[160%] text-center md:text-left">
          When you refer a friend to Groupr, you both get $5 off your next order!
        </span>
        <Button variant="light" size="sm" className="!py-2 !px-4">
          Share Groupr
        </Button>
      </div>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="absolute right-2 top-2 md:right-0 md:top-1/2 md:-translate-y-1/2 p-1 rounded hover:bg-white/10 transition-colors"
        aria-label="Dismiss"
      >
        <img src="/images/icons/close-icon.svg" alt="" className="w-6 h-6" />
      </button>
    </div>
  )
}

export default PromoBanner
