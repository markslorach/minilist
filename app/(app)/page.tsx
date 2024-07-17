import prisma from "@/prisma/client";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import TaskComponent from "../components/tasks/TaskComponent";
import { getTasks } from "@/lib/tasks";
import Heading from "../components/Heading";

export default async function Home() {
  const user = await currentUser();
  const { tasks = [] } = await getTasks();

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
        <TaskComponent tasks={tasks} user={user?.firstName} />
      </SignedIn>
    </main>
  );
}
