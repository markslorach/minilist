"use client";
import { Circle, CircleCheck } from "lucide-react";
import { useFormStatus } from "react-dom";

const CompleteTaskButton = ({ task }: { task: { completed: boolean } }) => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      aria-label="complete task"
      disabled={pending}
      className="flex items-center"
    >
      <div className=" text-neutral-700">
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
