import React from "react";

type ButtonVariant = "primary" | "secondary" | "success" | "error" | "warning" | "info";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
  disabled?: Boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed disabled:opacity-50",
  secondary: "bg-gray-500 text-white hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50",
  success: "bg-green-500 text-white hover:bg-green-600 disabled:bg-green-300 disabled:cursor-not-allowed disabled:opacity-50",
  error: "bg-red-500 text-white hover:bg-red-600 disabled:bg-red-300 disabled:cursor-not-allowed disabled:opacity-50",
  warning: "bg-yellow-500 text-black hover:bg-yellow-600 disabled:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-50",
  info: "bg-cyan-500 text-white hover:bg-cyan-600 disabled:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50",
};

export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  variant = "primary",
  className = "",
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded transition ${variantClasses[variant]} ${className}`}
      disabled={!!disabled}
    >
      {children}
    </button>
  );
};

