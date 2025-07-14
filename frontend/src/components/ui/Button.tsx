import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary: `bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500`,
    secondary: `bg-yellow-500 text-purple-900 hover:bg-yellow-600 focus:ring-yellow-500`,
    outline: `border border-purple-300 bg-transparent text-purple-600 hover:bg-purple-50 focus:ring-purple-500`,
    ghost: `bg-transparent text-purple-600 hover:bg-purple-100 focus:ring-purple-500`,
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
