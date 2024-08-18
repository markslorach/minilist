import Link from "next/link";
import Heading from "./components/shared/Heading";

const NotFound = () => {
  return (
    <div className="py-16">
      <Heading className="pb-10">
        It looks like you&apos;re lost.{" "}
        <Link href="/" className="text-blue-500">
          Return home
        </Link>
        .
      </Heading>
    </div>
  );
};

export default NotFound;
