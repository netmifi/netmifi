import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { parsePhoneNumberFromString } from 'libphonenumber-js';
// import { REGEXP_ONLY_DIGITS } from "input-otp";
import { toast } from "sonner";

const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const splitCamelCaseToWords = (input: string) => {
  return input.replace(/([A-Z])/g, " $1").trim();
};

export const splitSnakeCaseToWords = (input: string): string => {
  // Replace underscores with spaces, then capitalize each word
  return input.replace(/_/g, " "); // Replace underscores with spaces
};
export const handleClipBoardCopy = (text: string) => {
  navigator.clipboard.writeText(text);
  toast.success("Copied to clipboard");
};

export function formatNumber(n: number): string {
  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);
}

export const useSetCourseUploadProgress = () => {

}
``
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


// function checkFileType(file: File, types: string[]) {
//   if (file?.name) {
//     const fileType = file.name.split(".").pop();
//     if (types.includes(fileType)) return true;
//   }
//   return false;
// }

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
    username:
      type === "sign-up"
        ? z.string().min(3, {
          message: "User name must be at least 3 characters.",
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
      .email({ message: "Must be a valid email eg. demo@demo.com" }),
    password: z.string().min(8, { message: "Password cannot be less than 8 characters" }),
  });


export const onlyEmailFormSchema = () =>
  z.object({
    email: z.string().email({ message: 'Must be a valid email eg. myname@example.com' })
  });

export const deleteConfirmationSchema = (text: string) =>
  z.object({
    sentence: z.string().min(1, { message: 'Field required' }).refine((value) => { return value === text }, { message: 'Input must match confirmation sentence' })
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

export const instructorFormSchema = () =>
  z.object({
    fullName: z.string({ required_error: "Please input your full name" }),
    country: z.object({
      name: z.string().optional(),
      code: z.string(),
      flag: z.string().optional(),
      dialCode: z.string(),
    }),
    phone: z.string({ message: 'Contact is required' }).regex(/^\d+$/, { message: "Only numbers are allowed" }),
    residentialAddress: z.string().optional(),
    facebook: z.string().optional().nullable(),
    instagram: z.string().optional().nullable(),
    tiktok: z.string().optional(),
    youtube: z.string().optional(),
    website: z.string().optional(),
    niche: z.string({ required_error: "Must select an area of expertise" }),
    whyInterest: z.string().optional(),
    taughtBefore: z.enum(["yes", "no"], {
      required_error: "Please select an option",
    }),
    mentoredPreviously: z.enum(["yes", "no"], {
      required_error: "Please select an option",
    }),
    about: z.string().optional()
  })
    .refine((data) => {
      return data.country.code !== '' && data.country.dialCode !== '';
    }, {
      message: 'Please select your country dial code',
      path: ['phone'],
    })
    .refine((data) => {
      const phoneNumberString = `${data.country.dialCode}${data.phone}`;
      const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumberString);
      return parsedPhoneNumber?.isValid() ?? false;
    }, {
      message: 'Not a valid phone number',
      path: ['phone'],
    })
    .transform((data) => {
      const phoneNumberString = `${data.country.dialCode}${data.phone}`;
      const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumberString);
      return {
        ...data,
        phone: parsedPhoneNumber?.number,
      };
    });
// Base schema
const baseCourseSchema = z.object({
  title: z.string().min(5, { message: "Course title cannot be less than 5 characters" }),
  description: z.string().min(20, { message: 'Description cannot be less than 20 characters long' }),
  thumbnail: z
    .instanceof(FileList, { message: 'Please select a valid file' })
    .refine((fileList) => fileList.length > 0, {
      message: "Please select a (.jpg, .png, or jpeg) file.",
    })
    .transform((fileList) => fileList.item(0))
    .refine((file) => file?.type === "image/jpg" || file?.type === "image/png" || file?.type === "image/jpeg", {
      message: "Only jpg, png files are allowed to be sent.",
    })
    .refine((file) => file && file?.size <= 3 * 1024 * 1024, {
      message: "The image file must not exceed a maximum of 3MB.",
    }),
  introVideo: z
    .instanceof(FileList, { message: 'Please select a valid file' })
    .refine((fileList) => fileList.length > 0, {
      message: "Please select an (.mp4) file.",
    })
    .transform((fileList) => fileList.item(0))
    .refine((file) => file?.type === "video/mp4" || file?.type === "video/mpeg", {
      message: "Only mp4 and mpeg files are allowed to be sent.",
    })
    .refine((file) => file && file?.size <= 15 * 1024 * 1024, {
      message: "The video file must not exceed a maximum of 15MB.",
    }),
  requirements: z.array(z.string()).min(0, { message: 'Field required' }),
  price: z.string({ message: 'Price is required' }).regex(/^\d+$/, { message: "Only numbers are allowed" }),
  mentorshipAvailability: z.enum(["yes", "no"], {
    required_error: "Please select an option",
  }),
  mentorshipAvailabilityDays: z
    .array(z.string(), { message: "Select an option" })
    .min(1)
    .optional(),
  from: z.string()
    // .regex(timeRegex, { message: "Select a valid time (HH:mm)" })
    .optional(),
  to: z.string()
    // .regex(timeRegex, { message: "Select a valid time (HH:mm)" })
    .optional(),

  dynamicFields: z.record(
    z.object({
      title: z.string().min(5, { message: "Course title cannot be less than 5 characters" }),
      video: z
        .instanceof(FileList, {
          message: "Select a valid file",
        })
        .refine((fileList) => fileList.length > 0, {
          message: "Please select a video file.",
        })
        .transform((fileList) => fileList.item(0))
        .refine((file) => file?.type === "video/mp4" || file?.type === "video/mpeg", {
          message: "Only mp4 and mpeg files are allowed.",
        })
        .refine((file) => file && file?.size <= 50 * 1024 * 1024, {
          message: 'File size has exceeded 50mb'
        }),
      description: z.string().min(10, { message: 'Description cannot be less than 10 characters long' }).optional(),
    })
  ),
});

// Create schema (same as base schema)
export const createCourseSchema = baseCourseSchema.refine((data) => {
  console.log(data.mentorshipAvailabilityDays,
    data.mentorshipAvailabilityDays.length || 'none',
    data.from,
    data.to)
  if (data.mentorshipAvailability === "yes") {
    return (
      data.mentorshipAvailabilityDays &&
      data.mentorshipAvailabilityDays.length > 0 &&
      data.from &&
      data.to
    );
  }
  if (data.mentorshipAvailability === "no") return console.log('Not');
  return false;
}, {
  message: "Mentorship availability days, from, and to are required when mentorship is available",
  path: [["mentorshipAvailabilityDays"], ["from"]],
});

// Update schema (all fields optional)
export const updateCourseSchema = baseCourseSchema.partial();

// Type inference
// export type CreateCourseInput = z.infer<typeof createCourseSchema>;
// export type UpdateCourseInput = z.infer<typeof updateCourseSchema>;
