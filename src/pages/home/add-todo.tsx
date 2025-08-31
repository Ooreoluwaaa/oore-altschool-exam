import { useState, ChangeEvent } from "react";
import { toast } from "sonner";

import { Plus } from "lucide-react";
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

export function AddTodo() {
  const [formData, setFormData] = useState({
    title: "",
    completed: false,
  });

  const queryClient = useQueryClient();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleEdit() {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/todos`, {
        method: "POST",
        body: JSON.stringify({
          title: formData.title,
          completed: formData.completed,
          userId: 1,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      await queryClient.invalidateQueries({ queryKey: ["Todos"] });

      toast.success("Todo Added");
    } catch (error) {
      console.error(error);
      toast.error("Error adding Todo");
    }
  }

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-neon-navy text-mother-of-pearl hover:bg-neon-navy hover:text-mother-of-pearl"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Todo
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
                value={String(formData.completed)}
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
