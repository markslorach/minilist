import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";
import Link from "next/link";

// Components
import ThemeSwitch from "./ThemeSwitch";

const NavBar = () => {
  return (
    <nav className="flex justify-between h-20 items-center">
      <Link href="/">minilist.</Link>
      <div className="items-center flex space-x-4">
        <SignedOut>
          <SignInButton>
            sign in
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <SignOutButton>
            sign out
          </SignOutButton>
        </SignedIn>
        <ThemeSwitch/>
      </div>
    </nav>
  );
};

export default NavBar;
