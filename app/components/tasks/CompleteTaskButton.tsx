"use client";
import { Circle, CircleCheck } from "lucide-react";
import { useFormStatus } from "react-dom";

const CompleteTaskButton = ({ task }: { task: { completed: boolean } }) => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      aria-label={task.completed ? "Mark task as incomplete" : "Mark task as complete"}
      disabled={pending}
      className="flex items-center"
    >
      <div className=" text-neutral-700 dark:text-neutral-200">
        {pending && !task.completed ? (
          <CircleCheck className="h-6 w-6" />
        ) : pending && task.completed ? (
          <Circle className="h-6 w-6" />
        ) : task.completed ? (
          <CircleCheck className="h-6 w-6" />
        ) : (
          <Circle className="h-6 w-6" />
        )}
      </div>
    </button>
  );
};

export default CompleteTaskButton;
