import { Circle, CircleCheck } from "lucide-react";
import { useFormStatus } from "react-dom";

type Props = {
  task: { completed: boolean };
};

const CompleteCheckbox = ({ task }: Props) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-label={
        task.completed ? "Mark task as incomplete" : "Mark task as complete"
      }
      disabled={pending}
      className="flex items-center"
    >
      <div className="text-neutral-700 dark:text-neutral-200">
        {pending && !task.completed ? (
          <CircleCheck className="h-6 w-6 text-blue-500" />
        ) : pending && task.completed ? (
          <Circle className="h-6 w-6 text-blue-500" />
        ) : task.completed ? (
          <CircleCheck className="h-6 w-6 text-blue-500" />
        ) : (
          <Circle className="h-6 w-6 text-blue-500" />
        )}
      </div>
    </button>
  );
};

export default CompleteCheckbox;
