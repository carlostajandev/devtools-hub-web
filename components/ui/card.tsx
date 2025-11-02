/* eslint-disable @typescript-eslint/no-empty-object-type */
import * as React from "react";
import { cn } from "@/lib/utils"; // Asegúrate de tener lib/utils.ts (te lo dejo más abajo)

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border border-gray-200 bg-white shadow-sm p-4 transition hover:shadow-md",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";
