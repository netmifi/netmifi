import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Section {
  id: string;
  title: string;
}

interface CourseProgressProps {
  sections: Section[];
  currentSection: number;
  completedSections: number[];
  onNextSection: () => void;
  isLastSection: boolean;
  onSectionClick: (index: number) => void;
}

const CourseProgress = ({
  sections,
  currentSection,
  completedSections,
  onNextSection,
  isLastSection,
  onSectionClick,
}: CourseProgressProps) => {
  return (
    <div className="space-y-4">
      <div className="bg-gray-900 p-4 rounded-md">
        <h3 className="font-medium mb-2">Course Progress</h3>
        <div className="space-y-2">
          {sections?.map((section, index) => (
            <div
              key={index}
              onClick={() => onSectionClick(index)}
              className={`p-2 text-sm cursor-pointer rounded-md transition-colors ${
                index === currentSection
                  ? "bg-gray-700 text-white"
                  : completedSections.includes(index)
                  ? "text-gray-400 hover:bg-gray-800"
                  : "text-gray-500 hover:bg-gray-800"
              }`}
            >
              {section.title}
            </div>
          )) || (
            <div className="p-2 rounded bg-gray-200">No sections available</div>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          size={"sm"}
          onClick={() => onSectionClick(currentSection - 1)}
          className="flex-1 bg-gray-800 text-white"
          disabled={currentSection === 0 || !sections?.length}
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Previous
        </Button>
        {!isLastSection ? (
          <Button
            size={"sm"}
            onClick={onNextSection}
            className="flex-1 bg-black text-white"
            disabled={!sections?.length}
          >
            Next
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        ) : (
          <Button
            size={"sm"}
            onClick={onNextSection}
            className="flex-1 bg-gray-800 text-white"
            disabled={!sections?.length}
          >
            Complete
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default CourseProgress;
