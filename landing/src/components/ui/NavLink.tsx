import React from 'react'

interface NavLinkProps {
  href: string
  children: React.ReactNode
  active?: boolean
  className?: string
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, active = false, className = '' }) => (
  <a
    href={href}
    className={`inline-flex items-center font-sans text-base font-medium leading-[150%] text-text-dark hover:underline md:inline-flex md:flex-col md:items-start md:rounded-input md:px-4 md:py-2 md:whitespace-nowrap ${active ? 'underline' : ''} ${className}`.trim().replace(/\s+/g, ' ')}
  >
    <span className="inline-flex items-center">{children}</span>
    <span className={`hidden md:block self-stretch h-0.5 bg-bg-primary opacity-0 ${active ? 'opacity-100' : ''}`} />
  </a>
)

export default NavLink
