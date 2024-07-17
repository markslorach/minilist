import { cn } from "@/lib/utils";
import { LucideIcon, LoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";

interface ActionButtonProps {
  icon: LucideIcon;
  label: string;
  disabled?: boolean;
  iconSize?: number;
  className?: string;
}

const FormActionButton = ({
  icon: Icon,
  label,
  disabled,
  iconSize,
  className,
}: ActionButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-label={label} disabled={pending || disabled}>
      {pending ? (
        <LoaderCircle
          className={cn("animate-spin opacity-70", className)}
          size={iconSize || 28}
        />
      ) : (
        <Icon className={className} size={iconSize} />
      )}
    </button>
  );
};

export default FormActionButton;
