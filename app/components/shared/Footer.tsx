import Link from "next/link";
import { Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="flex h-20 items-center justify-between">
      <p className="text-neutral-800 dark:text-neutral-50">
        created by{" "}
        <Link
          className="text-blue-500"
          href="https://www.markslorach.com/"
          target="_blank"
        >
          mark slorach
        </Link>
        .
      </p>
      <Link href="https://github.com/markslorach/minilist.git" target="_blank">
        <Github className="h-5 w-5 text-neutral-800 dark:text-neutral-50" />
      </Link>
    </footer>
  );
};

export default Footer;
