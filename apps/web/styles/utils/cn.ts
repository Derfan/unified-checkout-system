import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to combine class names using clsx and tailwind-merge.
 * @param inputs - An array of class name values.
 * @returns A single string of merged class names.
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
