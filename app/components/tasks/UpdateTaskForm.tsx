"use client";
import { Input } from "@/components/ui/input";
import { useEffect, useRef } from "react";
import UpdateTaskButton from "./UpdateTaskButton";
import { updateTask } from "@/app/actions/taskActions";
import { X } from "lucide-react";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

const UpdateTaskForm = ({
  task,
  setUpdateTask,
}: {
  task: Task;
  setUpdateTask: (value: boolean) => void;
}) => {
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
        setUpdateTask(false);
        await updateTask(formData);
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
          onClick={() => setUpdateTask(false)}
        >
          <X className="w-5 h-5 text-red-400" />
        </button>
        <UpdateTaskButton />
      </div>
    </form>
  );
};

export default UpdateTaskForm;
