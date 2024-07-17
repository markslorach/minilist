import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { capitaliseString, userGreeting } from "@/utils/helpers";
import { Task } from "@prisma/client";
import Heading from "./Heading";

type Props = {
  tasks: Task[];
  user: any;
};

const UserGreeting = ({ tasks, user }: Props) => {
  const taskCount = tasks.filter((task) => !task.completed).length;
  const greeting = userGreeting();
  const userName = capitaliseString(user);

  return (
    <section>
      <SignedIn>
        <Heading className="pb-10">
          {greeting}, {userName}. You have{" "}
          <span className="text-blue-500">{taskCount}</span>{" "}
          {taskCount === 1 ? "task" : "tasks"} pending.
        </Heading>
      </SignedIn>
    </section>
  );
};

export default UserGreeting;
