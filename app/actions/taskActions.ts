"use server";
import prisma from "@/prisma/client";
import { createTask, updateTask } from "@/lib/tasks";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// Create Task
export async function createTaskAction(formData: FormData) {
  const task = formData.get("task") as string;
  try {
    await createTask(task);
  } catch (error: any) {
    return { error: "Failed to create task" };
  } finally {
    revalidatePath("/");
  }
  }

// Update Task
export async function updateTaskAction(formData: FormData) {
  const taskId = formData.get("taskId") as string;
  const newTask = formData.get("task") as string;
  try {
    await updateTask(taskId, newTask);
  } catch (error: any) {
    return { error: "Failed to update task" };
  } finally {
    revalidatePath("/");
  }
}

// Delete Task - update this
export async function deleteTask(formData: FormData) {
  const taskId = formData.get("taskId") as string;
  await prisma.task.delete({
    where: {
      id: parseInt(taskId),
    },
  });
  revalidatePath("/");
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

// Clear Completed Tasks - update this
export async function clearCompletedTasks() {
  const userEmail = await currentUser();
  await prisma.task.deleteMany({
    where: {
      completed: true,
      user: {
        email: userEmail?.emailAddresses[0].emailAddress,
      },
    },
  });
  revalidatePath("/");
}
