import React from 'react'

interface PaginationProps {
  currentPage?: number
  totalPages?: number
}

const Pagination: React.FC<PaginationProps> = ({ currentPage = 1, totalPages = 8 }) => (
  <div className="flex items-center gap-2 flex-wrap">
    <button
      type="button"
      className="h-10 px-3 rounded border border-accent-border bg-[#f1efec] text-accent-border text-base flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={currentPage <= 1}
      aria-label="First page"
    >
      <img src="/images/icons/double-chevron-left.svg" alt="" className="w-5 h-5" aria-hidden />
      <span>First</span>
    </button>
    <button
      type="button"
      className="h-10 px-3 rounded border border-accent-border bg-bg-primary text-base flex items-center justify-center gap-1"
      aria-label="Previous page"
    >
      <img src="/images/icons/chevron-left.svg" alt="" className="w-5 h-5" aria-hidden />
      <span>Back</span>
    </button>
    {[1, 2, 3].map((n) => (
      <button
        key={n}
        type="button"
        className={`h-10 w-10 rounded flex items-center justify-center text-base ${
          n === currentPage ? 'bg-bg-dark text-text-light' : 'bg-bg-primary border border-accent-border'
        }`}
      >
        {n}
      </button>
    ))}
    <span className="h-10 w-10 rounded border border-accent-border bg-bg-primary flex items-center justify-center text-xs text-text-brown">
      •••
    </span>
    <button
      type="button"
      className="h-10 w-10 rounded border border-accent-border bg-bg-primary flex items-center justify-center text-base"
    >
      {totalPages}
    </button>
    <button
      type="button"
      className="h-10 px-3 rounded border border-accent-border bg-bg-primary text-base flex items-center justify-center gap-1"
      aria-label="Next page"
    >
      <span>Next</span>
      <img src="/images/icons/chevron-right.svg" alt="" className="w-5 h-5" aria-hidden />
    </button>
    <button
      type="button"
      className="h-10 px-3 rounded border border-accent-border bg-bg-primary text-base flex items-center justify-center gap-1"
      aria-label="Last page"
    >
      <span>Last</span>
      <img src="/images/icons/double-chevron-right.svg" alt="" className="w-5 h-5" aria-hidden />
    </button>
  </div>
)

export default Pagination
