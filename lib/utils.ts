import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina dinámicamente nombres de clases con Tailwind, 
 * evitando conflictos o duplicados.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
