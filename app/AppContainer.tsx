import { getTasks } from "@/lib/tasks";
import { getUser } from "@/lib/user";
import TaskComponent from "./components/tasks/TaskComponent";
import { User } from "@prisma/client";

const AppContainer = async () => {
    const user = await getUser() as User
    const { tasks = [] } = await getTasks();
  


  return (
    <TaskComponent tasks={tasks} user={user} />
  )
}

export default AppContainer