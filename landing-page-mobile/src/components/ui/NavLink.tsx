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
  className = '',
}) => {
  return (
    <a
      href={href}
      className={`inline-flex items-center font-sans text-base font-medium leading-[150%] text-text-dark hover:underline ${active ? 'underline' : ''} ${className}`}
    >
      {children}
    </a>
  );
};

export default NavLink;
