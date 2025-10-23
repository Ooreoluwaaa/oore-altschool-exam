import type { Todo } from "@/types/todo"

const API_BASE_URL = "https://jsonplaceholder.typicode.com"

export async function fetchTodos(): Promise<Todo[]> {
  const response = await fetch(`${API_BASE_URL}/todos`)
  if (!response.ok) {
    throw new Error("Failed to fetch todos")
  }
  return response.json()
}

export async function createTodo(todo: Omit<Todo, "id">): Promise<Todo> {
  const response = await fetch(`${API_BASE_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  })
  if (!response.ok) {
    throw new Error("Failed to create todo")
  }
  return response.json()
}

export async function updateTodo(id: number, updates: Partial<Todo>): Promise<Todo> {
  const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  })
  if (!response.ok) {
    throw new Error("Failed to update todo")
  }
  return response.json()
}

export async function deleteTodo(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
    method: "DELETE",
  })
  if (!response.ok) {
    throw new Error("Failed to delete todo")
  }
}
