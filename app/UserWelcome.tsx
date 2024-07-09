import prisma from "@/prisma/client";
import { currentUser } from "@clerk/nextjs/server";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Heading from "./components/Heading";

const UserWelcome = async () => {
  const user = await currentUser();
  const tasks = await prisma.task.findMany({
    where: {
      user: {
        email: user?.emailAddresses[0].emailAddress as string,
      },
    },
  });

  const taskCount = tasks.filter((task) => !task.completed).length;

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
          Welcome back, {user?.firstName}. You have{" "}
          <span className="text-blue-500">{taskCount}</span>{" "}
          {tasks.length === 1 ? "task" : "tasks"} pending.
        </Heading>
      </SignedIn>
    </section>
  );
};

export default UserWelcome;
