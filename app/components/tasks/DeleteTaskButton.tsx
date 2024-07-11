"use client"
import { Trash } from "lucide-react";
import { useFormStatus } from "react-dom";

const DeleteTaskButton = () => {
  const { pending } = useFormStatus();
  return (
    <button type="submit" aria-label="delete task" disabled={pending}>
      {" "}
      <Trash className="h-6 w-6 text-red-400" />
    </button>
  );
};

export default DeleteTaskButton;
