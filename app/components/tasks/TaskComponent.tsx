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

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

const TaskComponent = ({ tasks }: { tasks: Task[] }) => {
  return (
    <section>
      <Heading className="pt-10 pb-2">Tasks</Heading>
      <p className="pb-10 text-sm text-gray-500 dark:text-gray-400 text-balance">
        Click the checkbox to mark a task as complete or click a task to see a
        tasks actions.
      </p>

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
              <AccordionContent>
                <div className="flex space-x-4">
                  <Pencil className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  <DeleteTaskForm taskId={task.id} />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
      </Accordion>

      <Heading className="pt-10 pb-2">Completed</Heading>
      <p className="pb-10 text-sm text-gray-500 dark:text-gray-400">
        Your completed tasks will clear at the end of each day.
      </p>

      <div className="space-y-4 mb-10">
        {tasks
          .filter((task) => task.completed)
          .map((task) => (
            <div key={task.id}>
              <div className="flex items-center space-x-3">
                <CompleteTaskForm task={task} />
                <p className="text-sm line-through">{task.title}</p>
              </div>
            </div>
          ))}
      </div>

      <Button variant="secondary">Clear completed tasks</Button>
    </section>
  );
};

export default TaskComponent;
