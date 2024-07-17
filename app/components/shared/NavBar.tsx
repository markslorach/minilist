import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { Check } from "lucide-react";
import ThemeSwitch from "./ThemeSwitch";

const NavBar = () => {
  return (
    <nav className="flex h-20 items-center justify-between">
      <Link href="/" className="flex items-center">
        <Check className="mr-0.5 text-blue-500" />
        minilist.io
      </Link>
      <div className="flex items-center space-x-4">
        <SignedOut>
          <SignInButton>sign in</SignInButton>
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
