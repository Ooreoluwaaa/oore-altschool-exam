"use client"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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
  const [description, setDescription] = useState("")

  const handleCreate = () => {
    if (title.trim()) {
      // Here you would typically make an API call to create the todo
      console.log("Creating todo:", { title, description })
      setTitle("")
      setDescription("")
      onOpenChange(false)
      onTodoCreated()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Todo</DialogTitle>
          <DialogDescription>
            Add a new task to your todo list
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Title</label>
            <Input
              placeholder="Enter todo title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Description</label>
            <Input
              placeholder="Enter todo description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Create Todo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}