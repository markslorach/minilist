import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";
import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="flex justify-between h-20 items-center">
      <Link href="/">minilist.</Link>
      <div>
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
      </div>
    </nav>
  );
};

export default NavBar;
