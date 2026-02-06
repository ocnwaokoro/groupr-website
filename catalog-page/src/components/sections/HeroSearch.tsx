import React, { useState } from 'react'
import Button from '../ui/Button'

const HeroSearch: React.FC = () => {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Shop search:', query)
  }

  return (
    <section className="w-full px-section py-10 bg-bg-light-green">
      <div className="max-w-[1312px] mx-auto flex flex-col items-center justify-center gap-5">
        <h2 className="font-display font-semibold text-heading-sm text-black">
          What are you looking for today?
        </h2>
        <form onSubmit={handleSubmit} className="flex items-stretch gap-1">
          <div className="h-10 w-[320px] rounded-sm bg-bg-primary border border-text-border flex items-center px-4 box-border">
            <img src="/images/icons/search-icon.svg" alt="" className="w-5 h-5 mr-2 flex-shrink-0" aria-hidden />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="flex-1 h-full bg-transparent border-none outline-none text-base text-text-brown placeholder:text-text-placeholder min-w-0 py-0"
            />
          </div>
          <Button type="submit" variant="dark" size="sm" className="!h-10 !py-0 !px-5">
            Shop now
          </Button>
        </form>
      </div>
    </section>
  )
}

export default HeroSearch
