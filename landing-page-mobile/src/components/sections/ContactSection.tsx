import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import RadioGroup from '../ui/RadioGroup';

const ASSIST_OPTIONS = [
  { value: 'order-help', label: 'Order Help' },
  { value: 'product-question', label: 'Product Question' },
  { value: 'delivery-issue', label: 'Delivery Issue' },
  { value: 'feedback', label: 'Feedback' },
  { value: 'expand', label: 'Expand to my neighborhood!' },
  { value: 'other', label: 'Other' },
];

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    assistType: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="w-full max-w-full bg-bg-primary overflow-hidden z-[2]">
      <div className="w-full flex flex-col items-center px-5 py-16 gap-12 text-black">
        <div className="w-full flex flex-col items-center gap-6">
          <b className="text-heading-lg font-display leading-[125%] text-center">Get in Touch</b>
          <p className="text-lg leading-[150%] font-sans text-center">
            We're here to help with your grocery needs.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-stretch gap-8 text-left text-base text-text-brown font-sans"
        >
          <p className="text-sm leading-[150%]">* required</p>

          <div className="flex flex-col gap-4">
            <Input
              type="text"
              label="First Name"
              required
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              name="firstName"
            />
            <Input
              type="text"
              label="Last Name"
              required
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              name="lastName"
            />
          </div>

          <div className="flex flex-col gap-4">
            <Input
              type="email"
              label="Email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              name="email"
            />
            <Input
              type="tel"
              label="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              name="phone"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base leading-[160%] text-text-brown">
              How can we assist? <span className="text-red-500">*</span>
            </label>
            <RadioGroup
              options={ASSIST_OPTIONS}
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
          />

          <Button
            type="submit"
            variant="primary"
            size="sm"
            className="w-full bg-bg-dark text-text-light hover:bg-bg-dark-alt"
          >
            Send
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
