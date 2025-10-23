import { Loader2 } from "lucide-react";
import React from "react";
import { cn } from "../../utils/libs";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  disabled,
  className,
  children,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-md transition-all focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed";

  const variants: Record<string, string> = {
    primary:
      "bg-green-600 text-white hover:bg-green-700 focus:ring-2 focus:ring-green-400",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-2 focus:ring-gray-400",
    outline:
      "border border-gray-300 text-gray-800 hover:bg-gray-50 focus:ring-2 focus:ring-gray-200",
    ghost: "text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-gray-100",
    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-400",
  };

  const sizes: Record<string, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  };

  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        icon && <span className="mr-2">{icon}</span>
      )}
      {children}
    </button>
  );
};
