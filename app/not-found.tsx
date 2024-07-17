import Link from "next/link";
import Heading from "./components/shared/Heading";
import Footer from "./components/shared/Footer";
import NavBar from "./components/shared/NavBar";

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
