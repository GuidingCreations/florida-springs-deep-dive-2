import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod";

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

  export const authFormSchema = (type: 'sign-in' | 'sign-up') => z.object({
    email: z.string().email({ message: "Invalid email address" }),
    
    firstName: type === 'sign-up' ? z
      .string()
      .min(2, { message: "First name must be at least 2 characters long" }) :
      z.string().optional()
      
      ,
    lastName: type === 'sign-up' ?  z
      .string()
      .min(2, { message: "Last name must be at least 2 characters long" }) :
      z.string().optional()
      ,
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    
    
      dateOfBirth: type === 'sign-up' ? z.string().date() : z.string().date().optional(),
  })