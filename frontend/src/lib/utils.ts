import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { parsePhoneNumberFromString } from 'libphonenumber-js';



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

export const instructorFormSchema = (dialCode: string) =>
  z.object({
    fullName: z.string({ message: "Please input your full name" }),
    email: z.string({ required_error: "Please input your email" }).email({ message: 'Must be a valid email' }),
    country: z.string({ required_error: "Please select a country" }),
    phone: z.string().refine((phoneNumber) => {
      const phoneNumberString = `${dialCode} ${phoneNumber}`;
      const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumberString);
      return parsedPhoneNumber?.isValid() ?? false; // Ensure the number is valid
    }, {
      message: 'Invalid phone number',
    }),
    residentialAddress: z.string().optional(),
    facebookHandle: z.string().url({ message: 'Must be a valid link' }).optional(),
    instagramHandle: z.string().url({ message: 'Must be a valid link' }).optional(),
    tiktokHandle: z.string().url({ message: 'Must be a valid link' }).optional(),
    youtubeHandle: z.string().url({ message: 'Must be a valid link' }).optional(),
    websiteLink: z.string().url({ message: 'Must be a valid link' }).optional(),

    niche: z.string({ required_error: "Must select an area of expertise" }),
    whyInterest: z.string().optional(),
    taughtBefore: z.enum(["yes", "no"], {
      required_error: "You need to select one these.",
    }),
    mentorshipAvailability: z.string({
      required_error: "Must select a one of either options",
    }),
    mentorshipAvailabilityDays: z
      .array(z.string().min(1))
      .min(1).optional(),
    fromMentorTime: z.string().time({ message: "Select a valid time" }).optional(),
    toMentorTime: z.string().time({ message: "Select a valid time" }).optional(),
    about: z.string().optional(),
  }).refine(data => {
    // Ensure at least one of the social media fields or website link is filled
    return data.facebookHandle || data.instagramHandle || data.tiktokHandle || data.websiteLink;
  }, {
    message: 'At least one social media handle or website link must be provided',
    path: ['facebookHandle', 'instagramHandle', 'tiktokHandle', 'websiteLink'], // Specify which fields are affected by this rule
  }).refine(data => {
    return data.mentorshipAvailability === 'yes'
  }, {
    message: "Please select at least one day, and time",
    path: ['mentorshipAvailabilityDays', 'fromMentorTime', 'toMentorTime']
  }
  );
