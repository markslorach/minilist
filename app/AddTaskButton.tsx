import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useFormStatus } from "react-dom";

const AddTaskButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-label="add task"
      disabled={pending}
      className="text-gray-500 dark:text-gray-400"
    >
      <Plus />
    </button>
  );
};

export default AddTaskButton;
