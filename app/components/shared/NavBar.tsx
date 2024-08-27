import {
  SignedIn,
  SignedOut,
  SignOutButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { Check } from "lucide-react";
import ThemeSwitch from "./ThemeSwitch";

const NavBar = () => {
  return (
    <nav className="flex h-20 items-center justify-between">
      <Link href="/" className="flex items-center text-neutral-800 dark:text-neutral-50">
        <Check className="mr-0.5 text-blue-500" />
        minilist.io
      </Link>
      <div className="flex items-center space-x-1">
        <SignedOut>
          <Link href="/sign-in">sign in</Link>
        </SignedOut>
        <SignedIn>
          <SignOutButton>sign out</SignOutButton>
        </SignedIn>
        <ThemeSwitch />
      </div>
    </nav>
  );
};

export default NavBar;
