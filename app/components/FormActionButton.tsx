import { cn } from "@/lib/utils";
import { LucideIcon, LoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";

type IconColours = "red" | "green" | "blue";

interface ActionButtonProps {
  icon: LucideIcon;
  label: string;
  disabled?: boolean;
  colour?: IconColours;
  iconSize?: number;
}

const FormActionButton = ({
  icon: Icon,
  label,
  disabled,
  colour,
  iconSize,
}: ActionButtonProps) => {
  const { pending } = useFormStatus();
  const iconColorClass = colour ? `text-${colour}-400` : "";

  return (
    <button type="submit" aria-label={label} disabled={pending || disabled}>
      {pending ? (
        <LoaderCircle
          className={cn("animate-spin", iconColorClass)}
          size={iconSize || 28}
        />
      ) : (
        <Icon className={cn(iconColorClass)} size={iconSize} />
      )}
    </button>
  );
};

export default FormActionButton;
