import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "danger";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const base =
      "px-4 py-2 rounded-md font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variants: Record<string, string> = {
      default: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
      outline:
        "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-indigo-500",
      danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
