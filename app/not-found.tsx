import Link from "next/link";
import Heading from "./components/Heading";
import Footer from "./Footer";
import NavBar from "./NavBar";

const NotFound = () => {
  return (
    <main className="flex flex-col min-h-dvh md:min-h-screen mx-auto max-w-3xl px-4 sm:px-10">
      <NavBar />
      <section className="flex-grow py-16">
        <Heading className="pb-10">
          It looks like you&apos;re lost.{" "}
          <Link href="/" className="text-blue-500">
            Return home
          </Link>
          .
        </Heading>
      </section>
      <Footer />
    </main>
  );
};

export default NotFound;
