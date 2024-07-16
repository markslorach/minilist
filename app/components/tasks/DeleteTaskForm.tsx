import { Input } from "@/components/ui/input";
import { deleteTaskAction } from "../../actions/taskActions";
import { Trash } from "lucide-react";
import FormActionButton from "../FormActionButton";

type Props = {
  taskId: number;
};

const DeleteTaskForm = ({ taskId }: Props) => {
  
  async function action(formData: FormData) {
    const taskId = formData.get("taskId") as string;
    await deleteTaskAction(taskId);
  }

  return (
    <form className="flex"
      action={action}
    >
      <Input name="taskId" className="hidden" value={taskId} />
      <FormActionButton icon={Trash} label="Delete Task" className="text-red-400" iconSize={25}/>
    </form>
  );
};

export default DeleteTaskForm;
