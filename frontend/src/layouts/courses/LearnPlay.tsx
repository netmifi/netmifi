import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Course, LearningPreference } from "@/types/index";
import { tempCourses, updateCurrentUserXP } from "@/constants/temp";
import { useApp } from "@/app/app-provider";
import { toast } from "sonner";
import ContentRenderer from "@/components/courses/ContentRenderer";
import CourseCompletion from "@/components/courses/CourseCompletion";
import CourseProgress from "@/components/courses/CourseProgress";
import CourseHeader from "@/components/courses/CourseHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ComingSoon from "@/components/ComingSoon";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Section {
  id: string;
  title: string;
  videoUrl?: string;
  audioUrl?: string;
  content?: string;
  quizQuestions?: Array<{
    question: string;
    options: string[];
    correctAnswer: string;
  }>;
  videoDuration?: number;
  isVideoCompleted?: boolean;
}

const LearnPlay = () => {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems } = useApp();
  const [currentSection, setCurrentSection] = useState(0);
  const [sectionXp, setSectionXp] = useState(0);
  const [courseData, setCourseData] = useState<Course | null>(null);
  const [learningPreference, setLearningPreference] =
    useState<LearningPreference | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [completedSections, setCompletedSections] = useState<number[]>([]);
  const [showCompletionScreen, setShowCompletionScreen] = useState(false);
  const [totalCourseXp, setTotalCourseXp] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [videoProgress, setVideoProgress] = useState<Record<string, number>>({});

  // const [totalVideos] = useState<string[]>([
  //   "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  //   "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  //   "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  //   "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  //   ...courseContents.flatMap((content) =>
  //     content.courses.flatMap((course) => course.videoUrl)
  //   ),
  // ]);

  // Calculate XP based on section type and engagement
  const calculateSectionXp = () => {
    let baseXp = 10;
    switch (learningPreference) {
      case "video":
        baseXp = 15;
        break;
      case "interactive":
        baseXp = 20;
        break;
      case "audio":
        baseXp = 12;
        break;
      case "storytelling":
        baseXp = 10;
        break;
    }
    return baseXp;
  };

  // Load course data
  useEffect(() => {
    const loadCourseData = () => {
      const stateCourse = location.state?.course as Course;
      const statePreference = location.state
        ?.learningPreference as LearningPreference;

      if (stateCourse && statePreference) {
        setCourseData(stateCourse);
        setLearningPreference(statePreference);
      } else {
        const foundCourse = tempCourses.find((c) => c.slug === slug);
        if (!foundCourse) {
          toast.error("Course not found");
          navigate("/courses");
          return;
        }
        setCourseData(foundCourse);
        setLearningPreference("video");
      }

      setIsLoading(false);
    };

    loadCourseData();
  }, [location.state, slug, navigate]);

  // Handle access control
  useEffect(() => {
    if (
      courseData?.type === "paid" &&
      (!cartItems || !cartItems.find((item) => item.id === courseData.id))
    ) {
      toast.error("Please purchase the course first");
      navigate(`/courses/${courseData.slug}`);
    }
  }, [courseData, cartItems, navigate]);

  const handleNextSection = () => {
    if (!courseData?.sections) return;

    if (completedSections.includes(currentSection)) {
      toast.info("You've already completed this section!");
      return;
    }

    const xpGained = calculateSectionXp();
    setSectionXp((prev) => prev + xpGained);
    setTotalCourseXp((prev) => prev + xpGained);

    const updatedUser = updateCurrentUserXP(xpGained);
    toast.success(`You earned ${xpGained} XP! Total XP: ${updatedUser.xp}`);

    setCompletedSections((prev) => [...prev, currentSection]);

    if (currentSection < courseData.sections.length - 1) {
      setCurrentSection((prev) => prev + 1);
      setSectionXp(0);
    } else {
      setShowCompletionScreen(true);
      const completionBonus = 50;
      const finalUpdate = updateCurrentUserXP(completionBonus);
      setTotalCourseXp((prev) => prev + completionBonus);
      toast.success(
        `Course completion bonus: ${completionBonus} XP! Total XP: ${finalUpdate.xp}`
      );
    }
  };
  
  const handleSectionComplete = () => {
    if (!courseData?.sections) return;

    const currentSectionData = courseData.sections[currentSection];
    
    // Check if video is completed
    if (currentSectionData.videoUrl && !currentSectionData.isVideoCompleted) {
      toast.error("Please complete watching the video before proceeding");
      return;
    }

    // Check if section is already completed
    if (completedSections.includes(currentSection)) {
      toast.info("You've already completed this section!");
      return;
    }

    const xpGained = calculateSectionXp();
    setSectionXp((prev) => prev + xpGained);
    setTotalCourseXp((prev) => prev + xpGained);

    const updatedUser = updateCurrentUserXP(xpGained);
    toast.success(`You earned ${xpGained} XP! Total XP: ${updatedUser.xp}`);

    setCompletedSections((prev) => [...prev, currentSection]);

    if (currentSection < courseData.sections.length - 1) {
      setCurrentSection((prev) => prev + 1);
      setSectionXp(0);
    } else {
      setShowCompletionScreen(true);
      const completionBonus = 50;
      const finalUpdate = updateCurrentUserXP(completionBonus);
      setTotalCourseXp((prev) => prev + completionBonus);
      toast.success(
        `Course completion bonus: ${completionBonus} XP! Total XP: ${finalUpdate.xp}`
      );
    }
  };

  const handleCloseCompletion = () => {
    setShowCompletionScreen(false);
  };

  const handleRestartCourse = () => {
    setShowCompletionScreen(false);
    setCurrentSection(0);
    setCompletedSections([]);
    setSectionXp(0);
    setTotalCourseXp(0);
  };

  const handleSectionClick = (index: number) => {
    if (!courseData?.sections) return;

    // Don't allow navigating to sections beyond the current section unless they're completed
    if (index > currentSection && !completedSections.includes(currentSection)) {
      toast.info("Please complete the current section first!");
      return;
    }

    // Check if video is completed for the current section
    const currentSectionData = courseData.sections[currentSection];
    if (currentSectionData.videoUrl && !currentSectionData.isVideoCompleted) {
      toast.error("Please complete watching the video before moving to another section");
      return;
    }

    setCurrentSection(index);
    setSectionXp(0);
  };

  // const handleVideoProgress = (progress: number, sectionId: string) => {
  //   setVideoProgress(prev => ({
  //     ...prev,
  //     [sectionId]: progress
  //   }));

  //   // Mark video as completed if watched 95% or more
  //   if (progress >= 0.95) {
  //     const updatedSections = courseData?.sections.map(section => {
  //       if (section.id === sectionId) {
  //         return { ...section, isVideoCompleted: true };
  //       }
  //       return section;
  //     });

  //     if (updatedSections && courseData) {
  //       setCourseData({
  //         ...courseData,
  //         sections: updatedSections
  //       });
  //     }
  //   }
  // };

  const handleQuizSubmit = () => {
    if (!courseData?.sections[currentSection].quizQuestions) return;

    // Check if video is completed
    const currentSectionData = courseData.sections[currentSection];
    if (currentSectionData.videoUrl && !currentSectionData.isVideoCompleted) {
      toast.error("Please complete watching the video before taking the quiz");
      return;
    }

    const questions = courseData.sections[currentSection].quizQuestions;
    let correctAnswers = 0;

    questions.forEach((question, index) => {
      if (quizAnswers[`question-${index}`] === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const score = (correctAnswers / questions.length) * 100;
    if (score >= 70) {
      toast.success(`Quiz passed! Score: ${score.toFixed(0)}%`);
      setQuizSubmitted(true);
      handleSectionComplete();
    } else {
      toast.error(
        `Quiz failed. Score: ${score.toFixed(0)}%. Please try again.`
      );
      setQuizAnswers({});
    }
  };

  const handleFeedbackSubmit = () => {
    if (!feedback || !rating) {
      toast.error("Please provide both feedback and rating");
      return;
    }

    // Here you would typically send the feedback to your backend
    toast.success("Thank you for your feedback!");
    handleCloseCompletion();
  };

  const handleVideoComplete = (sectionId: string) => {
    if (!courseData?.sections) return;

    const updatedSections = courseData.sections.map(section => {
      if (section.id === sectionId) {
        return { ...section, isVideoCompleted: true };
      }
      return section;
    });

    if (courseData) {
      setCourseData({
        ...courseData,
        sections: updatedSections
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading course...</h2>
          <p>Please wait while we prepare your learning experience.</p>
        </div>
      </div>
    );
  }

  if (!courseData || !learningPreference || !courseData.sections) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <CourseHeader
        courseTitle={courseData.title}
        currentSection={currentSection}
        totalSections={courseData.sections.length}
        sectionXp={sectionXp}
        totalXp={totalCourseXp}
        learningPreference={learningPreference}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          {showQuiz && courseData.sections[currentSection].quizQuestions ? (
            <Card>
              <CardHeader>
                <CardTitle>Course Quiz</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {courseData.sections[currentSection].quizQuestions.map(
                    (question, index) => (
                      <div key={index} className="space-y-2">
                        <Label className="text-lg">{question.question}</Label>
                        <RadioGroup
                          value={quizAnswers[`question-${index}`]}
                          onValueChange={(value) => {
                            setQuizAnswers((prev) => ({
                              ...prev,
                              [`question-${index}`]: value,
                            }));
                          }}
                        >
                          {question.options.map((option, optIndex) => (
                            <div
                              key={optIndex}
                              className="flex items-center space-x-2"
                            >
                              <RadioGroupItem
                                value={option}
                                id={`option-${index}-${optIndex}`}
                              />
                              <Label htmlFor={`option-${index}-${optIndex}`}>
                                {option}
                              </Label>
                </div>
                          ))}
                        </RadioGroup>
                </div>
                    )
              )}
            <Button
                    onClick={handleQuizSubmit}
                    disabled={
                      Object.keys(quizAnswers).length !==
                      courseData.sections[currentSection].quizQuestions?.length
                    }
                  >
                    Submit Quiz
            </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <ContentRenderer
              key={courseData.sections[currentSection].id}
              section={courseData.sections[currentSection]}
              sections={courseData.sections}
              learningPreference={learningPreference}
              isCompleted={completedSections.includes(currentSection)}
              onVideoComplete={() => handleVideoComplete(courseData.sections[currentSection].id)}
              onComplete={() => {
                if (courseData?.sections[currentSection].quizQuestions) {
                  // Check if video is completed before showing quiz
                  // if (courseData.sections[currentSection].videoUrl && 
                  //     !courseData.sections[currentSection].isVideoCompleted) {
                  //   toast.error("Please complete watching the video before taking the quiz");
                  //   return;
                  // }
                  setShowQuiz(true);
                } else {
                  handleSectionComplete();
                }
              }}
              // onVideoProgress={handleVideoProgress}
            />
          )}
        </div>
        <div className="space-y-4">
          <CourseProgress
            sections={courseData.sections}
            currentSection={currentSection}
            completedSections={completedSections}
            onNextSection={handleNextSection}
            isLastSection={currentSection === courseData.sections.length - 1}
            onSectionClick={handleSectionClick}
          />
        </div>
      </div>

      <CourseCompletion
        courseTitle={courseData.title}
        totalXp={totalCourseXp}
        onBackToCourses={() => navigate("/account/leaderboard")}
        onRestartCourse={handleRestartCourse}
        onSeeLearderBoard={() => navigate("/account/leaderboard")}
        isOpen={showCompletionScreen}
        onClose={handleCloseCompletion}
        onFeedbackSubmit={handleFeedbackSubmit}
        feedback={feedback}
        setFeedback={setFeedback}
        rating={rating}
        setRating={setRating}
      />

      <Tabs defaultValue="overview" className="w-full mt-8">
        <TabsList className="w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="prose max-w-none space-y-4">
            <h2>Course Description</h2>
            <p className="text-sm text-gray-400">{courseData.description}</p>

            <h3>What You'll Learn</h3>
            <ul>
              {courseData.learningObjectives?.map((objective, index) => (
                <li className="text-sm text-gray-400" key={index}>
                  {objective}
                </li>
              ))}
            </ul>

            <h3>Requirements</h3>
            <ul>
              {courseData.requirements?.map((requirement, index) => (
                <li className="text-sm text-gray-400" key={index}>
                  {requirement}
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="announcements">
          <ComingSoon />
        </TabsContent>

        <TabsContent value="comments">
          <ComingSoon />
        </TabsContent>

        <TabsContent value="reviews">
          <ComingSoon />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LearnPlay;
