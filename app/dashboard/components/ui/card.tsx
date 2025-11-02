import * as React from "react";
import { cn } from "@/lib/utils";

export const Card = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition",
      className
    )}
    {...props}
  />
);
