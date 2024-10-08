import { Input } from "@/components/ui/input";
import { deleteTaskAction } from "../../actions/taskActions";
import { Trash } from "lucide-react";
import FormActionButton from "./FormActionButton";
import { toast } from "sonner";

type Props = {
  taskId: number;
  handleDelete: (taskId: string) => void;
};

const DeleteTaskForm = ({ taskId, handleDelete }: Props) => {
  async function action(formData: FormData) {
    const taskId = formData.get("taskId") as string;

    setTimeout(() => handleDelete(taskId), 200);

    const result = await deleteTaskAction(taskId);

    if (result?.error) {
      toast.error(result.error)
    }
  }

  return (
    <form className="flex" action={action}>
      <Input name="taskId" className="hidden" value={taskId} />
      <FormActionButton
        icon={Trash}
        label="Delete Task"
        className="text-red-400"
        iconSize={25}
      />
    </form>
  );
};

export default DeleteTaskForm;
