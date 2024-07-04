import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const splitCamelCaseToWords = (input: string) => {
  return input.replace(/([A-Z])/g, " $1").trim();
};

export const convertToReadableNumber = (number: number) => {
  if (number < 999)
    return number;
  else if (number <= 999000)
    return (number / 1000).toPrecision(2) + 'k';
  else if (number <= 999000000)
    return (number / 1000000).toPrecision(2) + 'm';
  else if (number <= 999000000000)
    return (number / 1000000000).toPrecision(2) + 'B';
  else (number <= 999000000000000)
  return (number / 1000000000000).toPrecision(2) + 'T';
}

export const newsletterFormSchema = () =>
  z.object({
    email: z.string().email({ message: 'Must be a valid email eg. myname@example.com' })
  });

export const searchFormSchema = () =>
  z.object({
    search: z.string().min(2, { message: "Search cannot be less than two characters" })
  });


export const commentFormSchema = (isReply: boolean) =>
  z.object({
    postId: z.string(),
    comment: !isReply ? z.string().min(1, { message: 'This field cannot be empty' }) : z.string().optional(),
    commentId: isReply ? z.string() : z.string().optional()
  });
