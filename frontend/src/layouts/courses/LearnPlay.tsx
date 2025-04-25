import { testVid, testVid2, testVid3 } from "@/assets/videos";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Video, Headphones, Book, Gamepad2 } from "lucide-react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Course, URLDurationData } from "@/types/index";
import { tempCourses, currentUserEntry, updateCurrentUserXP } from "@/constants/temp";
import { useApp } from "@/app/app-provider";
import { toast } from "sonner";
import { LearningPreference } from "@/types/index";
import ComingSoon from "@/components/ui/ComingSoon";
import ReactPlayer from "react-player";
import VideoPlayer from "@/components/VideoPlayer";

const LearnPlay = () => {
  // All hooks must be called at the top level, unconditionally
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems } = useApp();
  const [currentSection, setCurrentSection] = useState(0);
  const [sectionXp, setSectionXp] = useState(0);
  const [courseData, setCourseData] = useState<Course | null>(null);
  const [learningPreference, setLearningPreference] = useState<LearningPreference | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const courseContents = [
    {
      id: "1",
      title: "section 1: getting started",
      courses: [
        {
          id: "1",
          title: "Introduction",
          videoUrl: testVid,
        },
        {
          id: "2",
          title: "getting started",
          videoUrl: testVid2,
        },
      ],
    },
    {
      id: "2",
      title: "section 2: being better",
      courses: [
        {
          id: "3",
          title: "Introduction",
          videoUrl: testVid3,
        },
      ],
    },
  ];

  const [totalVideos] = useState<string[]>([
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    ...courseContents.flatMap((content) =>
      content.courses.flatMap((course) => course.videoUrl)
    ),
  ]);

  const [currentCourseVideo, setCurrentCourseVideo] = useState<string>(
    totalVideos[0]
  );
  const [currentCourseCollection, setCurrentCourseCollection] = useState(
    courseContents.find((content) =>
      content.courses.find((course) => course.videoUrl === currentCourseVideo)
    )
  );

  const getVideoDuration = (url: string): Promise<number> => {
    return new Promise((resolve) => {
      const video = document.createElement("video");
      video.src = url;
      video.addEventListener("loadedmetadata", () => {
        resolve(video.duration);
      });
    });
  };

  useEffect(() => {
    return setCurrentCourseCollection(
      courseContents.find((content) =>
        content.courses.find((course) => course.videoUrl === currentCourseVideo)
      )
    );
  }, [courseContents, currentCourseVideo]);

  const [urlDuration, setUrlDuration] = useState<URLDurationData[]>([
    { url: "", duration: 0 },
  ]);

  useEffect(() => {
    // Fetch video durations and update state
    const fetchVideoData = async () => {
      const data = await Promise.all(
        totalVideos.map(async (url) => {
          const duration = await getVideoDuration(url);
          return { url, duration };
        })
      );
      setUrlDuration(data);
    };

    fetchVideoData();
  }, [totalVideos]);

  // First useEffect to handle course data loading
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

      setIsLoading(false); // Ensure it's called for all code paths
    };

    loadCourseData();
  }, [location.state, slug, navigate]);

  // Second useEffect to handle access control
  useEffect(() => {
    if (
      courseData?.type === "paid" &&
      (!cartItems || !cartItems.find((item) => item.id === courseData.id))
    ) {
      toast.error("Please purchase the course first");
      navigate(`/courses/${courseData.slug}`);
    }
  }, [courseData, cartItems, navigate]);

  const handleCompleteSection = () => {
    if (!courseData) return;

    const xpGained = 10;
    setSectionXp((prev) => prev + xpGained);
    
    // Update the leaderboard with the new XP
    const updatedUser = updateCurrentUserXP(xpGained);
    toast.success(`You earned ${xpGained} XP! Total XP: ${updatedUser.xp}`);

    if (currentSection < courseData?.sections?.length - 1) {
      setCurrentSection((prev) => prev + 1);
    } else {
      toast.success("Congratulations! You have completed the course!");
      // Add completion bonus XP
      const completionBonus = 50;
      const finalUpdate = updateCurrentUserXP(completionBonus);
      toast.success(`Course completion bonus: ${completionBonus} XP! Total XP: ${finalUpdate.xp}`);
    }
  };

  const renderContent = () => {
    if (!courseData || !learningPreference) return null;

    // Add null check for sections and provide default empty array
    const sections = courseData.sections || [];
    const section = sections[currentSection] || {
      title: "No section available",
      videoUrl: "",
      audioUrl: "",
      content: "",
      quizQuestions: [],
    };

    switch (learningPreference) {
      case "video":
        return (
          <div className="aspect-video bg-black rounded-lg">
            {section.videoUrl ? (
              <VideoPlayer videoUrl={section.videoUrl} className={"w-full h-full"} />
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
              <audio src={section.audioUrl} controls className="w-full" />
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
          </div>
        );
      case "interactive":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{section.title}</h3>
            {section.quizQuestions && section.quizQuestions.length > 0 ? (
              <div className="space-y-4">
                {section.quizQuestions.map((question, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-100 rounded-lg dark:bg-gray-800"
                  >
                    <p className="font-medium mb-2">{question.question}</p>
                    <div className="space-y-2">
                      {question.options.map((option, optIndex) => (
                        <Button
                          key={optIndex}
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => {
                            if (option === question.correctAnswer) {
                              const quizXp = 5;
                              setSectionXp((prev) => prev + quizXp);
                              const updatedUser = updateCurrentUserXP(quizXp);
                              toast.success(`Correct! +${quizXp} XP! Total XP: ${updatedUser.xp}`);
                            }
                          }}
                        >
                          {option}
                        </Button>
                      ))}
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

  if (!courseData || !learningPreference) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            {courseData?.title || "Loading..."}
          </h1>
          <p className="text-gray-600">
            Section {currentSection + 1} of {courseData?.sections?.length || 0}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right flex items-center h-full justify-center gap-1">
            <p className="text-2xl font-bold text-red-600">{sectionXp}</p>
            <span className="text-sm text-gray-500">/ {currentUserEntry.xp} XP</span>
          </div>
          <div className="flex items-center gap-2">
            {learningPreference === "video" && <Video className="w-5 h-5" />}
            {learningPreference === "audio" && <Headphones className="w-5 h-5" />}
            {learningPreference === "storytelling" && <Book className="w-5 h-5" />}
            {learningPreference === "interactive" && <Gamepad2 className="w-5 h-5" />}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">{renderContent()}</div>
        <div className="space-y-4">
          <div className="bg-gray-900 p-4 rounded-md">
            <h3 className="font-medium mb-2">Course Progress</h3>
            <div className="space-y-2">
              {courseData?.sections?.map((section, index) => (
                <div
                  key={index}
                  className={`p-1 text-sm ${
                    index === currentSection
                      ? "text-md text-gray-300 border-red rounded-500"
                      : index < currentSection
                      ? "text-gray-100 border-red-500 rounded border"
                      : "bg-gray-600"
                  }`}
                >
                  {section.title}
                </div>
              )) || (
                <div className="p-2 rounded bg-gray-200">
                  No sections available
                </div>
              )}
            </div>
          </div>
          <Button
            onClick={handleCompleteSection}
            className="w-full"
            disabled={!courseData?.sections?.length}
          >
            {currentSection < (courseData?.sections?.length || 0) - 1
              ? "Next Section"
              : "Complete Course"}
          </Button>
        </div>
      </div>

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
