import { Video, Headphones, Book, Gamepad2 } from "lucide-react";

interface CourseHeaderProps {
  courseTitle: string;
  currentSection: number;
  totalSections: number;
  sectionXp: number;
  totalXp: number;
  learningPreference: string;
}

const CourseHeader = ({
  courseTitle,
  currentSection,
  totalSections,
  sectionXp,
  totalXp,
  learningPreference,
}: CourseHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold">{courseTitle || "Loading..."}</h1>
        <p className="text-gray-600">
          Section {currentSection + 1} of {totalSections || 0}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right flex items-center h-full justify-center gap-1">
          <p className="text-2xl font-bold text-red-600">{sectionXp}</p>
          <span className="text-sm text-gray-500">/ {totalXp} XP</span>
        </div>
        <div className="flex items-center gap-2">
          {learningPreference === "video" && <Video className="w-5 h-5" />}
          {learningPreference === "audio" && <Headphones className="w-5 h-5" />}
          {learningPreference === "storytelling" && <Book className="w-5 h-5" />}
          {learningPreference === "interactive" && <Gamepad2 className="w-5 h-5" />}
        </div>
      </div>
    </div>
  );
};

export default CourseHeader; 