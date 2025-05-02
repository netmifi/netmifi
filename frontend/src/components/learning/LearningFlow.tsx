import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useLearningStore } from '@/stores/learningStore';
import { useUserStore } from '@/stores/userStore';
import { VideoPlayer } from './content/VideoPlayer';
import { AudioPlayer } from './content/AudioPlayer';
import { StoryViewer } from './content/StoryViewer';
import { QuizComponent } from './content/QuizComponent';
import { LearningPreferenceSelector } from './LearningPreferenceSelector';
import { LearningPreference } from '@/types/learning';
import { Section, ContentType } from '@/types/course';
import { updateUserXP } from '@/api/user';
import { confetti } from '@/lib/confetti';

interface LearningFlowProps {
  courseId: string;
  sectionId: string;
  onComplete: () => void;
}

export const LearningFlow: React.FC<LearningFlowProps> = ({
  courseId,
  sectionId,
  onComplete
}) => {
  const navigate = useNavigate();
  const { user, updateUser } = useUserStore();
  const { 
    currentSection, 
    setCurrentSection, 
    learningPreference, 
    setLearningPreference,
    progress,
    updateProgress
  } = useLearningStore();
  
  const [isLoading, setIsLoading] = useState(true);
  const [showPreferenceSelector, setShowPreferenceSelector] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('content');
  const [sectionCompleted, setSectionCompleted] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);
  
  // Load section data
  useEffect(() => {
    const loadSection = async () => {
      try {
        setIsLoading(true);
        // In a real implementation, this would fetch from an API
        // For now, we'll use mock data
        const mockSection: Section = {
          id: sectionId,
          title: 'Introduction to the Course',
          description: 'Learn the basics of this course',
          contentType: ContentType.VIDEO,
          content: {
            videoUrl: 'https://example.com/video.mp4',
            duration: 600, // 10 minutes
            transcript: 'This is a transcript of the video...'
          },
          xpReward: 100,
          order: 1,
          quiz: {
            questions: [
              {
                id: '1',
                text: 'What is the main topic of this course?',
                options: [
                  { id: 'a', text: 'Option A' },
                  { id: 'b', text: 'Option B' },
                  { id: 'c', text: 'Option C' },
                  { id: 'd', text: 'Option D' }
                ],
                correctOptionId: 'a'
              }
            ]
          }
        };
        
        setCurrentSection(mockSection);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading section:', error);
        toast.error('Failed to load section');
        setIsLoading(false);
      }
    };
    
    loadSection();
  }, [sectionId, setCurrentSection]);
  
  // Handle learning preference selection
  const handlePreferenceSelect = (preference: LearningPreference) => {
    setLearningPreference(preference);
    setShowPreferenceSelector(false);
    
    // Adjust content based on preference
    if (currentSection) {
      // In a real implementation, this would call an API to get adjusted content
      // For now, we'll just use the same content
      toast.success(`Content adjusted for ${preference} learning style`);
    }
  };
  
  // Handle content completion
  const handleContentComplete = () => {
    setActiveTab('quiz');
    toast.success('Content completed! Time for the quiz.');
  };
  
  // Handle quiz completion
  const handleQuizComplete = async (score: number, correctAnswers: number, totalQuestions: number) => {
    // Calculate XP based on quiz performance
    const baseXp = currentSection?.xpReward || 0;
    const performanceMultiplier = correctAnswers / totalQuestions;
    const earnedXp = Math.round(baseXp * performanceMultiplier);
    
    setXpEarned(earnedXp);
    setSectionCompleted(true);
    
    // Update user XP
    try {
      await updateUserXP(earnedXp);
      
      // Update local user state
      if (user) {
        updateUser({
          ...user,
          xp: user.xp + earnedXp,
          level: Math.floor((user.xp + earnedXp) / 1000) + 1
        });
      }
      
      // Show celebration
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      
      toast.success(`Congratulations! You earned ${earnedXp} XP!`);
      
      // Update progress
      updateProgress(courseId, sectionId, true);
      
      // Call onComplete after a short delay
      setTimeout(() => {
        onComplete();
      }, 2000);
    } catch (error) {
      console.error('Error updating XP:', error);
      toast.error('Failed to update XP');
    }
  };
  
  // Render content based on type
  const renderContent = () => {
    if (!currentSection) return null;
    
    switch (currentSection.contentType) {
      case ContentType.VIDEO:
        return (
          <VideoPlayer
            url={currentSection.content.videoUrl}
            onComplete={handleContentComplete}
          />
        );
      case ContentType.AUDIO:
        return (
          <AudioPlayer
            url={currentSection.content.audioUrl}
            transcript={currentSection.content.transcript}
            onComplete={handleContentComplete}
          />
        );
      case ContentType.STORY:
        return (
          <StoryViewer
            content={currentSection.content.storyContent}
            onComplete={handleContentComplete}
          />
        );
      default:
        return <div>Unsupported content type</div>;
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (showPreferenceSelector) {
    return (
      <LearningPreferenceSelector
        onSelect={handlePreferenceSelect}
      />
    );
  }
  
  if (!currentSection) {
    return (
      <div className="text-center p-8">
        <h2 className="text-xl font-bold mb-2">Section not found</h2>
        <p className="text-gray-500 mb-4">The section you're looking for doesn't exist or you don't have access to it.</p>
        <Button onClick={() => navigate(`/courses/${courseId}`)}>
          Return to Course
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Course Progress</span>
          <span className="text-sm text-gray-500">{progress}%</span>
        </div>
        <Progress value={progress} />
      </div>
      
      {/* Section header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">{currentSection.title}</h1>
          <p className="text-gray-500 mt-1">{currentSection.description}</p>
        </div>
        <Badge variant="outline" className="text-sm">
          {currentSection.xpReward} XP
        </Badge>
      </div>
      
      {/* Content tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="quiz" disabled={!sectionCompleted}>Quiz</TabsTrigger>
        </TabsList>
        
        <TabsContent value="content" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Learning Content</CardTitle>
            </CardHeader>
            <CardContent>
              {renderContent()}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="quiz" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Section Quiz</CardTitle>
              <p className="text-sm text-gray-500">
                Complete this quiz to earn XP and continue to the next section
              </p>
            </CardHeader>
            <CardContent>
              {currentSection.quiz && (
                <QuizComponent
                  questions={currentSection.quiz.questions}
                  onComplete={handleQuizComplete}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Completion message */}
      {sectionCompleted && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-green-700 mb-2">Section Completed!</h3>
              <p className="text-green-600 mb-4">
                You earned <span className="font-bold">{xpEarned} XP</span> for completing this section.
              </p>
              <Button onClick={onComplete}>
                Continue to Next Section
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}; 