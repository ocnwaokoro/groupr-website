import React from 'react';
import AccordionItem from './AccordionItem';
import Button from '../ui/Button';

const FaqSection: React.FC = () => {
  const faqs = [
    {
      question: 'How do I order?',
      answer: 'To place an order, simply browse our selection of groceries on the Groupr app. Add your desired items to your cart and select a delivery date within the first nine days of the month. Finally, proceed to checkout and pay using your EBT card.',
    },
    {
      question: 'Where do you deliver?',
      answer: "We currently deliver to several locations in New York City, and will be adding more soon. If we don't deliver to your building yet, you can still create an account and join our newsletter for updates. Groupr is still growing — stay tuned!",
    },
    {
      question: 'When do you deliver?',
      answer: 'We offer delivery on the 3rd, 6th, and 9th of every month. Our delivery time slots are morning (7:00 AM to 9:00 AM) or evening (7:00 PM to 9:00 PM). You can choose the date and time that works best for you when you place your order. Your groceries will arrive in a central area of your building, where you can show us your order confirmation QR code to pick them up.',
    },
    {
      question: 'How can I pay?',
      answer: 'You can pay for your groceries with our secure checkout process using SNAP, EBT Cash, credit, or debit. We use Forage payment processing to safely charge your EBT card and keep your payment information secure.',
    },
    {
      question: 'Are there any fees?',
      answer: 'We offer free delivery on orders over $75. We are required to charge a bottle deposit fee of 5 cents per bottle on bottled water and carbonated drinks. That\'s it! There are no hidden fees when you order through Groupr.',
    },
    {
      question: 'What if I need help?',
      answer: "If you have any questions or need assistance, our customer service team is here to help. You can reach out through our contact page for support. We're committed to making your experience seamless.",
    },
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
            <AccordionItem key={index} question={faq.question} answer={faq.answer} />
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
