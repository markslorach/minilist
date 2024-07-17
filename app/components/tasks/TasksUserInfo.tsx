import { Task } from "@prisma/client";

const TasksUserInfo = ({ tasksPending }: { tasksPending: Task[] }) => {
  return (
    <div className="pb-10">
      {tasksPending.length < 1 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          <i>Squeaky</i> clean! Add some tasks above to get started.
        </p>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-balance">
          Click a task&apos;s checkbox to mark it as complete, or click the task
          to view its actions.
        </p>
      )}
    </div>
  );
};

export default TasksUserInfo;
