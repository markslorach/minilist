import prisma from "@/prisma/client";
import { currentUser } from "@clerk/nextjs/server";

// Get all tasks for the current user
export async function getTasks() {
  const user = await currentUser();

  try {
    if (!user) return { error: "User not found" };

    const tasks = await prisma.task.findMany({
      where: {
        user: {
          email: user?.emailAddresses[0].emailAddress,
        },
      },
      orderBy: [{ completed: "asc" }, { xata_createdat: "desc" }],
    });
    return { tasks };
  } catch (error) {
    return { error: "Failed to fetch tasks" };
  }
}

// Create a new task
export async function createTask(title: string) {
  const user = await currentUser();

  try {
    if (!user) return { error: "User not found" };

    const task = await prisma.task.create({
      data: {
        title: title,
        user: {
          connect: {
            email: user?.emailAddresses[0].emailAddress,
          },
        },
      },
    });
    return { task };
  } catch (error) {
    return { error: "Failed to create task" };
  }
}
