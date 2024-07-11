import prisma from "@/prisma/client";
import { SignedIn } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

// Components
import UserWelcome from "../UserWelcome";
import AddTaskForm from "../components/tasks/AddTaskForm";
import TaskComponent from "../components/tasks/TaskComponent";

export default async function Home() {
  const user = await currentUser();

  if (user) {
    const clerkEmail = user.emailAddresses[0].emailAddress;

    try {
      const existingUser = await prisma.user.findUnique({
        where: { email: clerkEmail },
      });

      if (!existingUser) {
        await prisma.user.create({
          data: {
            email: clerkEmail,
            name: user.firstName,
          },
        });
        console.log(`New user created: ${clerkEmail}`);
      } else {
        console.log(`User already exists: ${clerkEmail}`);
      }
    } catch (error) {
      console.error("Error finding or creating user:", error);
      throw error;
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
