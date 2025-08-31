import { useQuery } from "@tanstack/react-query";
import { TodoType } from "@/types";

export function useAllTodos() {
  return useQuery({
    queryKey: ["Todos"],
    queryFn: async () => {
      const todos_key = "@todos";
      const local_response = localStorage.getItem(todos_key);

      if (local_response) {
        const res = JSON.parse(local_response);

        return res as TodoType[];
      }

      const res = await fetch("https://jsonplaceholder.typicode.com/todos");

      const result = await res.json();

      localStorage.setItem(todos_key, JSON.stringify(result));

      return result as TodoType[]
    },
    staleTime: 1000 * 60 * 60 + 10,
  });
}

export function useTodo(id:number) {
  return useQuery({
    queryKey: ["Todos", id],
    queryFn: async () => {
      const todos_key = `@todos-${id}`;
      const local_response = localStorage.getItem(todos_key);

      if (local_response) {
        const res = JSON.parse(local_response);

        return res as TodoType;
      }

      const res = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`
      );

      const result = await res.json();

      localStorage.setItem(todos_key, JSON.stringify(result));

      return result as TodoType;
    },
    staleTime: 1000 * 60 * 60 + 10,
  });
}
