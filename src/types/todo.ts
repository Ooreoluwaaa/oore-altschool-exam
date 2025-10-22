export interface Todo {
  id: number
  title: string
  description?: string
  completed: boolean
  userId: number
  createdAt?: string
  updatedAt?: string
}

export interface TodosResponse {
  todos: Todo[]
  total: number
  skip: number
  limit: number
}
