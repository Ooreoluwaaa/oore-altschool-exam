"use client"

import type { Todo } from "@/types/todo"
import TodoCard from "./todo-card"

interface TodoListProps {
  todos: Todo[]
  onTodoUpdated: () => void
}

export default function TodoList({ todos, onTodoUpdated }: TodoListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {todos.map((todo) => (
        <TodoCard key={todo.id} todo={todo} onTodoUpdated={onTodoUpdated} />
      ))}
    </div>
  )
}
