import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex min-h-dvh md:min-h-[80vh] justify-center items-center">
      <SignIn />
    </div>
  );
}
