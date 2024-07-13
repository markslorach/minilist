import { Input } from "@/components/ui/input";
import { deleteTask } from "../../actions/taskActions";
import { Trash } from "lucide-react";
import FormActionButton from "../FormActionButton";

type Props = {
  taskId: number;
};

const DeleteTaskForm = ({ taskId }: Props) => {
  return (
    <form className="flex"
      action={async (formData: FormData) => {
        await deleteTask(formData);
      }}
    >
      <Input name="taskId" className="hidden" value={taskId} />
      <FormActionButton icon={Trash} label="Delete Task" className="text-red-400" iconSize={25}/>
    </form>
  );
};

export default DeleteTaskForm;
