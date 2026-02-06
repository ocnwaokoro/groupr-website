import React, { useState } from 'react';

interface AccordionItemProps {
  question: string;
  answer?: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  question,
  answer,
  isOpen: controlledIsOpen,
  onToggle,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const handleToggle = onToggle ?? (() => setInternalIsOpen((prev) => !prev));

  return (
    <div className="w-full shadow-[0px_1px_3px_rgba(0,0,0,0.05),0px_1px_2px_rgba(0,0,0,0.06)] rounded-[24px] bg-bg-card flex flex-col items-center px-6 py-3">
      <button
        type="button"
        onClick={handleToggle}
        className="w-full flex items-center py-3 gap-6 text-left"
      >
        <span className="flex-1 text-base leading-[160%] font-semibold text-text-border">
          {question}
        </span>
        <svg
          className={`h-8 w-8 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && answer && (
        <div className="w-full pt-2 pb-4 text-base leading-[160%] text-text-border">{answer}</div>
      )}
    </div>
  );
};

export default AccordionItem;
