import { useState } from "react";
import { toast } from "sonner";

import { Edit } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import PrimaryButton from "@/components/common/primary-button";

export function EditTodo(props) {
  const { todo } = props;

  const [formData, setFormData] = useState({
    title: todo.title,
    completed: todo.completed,
  });

  const queryClient = useQueryClient();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleEdit() {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/todos/${todo?.id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: formData.title,
          completed: formData.completed,
          userId: todo.userId,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      await queryClient.invalidateQueries(["Todos", todo?.id]);
      await queryClient.invalidateQueries(["Todos"]);

      toast.success("Todo Updated");
    } catch (error) {
      console.error(error);
      toast.error("Error updating Todo");
    }
  }

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-mother-of-pearl text-neon-navy"
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px] bg-neon-navy text-mother-of-pearl">
          <DialogHeader>
            <DialogTitle>Edit Todo</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="flex items-center gap-3 mt-5">
              <Checkbox
                id="completed"
                checked={formData.completed}
                value={formData.completed}
                onCheckedChange={() => {
                  setFormData((prev) => ({
                    ...prev,
                    completed: !formData.completed,
                  }));
                }}
              />
              <Label htmlFor="completed">Task Completed?</Label>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <PrimaryButton className="bg-mother-of-pearl text-neon-navy">
                Cancel
              </PrimaryButton>
            </DialogClose>

            <Button
              type="button"
              onClick={handleEdit}
              className="bg-white text-neon-navy"
            >
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
