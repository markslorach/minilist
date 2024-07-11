import { Plus } from "lucide-react";
import { useFormStatus } from "react-dom";

const AddTaskButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-label="add task"
      disabled={pending}
    >
      <Plus className="h-7 w-7" />
    </button>
  );
};

export default AddTaskButton;
