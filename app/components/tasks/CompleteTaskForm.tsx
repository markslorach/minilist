import { Input } from "@/components/ui/input";
import { completeTaskAction } from "../../actions/taskActions";
import CompleteTaskButton from "./CompleteTaskButton";
import { Task } from "@prisma/client";

const CompleteTaskForm = ({
  task,
  onTaskComplete,
}: {
  task: Task;
  onTaskComplete: (updatedTask: Task) => void;
}) => {
  async function action(formData: FormData) {
    const taskId = formData.get("taskId") as string;
    const updatedTask = { ...task, completed: !task.completed };
    setTimeout(() => onTaskComplete(updatedTask), 400);
    await completeTaskAction(taskId);
  }
  return (
    <form action={action}>
      <Input
        name="taskId"
        className="hidden"
        value={task.id}
        defaultValue={task.id}
      />
      <CompleteTaskButton task={task} />
    </form>
  );
};

export default CompleteTaskForm;
