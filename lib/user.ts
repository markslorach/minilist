import prisma from "@/prisma/client";
import { currentUser } from "@clerk/nextjs/server";

// Gets logged in user from the db or creates a new user if they don't exist amd returns the user
export async function getUser() {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) return;

    const email = clerkUser?.emailAddresses[0]?.emailAddress as string;

    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: { email, name: clerkUser.firstName },
      });
    }

    return user;
  } catch (error) {
    console.error(error);
  }
}
