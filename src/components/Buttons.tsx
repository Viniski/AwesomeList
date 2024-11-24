import { FC, ReactNode } from "react";
import { XMarkIcon } from "./icons";

type ButtonProps = React.ComponentProps<"button">;

export const ExpandButton: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      className="hover:text-gray-700 transition-colors flex items-center justify-center"
      {...props}
    >
      {children}
    </button>
  );
};

export const DeleteButton: FC<Omit<ButtonProps, "children">> = (props) => {
  return (
    <button
      className="hover:text-gray-700 transition-colors flex items-center justify-center"
      {...props}
    >
      <XMarkIcon />
    </button>
  );
};

export const ToggleButton = ({
  disabled,
  children,
  onToggle,
}: {
  disabled: boolean;
  children: ReactNode;
  onToggle: () => void;
}) => {
  return (
    <button
      onClick={onToggle}
      disabled={disabled}
      className="transition-colors hover:bg-gray-600 bg-black text-white text-sm rounded px-3 py-1 disabled:bg-black/50"
    >
      {children}
    </button>
  );
};
