"use client";
import { Input } from "@/components/ui/input";
import { useEffect, useRef } from "react";
import { updateTaskAction } from "@/app/actions/taskActions";
import { X, Check } from "lucide-react";
import { Task } from "@prisma/client";
import FormActionButton from "../FormActionButton";

const UpdateTaskForm = ({
  task,
  setIsUpdating,
  updateOptimisticTask,
}: {
  task: Task;
  setIsUpdating: (value: boolean) => void;
  updateOptimisticTask: (task: Task) => void;
}) => {
  const ref = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  async function action(formData: FormData) {
    const taskId = formData.get("taskId") as string;
    const newTask = formData.get("task") as string;
    try {
      ref.current?.reset();
      updateOptimisticTask({ ...task, title: newTask });
      await updateTaskAction(taskId, newTask);
    } catch (error) {
      console.error("Error updating task:", error);
      updateOptimisticTask(task);
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <form
      ref={ref}
      action={action}
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
