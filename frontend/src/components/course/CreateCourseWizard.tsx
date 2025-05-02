import React, { useState } from "react";
import { cn } from "../../lib/utils";
import { ImageIcon, Video } from "lucide-react";
import { toast } from "react-hot-toast";
import { api } from "../../lib/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  language: z.string().min(1, "Language is required"),
  price: z.number().min(0, "Price must be 0 or greater"),
  duration: z.number().min(1, "Duration must be at least 1 hour"),
  level: z.enum(["beginner", "intermediate", "advanced"]),
  prerequisites: z.array(z.string()),
  learningOutcomes: z.array(z.string()),
  targetAudience: z.string().min(1, "Target audience is required"),
  thumbnail: z.string().optional(),
  introVideo: z.string().optional(),
});

interface CreateCourseWizardProps {
  onSubmit: (data: z.infer<typeof formSchema>) => Promise<void>;
  isSubmitting: boolean;
}

const CreateCourseWizard = ({ onSubmit, isSubmitting }: CreateCourseWizardProps) => {
  const [activeStep, setActiveStep] = useState(1);
  const totalSteps = 5;
  const [imageUploadProgress, setImageUploadProgress] = useState<number>(0);
  const [videoUploadProgress, setVideoUploadProgress] = useState<number>(0);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      language: "",
      price: 0,
      duration: 0,
      level: "beginner",
      prerequisites: [],
      learningOutcomes: [],
      targetAudience: "",
      thumbnail: "",
      introVideo: "",
    },
  });

  const handleFileUpload = async (file: File, type: "image" | "video") => {
    try {
      if (type === "image") {
        setIsUploadingImage(true);
        setImageUploadProgress(0);
      } else {
        setIsUploadingVideo(true);
        setVideoUploadProgress(0);
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", type);

      const response = await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          if (type === "image") {
            setImageUploadProgress(progress);
          } else {
            setVideoUploadProgress(progress);
          }
        },
      });

      const fileUrl = response.data.url;
      if (type === "image") {
        form.setValue("thumbnail", fileUrl);
        setIsUploadingImage(false);
      } else {
        form.setValue("introVideo", fileUrl);
        setIsUploadingVideo(false);
      }

      toast.success(`${type === "image" ? "Thumbnail" : "Video"} uploaded successfully!`);
    } catch (error) {
      console.error(`Error uploading ${type}:`, error);
      toast.error(`Failed to upload ${type}. Please try again.`);
      if (type === "image") {
        setIsUploadingImage(false);
      } else {
        setIsUploadingVideo(false);
      }
    }
  };

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await onSubmit(data);
      toast.success("Course created successfully!");
    } catch (error) {
      console.error("Error creating course:", error);
      toast.error("Failed to create course. Please try again.");
    }
  };

  const nextStep = () => {
    setActiveStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => {
    setActiveStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(activeStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Step 5: Media Upload */}
        {activeStep === 5 && (
          <div className="space-y-6 bg-white p-8 rounded-lg shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <ImageIcon className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold">Add media to your course</h2>
            </div>
            <p className="text-gray-600">Upload a thumbnail and introduction video to make your course stand out.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Thumbnail Upload */}
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <label
                  htmlFor="course-thumbnail"
                  className="cursor-pointer block"
                >
                  <ImageIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="font-medium">Course Thumbnail</h3>
                  <p className="text-sm text-gray-500">
                    Upload a cover image for your course
                  </p>

                  {isUploadingImage && (
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${imageUploadProgress}%` }}
                        />
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Uploading... {imageUploadProgress}%
                      </p>
                    </div>
                  )}
                </label>

                <input
                  type="file"
                  id="course-thumbnail"
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

              {/* Video Upload */}
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <label
                  htmlFor="course-intro-video"
                  className="cursor-pointer block"
                >
                  <Video className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="font-medium">Introduction Video</h3>
                  <p className="text-sm text-gray-500">
                    Upload a short video introducing your course
                  </p>

                  {isUploadingVideo && (
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${videoUploadProgress}%` }}
                        />
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Uploading... {videoUploadProgress}%
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
                      handleFileUpload(file, "video");
                    }
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          {activeStep > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={isSubmitting || isUploadingImage || isUploadingVideo}
            >
              Previous
            </Button>
          )}
          {activeStep < totalSteps ? (
            <Button
              type="button"
              onClick={nextStep}
              disabled={isSubmitting || isUploadingImage || isUploadingVideo}
            >
              Next
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isSubmitting || isUploadingImage || isUploadingVideo}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <Loader className="mr-2 h-4 w-4" />
                  Creating Course...
                </div>
              ) : (
                "Create Course"
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateCourseWizard; 