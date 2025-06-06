import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories, languages } from "@/constants";
import { toast } from "sonner";
import {
  Book,
  DollarSign,
  Globe,
  FileText,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Image as ImageIcon,
  Video,
} from "lucide-react";
import { cn } from "@/lib/utils";
import CustomFileField from "../form/CustomFileField";

const courseFormSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  category: z.string().min(1, "Please select a category"),
  language: z.string().min(1, "Please select a language"),
  price: z.number().min(0, "Price must be a positive number"),
  duration: z.number().min(1, "Duration must be at least 1 hour"),
  level: z.enum(["beginner", "intermediate", "advanced"]),
  prerequisites: z.array(z.string()),
  learningOutcomes: z.array(z.string()),
  targetAudience: z.string().min(10, "Please describe your target audience"),
  thumbnail: z.string().optional(),
  introVideo: z.string().optional(),
});

interface CreateCourseWizardProps {
  onSubmit: (data: z.infer<typeof courseFormSchema>) => Promise<void>;
  isSubmitting?: boolean;
}

const CreateCourseWizard = ({
  onSubmit,
  isSubmitting,
}: CreateCourseWizardProps) => {
  const [activeStep, setActiveStep] = useState(1);
  const totalSteps = 5;
  const [selectedMedia, setSelectedMedia] = useState<"image" | "video" | null>(
    null
  );
  const [thumbProgress, setThumbProgress] = useState<number>(0);
  const [vidProgress, setVidProgress] = useState<number>(0);

  const form = useForm<z.infer<typeof courseFormSchema>>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      language: "",
      price: 0,
      duration: 1,
      level: "beginner",
      prerequisites: [],
      learningOutcomes: [],
      targetAudience: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof courseFormSchema>) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const nextStep = () => {
    const currentStepFields = getCurrentStepFields(activeStep);
    const isValid = currentStepFields.every((field) => {
      const value = form.getValues(field);
      return value !== undefined && value !== null && value !== "";
    });

    if (!isValid) {
      toast.error("Please fill in all required fields before proceeding");
      return;
    }

    setActiveStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => {
    setActiveStep((prev) => Math.max(prev - 1, 1));
  };

  const getCurrentStepFields = (step: number): string[] => {
    switch (step) {
      case 1:
        return ["title", "description"];
      case 2:
        return ["category", "language", "level"];
      case 3:
        return ["price", "duration"];
      case 4:
        return ["prerequisites", "learningOutcomes", "targetAudience"];
      case 5:
        return ["thumbnail", "introVideo"];
      default:
        return [];
    }
  };

  const handleFileUpload = async (file: File, type: "image" | "video") => {
    try {
      setVidProgress(0);
      // Simulate upload progress
      const interval = setInterval(() => {
        setVidProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      // Here you would typically upload the file to your server
      // For now, we'll just create a local URL
      const fileUrl = URL.createObjectURL(file);
      form.setValue(type === "image" ? "thumbnail" : "introVideo", fileUrl);

      toast.success(
        `${type === "image" ? "Thumbnail" : "Video"} uploaded successfully!`
      );
    } catch (error) {
      toast.error(`Failed to upload ${type}`);
    }
  };

  return (
    <div className="min-h-screen w-[40vw]">
      <div className="">
        {/* Progress Bar */}
        {/* <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Step {activeStep} of {totalSteps}</span>
            <span className="text-sm text-gray-500">{Math.round((activeStep / totalSteps) * 100)}% Complete</span>
          </div>
          <div className="bg-gray-200 rounded-full h-2">
            <div
              className="bg-red-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(activeStep / totalSteps) * 100}%` }}
            />
          </div>
        </div> */}

        {/* Step Indicators */}
        <div className="flex justify-around mb-8">
          {[1, 2, 3, 4, 5].map((step) => (
            <div
              key={step}
              className={cn(
                "flex flex-col items-center",
                step < activeStep && "text-green-600",
                step === activeStep && "text-red-600",
                step > activeStep && "text-gray-600"
              )}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center mb-2",
                  step < activeStep && "bg-green-50",
                  step === activeStep && "bg-red-50",
                  step > activeStep && "bg-gray-50"
                )}
              >
                {step < activeStep ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <span className="font-medium">{step}</span>
                )}
              </div>
              <span className="text-xs font-medium">
                {step === 1 && "Basics"}
                {step === 2 && "Category"}
                {step === 3 && "Details"}
                {step === 4 && "Content"}
                {step === 5 && "Media"}
              </span>
            </div>
          ))}
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            {/* Step 1: Course Title & Description */}
            {activeStep === 1 && (
              <div className="space-y-6 bg- p- rounded-lg shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Book className="w-6 h-6 text-red" />
                  <h2 className="text-2xl font-bold">
                    Let's start with the basics
                  </h2>
                </div>
                <p className="text-gray-600">
                  Give your course a title and describe what students will
                  learn.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Course Title
                    </label>
                    <Input
                      {...form.register("title")}
                      placeholder="e.g., Complete Web Development Bootcamp"
                      className="h-12 text-lg"
                    />
                    {form.formState.errors.title && (
                      <p className="text-sm text-red-500 mt-1">
                        {form.formState.errors.title.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Description
                    </label>
                    <Textarea
                      {...form.register("description")}
                      placeholder="Describe what students will learn in this course..."
                      rows={4}
                      className="text-base"
                    />
                    {form.formState.errors.description && (
                      <p className="text-sm text-red-500 mt-1">
                        {form.formState.errors.description.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Category & Language */}
            {activeStep === 2 && (
              <div className="space-y-6 bg-  p- rounded-lg shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="w-6 h-6 text-red-600" />
                  <h2 className="text-2xl font-bold">Categorize your course</h2>
                </div>
                <p className="text-gray-600">
                  Help students find your course by selecting the right category
                  and language.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="col-span-1">
                    <label className="block text-sm font-medium mb-1">
                      Category
                    </label>
                    <Select
                      onValueChange={(value) =>
                        form.setValue("category", value)
                      }
                      defaultValue={form.getValues("category")}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem
                            key={category.value}
                            value={category.value}
                          >
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="col-span-1">
                    <label className="block text-sm font-medium mb-1">
                      Language
                    </label>
                    <Select
                      onValueChange={(value) =>
                        form.setValue("language", value)
                      }
                      defaultValue={form.getValues("language")}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select a language" />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((language) => (
                          <SelectItem
                            key={language.value}
                            value={language.value}
                          >
                            {language.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="col-span-1">
                    <label className="block text-sm font-medium mb-1">
                      Level
                    </label>
                    <Select
                      onValueChange={(value) =>
                        form.setValue("level", value as any)
                      }
                      defaultValue={form.getValues("level")}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Pricing & Duration */}
            {activeStep === 3 && (
              <div className="space-y-6 bg-  p- rounded-lg shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <DollarSign className="w-6 h-6 text-red-600" />
                  <h2 className="text-2xl font-bold">
                    Set your course details
                  </h2>
                </div>
                <p className="text-gray-600">
                  Determine the price and duration of your course.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Price ($)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                          $
                        </span>
                        <Input
                          type="number"
                          {...form.register("price", { valueAsNumber: true })}
                          placeholder="0.00"
                          className="h-12 pl-8"
                        />
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">
                      Set a price that reflects the value of your course
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Duration (hours)
                      </label>
                      <Input
                        type="number"
                        {...form.register("duration", { valueAsNumber: true })}
                        placeholder="1"
                        className="h-12"
                      />
                    </div>
                    <p className="text-sm text-gray-500">
                      Estimated total duration of your course content
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Course Content */}
            {activeStep === 4 && (
              <div className="space-y-6 bg-  p-  rounded-lg shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-6 h-6 text-red-600" />
                  <h2 className="text-2xl font-bold">
                    Define your course content
                  </h2>
                </div>
                <p className="text-gray-600">
                  Help students understand what they'll learn and what they need
                  to know.
                </p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Prerequisites
                    </label>
                    <Textarea
                      {...form.register("prerequisites")}
                      placeholder="List the prerequisites for this course (one per line)"
                      rows={3}
                      className="text-base"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      What should students know before taking this course?
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Learning Outcomes
                    </label>
                    <Textarea
                      {...form.register("learningOutcomes")}
                      placeholder="What will students be able to do after completing this course? (one per line)"
                      rows={3}
                      className="text-base"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      What skills will students gain from this course?
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Target Audience
                    </label>
                    <Textarea
                      {...form.register("targetAudience")}
                      placeholder="Who is this course for? What background knowledge should they have?"
                      rows={3}
                      className="text-base"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Describe your ideal student
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Media Upload */}
            {activeStep === 5 && (
              <div className="space-y-6 bg-  p-  rounded-lg shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <ImageIcon className="w-6 h-6 text-red-600" />
                  <h2 className="text-2xl font-bold">
                    Add media to your course
                  </h2>
                </div>
                <p className="text-gray-600">
                  Upload a thumbnail and introduction video to make your course
                  stand out.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div
                    className={cn(
                      "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
                      selectedMedia === "image"
                        ? "border-red-500 bg-gray-900"
                        : "border-gray-300 hover:border-gray-400"
                    )}
                    onClick={() => setSelectedMedia("image")}
                  >
                    <label
                      htmlFor="course-thumbnail"
                      className="cursor-pointer block"
                    >
                      <ImageIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <h3 className="font-medium">Course Thumbnail</h3>
                      <p className="text-sm text-gray-500">
                        Upload a cover image for your course
                      </p>

                      {thumbProgress > 0 && thumbProgress < 100 && (
                        <div className="mt-4">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-red-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${thumbProgress}%` }}
                            />
                          </div>
                          <p className="text-sm text-gray-500 mt-2">
                            Uploading... {thumbProgress}%
                          </p>
                        </div>
                      )}
                    </label>

                    <input
                      type="file"
                      id="course-thumbnail" // matches label's htmlFor
                      name="thumbnail"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleFileUpload(file, "image");
                        }
                      }}
                    />
                  </div>

                  <div className="text-center">
                    <label
                      htmlFor="course-intro-video"
                      className={cn(
                        "block border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
                        selectedMedia === "video"
                          ? "border-red-500 bg-gray-900"
                          : "border-gray-300 hover:border-gray-400"
                      )}
                    >
                      <Video className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <h3 className="font-medium">Introduction Video</h3>
                      <p className="text-sm text-gray-500">
                        Upload a short video introducing your course
                      </p>

                      {vidProgress > 0 && vidProgress < 100 && (
                        <div className="mt-4">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-red-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${vidProgress}%` }}
                            />
                          </div>
                          <p className="text-sm text-gray-500 mt-2">
                            Uploading... {vidProgress}%
                          </p>
                        </div>
                      )}
                    </label>

                    <input
                      type="file"
                      id="course-intro-video"
                      accept="video/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setSelectedMedia("video"); // Ensure this is triggered on actual upload too
                          handleFileUpload(file, "video");
                        }
                      }}
                    />
                  </div>
                </div>
                <CustomFileField
                  
                  name={'course-intro-video'}
                  label={
                    <>
                      <ImageIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <h3 className="font-medium">Course Thumbnail</h3>
                      <p className="text-sm text-gray-500">
                        Upload a cover image for your course
                      </p>

                      {thumbProgress > 0 && thumbProgress < 100 && (
                        <div className="mt-4">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-red-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${thumbProgress}%` }}
                            />
                          </div>
                          <p className="text-sm text-gray-500 mt-2">
                            Uploading... {thumbProgress}%
                          </p>
                        </div>
                      )}
                    </>
                  }
                />
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                className={cn(
                  "flex items-center gap-2",
                  activeStep === 1 && "invisible"
                )}
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>
              {activeStep < totalSteps ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center gap-2"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      Creating Course...
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </>
                  ) : (
                    <>
                      Create Course
                      <CheckCircle2 className="w-4 h-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateCourseWizard;
