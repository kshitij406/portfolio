import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Standard shadcn class merger. components.json points @/lib/utils here. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
