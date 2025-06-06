import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Play, CheckCircle, AlertCircle } from 'lucide-react';
import QuizComponent from './QuizComponent';
import { toast } from 'sonner';

interface Section {
    _id: string;
    title: string;
    description: string;
    order: number;
    videoUrl: string;
    duration: number;
    hasQuiz: boolean;
}

interface Quiz {
    _id: string;
    sectionId: string;
    title: string;
    description: string;
    questions: {
        question: string;
        options: string[];
        correctAnswer: number;
        explanation: string;
    }[];
    passingScore: number;
    timeLimit: number;
}

interface CourseContentProps {
    sections: Section[];
    quizzes: Quiz[];
}

const CourseContent: React.FC<CourseContentProps> = ({ sections, quizzes }) => {
    const [currentSection, setCurrentSection] = useState(0);
    const [showQuiz, setShowQuiz] = useState(false);
    const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());

    const handleSectionComplete = () => {
        const sectionId = sections[currentSection]._id;
        setCompletedSections(prev => new Set(prev).add(sectionId));
        
        if (sections[currentSection].hasQuiz) {
            setShowQuiz(true);
        } else if (currentSection < sections.length - 1) {
            setCurrentSection(prev => prev + 1);
        }
    };

    const handleQuizComplete = (score: number) => {
        const sectionId = sections[currentSection]._id;
        const quiz = quizzes.find(q => q.sectionId === sectionId);
        
        if (quiz && score >= quiz.passingScore) {
            toast.success('Quiz passed! 🎉');
            if (currentSection < sections.length - 1) {
                setCurrentSection(prev => prev + 1);
            }
        } else {
            toast.error('Quiz failed. Please try again!');
        }
        setShowQuiz(false);
    };

    const progress = (completedSections.size / sections.length) * 100;

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">Course Progress</h2>
                <Progress value={progress} className="h-2" />
                <p className="text-sm text-gray-500 mt-2">
                    {completedSections.size} of {sections.length} sections completed
                </p>
            </div>

            {showQuiz ? (
                <QuizComponent
                    questions={quizzes.find(q => q.sectionId === sections[currentSection]._id)?.questions || []}
                    timeLimit={quizzes.find(q => q.sectionId === sections[currentSection]._id)?.timeLimit || 600}
                    passingScore={quizzes.find(q => q.sectionId === sections[currentSection]._id)?.passingScore || 70}
                    onComplete={handleQuizComplete}
                />
            ) : (
                <motion.div
                    key={currentSection}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    <Card className="p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="text-xl font-bold">
                                    Section {sections[currentSection].order}: {sections[currentSection].title}
                                </h3>
                                <p className="text-gray-600 mt-2">
                                    {sections[currentSection].description}
                                </p>
                            </div>
                            {completedSections.has(sections[currentSection]._id) && (
                                <CheckCircle className="w-6 h-6 text-green-500" />
                            )}
                        </div>

                        <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                            <Button
                                variant="ghost"
                                size="lg"
                                className="hover:bg-transparent"
                            >
                                <Play className="w-12 h-12 text-red-600" />
                            </Button>
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-500">
                                Duration: {Math.floor(sections[currentSection].duration / 60)} minutes
                            </div>
                            {sections[currentSection].hasQuiz && (
                                <div className="flex items-center gap-2 text-sm text-blue-600">
                                    <AlertCircle className="w-4 h-4" />
                                    Quiz available
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end mt-6">
                            <Button
                                onClick={handleSectionComplete}
                                className="bg-red-600 hover:bg-red-700"
                            >
                                {sections[currentSection].hasQuiz ? 'Take Quiz' : 'Complete Section'}
                            </Button>
                        </div>
                    </Card>
                </motion.div>
            )}
        </div>
    );
};

export default CourseContent; 