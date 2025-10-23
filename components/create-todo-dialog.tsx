"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createTodo } from "@/lib/api"

interface CreateTodoDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onTodoCreated: () => void
}

export function CreateTodoDialog({
  open,
  onOpenChange,
  onTodoCreated,
}: CreateTodoDialogProps) {
  const [title, setTitle] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      alert("Please enter a todo title")
      return
    }

    setLoading(true)
    try {
      await createTodo(title)
      alert("Todo created successfully!")
      setTitle("")
      onOpenChange(false)
      onTodoCreated()
    } catch (error) {
      alert("Failed to create todo")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>Create Todo</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Todo</DialogTitle>
          <DialogDescription>
            Add a new todo to your list
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Todo Title</Label>
            <Input
              id="title"
              placeholder="Enter todo title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Creating..." : "Create Todo"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}