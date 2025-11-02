import React from "react";
import { cn } from "@/lib/utils";

export function Badge({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "success" | "error" }) {
  const styles = {
    default: "bg-gray-200 text-gray-800",
    success: "bg-green-200 text-green-800",
    error: "bg-red-200 text-red-800",
  };

  return (
    <span className={cn("px-2 py-1 rounded-md text-sm font-medium", styles[variant])}>
      {children}
    </span>
  );
}
