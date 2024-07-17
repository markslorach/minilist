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
import CompleteTasksItem from "./CompleteTasksItem";
import UserGreeting from "../shared/UserGreeting";

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
      tasks.filter((task) => task.id !== parseInt(taskId))
    );
  };

  const handleTaskComplete = (updatedTask: Task) => {
    setOptimisticTasks((tasks) =>
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
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

      <Heading className="pt-10 pb-2">Tasks</Heading>
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

      <Heading className="pt-10 pb-2">Completed</Heading>
      <TasksCompletedUserInfo tasksComplete={tasksComplete} />

      <div className="space-y-3.5 mb-10">
        {tasksComplete
          .map((task) => (
            <CompleteTasksItem
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
            <LoaderCircle className="w-5 h-5 animate-spin ml-1.5" />
          ) : (
            <Check className="w-5 h-5 ml-1.5" />
          )}
        </Button>
      )}
    </section>
  );
};

export default TaskComponent;
