import { Check, LoaderCircle } from "lucide-react";
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
      {pending ? (
        <LoaderCircle className="animate-spin h-7 w-7 text-green-400" />
      ) : (
        <Check className="w-7 h-7 text-green-400" />
      )}
    </button>
  );
};

export default UpdateTaskButton;
