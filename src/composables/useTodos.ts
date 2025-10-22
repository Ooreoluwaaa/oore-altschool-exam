import { ref } from 'vue'

export interface Todo {
  id: number
  title: string
  description?: string
  completed: boolean
  userId?: number
}

const todos = ref<Todo[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

const CACHE_KEY = 'todos_cache'
const CACHE_EXPIRY_KEY = 'todos_cache_expiry'
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

const getCachedTodos = (): Todo[] | null => {
  try {
    const cached = localStorage.getItem(CACHE_KEY)
    const expiry = localStorage.getItem(CACHE_EXPIRY_KEY)

    if (cached && expiry && Date.now() < parseInt(expiry)) {
      return JSON.parse(cached)
    }

    localStorage.removeItem(CACHE_KEY)
    localStorage.removeItem(CACHE_EXPIRY_KEY)
    return null
  } catch {
    return null
  }
}

const setCachedTodos = (data: Todo[]): void => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data))
    localStorage.setItem(CACHE_EXPIRY_KEY, (Date.now() + CACHE_DURATION).toString())
  } catch {
    console.error('Failed to cache todos')
  }
}

const clearCache = (): void => {
  try {
    localStorage.removeItem(CACHE_KEY)
    localStorage.removeItem(CACHE_EXPIRY_KEY)
  } catch {
    console.error('Failed to clear cache')
  }
}

export const useTodos = () => {
  const fetchTodos = async () => {
    loading.value = true
    error.value = null

    try {
      // Check cache first
      const cached = getCachedTodos()
      if (cached) {
        todos.value = cached
        loading.value = false
        return
      }

      const response = await fetch('https://jsonplaceholder.typicode.com/todos')
      if (!response.ok) throw new Error('Failed to fetch todos')

      const data = await response.json()
      todos.value = data
      setCachedTodos(data)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      // Try to use cached data on error
      const cached = getCachedTodos()
      if (cached) {
        todos.value = cached
      }
    } finally {
      loading.value = false
    }
  }

  const fetchTodoById = async (id: number): Promise<Todo | null> => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
      if (!response.ok) throw new Error('Failed to fetch todo')
      return await response.json()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return null
    }
  }

  const addTodo = (newTodo: { title: string; description?: string; completed: boolean }) => {
    const todo: Todo = {
      id: Math.max(...todos.value.map(t => t.id), 0) + 1,
      ...newTodo
    }
    todos.value.unshift(todo)
    clearCache()
  }

  const updateTodo = (id: number, updatedTodo: Partial<Todo>) => {
    const index = todos.value.findIndex(t => t.id === id)
    if (index !== -1) {
      todos.value[index] = { ...todos.value[index], ...updatedTodo }
      clearCache()
    }
  }

  const deleteTodo = (id: number) => {
    todos.value = todos.value.filter(t => t.id !== id)
    clearCache()
  }

  return {
    todos,
    loading,
    error,
    fetchTodos,
    fetchTodoById,
    addTodo,
    updateTodo,
    deleteTodo
  }
}