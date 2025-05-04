import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { Timer } from 'lucide-react';

interface Question {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
}

interface QuizProps {
    questions: Question[];
    timeLimit: number;
    passingScore: number;
    onComplete: (score: number) => void;
}

const QuizComponent: React.FC<QuizProps> = ({ questions, timeLimit, passingScore, onComplete }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(timeLimit);
    const [showExplanation, setShowExplanation] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (timeLeft > 0 && !isComplete) {
            const timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0 && !isComplete) {
            handleComplete();
        }
    }, [timeLeft, isComplete]);

    const handleAnswer = (index: number) => {
        if (selectedAnswer !== null) return;
        
        setSelectedAnswer(index);
        if (index === questions[currentQuestion].correctAnswer) {
            setScore(prev => prev + 1);
            toast.success('Correct! 🎉');
        } else {
            toast.error('Oops! Try again next time!');
        }
        setShowExplanation(true);
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
            setSelectedAnswer(null);
            setShowExplanation(false);
        } else {
            handleComplete();
        }
    };

    const handleComplete = () => {
        setIsComplete(true);
        const finalScore = (score / questions.length) * 100;
        onComplete(finalScore);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <Timer className="w-5 h-5" />
                    <span className="text-lg font-semibold">{formatTime(timeLeft)}</span>
                </div>
                <div className="text-lg font-semibold">
                    Question {currentQuestion + 1} of {questions.length}
                </div>
            </div>

            <Progress 
                value={(currentQuestion / questions.length) * 100} 
                className="mb-6"
            />

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentQuestion}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    <Card className="p-6 mb-6">
                        <h2 className="text-xl font-bold mb-4">
                            {questions[currentQuestion].question}
                        </h2>
                        
                        <div className="space-y-3">
                            {questions[currentQuestion].options.map((option, index) => (
                                <motion.button
                                    key={index}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`w-full p-4 rounded-lg text-left transition-colors
                                        ${selectedAnswer === null 
                                            ? 'bg-gray-100 hover:bg-gray-200' 
                                            : selectedAnswer === index
                                                ? index === questions[currentQuestion].correctAnswer
                                                    ? 'bg-green-100 border-2 border-green-500'
                                                    : 'bg-red-100 border-2 border-red-500'
                                                : index === questions[currentQuestion].correctAnswer
                                                    ? 'bg-green-100 border-2 border-green-500'
                                                    : 'bg-gray-100'
                                        }`}
                                    onClick={() => handleAnswer(index)}
                                    disabled={selectedAnswer !== null}
                                >
                                    {option}
                                </motion.button>
                            ))}
                        </div>

                        {showExplanation && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-4 p-4 bg-blue-50 rounded-lg"
                            >
                                <p className="text-blue-800">
                                    {questions[currentQuestion].explanation}
                                </p>
                            </motion.div>
                        )}
                    </Card>

                    {selectedAnswer !== null && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex justify-end"
                        >
                            <Button
                                onClick={handleNext}
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                {currentQuestion < questions.length - 1 ? 'Next Question' : 'Complete Quiz'}
                            </Button>
                        </motion.div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default QuizComponent; 