import { Video, Headphones, Book, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import VideoPlayer from "@/components/VideoPlayer";
import { LearningPreference } from "@/types/index";

interface ContentRendererProps {
  section: any;
  learningPreference: LearningPreference;
  isCompleted: boolean;
  onComplete: () => void;
}

const ContentRenderer = ({
  section,
  sections,
  learningPreference,
  isCompleted,
  onComplete,
}: ContentRendererProps) => {
  switch (learningPreference) {
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
                if (!isCompleted) {
                  onComplete();
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
              {section.quizQuestions.map((question: any, index: number) => (
                <div
                  key={index}
                  className="p-4 bg-gray-100 rounded-lg dark:bg-gray-800"
                >
                  <p className="font-medium mb-2">{question.question}</p>
                  <div className="space-y-2">
                    {question.options.map(
                      (option: string, optIndex: number) => (
                        <Button
                          key={optIndex}
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => {
                            if (option === question.correctAnswer) {
                              if (!isCompleted) {
                                onComplete();
                              }
                            }
                          }}
                        >
                          {option}
                        </Button>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
              <p>No interactive content available for this section</p>
            </div>
          )}
        </div>
      );
    default:
      return <div>Select a learning preference to continue</div>;
  }
};

export default ContentRenderer;
