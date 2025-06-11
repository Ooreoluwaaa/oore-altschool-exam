import { useNavigate, Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import { EditTodo } from "./edit-todo";

export default function TodoCard(props) {
  const { todo } = props;

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function handleDelete(id) {
    const todos_key = `@todos-${id}`;
    try {
      await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: "DELETE",
      });

      localStorage.removeItem("@todos");
      localStorage.removeItem(todos_key);

      await queryClient.invalidateQueries(["Todos", id]);
      await queryClient.invalidateQueries(["Todos"]);

      await navigate("/");
      toast.success("Todo Updated");
    } catch (error) {
      console.error(error);
      toast.error("Error updating Todo");
    }
  }

  return (
    <Card className="bg-neon-navy text-mother-of-pearl">
      <CardHeader className="pb-3 min-h-[80px] capitalize font-medium">
        <CardTitle className="text-lg">{todo.title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        <p className="text-5xl font-bold">{todo.id}</p>

        <div className="w-full flex items-center justify-between">
          <Badge
            variant="default"
            className={`rounded-[20px] ${
              todo.completed ? "bg-green-500" : "bg-blue-500"
            }`}
          >
            {todo.completed ? "Completed" : "Pending"}
          </Badge>

          <Link
            to={`/todo/${todo.id}`}
            className="min-w-[80px] text-center text-[.7rem] p-2 rounded-[20px] bg-mother-of-pearl text-neon-navy"
          >
            View Todo
          </Link>
        </div>

        <div className="flex gap-2 mt-5">
          <EditTodo todo={todo} />

          <Button
            variant="destructive"
            onClick={() => handleDelete(todo.id)}
            className="text-[12px]"
          >
            <Trash2 className="h-3 w-3" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
