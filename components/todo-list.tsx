"use client"
import type { Todo } from "@/hooks/use-todos"
import { TodoCard } from "./todo-card"

interface TodoListProps {
  todos: Todo[]
  onTodoUpdated: () => void
}

export function TodoList({ todos, onTodoUpdated }: TodoListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {todos.map((todo) => (
        <TodoCard key={todo.id} todo={todo} onTodoUpdated={onTodoUpdated} />
      ))}
    </div>
  )
}