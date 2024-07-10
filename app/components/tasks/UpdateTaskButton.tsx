import { Check } from "lucide-react";
import { useFormStatus } from "react-dom";

const UpdateTaskButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-label="update task"
      disabled={pending}
      className="text-gray-500 dark:text-gray-400"
    >
      <Check className="w-5 h-5 text-green-400" />
    </button>
  );
};

export default UpdateTaskButton;
