import { LucideIcon, LoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";

type IconColors = "red" | "green" | "blue"

interface ActionButtonProps {
  icon: LucideIcon;
  label: string;
  disabled?: boolean;
  iconColor?: IconColors;
  iconSize?: number;
}

const FormActionButton = ({
  icon: Icon,
  label,
  disabled,
  iconColor,
  iconSize
}: ActionButtonProps) => {
  const { pending } = useFormStatus();
  const iconColorClass = iconColor ? `text-${iconColor}-400` : "";

  return (
    <button type="submit" aria-label={label} disabled={pending || disabled}>
      {pending ? (
        <LoaderCircle
          className={`animate-spin ${iconColorClass}`}
          size={iconSize || 28}
        />
      ) : (
        <Icon className={`${iconColorClass}`} size={iconSize} />
      )}
    </button>
  );
};

export default FormActionButton;
