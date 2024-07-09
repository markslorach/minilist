import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CirclePlus, Trash, Pencil } from "lucide-react";
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
        <form action="">
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="What do you want to do?"
              className="border-none bg-transparent dark:bg-transparent px-0"
            />
            <Button className="bg-transparent dark:bg-transparent hover:bg-transparent dark:hover:bg-transparent text-gray-500 dark:text-gray-400 p-0">
              <CirclePlus />
            </Button>
          </div>
        </form>
        <Heading className="py-10">Tasks</Heading>
        <Accordion type="single" collapsible className="w-full">
          {tasks.filter((task) => !task.completed).map((task) => (
            <AccordionItem value={task.id.toString()} className="border-none">
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
