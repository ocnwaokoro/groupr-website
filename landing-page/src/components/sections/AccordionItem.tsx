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
  const handleToggle = onToggle || (() => setInternalIsOpen(!internalIsOpen));

  return (
    <div className="self-stretch shadow-[0px_1px_3px_rgba(0,0,0,0.05),0px_1px_2px_rgba(0,0,0,0.06)] rounded-card bg-bg-card flex flex-col items-center px-9 py-5">
      <div className="w-full flex flex-col items-start max-w-full">
        <button
          onClick={handleToggle}
          className="self-stretch overflow-hidden flex items-center py-5 gap-6"
        >
          <div className="flex-1 relative text-base leading-[160%] font-semibold text-text-border text-left">
            {question}
          </div>
          <svg
            className={`h-8 w-8 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {isOpen && answer && (
          <div className="self-stretch pt-2 pb-4 text-base leading-[160%] text-text-border">
            {answer}
          </div>
        )}
      </div>
    </div>
  );
};

export default AccordionItem;
