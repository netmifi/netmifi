import mutationErrorHandler from "@/api/handlers/mutationErrorHandler";
import { useInstructorRegister } from "@/api/hooks/auth/useInstructorRegister";
import { useApp } from "@/app/app-provider";
import CustomContactField from "@/components/form/CustomContactField";
import CustomFormField from "@/components/form/CustomFormField";
import CustomFormSelect from "@/components/form/CustomFormSelect";
import CustomMultiSelect from "@/components/form/CustomMultiSelect";
import CustomRadioGroup from "@/components/form/CustomRadioGroup";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { categories, timeZones, languages, certifications, radioGroupData } from "@/constants";
import { instructorFormSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckedState } from "@radix-ui/react-checkbox";
import { parsePhoneNumber, parsePhoneNumberFromString } from "libphonenumber-js";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillBulb } from "react-icons/ai";
import {
  FaAsterisk,
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { getUserLocation } from "@/lib/utils";

const SignInstructor = () => {
  const { user, setUser } = useApp();
  const { state } = useLocation();
  // const { countries } = useCountries();
  const instructorRegisterMutation = useInstructorRegister();
  const [isAccepted, setIsAccepted] = useState<CheckedState>(false);
  // const [isAvailableForMentorship, setIsAvailableForMentorship] = useState("");
  const [country, setCountry] = useState<Country | undefined>(
    user.country || {
      name: "Nigeria",
      dialCode: "+234",
      code: "NG",
      flag: "🇳🇬",
    }
  );

  const formSchema = instructorFormSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: user.phone ? parsePhoneNumber(user.phone).nationalNumber : "",
      country: {
        name: country?.name || "Nigeria",
        dialCode: country?.dialCode || "+234",
        code: country?.code || "NG",
        flag: country?.flag || "🇳🇬",
      },
      ...user.handles,
      about: user.about,
      taughtBefore: "no",
      mentoredPreviously: "no",
      preferredTeachingStyle: "lecture",
      availability: {
        days: [],
        timeZone: "",
        preferredHours: "flexible"
      },
      languages: [],
      certifications: [],
      terms: false
    },
  });
  const [, setDialCode] = useState(country?.dialCode || "+234");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors }, setError, clearErrors, watch } = form;
  const taughtBefore = watch('taughtBefore');
  const [activeStep, setActiveStep] = useState(1);
  const totalSteps = 4;
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);

  const nextStep = () => {
    // Validate current step before proceeding
    const currentStepFields = getCurrentStepFields(activeStep);
    const isValid = currentStepFields.every(field => {
      const value = form.getValues(field);
      return value !== undefined && value !== null && value !== '';
    });

    if (!isValid) {
      toast.error("Please fill in all required fields before proceeding");
      return;
    }

    setActiveStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const getCurrentStepFields = (step: number): string[] => {
    switch (step) {
      case 1:
        return ['phone', 'residentialAddress'];
      case 2:
        return ['niche', 'taughtBefore', 'preferredTeachingStyle', 'mentoredPreviously'];
      case 3:
        return ['availability.days', 'availability.timeZone', 'availability.preferredHours'];
      case 4:
        return ['languages', 'terms'];
      default:
        return [];
    }
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("🚀 onSubmit function called with data:", data);
    console.log("📝 Form state:", form.getValues());
    console.log("🔍 Form errors:", form.formState.errors);
    
    try {
      console.log("🔁 Submission started...");
      setIsSubmitting(true);
      setSubmitError(null);
      clearErrors();

      // Log raw input data
      console.log("📥 Raw data received:", data);

      // Format phone number
      const formattedPhone = `${data.country.dialCode}${data.phone}`;
      console.log("📞 Formatted phone:", formattedPhone);

      const parsedPhone = parsePhoneNumberFromString(formattedPhone);
      console.log("📞 Parsed phone object:", parsedPhone);

      if (!parsedPhone?.isValid()) {
        console.warn("⚠️ Invalid phone number format:", formattedPhone);
        setError("phone", {
          type: "manual",
          message: "Invalid phone number format"
        });
        return;
      }

      // Validate social media URLs
      const socialMediaUrls = {
        facebook: data.facebook,
        instagram: data.instagram,
        tiktok: data.tiktok,
        youtube: data.youtube,
        website: data.website
      };
      console.log("🌐 Validating social media URLs:", socialMediaUrls);

      for (const [platform, url] of Object.entries(socialMediaUrls)) {
        if (url && !url.startsWith("http://") && !url.startsWith("https://")) {
          console.warn(`⚠️ Invalid ${platform} URL:`, url);
          setError(platform as any, {
            type: "manual",
            message: `Please include http:// or https:// in the ${platform} URL`
          });
          return;
        }
      }

      // Prepare form data with only the fields the backend expects
      const formData = {
        phone: parsedPhone.number,
        country: data.country,
        residentialAddress: data.residentialAddress || '',
        facebook: data.facebook || '',
        instagram: data.instagram || '',
        tiktok: data.tiktok || '',
        youtube: data.youtube || '',
        website: data.website || '',
        niche: data.niche,
        whyInterest: data.whyInterest || '',
        taughtBefore: data.taughtBefore,
        mentoredPreviously: data.mentoredPreviously,
        about: data.about || ''
      };
      console.log("📦 Final form data to submit:", formData);

      // Execute async mutation
      console.log("🚀 Sending form data via mutation...");
      await instructorRegisterMutation.mutateAsync(formData);
      console.log("✅ Form submitted successfully.");
      
      // Show success message
      toast.success("Application submitted successfully!");
      
      // Navigate to success page or dashboard
      navigate('/dashboard');

    } catch (error: any) {
      console.error("🧨 Form submission error:", error);
      console.trace("🔍 Stack trace:");

      const errorMessage = error?.response?.data?.message ||
        error?.message ||
        "Failed to submit form. Please try again.";
      
      setSubmitError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
      console.log("🧊 Submission process complete.");
    }
  };

  const prevStep = () => {
    setActiveStep((prev) => Math.max(prev - 1, 1));
  };

  const handleNextClick = () => {
    console.log("Next button clicked");
    nextStep();
  };

  const handlePrevClick = () => {
    console.log("Previous button clicked");
    prevStep();
  };

  const handleSubmitClick = (e: React.MouseEvent) => {
    console.log("Submit button clicked");
    e.preventDefault();
    
    // Trigger form validation and submission
    form.trigger().then((isValid) => {
      console.log("Form validation result:", isValid);
      if (isValid) {
        const formData = form.getValues();
        console.log("Submitting form with data:", formData);
        onSubmit(formData);
      } else {
        console.log("Form validation failed:", form.formState.errors);
        toast.error("Please fill in all required fields correctly");
      }
    });
  };

  // Update form values when country changes
  useEffect(() => {
    if (country) {
      form.setValue("country", {
        name: country.name,
        dialCode: country.dialCode,
        code: country.code,
        flag: country.flag,
      });
    }
  }, [country, form]);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        setIsLoadingLocation(true);
        const location = await getUserLocation();
        
        // Update country state with location data
        setCountry({
          name: location.country,
          dialCode: getCountryDialCode(location.countryCode),
          code: location.countryCode,
          flag: getCountryFlag(location.countryCode),
        });

        // Update form with timezone
        form.setValue("availability.timeZone", location.timezone, { shouldValidate: false });
      } catch (error) {
        console.error("Error setting location:", error);
        toast.error("Could not determine your location. Please select manually.");
      } finally {
        setIsLoadingLocation(false);
      }
    };

    fetchLocation();
  }, []);

  // Helper function to get country dial code
  const getCountryDialCode = (code: string): string => {
    // You can implement a proper country code lookup here
    // For now, using a simple mapping
    const dialCodes: Record<string, string> = {
      NG: "+234",
      US: "+1",
      GB: "+44",
      // Add more country codes as needed
    };
    return dialCodes[code] || "+234";
  };

  // Helper function to get country flag emoji
  const getCountryFlag = (code: string): string => {
    // Convert country code to flag emoji
    return code
      .toUpperCase()
      .replace(/./g, char => String.fromCharCode(127397 + char.charCodeAt(0)));
  };

  return (
    <div className="max-w-[90rem] mx-auto">
      {isLoadingLocation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <p className="text-center">Detecting your location...</p>
            <div className="mt-2 flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
            </div>
          </div>
        </div>
      )}
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="bg-gray-200 rounded-full">
          <div
            className="h-1 bg-red-600 rounded-full transition-all duration-300"
            style={{ width: `${(activeStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Step 1: Personal Information */}
          {activeStep === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Personal Information</h2>
          <CustomContactField
            form={form}
            name="phone"
            control={form.control}
            placeholder="Enter your phone number"
                label="Phone Number"
            setDialCode={setDialCode}
            setCountry={setCountry}
            isRequired
          />
          <CustomFormField
            name="residentialAddress"
            control={form.control}
                placeholder="Enter your residential address"
                label="Residential Address"
            isRequired
          />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CustomFormField
                name="facebook"
                control={form.control}
                  placeholder="https://facebook.com/your-handle"
                  label="Facebook"
                URLIcon={<FaFacebookF />}
              />
              <CustomFormField
                name="instagram"
                control={form.control}
                  placeholder="https://instagram.com/your-handle"
                  label="Instagram"
                URLIcon={<FaInstagram />}
              />
              <CustomFormField
                name="tiktok"
                control={form.control}
                  placeholder="https://tiktok.com/your-handle"
                  label="TikTok"
                URLIcon={<FaTiktok />}
              />
              <CustomFormField
                name="youtube"
                control={form.control}
                  placeholder="https://youtube.com/your-handle"
                  label="YouTube"
                URLIcon={<FaYoutube />}
              />
              </div>
            </div>
          )}

          {/* Step 2: Teaching Experience */}
          {activeStep === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Teaching Experience</h2>
          <CustomFormSelect
            name="niche"
            control={form.control}
            placeholder="Select your area of expertise"
            options={categories}
                label="Area of Expertise"
            isRequired
          />
            <CustomRadioGroup
              control={form.control}
                name="taughtBefore"
                label="Have you taught online before?"
              group={radioGroupData}
              isRequired
            />
              {taughtBefore === 'yes' && (
                <CustomFormField
                  name="teachingExperience"
                  control={form.control}
                  placeholder="Describe your teaching experience"
                  label="Teaching Experience"
                  type="textarea"
                  isRequired
                />
              )}
              <CustomFormSelect
                name="preferredTeachingStyle"
                control={form.control}
                placeholder="Select your preferred teaching style"
                options={[
                  { label: "Lecture", value: "lecture" },
                  { label: "Interactive", value: "interactive" },
                  { label: "Hands-on", value: "hands-on" },
                  { label: "Discussion", value: "discussion" },
                  { label: "Project-based", value: "project-based" }
                ]}
                label="Preferred Teaching Style"
                isRequired
              />
            <CustomRadioGroup
              control={form.control}
                name="mentoredPreviously"
                label="Have you been a mentor before?"
              group={radioGroupData}
              isRequired
            />
          </div>
          )}

          {/* Step 3: Availability */}
          {activeStep === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Availability</h2>
              <CustomMultiSelect
                name="availability.days"
                control={form.control}
                placeholder="Select available days"
                options={[
                  "Monday", "Tuesday", "Wednesday", "Thursday",
                  "Friday", "Saturday", "Sunday"
                ]}
                label="Available Days"
                isRequired
              />
              <CustomFormSelect
                name="availability.timeZone"
                    control={form.control}
                placeholder="Select your time zone"
                options={timeZones}
                label="Time Zone"
                isRequired
              />
              <CustomFormSelect
                name="availability.preferredHours"
                    control={form.control}
                placeholder="Select preferred hours"
                options={[
                  { label: "Morning (6AM-12PM)", value: "morning" },
                  { label: "Afternoon (12PM-6PM)", value: "afternoon" },
                  { label: "Evening (6PM-12AM)", value: "evening" },
                  { label: "Flexible", value: "flexible" }
                ]}
                label="Preferred Hours"
                isRequired
              />
            </div>
          )}

          {/* Step 4: Additional Information */}
          {activeStep === 4 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Additional Information</h2>
              <CustomMultiSelect
                name="languages"
                control={form.control}
                placeholder="Select languages you speak"
                options={languages}
                label="Languages"
                isRequired
              />
              <CustomMultiSelect
                name="certifications"
                control={form.control}
                placeholder="Select your certifications"
                options={certifications}
                label="Certifications"
              />
            <CustomFormField
                name="about"
              control={form.control}
                placeholder="Tell us about yourself"
                label="About You"
              type="textarea"
                // isRequired
              />
              <CustomFormField
                name="whyInterest"
                control={form.control}
                placeholder="Why are you interested in teaching on our platform?"
                label="Why Teaching?"
                type="textarea"
                // isRequired
              />
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  {...register('terms')}
                  className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                  I agree to the terms and conditions
                </label>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {activeStep > 1 && (
              <button
                type="button"
                onClick={handlePrevClick}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Previous
              </button>
            )}
            {activeStep < totalSteps ? (
              <button
                type="button"
                onClick={handleNextClick}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmitClick}
                disabled={isSubmitting}
                className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
                  isSubmitting 
                    ? 'bg-red-400 cursor-not-allowed' 
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </div>
                ) : (
                  'Submit Application'
                )}
              </button>
            )}
          </div>

          {/* Error Display */}
          {submitError && (
            <div className="p-4 text-sm text-red-700 bg-red-100 rounded-lg">
              {submitError}
            </div>
          )}
          {Object.entries(errors).map(([field, error]) => (
            <div key={field} className="text-sm text-red-600">
              {error.message}
            </div>
          ))}

          {/* Form Tips */}
          <div className="mt-4 text-sm text-gray-600">
            <h3 className="font-medium mb-2 flex items-center"><AiFillBulb /> Tips </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Ensure all required fields are filled correctly</li>
              <li>Provide valid social media URLs</li>
              <li>Write detailed responses for your experience and interests</li>
              <li>Double-check your phone number format</li>
              {taughtBefore === 'yes' && (
                <li>Since you have teaching experience, please provide more details about it</li>
              )}
            </ul>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignInstructor;
