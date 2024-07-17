"use client";
import { Input } from "@/components/ui/input";
import { useEffect, useRef } from "react";
import { updateTaskAction } from "@/app/actions/taskActions";
import { X, Check } from "lucide-react";
import { Task } from "@prisma/client";
import FormActionButton from "./FormActionButton";

type Props = {
  task: Task;
  setIsUpdating: (value: boolean) => void;
  updateOptimisticTask: (task: Task) => void;
};

const UpdateTaskForm = ({
  task,
  setIsUpdating,
  updateOptimisticTask,
}: Props) => {
  const ref = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      ref.current?.reset();
    }
  }, []);

  async function action(formData: FormData) {
    const taskId = formData.get("taskId") as string;
    const newTask = formData.get("task") as string;

    setIsUpdating(false);
    ref.current?.reset();

    const updatedTask: Task = {
      ...task,
      title: newTask,
    };

    updateOptimisticTask(updatedTask);
    await updateTaskAction(taskId, newTask);
  }

  return (
    <form
      ref={ref}
      onSubmit={(e) => {
        e.preventDefault();
        action(new FormData(e.currentTarget));
      }}
      className="flex justify-between items-center w-full"
    >
      <div className="w-full">
        <Input name="taskId" className="hidden" value={task.id} />
        <Input
          type="text"
          name="task"
          placeholder={task.title}
          required
          className="border-none bg-transparent dark:bg-transparent p-0 pr-2"
          ref={inputRef}
        />
      </div>
      <div className="flex space-x-2">
        <button
          type="button"
          aria-label="cancel task update"
          onClick={() => setIsUpdating(false)}
        >
          <X className="text-red-400" size={28} />
        </button>
        <FormActionButton
          icon={Check}
          label="Update Task"
          className="text-green-400"
          iconSize={28}
        />
      </div>
    </form>
  );
};

export default UpdateTaskForm;
