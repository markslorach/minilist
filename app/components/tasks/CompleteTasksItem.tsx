import { Task } from "@prisma/client";
import CompleteTaskForm from "./CompleteTaskForm";

type Props = {
  task: Task;
  handleTaskComplete: (task: Task) => void;
};

const CompleteTasksItem = ({ task, handleTaskComplete }: Props) => {
  return (
    <div className="flex items-center space-x-3">
      <CompleteTaskForm task={task} onTaskComplete={handleTaskComplete} />
      <p className="text-sm line-through">{task.title}</p>
    </div>
  );
};

export default CompleteTasksItem;
