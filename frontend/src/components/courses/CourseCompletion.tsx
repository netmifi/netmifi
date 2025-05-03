import { Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Star } from "lucide-react";

interface CourseCompletionProps {
  courseTitle: string;
  totalXp: number;
  onBackToCourses: () => void;
  onRestartCourse: () => void;
  isOpen: boolean;
  onClose: () => void;
  onFeedbackSubmit: () => void;
  feedback: string;
  setFeedback: (value: string) => void;
  rating: string;
  setRating: (value: string) => void;
}

const CourseCompletion = ({
  courseTitle,
  totalXp,
  onBackToCourses,
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
            <h3 className="text-sm font-semibold">How was your learning experience?</h3>
            
            <div className="space-y-">
              <RadioGroup
                value={rating}
                onValueChange={setRating}
                className="flex gap-"
              >
                {[1, 2, 3, 4, 5].map((value) => (
                  <div key={value} className="flex items-center">
                    <RadioGroupItem value={value.toString()} id={`rating-${value}`} className="hidden" />
                    <Label htmlFor={`rating-${value}`} className="flex items-center">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    </Label>
                  </div>
                ))}
              </RadioGroup>
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
            <Button className={'bg-white text-black h-9 px-2'}  onClick={onFeedbackSubmit}>
              Submit Feedback & Continue
            </Button>
            <Button variant="outline"  onClick={onRestartCourse}>
              Restart Course
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CourseCompletion; 