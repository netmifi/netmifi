import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle2, XCircle } from 'lucide-react';
import { Quiz as QuizType, QuizQuestion } from '@/types/course';
import { quizService } from '@/services/quizService';
import { toast } from 'sonner';

interface QuizProps {
  courseId: string;
  sectionId: string;
  quiz: QuizType;
  onComplete: (score: number, passed: boolean, xpEarned: number) => void;
}

export const Quiz: React.FC<QuizProps> = ({ courseId, sectionId, quiz, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize selected answers array
  useEffect(() => {
    setSelectedAnswers(new Array(quiz.questions.length).fill(-1));
  }, [quiz.questions.length]);
  
  // Update progress
  useEffect(() => {
    const progressPercent = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;
    setProgress(progressPercent);
  }, [currentQuestionIndex, quiz.questions.length]);
  
  // Handle answer selection
  const handleAnswerSelect = (answerIndex: number) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);
  };
  
  // Move to next question
  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  // Move to previous question
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Submit quiz
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const result = await quizService.submitQuiz(courseId, sectionId, selectedAnswers);
      setScore(result.score);
      setShowResults(true);
      onComplete(result.score, result.passed, result.xpEarned);
      
      if (result.passed) {
        toast.success('Congratulations! You passed the quiz!');
      } else {
        toast.error('Sorry, you did not pass the quiz. Try again!');
      }
    } catch (error) {
      toast.error('Failed to submit quiz. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (showResults) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Quiz Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold">
                Score: {score.toFixed(1)}%
              </h3>
              <p className="text-gray-500">
                Passing Score: {quiz.passingScore}%
              </p>
            </div>
            
            <div className="space-y-4">
              {quiz.questions.map((question, index) => (
                <div key={question.id} className="space-y-2">
                  <p className="font-medium">{index + 1}. {question.text}</p>
                  <div className="flex items-center gap-2">
                    {selectedAnswers[index] === question.correctAnswer ? (
                      <CheckCircle2 className="text-green-500" size={20} />
                    ) : (
                      <XCircle className="text-red-500" size={20} />
                    )}
                    <span>
                      Your answer: {question.options[selectedAnswers[index]]}
                    </span>
                  </div>
                  {selectedAnswers[index] !== question.correctAnswer && (
                    <div className="flex items-center gap-2 text-green-500">
                      <CheckCircle2 size={20} />
                      <span>
                        Correct answer: {question.options[question.correctAnswer]}
                      </span>
                    </div>
                  )}
                  {question.explanation && (
                    <p className="text-sm text-gray-500 mt-2">
                      {question.explanation}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  const currentQuestion = quiz.questions[currentQuestionIndex];
  
  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Quiz Progress</span>
          <span className="text-sm text-gray-500">
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </span>
        </div>
        <Progress value={progress} />
      </div>
      
      {/* Question card */}
      <Card>
        <CardHeader>
          <CardTitle>Question {currentQuestionIndex + 1}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <p className="text-lg">{currentQuestion.text}</p>
            
            <RadioGroup
              value={selectedAnswers[currentQuestionIndex].toString()}
              onValueChange={(value) => handleAnswerSelect(parseInt(value))}
            >
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
            
            {/* Navigation */}
            <div className="flex justify-between items-center mt-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </Button>
              
              {currentQuestionIndex === quiz.questions.length - 1 ? (
                <Button
                  onClick={handleSubmit}
                  disabled={selectedAnswers.includes(-1) || isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={selectedAnswers[currentQuestionIndex] === -1}
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 