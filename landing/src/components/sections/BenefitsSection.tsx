import React from 'react'

const BenefitsSection: React.FC = () => (
  <section className="w-full bg-bg-cream overflow-hidden z-[5]">
    <div className="w-full max-w-full md:max-w-[1440px] mx-auto flex flex-col items-start px-5 pt-16 pb-6 gap-20 md:flex-row md:items-center md:px-section md:py-[112px] md:gap-20 text-left text-heading-sm">
      {/* Text left on desktop, below image on mobile */}
      <div className="w-full flex flex-col gap-10 order-2 md:order-none md:flex-1 md:gap-16">
        <h2 className="text-heading-md font-semibold leading-[120%] text-text-brown">Simpler Shopping, Designed for You</h2>
        <div className="flex flex-col gap-6 md:gap-4">
          <div className="flex flex-col gap-4 md:w-[632px]">
            <b className="text-heading-sm leading-[140%] text-text-brown">No extra costs. No surprise fees.</b>
            <p className="text-base leading-[160%] font-sans text-text-brown">Groupr provides free delivery on all orders over $75, saving you time and money every month. We keep costs low by delivering orders to multiple customers in your building at the same time.</p>
          </div>
          <div className="flex flex-col gap-4 md:w-[632px]">
            <b className="text-heading-sm leading-[140%] text-text-brown">Secure checkout with EBT payment options</b>
            <p className="text-base leading-[160%] font-sans text-text-brown">Groupr provides safe and secure payment processing using your EBT card or other payment methods.</p>
          </div>
        </div>
      </div>
      {/* Image right on desktop, above text on mobile */}
      <div className="w-full aspect-square max-h-[320px] order-first md:order-none md:max-h-none md:h-[600px] md:w-[600px] relative rounded-[32px] overflow-x-hidden overflow-y-visible flex-shrink-0" style={{ backgroundColor: '#FFC073' }}>
        <img src="/images/sections/benefits-image.png" alt="Two women with Groupr bag" className="w-full h-[calc(100%+2rem)] md:h-[632px] object-cover object-top -mt-8" />
      </div>
    </div>
  </section>
)

export default BenefitsSection
