import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Fuse from "fuse.js";
import { z } from "zod";
import { parsePhoneNumberFromString } from 'libphonenumber-js';
// import { REGEXP_ONLY_DIGITS } from "input-otp";
import { toast } from "sonner";
import useGetVideoDuration from "@/hooks/useGetVideoDuration";
import { categories } from "@/constants";

// const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/; // time regular expression

export function cn(...inputs: ClassValue[]) {
  // vercel shadcn function for handling classname literals
  return twMerge(clsx(inputs))
}

export const splitCamelCaseToWords = (input: string) => {
  // function to change camelCase to camel case
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

export const convertToReadableNumber = (number: number) => {
  //  converts number to human friendly like 1000 to 1k
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
  // coverts time from seconds to Hours:Minutes:Seconds
  const d = Math.floor(timeInSeconds / (1000 * 60 * 60 * 24));
  const h = Math.floor(
    (timeInSeconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const m = Math.floor(
    (timeInSeconds % (1000 * 60 * 60)) / (1000 * 60)
  );
  const s = Math.floor((timeInSeconds % (1000 * 60)) / 1000);
  
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = Math.floor(timeInSeconds % 60);

  const formattedD = d.toString().padStart(2, '');
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedH = h.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedM = m.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');
  const formattedS = s.toString().padStart(2, '0');

  if (d > 0) {
    return `${formattedD}:${formattedH}:${formattedM}:${formattedS}`;
  } else if (hours === 0) {
    return `${formattedMinutes}:${formattedSeconds}`;
  } else {
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }
}

export const getFirstLettersForProfile = (name: string) => {
  if (!name) return "";

  const nameArray = name.trim().split(" ");
  const firstLetterOfFirstName = nameArray[0]?.charAt(0) || "";
  const firstLetterOfLastName = nameArray[1]?.charAt(0) || "";

  return (firstLetterOfFirstName + firstLetterOfLastName).toUpperCase();
};
export const parseRelativeDate = (relativeDate: string): number => {
  const now = new Date();
  const [value, unit] = relativeDate.split(" ");

  const count = parseInt(value);
  switch (unit) {
    case "day":
    case "days":
      return new Date(now.getTime() - count * 24 * 60 * 60 * 1000).getTime();
    case "week":
    case "weeks":
      return new Date(now.getTime() - count * 7 * 24 * 60 * 60 * 1000).getTime();
    case "month":
    case "months":
      return new Date(now.setMonth(now.getMonth() - count)).getTime();
    case "year":
    case "years":
      return new Date(now.setFullYear(now.getFullYear() - count)).getTime();
    default:
      return now.getTime(); // fallback: treat unknown as now
  }
};

const getVideoDuration = (url: string): Promise<number> => {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    video.src = url;
    video.addEventListener("loadedmetadata", () => {
      resolve(video.duration);
    });
    video.onerror = (e) => {
      // console.error('Video error event:', e);
    };

    // Add timeout to prevent hanging in case the video doesn't load
    setTimeout(() => {
      // console.error('Video metadata load timed out');
    }, 5000); // 5 seconds timeout
  });
};

// TODO
export const getQuickAndEasyCourses = async (courses: Clip[], maxDuration = 3600) => {
  const filteredCourses: Clip[] = [];
  for (const course of courses) {
    if (course.videoUrl) {
      try {
        const duration = await getVideoDuration(course.videoUrl);
        if (duration <= maxDuration) {
          filteredCourses.push({ ...course, collection: course.category });  // Add course to filtered array
        }
      } catch (error) {
        console.error('Error fetching video duration:', error);
      }
    }
  }

  return filteredCourses;  // Return courses as an array
};
export const getCoursesByUserNiches = (courses: Course[], niches: string[]): Course[] => {
  if (!Array.isArray(niches)) niches = [niches];
  const fuse = new Fuse(courses, {
    keys: ["category"],
    threshold: 0.4, 
    includeScore: true, 
  });
  const matched = niches.flatMap(niche =>
    fuse.search(niche.trim().toLowerCase())
  );
  const seen = new Set();
  const uniqueSorted = matched
    .sort((a, b) => a.score - b.score)
    .filter(item => {
      if (seen.has(item.item.id)) return false;
      seen.add(item.item.id);
      return true;
    })
    .map(item => item.item);
  return uniqueSorted;
};
export const getRecentCourses = (courses: Array<any>) => {
  return courses
    .map(course => ({
      ...course,
      parsedDate: parseRelativeDate(course.date),
    }))
    .sort((a, b) => b.parsedDate - a.parsedDate);
};

export const handleShare = (course: ClipsCardProps) => {
  const shareData = {
    title: course.title,
    text: `Check out this course: ${course.title}`,
    url: window.location.href + "?course=" + course.id,
  };

  if (navigator.share) {
    navigator.share(shareData).catch((err) => console.error("Share failed:", err));
  } else {
    navigator.clipboard.writeText(shareData.url);
    alert("Link copied to clipboard!");
  }
};


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

export const passwordChangeSchema = () =>
  z.object({
    currentPassword: z.string().min(8, { message: "Field cannot be less than 8 characters" }),
    newPassword: z.string().min(8, { message: "Password cannot be less than 8 characters" }),
    confirmPassword: z.string().min(8, { message: "Password cannot be less than 8 characters" }),

  }).refine((data) => {

    return data.newPassword === data.confirmPassword;
  }, {
    message: 'Confirm password does not match the new password',
    path: ['confirmPassword'],
  })

export const themeFormSchema = () =>
  z.object({
    theme: z.enum(["system", "light", "dark"], {
      required_error: "Please select an option",
    }),
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

export const instructorFormSchema = () => {
    return z.object({
        phone: z.string()
            .min(1, "Phone number is required")
            .transform((val) => {
                // Remove any non-digit characters
                return val.replace(/\D/g, '');
            })
            .refine((val) => val.length >= 7 && val.length <= 15, {
                message: "Phone number must be between 7 and 15 digits"
            }),
        country: z.object({
            name: z.string().min(1, "Country name is required"),
            dialCode: z.string().min(1, "Country dial code is required"),
            code: z.string().min(1, "Country code is required"),
            flag: z.string().min(1, "Country flag is required")
        }).required(),
        residentialAddress: z.string()
            .min(3, "Address must be at least 3 characters long")
            .max(200, "Address must not exceed 200 characters")
            .optional(),
        facebook: z.string()
            .url("Invalid Facebook URL")
            .refine((val) => val.includes('facebook.com'), {
                message: "Must be a valid Facebook URL"
            })
            .optional()
            .or(z.literal("")),
        instagram: z.string()
            .url("Invalid Instagram URL")
            .refine((val) => val.includes('instagram.com'), {
                message: "Must be a valid Instagram URL"
            })
            .optional()
            .or(z.literal("")),
        tiktok: z.string()
            .url("Invalid TikTok URL")
            .refine((val) => val.includes('tiktok.com'), {
                message: "Must be a valid TikTok URL"
            })
            .optional()
            .or(z.literal("")),
        youtube: z.string()
            .url("Invalid YouTube URL")
            .refine((val) => val.includes('youtube.com'), {
                message: "Must be a valid YouTube URL"
            })
            .optional()
            .or(z.literal("")),
        website: z.string()
            .url("Invalid website URL")
            .optional()
            .or(z.literal("")),
        niche: z.string()
            .min(1, "Please select your area of expertise")
            .refine(
              (value) => categories.some(category => category.value === value),
              "Please select a valid area of expertise"
            ),
        whyInterest: z.string()
            .min(20, "Please provide a more detailed explanation (min 20 characters)")
            .max(500, "Response must not exceed 500 characters"),
        taughtBefore: z.enum(["yes", "no"], {
            required_error: "Please select if you have taught online before"
        }),
        mentoredPreviously: z.enum(["yes", "no"], {
            required_error: "Please select if you have been a mentor before"
        }),
        about: z.string()
            .min(50, "Please provide more information about yourself (minimum 50 characters)")
            .max(1000, "About section must not exceed 1000 characters"),
        teachingExperience: z.string()
            .min(0)
            .max(500, "Teaching experience must not exceed 500 characters")
            .optional(),
        preferredTeachingStyle: z.enum([
            "lecture",
            "interactive",
            "hands-on",
            "discussion",
            "project-based"
        ], {
            required_error: "Please select your preferred teaching style"
        }),
        availability: z.object({
            days: z.array(z.string()).min(1, "Please select at least one day"),
            timeZone: z.string().min(1, "Please select your time zone"),
            preferredHours: z.string().min(1, "Please select your preferred teaching hours")
        }),
        certifications: z.array(z.string()).optional(),
        languages: z.array(z.string()).min(1, "Please select at least one language"),
        terms: z.boolean().refine((val) => val === true, {
            message: "You must accept the terms and conditions"
        })
    }).refine((data) => {
        // At least one social media handle is required
        return data.facebook || data.instagram || data.tiktok || data.youtube || data.website;
    }, {
        message: "At least one social media handle or website is required",
        path: ["facebook"]
    }).refine((data) => {
        // If user has taught before, require more details
        if (data.taughtBefore === "yes") {
            return data.teachingExperience && data.teachingExperience.length >= 50;
        }
        return true;
    }, {
        message: "Please provide more details about your teaching experience",
        path: ["teachingExperience"]
    });
};

// Base schema
const baseCourseSchema = z.object({
  title: z.string().min(5, { message: "Course title cannot be less than 5 characters" }),
  description: z.string().min(20, { message: 'Description cannot be less than 20 characters long' }),
  category: z.string({ required_error: "Must select an area of expertise" }),
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
  requirements: z.array(z.string()).min(1, { message: 'At least one is required' }),
  price: z.string({ message: 'Price is required' }).regex(/^\d+$/, { message: "Only numbers are allowed" }),
  mentorshipAvailability: z.enum(["yes", "no"], {
    required_error: "Please select an option",
  }),
  mentorshipAvailabilityDays: z
    .array(z.string())
    // .min(1)
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
  if (data.mentorshipAvailability === "yes") {
    return (
      data.mentorshipAvailabilityDays &&
      data.mentorshipAvailabilityDays.length > 0 &&
      data.from &&
      data.to
    );
  }
  // When mentorship is not available, we don't require these fields.
  return true;
}, {
  message: "Fields are required",
  path: [["from", "to"]],
});

// Update schema (all fields optional)
export const updateCourseSchema = baseCourseSchema.partial();

export const updateProfileSchema = () => z.object({
  profile: z
    .instanceof(FileList, { message: 'Please select a valid file' })
    .refine((fileList) => fileList.length > 0 || fileList.length === 0, { // Allow empty FileList
      message: "Please select a (.jpg, .png, or jpeg) file.",
    })
    .transform((fileList) => fileList.length > 0 ? fileList.item(0) : null) // Handle empty FileList
    .refine((file) => !file || file?.type === "image/jpg" || file?.type === "image/png" || file?.type === "image/jpeg", { // Make refine optional
      message: "Only jpg, png files are allowed to be sent.",
    })
    .refine((file) => !file || (file && file?.size <= 3 * 1024 * 1024), { // Make refine optional
      message: "The image file must not exceed a maximum of 3MB.",
    })
    .nullable(), // Allow null for no file
  cover: z
    .instanceof(FileList, { message: 'Please select a valid file' })
    .refine((fileList) => fileList.length > 0 || fileList.length === 0, { // Allow empty FileList
      message: "Please select a (.jpg, .png, or jpeg) file.",
    })
    .transform((fileList) => fileList.length > 0 ? fileList.item(0) : null) // Handle empty FileList
    .refine((file) => !file || file?.type === "image/jpg" || file?.type === "image/png" || file?.type === "image/jpeg", { // Make refine optional
      message: "Only jpg, png files are allowed to be sent.",
    })
    .refine((file) => !file || (file && file?.size <= 3 * 1024 * 1024), { // Make refine optional
      message: "The image file must not exceed a maximum of 3MB.",
    })
    .nullable(), // Allow null for no file

  country: z.object({
    name: z.string().optional(),
    code: z.string().optional(), // Make code optional as well
    flag: z.string().optional(),
    dialCode: z.string().optional(), // Make dialCode optional
  }).optional(), // Make the entire country object optional

  // FIXME: Fix the number validation for phone
  phone: z.string().optional().refine(value => !value || value.match(/^\d+$/), { message: "Only numbers are allowed" }), // Make phone optional
  residentialAddress: z.string().optional(),
  facebook: z.string().optional().nullable(),
  instagram: z.string().optional().nullable(),
  tiktok: z.string().optional().nullable(), // Allow null for tiktok as well
  youtube: z.string().optional().nullable(), // Allow null for youtube as well
  website: z.string().optional().nullable(), // Allow null for website as well
  about: z.string().optional().refine(value => !value || value.length >= 20, { // Conditional min validation
    message: 'Description cannot be less than 20 characters long'
  }), // Make about optional
}).partial().refine((data) => {
  if (!data.phone) {
    return true;
  }
  const phoneNumberString = `${data.country?.dialCode}${data.phone}`;
  const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumberString);
  return parsedPhoneNumber?.isValid() ?? false;
}, {
  message: 'Not a valid phone number',
  path: ['phone'],
})
  .transform((data) => {
    const phoneNumberString = `${data.country?.dialCode}${data.phone}`;
    const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumberString);
    return {
      ...data,
      phone: parsedPhoneNumber?.number,
    };
  });

export const getUserLocation = async (): Promise<{
  country: string;
  countryCode: string;
  timezone: string;
}> => {
  try {
    // First try to get location from browser
    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    // Use a geocoding service to get country info from coordinates
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
    );
    
    const data = await response.json();
    
    return {
      country: data.countryName,
      countryCode: data.countryCode,
      timezone: data.timezone,
    };
  } catch (error) {
    console.error("Error getting user location:", error);
    // Fallback to IP-based location
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      
      return {
        country: data.country_name,
        countryCode: data.country_code,
        timezone: data.timezone,
      };
    } catch (ipError) {
      console.error("Error getting IP-based location:", ipError);
      // Final fallback to default values
      return {
        country: "Nigeria",
        countryCode: "NG",
        timezone: "Africa/Lagos",
      };
    }
  }
};
