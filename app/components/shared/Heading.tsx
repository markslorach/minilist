import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Heading = ({ children, className }: Props) => {
  return <h2 className={cn("text-xl font-semibold", className)}>{children}</h2>;
};

export default Heading;
