import { Trash, Pencil } from "lucide-react";
import prisma from "@/prisma/client";
import { SignedIn } from "@clerk/nextjs";
import UserWelcome from "./UserWelcome";
import Heading from "./components/Heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { currentUser } from "@clerk/nextjs/server";
import AddTaskForm from "./AddTaskForm";

export default async function Home() {
  const user = await currentUser();
  const tasks = await prisma.task.findMany({
    where: {
      user: {
        email: user?.emailAddresses[0].emailAddress as string,
      },
    },
  });

  return (
    <main className="py-20">
      <UserWelcome />
      <SignedIn>
        <AddTaskForm />
        <Heading className="pt-10 pb-2">Tasks</Heading>
        <p className="pb-10 text-sm text-gray-500 dark:text-gray-400">
          Click the checkbox to mark a task as completed or click a task to see
          task actions.
        </p>
        <Accordion type="single" collapsible className="w-full">
          {tasks
            .filter((task) => !task.completed)
            .map((task) => (
              <AccordionItem
                key={task.id}
                value={task.id.toString()}
                className="border-none"
              >
                <div className="flex items-center space-x-3">
                  <Checkbox />
                  <div className="w-full">
                    <AccordionTrigger>{task.title}</AccordionTrigger>
                  </div>
                </div>
                <AccordionContent>
                  <div className="flex space-x-4 text-gray-400">
                    <Pencil className="h-5 w-5" />
                    <Trash className="h-5 w-5" />
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
        <Heading className="py-10">Completed</Heading>
      </SignedIn>
    </main>
  );
}
