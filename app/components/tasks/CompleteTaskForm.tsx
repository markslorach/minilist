import { Input } from "@/components/ui/input";
import { completeTask } from "../../actions/taskActions";
import CompleteTaskButton from "./CompleteTaskButton";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

const CompleteTaskForm = ({ task }: { task: Task }) => {
  return (
    <form
      action={async (formData: FormData) => {
        await completeTask(formData);
      }}
    >
      <Input name="taskId" className="hidden" value={task.id} defaultValue={task.id} />
      <CompleteTaskButton task={task} />
    </form>
  );
};

export default CompleteTaskForm;
