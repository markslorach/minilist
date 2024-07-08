import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();

  return (
    <main className="py-20">
      <SignedOut>
        <h2>
          Please{" "}
          <span className="text-blue-500">
            <SignInButton>sign in</SignInButton>
          </span>{" "}
          to see your tasks for today.
        </h2>
      </SignedOut>
      <SignedIn>
        <h2>
          Welcome back,{" "}
          {user?.firstName ? user.firstName : user?.emailAddresses[0].emailAddress}.          
        </h2>
      </SignedIn>
    </main>
  );
}
