import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { capitaliseString, userGreeting } from "@/utils/helpers";
import Heading from "./components/Heading";
import { Task } from "@prisma/client";

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
      <SignedOut>
        <Heading>
          Welcome! Please{" "}
          <span className="text-blue-500">
            <SignInButton>sign in</SignInButton>
          </span>{" "}
          to see your tasks for today.
        </Heading>
      </SignedOut>

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
