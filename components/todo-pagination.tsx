"use client"
import { Button } from "@/components/ui/button"

interface TodoPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function TodoPagination({ currentPage, totalPages, onPageChange }: TodoPaginationProps) {
  const pages = []
  const maxPagesToShow = 5

  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2))
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1)

  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1)
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }

  return (
    <div className="flex items-center justify-center gap-2 flex-wrap">
      <Button onClick={() => onPageChange(1)} disabled={currentPage === 1} variant="outline" size="sm">
        First
      </Button>
      <Button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} variant="outline" size="sm">
        Previous
      </Button>

      {startPage > 1 && (
        <>
          <Button onClick={() => onPageChange(1)} variant="outline" size="sm">
            1
          </Button>
          {startPage > 2 && <span className="px-2">...</span>}
        </>
      )}

      {pages.map((page) => (
        <Button
          key={page}
          onClick={() => onPageChange(page)}
          variant={currentPage === page ? "default" : "outline"}
          size="sm"
          className={currentPage === page ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}
        >
          {page}
        </Button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="px-2">...</span>}
          <Button onClick={() => onPageChange(totalPages)} variant="outline" size="sm">
            {totalPages}
          </Button>
        </>
      )}

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        variant="outline"
        size="sm"
      >
        Next
      </Button>
      <Button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        variant="outline"
        size="sm"
      >
        Last
      </Button>
    </div>
  )
}