"use client"

import { useState, useMemo } from "react"
import { useDebouncedValue } from "@/hooks/use-debounce"
import { useTodos } from "@/hooks/use-todos"
import TodoList from "@/components/todo-list"
import TodoFilters from "@/components/todo-filters"
import TodoPagination from "@/components/todo-pagination"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import CreateTodoDialog from "@/components/create-todo-dialog"

const ITEMS_PER_PAGE = 10

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "completed" | "pending">("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const debouncedSearchTerm = useDebouncedValue(searchTerm, 300)
  const { todos, isLoading, error, refetch } = useTodos()

  // Filter and search todos
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

  // Paginate todos
  const totalPages = Math.ceil(filteredTodos.length / ITEMS_PER_PAGE)
  const paginatedTodos = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredTodos.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredTodos, currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const handleStatusFilterChange = (status: "all" | "completed" | "pending") => {
    setStatusFilter(status)
    setCurrentPage(1)
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">My Todos</h1>
              <p className="text-muted-foreground">Manage your tasks efficiently with search, filter, and pagination</p>
            </div>
            <Button onClick={() => setIsCreateDialogOpen(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              New Todo
            </Button>
          </div>

          <TodoFilters
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            statusFilter={statusFilter}
            onStatusFilterChange={handleStatusFilterChange}
          />
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="mt-4 text-muted-foreground">Loading todos...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 text-destructive">
            <p>Error loading todos. Please try again.</p>
          </div>
        ) : paginatedTodos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              {filteredTodos.length === 0 && todos.length > 0
                ? "No todos match your filters"
                : "No todos yet. Create one to get started!"}
            </p>
          </div>
        ) : (
          <>
            <TodoList todos={paginatedTodos} onTodoUpdated={refetch} />
            <TodoPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </>
        )}
      </div>

      <CreateTodoDialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen} onTodoCreated={refetch} />
    </main>
  )
}
