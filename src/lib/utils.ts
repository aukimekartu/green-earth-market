import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Lithuanian price format: "5,20 €" */
export function formatPrice(value: number): string {
  return `${value.toFixed(2).replace('.', ',')}\u00A0€`;
}
