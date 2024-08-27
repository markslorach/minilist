import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Heading = ({ children, className }: Props) => {
  return <h2 className={cn("text-2xl font-semibold text-neutral-800 dark:text-neutral-50", className)}>{children}</h2>;
};

export default Heading;
