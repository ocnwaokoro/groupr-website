import React from 'react';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  className?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ 
  href, 
  children, 
  active = false,
  className = '' 
}) => {
  return (
    <a
      href={href}
      className={`
        inline-flex flex-col items-start
        rounded-input px-4 py-2
        font-sans text-base font-medium leading-[150%]
        text-text-dark
        hover:underline
        transition-colors
        ${active ? 'underline' : ''}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      <span className="inline-flex items-center">{children}</span>
      <span className={`self-stretch h-0.5 bg-bg-primary opacity-0 ${active ? 'opacity-100' : ''}`} />
    </a>
  );
};

export default NavLink;
