import { currentUser } from "@clerk/nextjs/server";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Heading from "./components/Heading";
import { getTasks } from "@/lib/tasks";
import { userGreeting } from "@/utils/helpers";

const UserGreeting = async () => {
  const user = await currentUser();
  const { tasks = [] } = await getTasks();

  const taskCount = tasks.filter((task) => !task.completed).length;
  const greeting = userGreeting()

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
          {greeting},{" "}
          {`${user?.firstName?.charAt(0).toUpperCase()}${user?.firstName?.slice(
            1
          )}`}
          . You have <span className="text-blue-500">{taskCount}</span>{" "}
          {taskCount === 1 ? "task" : "tasks"} pending.
        </Heading>
      </SignedIn>
    </section>
  );
};

export default UserGreeting;
