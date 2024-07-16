"use client"
import { Input } from "@/components/ui/input";
import { completeTask } from "../../actions/taskActions";
import CompleteTaskButton from "./CompleteTaskButton";
import { Task } from "@prisma/client";

const CompleteTaskForm = ({ task, onTaskComplete }: { task: Task; onTaskComplete: (updatedTask: Task) => void; }) => {

  return (
    <form
      action={async (formData: FormData) => {
        const updatedTask = { ...task, completed: !task.completed };
        onTaskComplete(updatedTask); 
        await completeTask(formData);
      }}
    >
      <Input name="taskId" className="hidden" value={task.id} defaultValue={task.id} />
      <CompleteTaskButton task={task} />
    </form>
  );
};

export default CompleteTaskForm;
