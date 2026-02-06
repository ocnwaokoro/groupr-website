import React, { useState } from 'react'

const HeroSearch: React.FC = () => {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Shop search:', query)
  }

  return (
    <section className="w-full max-w-full px-5 py-5 bg-bg-light-green overflow-hidden">
      <div className="flex flex-col items-center justify-center gap-5">
        <h2 className="font-display font-semibold text-lg leading-[140%] text-black text-center">
          What are you looking for today?
        </h2>
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-stretch gap-2">
          <div className="h-10 w-full rounded bg-bg-primary border border-text-border flex items-center px-3 box-border">
            <img src="/images/icons/search-icon.svg" alt="" className="w-5 h-5 mr-2 flex-shrink-0" aria-hidden />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="flex-1 h-full bg-transparent border-none outline-none text-base text-text-brown placeholder:text-text-placeholder min-w-0 py-0"
            />
          </div>
        </form>
      </div>
    </section>
  )
}

export default HeroSearch
