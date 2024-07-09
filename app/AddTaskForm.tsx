"use client";
import { Input } from "@/components/ui/input";
import { createTask } from "./actions/taskActions";
import { useRef } from "react";
import AddTaskButton from "./AddTaskButton";

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
      <div className="flex space-x-4">
        <Input
          type="text"
          name="task"
          placeholder="What do you want to do?"
          required
          className="border-none bg-transparent dark:bg-transparent px-0"
        />
        <AddTaskButton />
      </div>
    </form>
  );
};

export default AddTaskForm;
