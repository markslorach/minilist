import { Task } from "@prisma/client";
import CompleteTaskForm from "./CompleteTaskForm";

type Props = {
  task: Task;
  handleTaskComplete: (task: Task) => void;
};

const TaskCompletedItem = ({ task, handleTaskComplete }: Props) => {
  return (
    <div className="flex items-center space-x-3">
      <CompleteTaskForm task={task} onTaskComplete={handleTaskComplete} />
      <p className="text-neutral-800 line-through dark:text-neutral-50">
        {task.title}
      </p>
    </div>
  );
};

export default TaskCompletedItem;
