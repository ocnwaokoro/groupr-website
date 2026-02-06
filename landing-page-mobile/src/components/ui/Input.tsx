import React, { type ChangeEvent } from 'react';

interface InputProps {
  type?: 'text' | 'email' | 'tel' | 'textarea';
  label?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  name?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  label,
  placeholder,
  required = false,
  error,
  value,
  onChange,
  name,
  className = '',
}) => {
  const baseInputClasses =
    'self-stretch rounded-input bg-bg-primary border border-text-border px-3 py-2 font-sans text-base leading-[160%] text-text-brown placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:ring-accent-orange focus:border-transparent';

  const textareaClasses = `${baseInputClasses} min-h-[120px] resize-none`;

  return (
    <div className={`flex flex-col items-start gap-2 ${className}`}>
      {label && (
        <label className="self-stretch text-base leading-[160%] text-text-brown font-sans">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {type === 'textarea' ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={textareaClasses}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={baseInputClasses}
        />
      )}
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};

export default Input;
