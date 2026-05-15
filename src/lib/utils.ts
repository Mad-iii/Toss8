import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPKR = (amount: number) => {
  return `PKR ${amount.toLocaleString()}`;
};

export const WHATSAPP_NUMBER = "923000000000"; // Default
