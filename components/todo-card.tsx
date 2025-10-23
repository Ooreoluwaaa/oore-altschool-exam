"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { deleteTodo, updateTodo } from "@/lib/api"
import { EditTodoDialog } from "./edit-todo-dialog"

interface TodoCardProps {
  todo: {
    id: number
    title: string
    completed: boolean
    userId: number
  }
  index: number
  onTodoDeleted: () => void
  onTodoUpdated: () => void
}

export function TodoCard({
  todo,
  index,
  onTodoDeleted,
  onTodoUpdated,
}: TodoCardProps) {
  const [loading, setLoading] = useState(false)
  const [editOpen, setEditOpen] = useState(false)

  const handleToggle = async () => {
    setLoading(true)
    try {
      await updateTodo(todo.id, {
        title: todo.title,
        completed: !todo.completed,
      })
      onTodoUpdated()
    } catch (error) {
      alert("Failed to update todo")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this todo?")) return
    setLoading(true)
    try {
      await deleteTodo(todo.id)
      alert("Todo deleted successfully!")
      onTodoDeleted()
    } catch (error) {
      alert("Failed to delete todo")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="bg-slate-900 rounded-lg p-6 flex flex-col justify-between h-full hover:shadow-lg transition-shadow">
        {/* Header */}
        <div>
          <h3 className="text-white font-semibold mb-4 line-clamp-2">{todo.title}</h3>
        </div>

        {/* Number and Status */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-5xl font-bold text-white opacity-20">{index}</span>
          <div className="flex gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                todo.completed
                  ? "bg-green-500"
                  : "bg-blue-500"
              }`}
            >
              {todo.completed ? "Complete" : "Incomplete"}
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
            >
              👁️
            </Button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setEditOpen(true)}
            disabled={loading}
            className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            ✏️ Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={loading}
            className="flex-1 bg-red-600 hover:bg-red-700"
          >
            🗑️ Delete
          </Button>
        </div>
      </div>

      <EditTodoDialog
        todo={todo}
        open={editOpen}
        onOpenChange={setEditOpen}
        onTodoUpdated={onTodoUpdated}
      />
    </>
  )
}