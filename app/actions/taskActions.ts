"use server";
import prisma from "@/prisma/client";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

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
