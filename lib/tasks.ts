import prisma from "@/prisma/client";
import { currentUser } from "@clerk/nextjs/server";

// CREATE
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

// READ
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
      orderBy: [{ completed: "asc" }, { xata_updatedat: "desc" }],
    });

    return { tasks };
  } catch (error) {
    return { error: "Failed to fetch tasks" };
  }
}

// UPDATE
export async function updateTask(taskId: string, title: string) {
  try {
    const task = await prisma.task.update({
      where: { id: parseInt(taskId) },
      data: { title: title },
    });
    return { task };
  } catch (error) {
    return { error: "Failed to update task" };
  }
}

// DELETE
export async function deleteTask(taskId: string) {
  try {
    const task = await prisma.task.delete({
      where: { id: parseInt(taskId) },
    });
    return { task };
  } catch (error) {
    return { error: "Failed to delete task" };
  }
}
