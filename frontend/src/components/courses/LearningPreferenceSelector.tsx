import { useState } from 'react';
import { Button } from '../ui/button';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { Video, Headphones, BookOpen, Gamepad2 } from 'lucide-react';
import { LearningPreference } from '@/types';

interface LearningPreferenceSelectorProps {
  onSelect: (preference: LearningPreference) => void;
  onCancel: () => void;
}

const LearningPreferenceSelector = ({ onSelect, onCancel }: LearningPreferenceSelectorProps) => {
  const [preference, setPreference] = useState<LearningPreference | ''>('');

  const handleSubmit = () => {
    if (preference) {
      onSelect(preference);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-background rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center">Choose Your Learning Style</h2>
      <p className="text-muted-foreground text-center">
        Select how you prefer to learn this course content. You can change this later.
      </p>

      <RadioGroup value={preference} onValueChange={(value) => setPreference(value as LearningPreference)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col items-center p-4 border rounded-lg hover:bg-accent cursor-pointer">
            <RadioGroupItem value="video" id="video" className="sr-only" />
            <Label htmlFor="video" className="flex flex-col items-center gap-2 cursor-pointer">
              <Video className="w-8 h-8 text-blue-500" />
              <span className="font-medium">Video</span>
              <span className="text-xs text-muted-foreground text-center">Watch video lectures</span>
            </Label>
          </div>

          <div className="flex flex-col items-center p-4 border rounded-lg hover:bg-accent cursor-pointer">
            <RadioGroupItem value="audio" id="audio" className="sr-only" />
            <Label htmlFor="audio" className="flex flex-col items-center gap-2 cursor-pointer">
              <Headphones className="w-8 h-8 text-green-500" />
              <span className="font-medium">Audio</span>
              <span className="text-xs text-muted-foreground text-center">Listen to audio lessons</span>
            </Label>
          </div>

          <div className="flex flex-col items-center p-4 border rounded-lg hover:bg-accent cursor-pointer">
            <RadioGroupItem value="written" id="written" className="sr-only" />
            <Label htmlFor="written" className="flex flex-col items-center gap-2 cursor-pointer">
              <BookOpen className="w-8 h-8 text-amber-500" />
              <span className="font-medium">Written</span>
              <span className="text-xs text-muted-foreground text-center">Read text content</span>
            </Label>
          </div>

          <div className="flex flex-col items-center p-4 border rounded-lg hover:bg-accent cursor-pointer">
            <RadioGroupItem value="interactive" id="interactive" className="sr-only" />
            <Label htmlFor="interactive" className="flex flex-col items-center gap-2 cursor-pointer">
              <Gamepad2 className="w-8 h-8 text-purple-500" />
              <span className="font-medium">Interactive</span>
              <span className="text-xs text-muted-foreground text-center">Engage with interactive content</span>
            </Label>
          </div>
        </div>
      </RadioGroup>

      <div className="flex justify-end gap-3 mt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={!preference}>
          Start Learning
        </Button>
      </div>
    </div>
  );
};

export default LearningPreferenceSelector; 