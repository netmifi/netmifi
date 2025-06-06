import { useParams } from "react-router-dom";
import { CourseProcessor } from "@/services/courseProcessor";
import { useApp } from "@/app/app-provider";

const CourseProcessorPage = () => {
  const { slug } = useParams();
  const { learningPreference } = useApp();

  // Initialize the course processor
  const processor = new CourseProcessor(slug || "", learningPreference);

  return (
    <div className="container mx-auto p-4">
      <h1>Course Processing</h1>
      {/* Add your course processing UI here */}
    </div>
  );
};

export default CourseProcessorPage; 