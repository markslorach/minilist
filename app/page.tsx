import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CirclePlus } from "lucide-react";
import prisma from "@/prisma/client";
import { SignedIn } from "@clerk/nextjs";
import UserWelcome from "./UserWelcome";

export default async function Home() {
  const tasks = await prisma.task.findMany();

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
        <h1 className="py-10 text-xl font-semibold">Tasks</h1>
        <h1 className="py-10 text-xl font-semibold">Completed</h1>
      </SignedIn>
    </main>
  );
}
