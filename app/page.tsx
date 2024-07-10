import prisma from "@/prisma/client";
import { SignedIn } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

// Components
import UserWelcome from "./UserWelcome";
import AddTaskForm from "./AddTaskForm";
import TaskComponent from "./TaskComponent";

export default async function Home() {
  const user = await currentUser();
  const tasks = await prisma.task.findMany({
    where: {
      user: {
        email: user?.emailAddresses[0].emailAddress as string,
      },
    },
    orderBy: [{ completed: "asc" }, { createdAt: "desc" }],
  });

  return (
    <main className="py-16">
      <UserWelcome />
      <SignedIn>
        <AddTaskForm />
        <TaskComponent tasks={tasks} />
      </SignedIn>
    </main>
  );
}
