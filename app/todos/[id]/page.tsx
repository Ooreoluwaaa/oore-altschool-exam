"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useTodos } from "@/hooks/use-todos"

export default function TodoDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { todos, isLoading } = useTodos()
  const [todo, setTodo] = useState<any>(null)

  useEffect(() => {
    if (todos.length > 0) {
      const foundTodo = todos.find((t) => t.id === Number(params.id))
      setTodo(foundTodo)
    }
  }, [todos, params.id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-amber-50 p-8 flex items-center justify-center">
        <p className="text-gray-600">Loading todo...</p>
      </div>
    )
  }

  if (!todo) {
    return (
      <div className="min-h-screen bg-amber-50 p-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Todo not found</p>
          <Button onClick={() => router.push("/")} className="bg-blue-600 hover:bg-blue-700 text-white">
            Back to Todos
          </Button>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-amber-50 p-8 font-sans">
      <div className="max-w-2xl mx-auto">
        <Button onClick={() => router.push("/")} variant="outline" className="mb-6">
          ← Back to Todos
        </Button>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{todo.title}</h1>
              <p className="text-gray-600">ID: {todo.id}</p>
            </div>
            <Badge
              className={`${
                todo.completed ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"
              } text-white`}
            >
              {todo.completed ? "Complete" : "Incomplete"}
            </Badge>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
              <p className="text-gray-600">{todo.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Status</h3>
                <p className="text-gray-900">{todo.completed ? "Completed" : "Pending"}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Created</h3>
                <p className="text-gray-900">{new Date(todo.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">✏️ Edit Todo</Button>
            <Button variant="destructive" className="flex-1 bg-red-600 hover:bg-red-700 text-white">
              🗑️ Delete Todo
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}