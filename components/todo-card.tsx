"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { deleteTodo, updateTodo } from "@/lib/api"
import { EditTodoDialog } from "./edit-todo-dialog"
import { Trash2, Edit2 } from 'lucide-react'

interface TodoCardProps {
  todo: {
    id: number
    title: string
    completed: boolean
    userId: number
  }
  onTodoDeleted: () => void
  onTodoUpdated: () => void
}

export function TodoCard({
  todo,
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
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <Checkbox
                checked={todo.completed}
                onCheckedChange={handleToggle}
                disabled={loading}
                className="mt-1"
              />
              <CardTitle
                className={`text-base ${
                  todo.completed
                    ? "line-through text-muted-foreground"
                    : ""
                }`}
              >
                {todo.title}
              </CardTitle>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditOpen(true)}
                disabled={loading}
              >
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                disabled={loading}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            ID: {todo.id} • User: {todo.userId}
          </p>
        </CardContent>
      </Card>

      <EditTodoDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        todo={todo}
        onTodoUpdated={onTodoUpdated}
      />
    </>
  )
}