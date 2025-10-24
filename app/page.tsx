"use client"
import { useState, useMemo } from "react"
import { useDebouncedValue } from "@/hooks/use-debounce"
import { useTodos } from "@/hooks/use-todos"
import { TodoList } from "@/components/todo-list"
import { TodoFilters } from "@/components/todo-filters"
import { TodoPagination } from "@/components/todo-pagination"
import { CreateTodoDialog } from "@/components/create-todo-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const ITEMS_PER_PAGE = 10

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "completed" | "pending">("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const debouncedSearchTerm = useDebouncedValue(searchTerm, 300)
  const { todos, isLoading, error, refetch } = useTodos()

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      const matchesSearch = todo.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "completed" && todo.completed) ||
        (statusFilter === "pending" && !todo.completed)
      return matchesSearch && matchesStatus
    })
  }, [todos, debouncedSearchTerm, statusFilter])

  const totalPages = Math.ceil(filteredTodos.length / ITEMS_PER_PAGE)
  const paginatedTodos = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredTodos.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredTodos, currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const handleStatusFilterChange = (status: "all" | "completed" | "pending") => {
    setStatusFilter(status)
    setCurrentPage(1)
  }

  const handleTestError = () => {
    throw new Error("Test error boundary")
  }

  return (
    <main className="min-h-screen bg-amber-50 p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center relative">
          <Button
            onClick={handleTestError}
            variant="outline"
            size="sm"
            className="absolute left-0 top-0 text-xs bg-slate-800 text-white hover:bg-slate-800"
          >
            Test Error Boundary
          </Button>
          <h1 className="text-5xl font-bold text-gray-900 mb-2 tracking-tight">TODO APP</h1>
          <p className="text-gray-600 text-sm">
            Showing {paginatedTodos.length} of {filteredTodos.length} tasks (Page {currentPage} of {totalPages || 1})
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex gap-4 mb-8 items-center justify-between flex-wrap">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-400">🔍</span>
              <Input
                placeholder="Search Address..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10 bg-white border-gray-300 font-sans"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <TodoFilters statusFilter={statusFilter} onStatusFilterChange={handleStatusFilterChange} />
            <Button
              onClick={() => setIsCreateDialogOpen(true)}
              className="gap-2 bg-slate-900 hover:bg-slate-800 text-white font-sans"
            >
              + Add Todo
            </Button>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-gray-600">Loading todos...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            Error loading todos. Please try again.
          </div>
        ) : paginatedTodos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">
              {filteredTodos.length === 0 && todos.length > 0
                ? "No todos match your filters"
                : "No todos yet. Create one to get started!"}
            </p>
          </div>
        ) : (
          <>
            <TodoList todos={paginatedTodos} onTodoUpdated={refetch} />
          </>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8">
            <TodoPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        )}
      </div>

      <CreateTodoDialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen} onTodoCreated={refetch} />
    </main>
  )
}
