"use client";
import { Input } from "@/components/ui/input";
import { createTask } from "../../actions/taskActions";
import { useEffect, useRef } from "react";
import AddTaskButton from "./AddTaskButton";

const AddTaskForm = () => {
  const ref = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

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
          placeholder="What do you want to get done today?"
          required
          className="border-none bg-transparent dark:bg-transparent px-0"
          ref={inputRef}
        />
        <AddTaskButton />
      </div>
    </form>
  );
};

export default AddTaskForm;
