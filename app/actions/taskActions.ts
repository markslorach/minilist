"use server";
import prisma from "@/prisma/client";
import { createTask, deleteTask, updateTask } from "@/lib/tasks";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// Create Task
export async function createTaskAction(title: string) {
  try {
    await createTask(title);
  } catch (error: any) {
    return { error: "Failed to create task" };
  } finally {
    revalidatePath("/");
  }
}

// Update Task
export async function updateTaskAction(taskId: string, newTask: string) {
  try {
    await updateTask(taskId, newTask);
  } catch (error: any) {
    return { error: "Failed to update task" };
  } finally {
    revalidatePath("/");
  }
}

// Delete Task
export async function deleteTaskAction(taskId: string) {
  try {
    await deleteTask(taskId);
  } catch (error: any) {
    return { error: "Failed to delete task" };
  } finally {
    revalidatePath("/");
  }
}

// Complete Task - update this
export async function completeTask(formData: FormData) {
  const taskId = formData.get("taskId") as string;

  const task = await prisma.task.findUnique({
    where: { id: parseInt(taskId) },
  });

  await prisma.task.update({
    where: { id: parseInt(taskId) },
    data: { completed: !task?.completed },
  });

  revalidatePath("/");
}

// Clear Completed Tasks
export async function clearCompletedTasks() {
  const userEmail = await currentUser();
  try {
    await prisma.task.deleteMany({
      where: {
        completed: true,
        user: {
          email: userEmail?.emailAddresses[0].emailAddress,
        },
      },
    });
  } catch (error: any) {
    return { error: "Failed to clear completed tasks" };
  } finally {
    revalidatePath("/");
  }
}
