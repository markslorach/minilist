import prisma from "@/prisma/client";
import { currentUser } from "@clerk/nextjs/server";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

const UserWelcome = async () => {
  // looks at passing a user and tasks as props - user could be null - null check?
  const user = await currentUser();
  const tasks = await prisma.task.findMany();

  return (
    <section>
      <SignedOut>
        <h2 className="text-xl font-semibold">
          Welcome! Please{" "}
          <span className="text-blue-500">
            <SignInButton>sign in</SignInButton>
          </span>{" "}
          to see your tasks for today.
        </h2>
      </SignedOut>

      <SignedIn>
        <h2 className="pb-10 text-xl font-semibold">
          Welcome back, {user?.firstName}. You have{" "}
          <span className="text-blue-500">{tasks.length}</span>{" "}
          {tasks.length === 1 ? "task" : "tasks"} pending.
        </h2>
      </SignedIn>
    </section>
  );
};

export default UserWelcome;
