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
    return (number / 1000).toFixed(1) + 'k';
  else if (number <= 999000000)
    return (number / 1000000).toFixed(1) + 'm';
  else if (number <= 999000000000)
    return (number / 1000000000).toFixed(1) + 'B';
  else
    return (number / 1000000000000).toFixed(1) + 'T';
}

export const convertToReadableTime = (timeInSeconds: number) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = Math.floor(timeInSeconds % 60);

  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  if (hours === 0) {
    return `${formattedMinutes}:${formattedSeconds}`;
  } else {
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }
}

export const getFirstLettersForProfile = (name: string) => {
  const nameArray = name.split(' ');
  const firstLetterOfFirstName = nameArray[0].charAt(0);
  const firstLetterOfLastName = nameArray[1].charAt(0);

  return (firstLetterOfFirstName + firstLetterOfLastName)
}

// --- DEFINE SCHEMAS

export const authFormSchema = (type: 'sign-in' | 'sign-up') =>
  z.object({
    firstName:
      type === "sign-up"
        ? z.string().min(3, {
          message: "First Name must be at least 3 characters.",
        })
        : z.string().optional(),
    lastName:
      type === "sign-up"
        ? z.string().min(3, {
          message: "Last Name must be at least 3 characters.",
        })
        : z.string().optional(),
    // phone:
    //   type === "sign-up"
    //     ? z
    //       .string()
    //       .min(10, { message: "Must be a valid mobile number" })
    //       .max(14, { message: "Must be a valid mobile number" })
    //     : z.string().optional(),
    email: z
      .string()
      .email({ message: "Must be a valiid email eg. demo@demo.com" }),
    password: z.string().min(8, { message: "Password cannot be less than 8 characters" }),
  });


export const onlyEmailFormSchema = () =>
  z.object({
    email: z.string().email({ message: 'Must be a valid email eg. myname@example.com' })
  });
export const onlyPasswordFormSchema = () =>
  z.object({
    password: z.string().min(8, { message: "Password cannot be less than 8 characters" }),
  });

export const onlyOTPFormSchema = () =>
  z.object({
    otp: z.string().min(5)
  });

export const searchFormSchema = () =>
  z.object({
    search: z.string().min(2, { message: "Search cannot be less than two characters" })
  });


export const commentFormSchema = (state: 'comment' | 'reply') =>
  z.object({
    postId: z.string(),
    comment: state === 'comment' ? z.string().min(1, { message: 'This field cannot be empty' }) : z.string().optional(),
    commentId: state === 'reply' ? z.string() : z.string().optional(),
    reply: state === 'reply' ? z.string().min(1, { message: 'This field cannot be empty' }) : z.string().optional(),
    replyTo: state === 'reply' ? z.string() : z.string().optional(),
  });

export const reviewFormSchema = () =>
  z.object({
    review: z.string().min(3, { message: "Review must have at least 3 characters" }),
    rating: z.number()
  });

export const createCollectionFormSchema = () =>
  z.object({
    collection: z.string().min(3, { message: "Collection name must have at least 3 characters" }),
    courseId: z.string()
  });


export const contactUsEmailFormSchema = () =>
  z.object({
    name: z.string().min(3, { message: 'Name cannot be less than 3 characters' }),
    email: z.string().email({ message: 'Must be a valid email' }),
    title: z.string().min(3, { message: 'Title cannot be less than 3 characters' }),
    message: z.string().min(5, { message: 'Message cannot be less than 5 characters' }),
  });
