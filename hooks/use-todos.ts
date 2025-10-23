"use client"

import { useState, useEffect } from "react"
import type { Todo } from "@/types/todo"
import { fetchTodos } from "@/lib/api"

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refetch = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await fetchTodos()
      setTodos(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch todos")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    refetch()
  }, [])

  return { todos, isLoading, error, refetch }
}
