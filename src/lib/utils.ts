import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPKR = (amount: number) => {
  return `PKR ${amount.toLocaleString()}`;
};

export const WHATSAPP_NUMBER = "923111170558";
export const DISPLAY_PHONE = "03111170558";
