import prisma from "@/prisma/client";
import { SignedIn } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

// Components
import UserWelcome from "../UserWelcome";
import { Prisma } from "@prisma/client";
import AddTaskForm from "../components/tasks/AddTaskForm";
import TaskComponent from "../components/tasks/TaskComponent";

export default async function Home() {
  const user = await currentUser();

  if (user) {
    try {
      await prisma.user.create({
        data: {
          email: user.emailAddresses[0].emailAddress,
          name: user.firstName,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        console.warn("User already exists:", user.username);
      } else {
        console.error("Error creating user:", error);
        throw error;
      }
    }
  }

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
