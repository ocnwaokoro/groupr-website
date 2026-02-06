import React from 'react';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  selected?: string;
  onChange?: (value: string) => void;
  name: string;
  className?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  selected,
  onChange,
  name,
  className = '',
}) => {
  return (
    <div className={`self-stretch flex items-start flex-wrap gap-4 ${className}`}>
      {options.map((option) => (
        <label
          key={option.value}
          className="inline-flex items-center gap-1 cursor-pointer min-h-[44px]"
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selected === option.value}
            onChange={(e) => onChange?.(e.target.value)}
            className="w-5 h-5 text-accent-orange focus:ring-2 focus:ring-accent-orange flex-shrink-0"
          />
          <span className="text-base leading-[160%] text-text-brown font-sans">{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioGroup;
