"use client";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { clearCompletedTasks } from "@/app/actions/taskActions";
import { Task } from "@prisma/client";
import { useOptimistic } from "react";

// Components
import Heading from "../Heading";
import TaskItem from "./TaskItem";
import CompleteTaskForm from "./CompleteTaskForm";
import AddTaskForm from "./AddTaskForm";
import TasksUserInfo from "../TasksUserInfo";
import TasksCompletedUserInfo from "../TasksCompletedUserInfo";

const TaskComponent = ({ tasks }: { tasks: Task[] }) => {
  const [optimisticTasks, setOptimisticTasks] = useOptimistic<Task[]>(tasks);

  const addOptimisticTask = (newTask: Task) => {
    setOptimisticTasks([newTask, ...optimisticTasks]); 
  };
  
  const handleDeleteTask = (taskId: string) => {
    setOptimisticTasks(tasks => tasks.filter(task => task.id !== parseInt(taskId)));
  };

  const tasksPending = optimisticTasks.filter((task) => !task.completed);
  const tasksComplete = optimisticTasks.filter((task) => task.completed);

  return (
    <section>
      <AddTaskForm addOptimisticTask={addOptimisticTask} />

      <Heading className="pt-10 pb-2">Tasks</Heading>
      <TasksUserInfo tasksPending={tasksPending} />

      <Accordion type="single" collapsible className="w-full">
        {tasksPending.map((task) => (
          <TaskItem key={task.id} task={task} handleDelete={handleDeleteTask} />
        ))}
      </Accordion>

      <Heading className="pt-10 pb-2">Completed</Heading>
      <TasksCompletedUserInfo tasksComplete={tasksComplete} />

      <div className="space-y-3.5 mb-10">
        {tasksComplete
          .map((task) => (
            <div key={task.id} className="flex items-center space-x-3">
              <CompleteTaskForm task={task} />
              <p className="text-sm line-through">{task.title}</p>
            </div>
          ))
          .slice(0, 5)}
      </div>

      {tasksComplete.length > 0 && (
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
