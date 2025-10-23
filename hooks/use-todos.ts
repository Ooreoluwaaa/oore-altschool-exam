import { useState, useEffect } from "react"

export interface Todo {
  id: number
  title: string
  description: string
  completed: boolean
  createdAt: string
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Generate mock todos
  const generateMockTodos = () => {
    const mockTitles = [
      "Delectus Aut Autem",
      "Quis Ut Nam Facilis Et Officia Qui",
      "Fugiat Veniam Minus",
      "Et Porro Tempora",
      "Laboriosam Mollitia Et Enim Quasi Adipisci Quia Provident Illum",
      "Qui Ullam Ratione Quibusdam Voluptatem Quia Omnis",
      "Illo Expedita Consequatur Quia In",
      "Quo Adipisci Enim Quam Ut Ab",
      "Molestiae Perspiciatis Ipsa",
      "Illo Est Ratione Doloremque Quia Malores Aut",
    ]

    const todos: Todo[] = []
    for (let i = 1; i <= 200; i++) {
      todos.push({
        id: i,
        title: mockTitles[(i - 1) % mockTitles.length],
        description: `This is todo item ${i}`,
        completed: i % 3 === 0,
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      })
    }
    return todos
  }

  useEffect(() => {
    setIsLoading(true)
    // Simulate API call
    const timer = setTimeout(() => {
      setTodos(generateMockTodos())
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const refetch = () => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setTodos(generateMockTodos())
      setIsLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }

  return { todos, isLoading, error, refetch }
}