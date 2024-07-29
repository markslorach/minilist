import prisma from "@/prisma/client";
import { currentUser } from "@clerk/nextjs/server";

// Gets logged in user from the db or creates a new user if they don't exist
export async function getUser() {
  try {
    const clerkUser = await currentUser();
    const clerkUserEmail = clerkUser?.emailAddresses[0]?.emailAddress;

    if (!clerkUser || !clerkUserEmail) {
      return;
    }

    let user = await prisma.user.findUnique({
      where: { email: clerkUserEmail },
    });

    if (!user) {
      user = await prisma.user.create({
        data: { email: clerkUserEmail },
      });
    }

    return user;
  } catch (error) {
    console.error(error);
  }
}
