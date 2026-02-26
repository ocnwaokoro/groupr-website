import React from 'react'

const TestimonialSection: React.FC = () => (
  <section className="w-full bg-bg-cream overflow-hidden relative z-[4]">
    <div className="w-full max-w-full md:max-w-[1440px] mx-auto flex flex-col items-start px-5 py-10 pb-[120px] md:flex-row md:items-center md:px-section md:py-[112px] md:pb-40 md:gap-20 gap-8 text-left text-text-brown">
      <div className="w-full aspect-square max-h-[320px] md:max-h-none md:h-[600px] md:w-[600px] relative rounded-[32px] overflow-x-hidden overflow-y-visible flex-shrink-0" style={{ backgroundColor: '#FFC073' }}>
        <img src="/images/sections/testimonial-image.png" alt="Testimonial" className="w-full h-[calc(100%+3rem)] md:h-[648px] object-cover object-top -mt-12" />
      </div>
      <div className="w-full flex flex-col gap-8 md:flex-1 md:overflow-hidden">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="h-[18.9px] w-5 flex-shrink-0" fill="#FC7B2B" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <b className="text-heading-sm leading-[140%] text-text-brown">"Groupr has made grocery shopping so easy for me. I love being able to order online and have my groceries delivered right to my door!"</b>
        <div className="flex flex-col text-base font-sans">
          <div className="font-semibold leading-[160%] text-text-brown">Maria Lopez</div>
          <div className="leading-[160%] text-text-brown">Resident, Bronx River Houses</div>
        </div>
      </div>
      <div className="absolute top-[70%] right-[4%] w-[11%] h-[19%] max-w-full overflow-hidden z-[1] pointer-events-none">
        <img src="/images/decorative/carrot-icon.svg" alt="" className="w-full h-full object-contain" aria-hidden />
      </div>
    </div>
  </section>
)

export default TestimonialSection
