import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import RadioGroup from '../ui/RadioGroup';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    assistType: '',
    message: '',
  });

  const assistOptions = [
    { value: 'order-help', label: 'Order Help' },
    { value: 'product-question', label: 'Product Question' },
    { value: 'delivery-issue', label: 'Delivery Issue' },
    { value: 'feedback', label: 'Feedback' },
    { value: 'expand', label: 'Expand to my neighborhood!' },
    { value: 'other', label: 'Other' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  return (
    <section className="w-full bg-bg-primary overflow-hidden z-[2]">
      <div className="w-full max-w-[1440px] mx-auto flex flex-col items-center px-section py-[112px] box-border gap-12 text-black">
      <div className="w-[600px] flex flex-col items-center">
        <div className="w-full flex flex-col items-center gap-6 max-w-full">
          <b className="w-full relative text-heading-lg leading-[125%] font-display text-center">
            Get in Touch
          </b>
          <p className="self-stretch relative text-lg leading-[150%] font-sans text-center">
            We're here to help with your grocery needs.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="w-[600px] flex flex-col items-center gap-6 text-left text-base text-text-brown font-sans">
        <div className="self-stretch relative text-sm leading-[150%]">
          * required
        </div>

        <div className="self-stretch flex items-start gap-6">
          <Input
            type="text"
            label="First Name"
            required
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            name="firstName"
            className="flex-1"
          />
          <Input
            type="text"
            label="Last Name"
            required
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            name="lastName"
            className="flex-1"
          />
        </div>

        <div className="self-stretch flex items-start gap-6">
          <Input
            type="email"
            label="Email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            name="email"
            className="flex-1"
          />
          <Input
            type="tel"
            label="Phone Number (optional)"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            name="phone"
            className="flex-1"
          />
        </div>

        <div className="self-stretch flex flex-col items-start gap-2">
          <label className="self-stretch text-base leading-[160%] text-text-brown font-sans">
            How can we assist? <span className="text-red-500">*</span>
          </label>
          <RadioGroup
            options={assistOptions}
            selected={formData.assistType}
            onChange={(value) => setFormData({ ...formData, assistType: value })}
            name="assistType"
          />
        </div>

        <Input
          type="textarea"
          label="Message"
          required
          placeholder="Enter your message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          name="message"
          className="self-stretch"
        />

        <div className="rounded-button flex items-start text-center text-text-light">
          <Button type="submit" variant="primary" size="sm" className="bg-bg-dark text-text-light hover:bg-bg-dark-alt">
            Send
          </Button>
        </div>
      </form>
      </div>
    </section>
  );
};

export default ContactSection;
