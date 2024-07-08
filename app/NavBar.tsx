import { SignedIn, SignedOut } from "@clerk/nextjs";

const NavBar = () => {
  return (
    <nav className="flex justify-between h-20 items-center">
      <h1>minilist.</h1>
      <div>
        <SignedOut>
          <span>login</span>
        </SignedOut>
        <SignedIn>
          <span>logout</span>
        </SignedIn>
      </div>
    </nav>
  );
};

export default NavBar;
