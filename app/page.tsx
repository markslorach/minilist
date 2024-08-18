import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import TaskComponent from "./components/tasks/TaskComponent";
import { getTasks } from "@/lib/tasks";
import Heading from "./components/shared/Heading";
import { getUser } from "@/lib/user";
import { User } from "@prisma/client";

export default async function Home() {
  const user = await getUser() as User
  const { tasks = [] } = await getTasks();

  return (
    <main className="py-16">
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
        <TaskComponent tasks={tasks} user={user} />
      </SignedIn>
    </main>
  );
}
