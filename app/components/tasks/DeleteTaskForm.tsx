import { Input } from "@/components/ui/input";
import { deleteTask } from "../../actions/taskActions";
import DeleteTaskButton from "./DeleteTaskButton";

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
      <DeleteTaskButton />
    </form>
  );
};

export default DeleteTaskForm;
