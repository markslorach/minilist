"use client"
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

const TaskItem = ({ task, handleDelete, onTaskComplete }: Props ) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [optimisticTask, updateLocalOptimisticTask] = useOptimistic(task)

  return (
    <AccordionItem
      key={task.id}
      value={task.id.toString()}
      className="border-none py-0.5"
    >
      <div className="flex items-center space-x-3">
        <CompleteTaskForm task={optimisticTask} onTaskComplete={onTaskComplete} />
        <div className="w-full">
          <AccordionTrigger>{optimisticTask.title}</AccordionTrigger>
        </div>
      </div>
      <AccordionContent className="h-16 flex items-center">
        {!isUpdating ? (
          <div className="flex space-x-4 items-center">
            <Pencil
              onClick={() => setIsUpdating(true)}
              className="text-gray-600 dark:text-gray-400 cursor-pointer"
              size={25}
            />
            <DeleteTaskForm taskId={task.id} handleDelete={handleDelete}/>
          </div>
        ) : (
          <UpdateTaskForm task={optimisticTask} setIsUpdating={setIsUpdating} updateOptimisticTask={updateLocalOptimisticTask}  />
        )}
      </AccordionContent>
    </AccordionItem>
  );
};

export default TaskItem;
