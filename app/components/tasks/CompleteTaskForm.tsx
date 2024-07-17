import { Input } from "@/components/ui/input";
import { completeTaskAction } from "../../actions/taskActions";
import { Task } from "@prisma/client";
import CompleteCheckbox from "./CompleteCheckbox";
import { toast } from "sonner";

type Props = {
  task: Task;
  onTaskComplete: (updatedTask: Task) => void;
};

const CompleteTaskForm = ({ task, onTaskComplete }: Props) => {
  async function action(formData: FormData) {
    const taskId = formData.get("taskId") as string;

    const updatedTask = { ...task, completed: !task.completed };

    setTimeout(() => onTaskComplete(updatedTask), 200);
    const result = await completeTaskAction(taskId);

    if (result?.error) {
      toast.error(result.error)
    }
  }

  return (
    <form action={action}>
      <Input
        name="taskId"
        className="hidden"
        value={task.id}
        defaultValue={task.id}
      />
      <CompleteCheckbox task={task} />
    </form>
  );
};

export default CompleteTaskForm;
