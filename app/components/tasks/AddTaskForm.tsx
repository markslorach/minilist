"use client";
import { Input } from "@/components/ui/input";
import { createTask } from "../../actions/taskActions";
import { useEffect, useRef } from "react";
import { Plus } from "lucide-react";
import { useFormStatus } from "react-dom";

const AddTaskForm = ({ addOptimisticTask }: any) => {
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
        const task = formData.get("task") as string;
        ref.current?.reset();
        addOptimisticTask({
          id: Math.random(),
          title: task,
          completed: false,
          userId: 0,
          listId: null,
          xata_updatedat: new Date(),
          xata_id: "",
          xata_version: 0,
          xata_createdat: new Date(),
          pending: true,
        });
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
        {/* <FormActionButton icon={Plus} label="Add Task" iconSize={28} /> */}
        <SubmitButton />
      </div>
    </form>
  );
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-label="Add Task" disabled={pending}>
      <Plus className={`w-7 h-7 ${pending ? "opacity-70" : ""}`} size={28} />
    </button>
  );
}

export default AddTaskForm;
