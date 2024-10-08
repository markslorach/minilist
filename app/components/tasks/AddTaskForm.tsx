"use client";
import { Input } from "@/components/ui/input";
import { createTaskAction } from "../../actions/taskActions";
import { useEffect, useRef } from "react";
import { Plus } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Task } from "@prisma/client";
import { toast } from "sonner";

type Props = {
  addOptimisticTask: (task: Task) => void;
};

const AddTaskForm = ({ addOptimisticTask }: Props) => {
  const ref = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      ref.current?.reset();
    }
  }, []);

  async function action(formData: FormData) {
    const task = formData.get("task") as string;

    // If the task is empty, reset the form and return
    if (!task.trim().length) {
      ref.current?.reset();
      return;
    }

    const newTask = {
      id: Math.random(),
      title: task,
      completed: false,
      userId: 0,
      listId: null,
      xata_id: "",
      xata_version: 0,
      xata_createdat: new Date(),
      xata_updatedat: new Date(),
    };

    ref.current?.reset();
    addOptimisticTask(newTask);
    const result = await createTaskAction(task);

    if (result?.error) {
      toast.error(result.error);
    }
  }

  return (
    <form
      ref={ref}
      action={action}
      className="flex space-x-4"
      autoComplete="off"
    >
      <Input
        type="text"
        name="task"
        placeholder="What do you want to get done today?"
        required
        className="border-none bg-transparent px-0 text-neutral-800 dark:bg-transparent dark:text-neutral-50"
        ref={inputRef}
      />
      {/* <FormActionButton icon={Plus} label="Add Task" iconSize={28} /> */}
      <SubmitButton />
    </form>
  );
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-label="Add Task" disabled={pending}>
      <Plus
        className={`h-7 w-7 ${pending ? "opacity-50" : "text-neutral-800 dark:text-neutral-50"}`}
        size={28}
      />
    </button>
  );
}

export default AddTaskForm;
