import { useQuery } from "@tanstack/react-query";

export function useAllTodos() {
  return useQuery({
    queryKey: ["Todos"],
    queryFn: async () => {
      const todos_key = "@todos";
      const local_response = localStorage.getItem(todos_key);

      if (local_response) {
        const res = JSON.parse(local_response);

        return res;
      }

      const res = await fetch("https://jsonplaceholder.typicode.com/todos");

      const result = await res.json();

      localStorage.setItem(todos_key, JSON.stringify(result));

      return result;
    },
    staleTime: 1000 * 60 * 60 + 10,
  });
}

export function useTodo(id) {
  return useQuery({
    queryKey: ["Todos", id],
    queryFn: async () => {
      const todos_key = `@todos-${id}`;
      const local_response = localStorage.getItem(todos_key);

      if (local_response) {
        const res = JSON.parse(local_response);

        return res;
      }

      const res = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`
      );

      const result = await res.json();

      localStorage.setItem(todos_key, JSON.stringify(result));

      return result;
    },
    staleTime: 1000 * 60 * 60 + 10,
  });
}
