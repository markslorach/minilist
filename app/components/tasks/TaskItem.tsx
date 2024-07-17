"use client";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CompleteTaskForm from "./CompleteTaskForm";
import { Pencil } from "lucide-react";
import UpdateTaskForm from "./UpdateTaskForm";
import DeleteTaskForm from "./DeleteTaskForm";
import { useOptimistic, useState } from "react";
import { Task } from "@prisma/client";

type Props = {
  task: Task;
  handleDelete: (taskId: string) => void;
  onTaskComplete: (updatedTask: Task) => void;
};

const TaskItem = ({ task, handleDelete, onTaskComplete }: Props) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [optimisticTask, updateOptimisticTask] = useOptimistic(task);

  return (
    <AccordionItem
      key={task.id}
      value={task.id.toString()}
      className="border-none py-0.5"
    >
      <div className="flex items-center space-x-3">
        <CompleteTaskForm
          task={optimisticTask}
          onTaskComplete={onTaskComplete}
        />
        <div className="w-full">
          <AccordionTrigger>{optimisticTask.title}</AccordionTrigger>
        </div>
      </div>
      <AccordionContent className="flex h-16 items-center">
        {!isUpdating ? (
          <div className="flex items-center space-x-4">
            <Pencil
              onClick={() => setIsUpdating(true)}
              className="cursor-pointer text-gray-600 dark:text-gray-400"
              size={25}
            />
            <DeleteTaskForm taskId={task.id} handleDelete={handleDelete} />
          </div>
        ) : (
          <UpdateTaskForm
            task={optimisticTask}
            setIsUpdating={setIsUpdating}
            updateOptimisticTask={updateOptimisticTask}
          />
        )}
      </AccordionContent>
    </AccordionItem>
  );
};

export default TaskItem;
