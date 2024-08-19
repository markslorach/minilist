import { SignedIn, SignedOut } from "@clerk/nextjs";
import Heading from "./components/shared/Heading";
import Link from "next/link";
import AppContainer from "./AppContainer";
import { Suspense } from "react";
import TaskComponentSkeleton from "./components/skeletons/TaskComponentSkeleton";

export default async function Home() {
  return (
    <main className="py-16">
      <SignedOut>
        <Heading>
          Welcome! Please{" "}
          <span className="text-blue-500">
            <Link href="sign-in">sign in</Link>
          </span>{" "}
          to see your tasks for today.
        </Heading>
      </SignedOut>
      <SignedIn>
        <Suspense fallback={<TaskComponentSkeleton/>}>
          <AppContainer />
        </Suspense>
      </SignedIn>
    </main>
  );
}
