import React, { useState } from 'react'
import Button from '../ui/Button'

const PromoBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div className="w-full bg-bg-dark flex items-center justify-center py-3 px-section text-text-light">
      <div className="flex items-center justify-center gap-10 max-w-[1312px] w-full relative">
        <span className="font-semibold leading-[160%]">Give $5, get $5</span>
        <span className="leading-[160%]">
          When you refer a friend to Groupr, you both get $5 off your next order!
        </span>
        <Button variant="light" size="sm" className="!py-2 !px-4">
          Share Groupr
        </Button>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-white/10 transition-colors"
          aria-label="Dismiss"
        >
          <img src="/images/icons/close-icon.svg" alt="" className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}

export default PromoBanner
