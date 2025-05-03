import { useMutation } from "@tanstack/react-query";
import { api } from "@/api/axios";

interface CreateCourseData {
  title: string;
  description: string;
  category: string;
  language: string;
  price: number;
  duration: number;
  level: "beginner" | "intermediate" | "advanced";
  prerequisites: string[];
  learningOutcomes: string[];
  targetAudience: string;
}

export const createCourse = async (data: CreateCourseData) => {
  const response = await api.post("/instructor/courses", data);
  return response.data;
};

export const useCreateCourse = () => {
  return useMutation({
    mutationFn: createCourse,
  });
};