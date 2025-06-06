import { Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import VideoPlayer from "@/components/VideoPlayer";

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Section {
  id: string;
  title: string;
  videoUrl?: string;
  audioUrl?: string;
  content?: string;
  quizQuestions?: QuizQuestion[];
}

interface ContentRendererProps {
  section: Section | null;
  sections: Section[];
  learningPreference: string;
  isCompleted: boolean;
  onComplete: () => void;
  onVideoComplete: (sectionId: string) => void;
}

const ContentRenderer = ({
  section,
  sections,
  learningPreference,
  isCompleted,
  onComplete,
  onVideoComplete,
}: ContentRendererProps) => {
  if (!section) {
    return (
      <div className="flex items-center justify-center h-full text-white">
        <p>No content available for this section</p>
      </div>
    );
  }

  switch (learningPreference) {
    case "media":
      return (
        <div className="p-6 bg-gray-100 rounded-lg dark:bg-gray-800">
          <div className="aspect- video bg-black rounded-lg">z
            <VideoPlayer
              key={section.id}
              videoUrl={section.videoUrl}
              title={section.title}
              videoCollection={sections.length}
              onEnded={() => {
                onVideoComplete(section.id);
                if (!isCompleted) {
                  // onComplete();
                }
              }}
              className="w-full h-full"
            />
          </div>
          <div className="flex items-center gap-4 mb-4">
            <Headphones className="w-6 h-6" />
            <h3 className="text-lg font-medium">{section.title}</h3>
          </div>
            <audio
              key={section.id}
              src={section.audioUrl}
              controls
              className="w-full"
              onEnded={() => {
                if (!isCompleted) {
                  onComplete();
                }
                onVideoComplete(section.id);
              }}
            />
        </div>
      );
    case "video":
      return (
        <div className="aspect-video bg-black rounded-lg">
          {section.videoUrl ? (
            <VideoPlayer
              key={section.videoUrl}
              videoUrl={section.videoUrl}
              title={section.title}
              videoCollection={sections.length}
              onEnded={() => {
                onVideoComplete(section.id);
                if (!isCompleted) {
                  // onComplete();
                }
              }}
              className="w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-white">
              <p>No video available for this section</p>
            </div>
          )}
        </div>
      );
    case "audio":
      return (
        <div className="p-6 bg-gray-100 rounded-lg dark:bg-gray-800">
          <div className="flex items-center gap-4 mb-4">
            <Headphones className="w-6 h-6" />
            <h3 className="text-lg font-medium">{section.title}</h3>
          </div>
          {section.audioUrl ? (
            <audio
              key={section.videoUrl}
              src={section.audioUrl}
              controls
              className="w-full"
              onEnded={() => {
                if (!isCompleted) {
                  onComplete();
                }
                onVideoComplete(section.id);
              }}
            />
          ) : (
            <div className="text-center py-4">
              <p>No audio available for this section</p>
            </div>
          )}
        </div>
      );
    case "storytelling":
      return (
        <div className="prose max-w-none dark:prose-invert">
          <h2>{section.title}</h2>
          {section.content ? (
            <div dangerouslySetInnerHTML={{ __html: section.content }} />
          ) : (
            <p>No content available for this section</p>
          )}
          {!isCompleted && (
            <Button onClick={onComplete} className="mt-4">
              Mark as Complete
            </Button>
          )}
        </div>
      );
    case "interactive":
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">{section.title}</h3>
          {section.quizQuestions && section.quizQuestions.length > 0 ? (
            <div className="space-y-4">
              {section.quizQuestions.map(
                (question: QuizQuestion, index: number) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-100 rounded-lg dark:bg-gray-800"
                  >
                    <p className="font-medium mb-2">{question.question}</p>
                    <div className="space-y-2">
                      {question.options.map(
                        (option: string, optIndex: number) => (
                          <div
                            key={optIndex}
                            className="flex items-center gap-2"
                          >
                            <input
                              type="radio"
                              name={`question-${index}`}
                              id={`option-${index}-${optIndex}`}
                              value={optIndex}
                            />
                            <label htmlFor={`option-${index}-${optIndex}`}>
                              {option}
                            </label>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )
              )}
              {!isCompleted && (
                <Button onClick={onComplete} className="mt-4">
                  Submit Answers
                </Button>
              )}
            </div>
          ) : (
            <p>No quiz questions available for this section</p>
          )}
        </div>
      );
    default:
      return (
        <div className="flex items-center justify-center h-full text-white">
          <p>Unsupported learning preference</p>
        </div>
      );
  }
};

export default ContentRenderer;
