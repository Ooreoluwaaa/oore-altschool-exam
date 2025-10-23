"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateTodo } from "@/lib/api"

interface EditTodoDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  todo: {
    id: number
    title: string
    completed: boolean
  } | null
  onTodoUpdated: () => void
}

export function EditTodoDialog({
  open,
  onOpenChange,
  todo,
  onTodoUpdated,
}: EditTodoDialogProps) {
  const [title, setTitle] = useState(todo?.title || "")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      alert("Please enter a todo title")
      return
    }

    if (!todo) return

    setLoading(true)
    try {
      await updateTodo(todo.id, { title, completed: todo.completed })
      alert("Todo updated successfully!")
      onOpenChange(false)
      onTodoUpdated()
    } catch (error) {
      alert("Failed to update todo")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Todo</DialogTitle>
          <DialogDescription>
            Update your todo details
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-title">Todo Title</Label>
            <Input
              id="edit-title"
              placeholder="Enter todo title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Updating..." : "Update Todo"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}