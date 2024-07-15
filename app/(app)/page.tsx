import prisma from "@/prisma/client";
import { SignedIn } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

// Components
import UserWelcome from "../UserWelcome";
import TaskComponent from "../components/tasks/TaskComponent";
import { getTasks } from "@/lib/tasks";

export default async function Home() {
  const user = await currentUser();
  const {tasks = []} = await getTasks();


  if (user) {
    const email = user.emailAddresses[0].emailAddress;

    try {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (!existingUser) {
        await prisma.user.create({
          data: {
            email,
            name: user.firstName,
          },
        });
        console.log(`New user created`);
      } else {
        console.log(`User already exists`);
      }
    } catch (error) {
      console.error("Error finding or creating user:", error);
      throw error;
    }
  }

  return (
    <main className="py-16">
      <UserWelcome />
      <SignedIn>
        <TaskComponent tasks={tasks} />
      </SignedIn>
    </main>
  );
}
