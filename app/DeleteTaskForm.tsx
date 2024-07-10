import { Input } from "@/components/ui/input";
import { deleteTask } from "./actions/taskActions";
import DeleteTaskButton from "./DeleteTaskButton";

type Props = {
  taskId: number;
};

const DeleteTaskForm = ({ taskId }: Props) => {
  return (
    <form
      action={async (formData: FormData) => {
        "use server";
        await deleteTask(formData);
      }}
    >
      <Input name="taskId" className="hidden" value={taskId} />
      <DeleteTaskButton />
    </form>
  );
};

export default DeleteTaskForm;
