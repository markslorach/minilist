import { SignedIn } from "@clerk/nextjs";
import { capitaliseString, userGreeting } from "@/utils/helpers";
import { Task, User } from "@prisma/client";
import Heading from "./Heading";

type Props = {
  tasks: Task[];
  user: User;
};

const UserGreeting = ({ tasks, user }: Props) => {
  const taskCount = tasks.filter((task) => !task.completed).length;
  const greeting = userGreeting();
  const userName = capitaliseString(user?.name as string);

  return (
    <section>
      <SignedIn>
        <Heading className="pb-10">
          {user.name ? `${greeting}, ${userName}.` : `${greeting}.`}{" "}
          You have <span className="text-blue-500">{taskCount}</span>{" "}
          {taskCount === 1 ? "task" : "tasks"} pending.
        </Heading>
      </SignedIn>
    </section>
  );
};

export default UserGreeting;
