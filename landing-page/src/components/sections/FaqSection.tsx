import React from 'react';
import AccordionItem from './AccordionItem';
import Button from '../ui/Button';

const FaqSection: React.FC = () => {
  const faqs = [
    { question: 'How do I order?' },
    { question: 'Where do you deliver?' },
    { question: 'When do you deliver?' },
    { question: 'How can I pay?' },
    { question: 'Are there any fees?' },
    { question: 'What if I need help?' },
  ];

  return (
    <section className="w-full bg-bg-light-green overflow-hidden z-[3]">
      <div className="w-full max-w-[1440px] mx-auto flex flex-col items-center px-section py-[112px] box-border">
      <div className="w-[780px] flex flex-col items-center gap-10">
        <div className="w-[768px] flex flex-col items-center gap-6">
          <b className="self-stretch relative text-heading-lg leading-[125%] font-display text-text-primary">
            FAQs
          </b>
          <p className="self-stretch relative text-base leading-[160%] font-sans text-text-brown text-center">
            Here are some common questions about ordering, delivery, and payment options.
          </p>
        </div>
        
        <div className="self-stretch flex flex-col items-start gap-7 text-left text-base text-text-border font-sans">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} question={faq.question} />
          ))}
        </div>
        
        <div className="w-[560px] flex flex-col items-center gap-6 text-heading-md text-text-brown">
          <div className="self-stretch flex flex-col items-center gap-4">
            <div className="self-stretch relative text-heading-md leading-[130%] font-semibold text-center">
              Still have questions?
            </div>
            <p className="self-stretch relative text-base leading-[160%] font-sans text-center">
              We're here to assist you!
            </p>
          </div>
          <div className="rounded-button flex items-start text-text-dark font-sans">
            <Button variant="outline" size="sm" className="border-2 border-bg-dark text-bg-dark hover:bg-bg-dark hover:text-text-light">
              Contact
            </Button>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default FaqSection;
