"use client";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { clearCompletedTasks } from "@/app/actions/taskActions";
import { Task } from "@prisma/client";
import { useOptimistic, useState } from "react";
import { Check, LoaderCircle } from "lucide-react";
import Heading from "../shared/Heading";
import TaskItem from "./TaskItem";
import AddTaskForm from "./AddTaskForm";
import TasksUserInfo from "./TasksUserInfo";
import TasksCompletedUserInfo from "./TasksCompletedUserInfo";
import UserGreeting from "../shared/UserGreeting";
import TaskCompletedItem from "./TaskCompletedItem";

type Props = {
  tasks: Task[];
  user: any;
};

const TaskComponent = ({ tasks, user }: Props) => {
  const [isClearing, setIsClearing] = useState(false);
  const [optimisticTasks, setOptimisticTasks] = useOptimistic<Task[]>(tasks);

  const addOptimisticTask = (newTask: Task) => {
    setOptimisticTasks([newTask, ...optimisticTasks]);
  };

  const handleDeleteTask = (taskId: string) => {
    setOptimisticTasks((tasks) =>
      tasks.filter((task) => task.id !== parseInt(taskId)),
    );
  };

  const handleTaskComplete = (updatedTask: Task) => {
    setOptimisticTasks((tasks) =>
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );
  };

  const tasksPending = optimisticTasks
    .filter((task) => !task.completed)
    .sort((a, b) => (a.xata_createdat > b.xata_createdat ? -1 : 1));

  const tasksComplete = optimisticTasks.filter((task) => task.completed);

  return (
    <section>
      <UserGreeting user={user} tasks={optimisticTasks} />
      <AddTaskForm addOptimisticTask={addOptimisticTask} />

      <Heading className="pb-2 pt-10">Tasks</Heading>
      <TasksUserInfo tasksPending={tasksPending} />

      <Accordion type="single" collapsible className="w-full">
        {tasksPending.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            handleDelete={handleDeleteTask}
            onTaskComplete={handleTaskComplete}
          />
        ))}
      </Accordion>

      <Heading className="pb-2 pt-10">Completed</Heading>
      <TasksCompletedUserInfo tasksComplete={tasksComplete} />

      <div className="mb-10 space-y-3.5">
        {tasksComplete
          .map((task) => (
            <TaskCompletedItem
              key={task.id}
              task={task}
              handleTaskComplete={handleTaskComplete}
            />
          ))
          .slice(0, 5)}
      </div>

      {tasksComplete.length > 0 && (
        <Button
          onClick={async () => {
            setIsClearing(true);
            await clearCompletedTasks();
            setIsClearing(false);
          }}
          variant="secondary"
          size="sm"
          disabled={isClearing}
        >
          Clear completed tasks
          {isClearing ? (
            <LoaderCircle className="ml-1.5 h-5 w-5 animate-spin" />
          ) : (
            <Check className="ml-1.5 h-5 w-5" />
          )}
        </Button>
      )}
    </section>
  );
};

export default TaskComponent;
