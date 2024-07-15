import { Task } from "@prisma/client";

const TasksCompletedUserInfo = ({
  tasksComplete,
}: {
  tasksComplete: Task[];
}) => {
  const completedMessage = () => {
    switch (true) {
      case tasksComplete.length === 1:
        return "You have 1 task completed.";
      case tasksComplete.length > 1 && tasksComplete.length < 5:
        return "Your completed tasks.";
      case tasksComplete.length >= 5:
        return "Your last 5 completed tasks.";
      default:
        return "Complete a task to see it below.";
    }
  };

  return (
    <p className="pb-10 text-sm text-gray-500 dark:text-gray-400">
      {completedMessage()}
    </p>
  );
};

export default TasksCompletedUserInfo;
