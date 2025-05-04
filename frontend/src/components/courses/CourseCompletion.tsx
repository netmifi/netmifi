import { Star, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Rating from "react-rating";

interface CourseCompletionProps {
  courseTitle: string;
  totalXp: number;
  onBackToCourses: () => void;
  onSeeLearderBoard: () => void;
  onRestartCourse: () => void;
  isOpen: boolean;
  onClose: () => void;
  onFeedbackSubmit: () => void;
  feedback: string;
  setFeedback: (value: string) => void;
  rating: number;
  setRating: (value: number) => void;
}

const CourseCompletion = ({
  courseTitle,
  totalXp,
  onBackToCourses,
  onSeeLearderBoard,
  onRestartCourse,
  isOpen,
  onClose,
  onFeedbackSubmit,
  feedback,
  setFeedback,
  rating,
  setRating,
}: CourseCompletionProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          {/* <DialogTitle className="text-2xl font-bold text-center">
            Congratulations! 🎉
          </DialogTitle> */}
        </DialogHeader>

        <div className="space-y-3 py-">
          <div className="text-center">
            {/* <p className="text-base">
              You've completed <span className="font-semibold">{courseTitle}</span>
            </p> */}
            <p className="text-2xl font-bold text-primary mt-2">
              <span className="text-green-500">+{totalXp} </span> XP Earned
            </p>
          </div>

          <div className="space-y-4 flex flex-col items-center justify-center text-sm">
            <h3 className="text-sm font-semibold">
              How was your learning experience?
            </h3>

            <div className="space-y-">
              <div className="flex items-center">
                <Rating
                  start={0}
                  stop={5}
                  fractions={2}
                  initialRating={parseFloat(rating)} // This sets the initial state from props
                  onChange={(value) => setRating(value.toString())} // This updates state when user rates
                  emptySymbol={
                    <Star size={26} className="fill-none text-yellow-500" />
                  }
                  fullSymbol={
                    <Star
                      size={26}
                      className="fill-yellow-500 text-yellow-500"
                    />
                  }
                />
              </div>
            </div>

            <div className="space-y-3 w-full">
              <Label>Feedback</Label>
              <Textarea
                placeholder="Share your thoughts about the course..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="min-h-[70px]"
              />
            </div>
          </div>

          <div className="flex justify- center gap-4">
            <Button
              className={"bg-white text-black h-9 px-2"}
              onClick={onFeedbackSubmit}
            >
              Submit Feedback & Continue
            </Button>
            <Button variant="outline" onClick={onSeeLearderBoard}>
              See LearderBoard
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CourseCompletion;
