import { useState } from 'react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { toast } from 'sonner';

interface CourseSurveyProps {
  courseId: string;
  onComplete: () => void;
}

const CourseSurvey = ({ courseId, onComplete }: CourseSurveyProps) => {
  const [rating, setRating] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!rating) {
      toast.error('Please select a rating');
      return;
    }

    setIsSubmitting(true);
    try {
      // TODO: Submit survey to backend
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      toast.success('Thank you for your feedback!');
      onComplete();
    } catch (error) {
      toast.error('Failed to submit survey');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-background rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold">Course Feedback</h2>
      <p className="text-muted-foreground">
        Help us improve your learning experience by providing feedback about this course.
      </p>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label>How would you rate this course?</Label>
          <RadioGroup value={rating} onValueChange={setRating}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="5" id="r5" />
              <Label htmlFor="r5">Excellent</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="4" id="r4" />
              <Label htmlFor="r4">Good</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="3" id="r3" />
              <Label htmlFor="r3">Average</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="2" id="r2" />
              <Label htmlFor="r2">Poor</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1" id="r1" />
              <Label htmlFor="r1">Very Poor</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="feedback">Additional Comments</Label>
          <Textarea
            id="feedback"
            placeholder="Tell us what you liked or what could be improved..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </Button>
      </div>
    </div>
  );
};

export default CourseSurvey; 