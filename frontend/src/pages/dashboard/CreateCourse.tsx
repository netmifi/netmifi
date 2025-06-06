import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
// import { CreateCourseWizard } from "@/components/courses/CreateCourseWizard";
import { createCourse } from "@/api/hooks/instructor/useCreateCourse";
import CreateCourseWizard from "@/components/courses/CreateCourseWizard";

const CreateCourse = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const createCourseMutation = useMutation({
    mutationFn: createCourse,
    onSuccess: () => {
      toast.success("Course created successfully!");
      navigate("/instructor/courses");
    },
    onError: (error) => {
      toast.error("Failed to create course. Please try again.");
      console.error("Error creating course:", error);
    },
  });

  const handleSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      await createCourseMutation.mutateAsync(data);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen max-w-[90rem] mx-auto ">
      <div className=" ">
        <div className="">
          <h1 className="text-xl font-bold text- -900 mb-4">Create New Course</h1>
          <CreateCourseWizard onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </div>
      </div>
    </div>
  );
};

export default CreateCourse; 