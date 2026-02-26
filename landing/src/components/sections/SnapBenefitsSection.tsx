import React from 'react'
import Button from '../ui/Button'

const SnapBenefitsSection: React.FC = () => (
  <section className="w-full max-w-full bg-bg-cream overflow-hidden flex flex-col items-end px-5 pt-16 pb-[104px] md:items-center md:px-section md:py-16 md:pb-20 relative z-[7] gap-10">
    <img
      src="/images/decorative/bread-icon.svg"
      alt=""
      className="absolute bottom-0 right-0 w-[38%] max-h-[33%] object-contain object-bottom z-0 opacity-90 md:top-[25.27%] md:right-[8.22%] md:bottom-[13.78%] md:left-[77.99%] md:w-[13.79%] md:h-[60.95%] md:max-w-full md:max-h-full"
      aria-hidden
    />
    <div className="w-full flex flex-col items-center gap-11 z-[1] md:w-[1046px] md:px-[120px] md:py-6">
      <b className="text-xl leading-[140%] text-text-brown text-center">
        Stretching your SNAP benefits each month can be tough. We're here to help you make the most of your budget—all our items are SNAP-eligible, so everything you see is covered!
      </b>
      <div className="w-full flex flex-col gap-4 md:flex-row md:gap-4 md:justify-center items-center text-base text-text-light font-sans">
        <Button variant="primary" size="sm" className="w-full md:w-auto h-12 bg-bg-dark text-text-light hover:bg-bg-dark-alt">Sign up</Button>
        <Button variant="outline" size="sm" className="w-full md:w-auto h-12 border-2 border-bg-dark text-bg-dark bg-transparent hover:bg-bg-dark hover:text-text-light">Shop now</Button>
      </div>
    </div>
  </section>
)

export default SnapBenefitsSection
