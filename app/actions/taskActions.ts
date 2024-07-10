"use server";
import prisma from "@/prisma/client";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// Create Task
export async function createTask(formData: FormData) {
  const userEmail = await currentUser();
  const task = formData.get("task");

  await prisma.task.create({
    data: {
      title: task as string,
      user: {
        connect: {
          email: userEmail?.emailAddresses[0].emailAddress,
        },
      },
    },
  });
  revalidatePath("/");
}

// Update Task
export async function updateTask(formData: FormData) {
  const taskId = formData.get("taskId") as string;
  const newTask = formData.get("task") as string;

  await prisma.task.update({
    where: { id: parseInt(taskId) },
    data: { title: newTask },
  });
  revalidatePath("/");
}

// Delete Task
export async function deleteTask(formData: FormData) {
  const taskId = formData.get("taskId") as string;
  await prisma.task.delete({
    where: {
      id: parseInt(taskId),
    },
  });
  revalidatePath("/");
}

// Complete Task
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
