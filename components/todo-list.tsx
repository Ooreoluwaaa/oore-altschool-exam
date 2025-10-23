"use client"
import type { Todo } from "@/types/todo"
import { TodoCard } from "./todo-card"

interface TodoListProps {
  todos: Todo[]
  onTodoUpdated: () => void
}

export default function TodoList({ todos, onTodoUpdated }: TodoListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {todos.map((todo, index) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          index={index + 1}
          onTodoDeleted={onTodoUpdated}
          onTodoUpdated={onTodoUpdated}
        />
      ))}
    </div>
  )
}