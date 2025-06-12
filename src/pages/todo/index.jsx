import { useParams, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { Edit, Trash2, Undo2 } from "lucide-react";

import { Link } from "react-router-dom";
import { useTodo } from "@/hooks/todos";
import { ContentLoader } from "@/components/common/loader";

// Mock data for a single todo

export default function SingleTodo() {
  const params = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const todoId = params.id;

  const { data, isLoading } = useTodo(todoId);

  console.log(data);

  if (!data || isLoading) {
    return <ContentLoader />;
  }

  async function handleDelete() {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${data.id}`, {
      method: "DELETE",
    });

    await queryClient.invalidateQueries(["Todos", data?.id]);
    await queryClient.invalidateQueries(["Todos"]);

    await navigate("/");
  }

  return (
    <>
      <div className="min-h-screen bg-[#e9dccb] p-6">
        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <Link to="/" className="flex items-center mb-6">
            <Button variant="ghost" className="text-gray-600">
              <Undo2 className="mr-2 h-4 w-4" />
              Back to Todos
            </Button>
          </Link>

          {/* Main Card */}
          <Card className="mb-6 border-none shadow-md bg-neon-navy text-mother-of-pearl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <h1 className="text-[1.2rem] lg:text-2xl leading-6 font-bold capitalize">
                    {data.title}
                  </h1>
                </div>

                <Badge
                  variant="default"
                  className={`rounded-[20px] mt-3 ${
                    data.completed ? "bg-green-500" : "bg-blue-500"
                  }`}
                >
                  {data.completed ? "Complete" : "Incomplete"}
                </Badge>

                <p className="text-8xl font-bold">{data.id}</p>
              </div>
            </CardHeader>

            <CardFooter className="flex justify-between pt-0">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="bg-mother-of-pearl text-neon-navy"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>

                <Button variant="destructive" onClick={handleDelete}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
