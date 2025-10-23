"use client"
import { Todo } from "@/hooks/use-todos"
import { TodoCard } from "./todo-card"

interface TodoListProps {
  todos: Todo[]
  onTodoUpdated: () => void
}

export function TodoList({ todos, onTodoUpdated }: TodoListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {todos.map((todo, index) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          index={index + 1}
          onTodoUpdated={onTodoUpdated}
        />
      ))}
    </div>
  )
}