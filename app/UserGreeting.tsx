import { currentUser } from "@clerk/nextjs/server";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { getTasks } from "@/lib/tasks";
import { capitaliseString, userGreeting } from "@/utils/helpers";
import Heading from "./components/Heading";

const UserGreeting = async () => {
  const user = await currentUser();
  const { tasks = [] } = await getTasks();

  const taskCount = tasks.filter((task) => !task.completed).length;
  const greeting = userGreeting();
  const userName = capitaliseString(user?.firstName as string);

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
