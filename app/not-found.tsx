import Link from "next/link";
import Heading from "./components/shared/Heading";
import Footer from "./components/shared/Footer";
import NavBar from "./components/shared/NavBar";

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
