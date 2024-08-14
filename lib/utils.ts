import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const parseStringify = (value: any) => 
  {
    console.log('attempt')
    if (value === null || value === undefined) {
      return value
    } else return JSON.parse(JSON.stringify(value))
    
  };