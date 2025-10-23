"use client"
import type { Todo } from "@/hooks/use-todos"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface TodoCardProps {
  todo: Todo
  onTodoUpdated: () => void
}

export function TodoCard({ todo, onTodoUpdated }: TodoCardProps) {
  return (
    <div className="bg-slate-900 rounded-lg p-6 text-white flex flex-col h-full font-sans">
      <h3 className="text-lg font-semibold mb-4 line-clamp-2">{todo.title}</h3>

      <div className="text-5xl font-bold mb-4 opacity-30">{todo.id}</div>

      <div className="flex items-center justify-between mb-4 mt-auto">
        <Badge
          className={`${
            todo.completed ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"
          } text-white`}
        >
          {todo.completed ? "Complete" : "Incomplete"}
        </Badge>
        <Link href={`/todos/${todo.id}`}>
          <Button variant="outline" size="sm" className="text-xs bg-white text-slate-900 hover:bg-gray-100">
            View Todo
          </Button>
        </Link>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1 bg-white text-slate-900 hover:bg-gray-100">
          ✏️ Edit
        </Button>
        <Button variant="destructive" size="sm" className="flex-1 bg-red-600 hover:bg-red-700 text-white">
          🗑️ Delete
        </Button>
      </div>
    </div>
  )
}