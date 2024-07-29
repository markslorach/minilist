import prisma from "@/prisma/client";
import { currentUser } from "@clerk/nextjs/server";

// Gets logged in user from the db or creates a new user if they don't exist
export async function getUser() {
  try {
    const clerkUser = await currentUser();

    if (!clerkUser) return;

    let user = await prisma.user.findUnique({
      where: { email: clerkUser.emailAddresses[0].emailAddress },
    });

    if (!user) {
      user = await prisma.user.create({
        data: { email: clerkUser.emailAddresses[0].emailAddress },
      });
    }

    return user;
  } catch (error) {
    console.error(error);
  }
}