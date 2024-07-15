"use client";
import Heading from "../Heading";
import {
  Accordion,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import CompleteTaskForm from "./CompleteTaskForm";
import { clearCompletedTasks } from "@/app/actions/taskActions";
import TaskItem from "./TaskItem";
import { Task } from "@prisma/client";

const TaskComponent = ({ tasks }: { tasks: Task[] }) => {
  const taskComplete = tasks.filter((task) => task.completed);
  const taskPending = tasks.filter((task) => !task.completed);

  const completedMessage = () => {
    switch (true) {
      case taskComplete.length === 1:
        return "You have 1 task completed.";
      case taskComplete.length > 1 && taskComplete.length < 5:
        return "Your completed tasks.";
      case taskComplete.length >= 5:
        return "Your last 5 completed tasks.";
      default:
        return "Complete a task to see it below.";
    }
  };

  return (
    <section>
      <Heading className="pt-10 pb-2">Tasks</Heading>
      
      <div className="pb-10">
        {taskPending.length < 1 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <i>Squeaky</i> clean! Add some tasks above to get started.
          </p>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-balance">
            Click a task&apos;s checkbox to mark it as complete, or click the
            task to view its actions.
          </p>
        )}
      </div>

      <Accordion type="single" collapsible className="w-full">
        {taskPending.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </Accordion>

      <Heading className="pt-10 pb-2">Completed</Heading>
      <p className="pb-10 text-sm text-gray-500 dark:text-gray-400">
        {completedMessage()}
      </p>

      <div className="space-y-3.5 mb-10">
        {taskComplete
          .map((task) => (
            <div key={task.id} className="flex items-center space-x-3">
              <CompleteTaskForm task={task} />
              <p className="text-sm line-through">{task.title}</p>
            </div>
          ))
          .slice(0, 5)}
      </div>

      {taskComplete.length > 0 && (
        <Button
          onClick={() => clearCompletedTasks()}
          variant="secondary"
          size="sm"
        >
          Clear completed tasks
        </Button>
      )}
    </section>
  );
};

export default TaskComponent;
