"use client";
import { Pencil } from "lucide-react";
import Heading from "../Heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import DeleteTaskForm from "./DeleteTaskForm";
import { Button } from "@/components/ui/button";
import CompleteTaskForm from "./CompleteTaskForm";
import { useState } from "react";
import UpdateTaskForm from "./UpdateTaskForm";
import { clearCompletedTasks } from "@/app/actions/taskActions";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

const TaskComponent = ({ tasks }: { tasks: Task[] }) => {
  const [updateTask, setUpdateTask] = useState(false);

  return (
    <section>
      <Heading className="pt-10 pb-2">Tasks</Heading>
      <p className="pb-10 text-sm text-gray-500 dark:text-gray-400 text-balance">
        Click a task&apos;s checkbox to mark it as complete, or click the task
        to view its actions.
      </p>
      {tasks.filter((task) => !task.completed).length < 1 ? (
        <p className="text-sm">
          Squeaky clean! Add some tasks above to get started.
        </p>
      ) : (
        <Accordion type="single" collapsible className="w-full">
          {tasks
            .filter((task) => !task.completed)
            .map((task) => (
              <AccordionItem
                key={task.id}
                value={task.id.toString()}
                className="border-none"
              >
                <div className="flex items-center space-x-3">
                  <CompleteTaskForm task={task} />
                  <div className="w-full">
                    <AccordionTrigger>{task.title}</AccordionTrigger>
                  </div>
                </div>
                <AccordionContent className="h-16 flex items-center">
                  {!updateTask ? (
                    <div className="flex space-x-4 items-center">
                      <Pencil
                        onClick={() => setUpdateTask(true)}
                        className="h-5 w-5 text-gray-600 dark:text-gray-400 cursor-pointer"
                      />
                      <DeleteTaskForm taskId={task.id} />
                    </div>
                  ) : (
                    <UpdateTaskForm task={task} setUpdateTask={setUpdateTask} />
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
      )}

      <Heading className="pt-10 pb-2">Completed</Heading>
      <p className="pb-10 text-sm text-gray-500 dark:text-gray-400">
        Your completed tasks will clear at the end of each day.
      </p>

      <div className="space-y-4 mb-10">
        {tasks
          .filter((task) => task.completed)
          .map((task) => (
            <div key={task.id} className="mb-6">
              <div className="flex items-center space-x-3">
                <CompleteTaskForm task={task} />
                <p className="text-sm line-through">
                  {task.title}
                  {/* {task.title.charAt(0).toUpperCase() + task.title.slice(1)} */}
                </p>
              </div>
            </div>
          ))}
        {tasks.filter((task) => task.completed).length > 0 && (
          <Button
            onClick={() => clearCompletedTasks()}
            variant="secondary"
            size="sm"
          >
            Clear completed tasks
          </Button>
        )}
      </div>
    </section>
  );
};

export default TaskComponent;
