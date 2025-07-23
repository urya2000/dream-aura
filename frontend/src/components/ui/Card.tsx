import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg";
  shadow?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  padding = "md",
  shadow = true,
}) => {
  const paddingStyles = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const shadowStyle = shadow ? "shadow-md" : "";

  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 ${shadowStyle} ${paddingStyles[padding]} ${className}`}
    >
      {children}
    </div>
  );
};
