import prisma from "@/prisma/client";
import { currentUser } from "@clerk/nextjs/server";

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

// Update a task
export async function updateTask(taskId: number, title: string) {
  try {
    const task = await prisma.task.update({
      where: { id: taskId },
      data: { title: title },
    });
    return { task };
  } catch (error) {
    return { error: "Failed to update task" };
  }
}

// Delete a task
export async function deleteTask(taskId: number) {
  try {
    const task = await prisma.task.delete({
      where: { id: taskId },
    });
    return { task };
  } catch (error) {
    return { error: "Failed to delete task" };
  }
}
