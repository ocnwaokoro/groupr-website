import React, { useState } from 'react'

interface SearchBarProps {
  placeholder?: string
  onSearch?: (query: string) => void
  className?: string
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search',
  onSearch,
  className = '',
}) => {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(query)
  }

  return (
    <form onSubmit={handleSubmit} className={`flex-1 max-w-[440px] min-w-[200px] ${className}`}>
      <div className="flex flex-col items-start">
        <div className="self-stretch rounded-full bg-bg-primary border border-text-border flex items-start px-3 py-2">
          <div className="flex-1 flex items-center gap-2">
            <div className="flex items-start">
              <img
                src="/images/icons/search-icon.svg"
                alt="Search"
                className="w-6 h-6 flex-shrink-0"
              />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className="flex-1 text-base leading-[145%] text-text-placeholder placeholder:text-text-placeholder bg-transparent border-none outline-none min-w-0"
            />
          </div>
        </div>
      </div>
    </form>
  )
}

export default SearchBar
