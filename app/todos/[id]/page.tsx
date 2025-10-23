"use client"

import { useParams, useRouter } from "next/navigation"
import { useTodos } from "@/hooks/use-todos"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Edit2 } from "lucide-react"
import { useState } from "react"
import EditTodoDialog from "@/components/edit-todo-dialog"

export default function TodoDetailPage() {
  const params = useParams()
  const router = useRouter()
  const todoId = params.id as string
  const { todos, isLoading } = useTodos()
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const todo = todos.find((t) => t.id === Number.parseInt(todoId))

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </main>
    )
  }

  if (!todo) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" onClick={() => router.back()} className="mb-6 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <Card className="p-8 text-center">
            <p className="text-muted-foreground text-lg">Todo not found</p>
          </Card>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6 gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <Card className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-foreground mb-2">{todo.title}</h1>
              <div className="flex items-center gap-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    todo.completed
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                  }`}
                >
                  {todo.completed ? "Completed" : "Pending"}
                </span>
                <span className="text-sm text-muted-foreground">ID: {todo.id}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsEditDialogOpen(true)} className="gap-2">
                <Edit2 className="w-4 h-4" />
                Edit
              </Button>
            </div>
          </div>

          {todo.description && (
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h2 className="font-semibold text-foreground mb-2">Description</h2>
              <p className="text-foreground/80">{todo.description}</p>
            </div>
          )}

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">User ID</p>
              <p className="text-lg font-semibold text-foreground">{todo.userId}</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Status</p>
              <p className="text-lg font-semibold text-foreground">{todo.completed ? "Completed" : "Pending"}</p>
            </div>
          </div>
        </Card>

        <EditTodoDialog todo={todo} open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} />
      </div>
    </main>
  )
}
