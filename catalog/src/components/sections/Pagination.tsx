import React from 'react'

interface PaginationProps {
  currentPage?: number
  totalPages?: number
}

const Pagination: React.FC<PaginationProps> = ({ currentPage = 1, totalPages = 8 }) => (
  <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
    <button
      type="button"
      className="hidden md:flex h-10 px-3 rounded border border-accent-border bg-[#f1efec] text-accent-border text-base items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={currentPage <= 1}
      aria-label="First page"
    >
      <img src="/images/icons/double-chevron-left.svg" alt="" className="w-5 h-5" aria-hidden />
      <span>First</span>
    </button>
    <button
      type="button"
      className="h-8 w-8 md:h-10 md:px-3 md:w-auto rounded border border-accent-border bg-bg-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={currentPage <= 1}
      aria-label="Previous page"
    >
      <img src="/images/icons/chevron-left.svg" alt="" className="w-5 h-5" aria-hidden />
      <span className="hidden md:inline">Back</span>
    </button>
    <button
      type="button"
      className={`h-8 w-8 md:h-10 md:w-10 rounded flex items-center justify-center text-sm md:text-base ${
        currentPage === 1 ? 'bg-bg-dark text-text-light' : 'bg-bg-primary border border-accent-border'
      }`}
    >
      1
    </button>
    <button
      type="button"
      className={`h-8 w-8 md:h-10 md:w-10 rounded flex items-center justify-center text-sm md:text-base ${
        currentPage === 2 ? 'bg-bg-dark text-text-light' : 'bg-bg-primary border border-accent-border'
      }`}
    >
      2
    </button>
    <span className="h-8 w-8 md:h-10 md:w-10 rounded border border-accent-border bg-bg-primary flex items-center justify-center text-xs text-text-brown">
      •••
    </span>
    <button
      type="button"
      className="h-8 w-8 md:h-10 md:w-10 rounded border border-accent-border bg-bg-primary flex items-center justify-center text-sm md:text-base"
    >
      {totalPages}
    </button>
    <button
      type="button"
      className="h-8 w-8 md:h-10 md:px-3 md:w-auto rounded border border-accent-border bg-bg-primary flex items-center justify-center"
      aria-label="Next page"
    >
      <img src="/images/icons/chevron-right.svg" alt="" className="w-5 h-5" aria-hidden />
      <span className="hidden md:inline">Next</span>
    </button>
    <button
      type="button"
      className="hidden md:flex h-10 px-3 rounded border border-accent-border bg-bg-primary items-center justify-center gap-1"
      aria-label="Last page"
    >
      <span>Last</span>
      <img src="/images/icons/double-chevron-right.svg" alt="" className="w-5 h-5" aria-hidden />
    </button>
  </div>
)

export default Pagination
