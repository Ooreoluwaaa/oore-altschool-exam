"use client"
import { Button } from "@/components/ui/button"

interface TodoPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function TodoPagination({
  currentPage,
  totalPages,
  onPageChange,
}: TodoPaginationProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="border-gray-300"
      >
        ← Previous
      </Button>

      <div className="flex gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            size="sm"
            onClick={() => onPageChange(page)}
            className={
              currentPage === page
                ? "bg-blue-600 hover:bg-blue-700"
                : "border-gray-300"
            }
          >
            {page}
          </Button>
        ))}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="border-gray-300"
      >
        Next →
      </Button>
    </div>
  )
}