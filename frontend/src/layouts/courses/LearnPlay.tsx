import { profile } from "@/assets/images";
import { AboutUsSvg, CoursesSvg } from "@/assets/svg";
import { testVid, testVid2, testVid3 } from "@/assets/videos";
import PostAvatar from "@/components/PostAvatar";
import VideoPlayer from "@/components/VideoPlayer";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dot,
  Languages,
  MegaphoneOffIcon,
  MessageCircleOff,
  PenBoxIcon,
  Share2Icon,
  ShareIcon,
  TimerReset,
  Tv,
} from "lucide-react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaLink, FaLinkedinIn, FaTv } from "react-icons/fa6";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { convertToReadableTime } from "@/lib/utils";
import { CircleProgress } from "@/components/ui/progress";
import RateDialog from "@/components/RateDialog";
import CommentBox from "@/components/comment/CommentBox";
import Comment from "@/components/comment/Comment";
import ReviewCard from "@/components/ReviewCard";

const LearnPlay = () => {
  const announcements = [
    {
      id: "189-189880e-tb5e7",
      announcement: "I made a change on this course on section 2: being better",
      date: "5 minutes ago",
    },
    {
      id: "2129-189880e-tb5e7",
      announcement:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos sequi fugiat ipsa mollitia? Repellendus aspernatur, modi eveniet est ipsa quos?",
      date: "2 months ago",
    },
  ];

  const comments = [
    {
      id: "13245-tu672-91890-u1h721gew7",
      comment: "This is a very nice course",
      isLiked: true,
      commenter: {
        id: "178gbd3-4094nyu-teb53b3",
        username: "marvis travail",
        profile: profile,
        isVerified: true,
      },
      likes: 7,
      date: "7 hours ago",
      replies: {
        count: 4,
        replies: [
          {
            id: "158793-ifujuds-6784-euyvw",
            reply: "Thanks, hope you enjoyed it",
            commentId: "13415-gt83rghwriuoes-574289",
            isLiked: true,
            likes: 400,
            date: "8 minutes ago",
            replier: {
              id: "31267fdgvx-71tsyewew-7239b1",
              username: "Rick Tochukwu",
              profile: AboutUsSvg,
              isVerified: true,
            },
            replyTo: {
              id: "13245-tu672-91890-u1h721gew7",
              username: "marvis travail",
              profile: profile,
            },
          },
        ],
      },
    },
  ];

  const reviews = [
    {
      id: "1671-901919-010",
      name: "eric bishchoff",
      profileUrl: "/users/user/eric-bischoff",
      profile: profile,
      review: "This course was actually nice.",
      isVerified: false,
      rating: 4.5,
    },
    {
      id: "1461-901919-010",
      name: "kenneth okonkwo",
      profileUrl: "/users/user/kenneth-okonkwo",
      review:
        "The course was bad, no updates for a long while and the accent is not really conceivable.",
      isVerified: true,
      rating: 4.5,
    },
  ];

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
        // {
        //   id: "4",
        //   title: "getting started",
        //   videoUrl: testVid2,
        // },
      ],
    },
  ];

  const [totalVideos, setTotalVideos] = useState<string[]>(
    courseContents.flatMap((content) =>
      content.courses.flatMap((course) => course.videoUrl)
    )
  );

  const [currentCourseVideo, setCurrentCourseVideo] = useState<string>(
    totalVideos[0]
  );

  const [currentCourseCollection, setCurrentCourseCollection] = useState(
    courseContents.find((content) =>
      content.courses.find((course) => course.videoUrl === currentCourseVideo)
    )
  );

  useEffect(() => {
    return setCurrentCourseCollection(
      courseContents.find((content) =>
        content.courses.find((course) => course.videoUrl === currentCourseVideo)
      )
    );
  }, [courseContents, currentCourseVideo]);

  const getVideoDuration = (videoUrl: string) => {
    let rawDuration = 0;
    let readableDuration = "00:00";
    <ReactPlayer
      url={videoUrl}
      stopOnUnmount={false}
      onDuration={(duration) => handleDuration(duration)}
    />;

    const handleDuration = (duration: number) => {
      console.log(duration);
      rawDuration = duration;
      readableDuration = convertToReadableTime(duration);
    };
    return { rawDuration, readableDuration };
  };

  return (
    <main className="flex flex-col w-full ">
      <div className="w-full bg-primary padding-x py-3 flex flex-wrap justify-between gap-5">
        <div className="flex gap-2 items-center">
          <CircleProgress value={90} />

          <h2 className="text-primary-foreground font-montserrat capitalize text-sm md:text-lg">
            Course title the course title of this course will be here.
          </h2>
        </div>
        <div className="flex gap-3">
          <Button>
            <Share2Icon />
          </Button>

          <RateDialog
            child={
              <Button variant={"outline"} className="text-primary-foreground">
                Rate this Course
              </Button>
            }
          />
        </div>
      </div>

      <VideoPlayer
        thumbnail={CoursesSvg}
        currentCourseVideo={currentCourseVideo}
        setCurrentCourseVideo={setCurrentCourseVideo}
        videoCollection={totalVideos}
      />

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full items-start justify-start">
          <ScrollArea className="pb-2">
            <ScrollBar orientation="horizontal" />

            <div className="flex w-full">
              <TabsTrigger
                className="data-[state=active]:bg-high-contrast data-[state=active]:text-high-contrast-foreground"
                value="overview"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:bg-high-contrast data-[state=active]:text-high-contrast-foreground"
                value="course-content"
              >
                Course content
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:bg-high-contrast data-[state=active]:text-high-contrast-foreground"
                value="announcements"
              >
                Announcements
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:bg-high-contrast data-[state=active]:text-high-contrast-foreground"
                value="comments"
              >
                Comments
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:bg-high-contrast data-[state=active]:text-high-contrast-foreground"
                value="reviews"
              >
                Reviews
              </TabsTrigger>
            </div>
          </ScrollArea>
        </TabsList>

        <div className="px-4">
          <TabsContent value="overview">
            <div className="flex flex-col  gap-5">
              <div className="flex flex-col *:capitalize">
                <h2 className="text-xl sm:text-2xl text-high-contrast">
                  {currentCourseCollection?.title}
                </h2>
                <p>
                  {
                    currentCourseCollection?.courses.find(
                      (course) => course.videoUrl === currentCourseVideo
                    )?.title
                  }
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-10">
                <div className="flex flex-col items-center  *:font-montserrat">
                  <h4 className="font-semibold">2 hours</h4>
                  <hr className="w-full" />
                  <span className="text-sm text-red">Total</span>
                </div>
                <div className="flex flex-col items-center *:font-montserrat">
                  <h4 className="font-semibold">20,234</h4>
                  <hr className="w-full" />
                  <span className="text-sm text-red">Students</span>
                </div>
                <div className="flex flex-col items-center *:font-montserrat">
                  <h4 className="font-semibold">4.6</h4>
                  <hr className="w-full" />
                  <span className="text-sm text-red">Rating</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-10">
                <div className="flex items-center gap-1">
                  <TimerReset className="bg-low-contrast text-low-contrast-foreground p-1" />{" "}
                  Update 3 months ago
                </div>
                <div className="flex items-center gap-1">
                  <Languages className="bg-low-contrast text-low-contrast-foreground p-1" />{" "}
                  English
                </div>
              </div>
              <hr />

              <div className="flex flex-col gap-5">
                <h2 className="text-2xl text-high-contrast">Description</h2>

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Accusamus, saepe? Quam necessitatibus rem laboriosam saepe
                  aut, mollitia ex iste sed quos molestias, illum doloremque.
                  Velit facere nulla animi aperiam, dicta beatae consequatur
                  laudantium nam magni enim a unde id. Ea veniam atque animi
                  natus temporibus aliquid corporis nisi, optio saepe.
                </p>
              </div>

              <hr />

              <div className="flex flex-col gap-5">
                <h2 className="text-2xl text-high-contrast">Instructor</h2>

                <div className="flex flex-col gap-5">
                  <PostAvatar
                    isVerified={true}
                    profileName="Maxmilian Junior"
                    profileURL={profile}
                    description="facebook certified content management professional"
                  />

                  <div className="flex flex-col gap-3">
                    <div className="flex flex-wrap gap-3">
                      <Link to={"https://facebook"}>
                        <Button
                          variant={"primary"}
                          className="text-lg sm:text-xl"
                        >
                          <FaFacebook />
                        </Button>
                      </Link>
                      <Link to={"https://instagram"}>
                        <Button
                          variant={"primary"}
                          className="text-lg sm:text-xl"
                        >
                          <FaInstagram />
                        </Button>
                      </Link>
                      <Link to={"https://linkedin"}>
                        <Button
                          variant={"primary"}
                          className="text-lg sm:text-xl"
                        >
                          <FaLinkedinIn />
                        </Button>
                      </Link>
                      <Link to={"https://linkedin"}>
                        <Button
                          variant={"primary"}
                          className="text-lg sm:text-xl"
                        >
                          <FaLink />
                        </Button>
                      </Link>
                    </div>
                    <h2 className="font-bold">About Maxmilian Junior</h2>
                    <p>
                      Maxmilian Junior is an experienced content producer with
                      25 years of experience. Lorem ipsum dolor sit amet,
                      consectetur adipisicing elit. Molestiae, sint magni
                      eligendi sit eaque quasi delectus possimus. Reprehenderit
                      eius libero distinctio dicta cupiditate possimus,
                      molestias, assumenda voluptatum deserunt odio animi.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="course-content">
            <div className="flex flex-col items-start gap-5 border-b pb-8">
              <h3 className="text-high-contrast font-bold font-montserrat text-2xl">
                Course Content
              </h3>

              <div className="flex flex-col w-full *:w-full *:bg-transparent *:border">
                {courseContents.map((content) => (
                  <Accordion key={content.id} type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="bg-secondary px-3 hover:no-underline">
                        <div className="flex items-center gap-3">
                          <h4 className="max-sm:text-sm capitalize">
                            {content.title}
                          </h4>

                          <p className="text-low-contrast text-xs flex items-center">
                            4 lectures <Dot /> 2:08:03
                          </p>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="p-5 flex flex-col gap-3">
                        {content.courses.map((course) => (
                          <Button
                            variant={
                              currentCourseVideo === course.videoUrl
                                ? "secondary"
                                : "transparent"
                            }
                            className="flex justify-between"
                            key={course.id}
                            onClick={() =>
                              setCurrentCourseVideo(course.videoUrl)
                            }
                          >
                            <div className="flex gap-2 items-center">
                              <FaTv />
                              <h6 className="text-[14px] capitalize">
                                {course.title}
                              </h6>
                            </div>
                            <span>00:00</span>
                          </Button>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="announcements">
            {announcements.length > 0 ? (
              <div className="flex flex-col gap-4">
                {announcements.map((announcement) => (
                  <div key={announcement.id} className="flex flex-col">
                    <p className="text-xs text-primary opacity-70">
                      {announcement.date}
                    </p>

                    <p className="text-primary text-base">
                      {announcement.announcement}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-low-contrast text-lg items-center opacity-80 flex gap-3">
                <MegaphoneOffIcon className="fill-primary" /> No announcement
                from this instructor
              </p>
            )}
          </TabsContent>

          <TabsContent value="comments">
            <div className="flex flex-col gap-4">
              <CommentBox page="course" postId="" state="comment" />

              {comments.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {comments.map((comment) => (
                    <Comment comment={comment} page="course" postId="" />
                  ))}
                </div>
              ) : (
                <p className="text-low-contrast text-lg items-center opacity-80 flex gap-3">
                  <MessageCircleOff className="fill-primary" /> No comments yet,
                  be the first to comment
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="flex flex-col gap-4">
              {reviews.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {reviews.map((review) => (
                    // <Comment comment={comment} page="course" postId="" />
                    <ReviewCard
                      isVerified={review.isVerified}
                      name={review.name}
                      profile={review?.profile}
                      profileUrl={review.profileUrl}
                      rating={review.rating}
                      review={review.review}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-low-contrast text-lg items-center opacity-80 flex gap-3">
                  <PenBoxIcon className="fill-primary" /> No reviews yet
                </p>
              )}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </main>
  );
};

export default LearnPlay;
