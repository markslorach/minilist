import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useFormStatus } from "react-dom";

const AddTaskButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      className="bg-transparent dark:bg-transparent hover:bg-transparent dark:hover:bg-transparent text-gray-500 dark:text-gray-400 p-0"
    >
      <Plus />
    </Button>
  );
};

export default AddTaskButton;
