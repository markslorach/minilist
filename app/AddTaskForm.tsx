"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { createTask } from "./actions/taskActions";
import { useRef } from "react";

const AddTaskForm = () => {
  const ref = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={ref}
      action={async (formData) => {
        ref.current?.reset();
        await createTask(formData);
      }}
    >
      <div className="flex space-x-2">
        <Input
          type="text"
          name="task"
          placeholder="What do you want to do?"
          className="border-none bg-transparent dark:bg-transparent px-0"
        />
        <Button className="bg-transparent dark:bg-transparent hover:bg-transparent dark:hover:bg-transparent text-gray-500 dark:text-gray-400 p-0">
          <Plus />
        </Button>
      </div>
    </form>
  );
};

export default AddTaskForm;
