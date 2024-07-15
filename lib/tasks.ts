import prisma from "@/prisma/client";
import { currentUser } from "@clerk/nextjs/server";

export async function getTasks() {
  try {
    const user = await currentUser();
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
    return { error };
  }
}
