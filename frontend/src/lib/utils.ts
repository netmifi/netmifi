import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export const searchFormSchema = ()=> 
  z.object({
    search: z.string().min(2, {message: "Search cannot be less than two characters"})
  });
    