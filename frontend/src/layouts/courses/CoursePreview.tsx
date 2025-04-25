import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AboutUsSvg } from "@/assets/svg";
import Rating from "react-rating";
import {
  Check,
  Dot,
  Languages,
  Share2,
  Star,
  Timer,
  TimerReset,
} from "lucide-react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import VideoPlayer from "@/components/VideoPlayer";
import { testVid } from "@/assets/videos";
import PostAvatar from "@/components/PostAvatar";
import { profile } from "@/assets/images";
import { Button } from "@/components/ui/button";
import {
  FaCartPlus,
  FaMoneyBillTransfer,
  FaNairaSign,
  FaLink,
  FaLinkedinIn,
} from "react-icons/fa6";
import ReviewCard from "@/components/ReviewCard";
import CourseCarousel from "@/components/courses/CourseCarousel";
import { tempCourses } from "@/constants/temp";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import ShareComponent from "@/components/ShareComponent";
import mutationErrorHandler from "@/api/handlers/mutationErrorHandler";
import { toast } from "sonner";
import { useAddToCart } from "@/api/hooks/cart/useAddToCart";
import { Course, LearningPreference } from "@/types";
import { useApp } from "@/app/app-provider";
import { useState } from 'react';
import LearningPreferenceSelector from '@/components/courses/LearningPreferenceSelector';

const CoursePreview = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { cartItems } = useApp();
  const mutation = useAddToCart();
  const [showPreferenceSelector, setShowPreferenceSelector] = useState(false);

  // Find the course from tempCourses
  const course = tempCourses.find(c => c.slug === slug);

  if (!course) {
    return <div>Course not found</div>;
  }

  const handleAddToCart = async (course: Course) => {
    try {
      if (cartItems && cartItems.find((item) => item.id === course.id))
        return toast.error(`${course.title} already in cart`);

      await mutation.mutateAsync(course);
      toast.success(`${course.title} has been added to your cart`);
    } catch (error) {
      mutationErrorHandler(error);
    }
  };  

  const handleStartLearning = () => {
    if (course.type === 'free') {
      setShowPreferenceSelector(true);
    } else {
      // For paid courses, they need to be in cart or purchased
      if (cartItems && cartItems.find((item) => item.id === course.id)) {
        setShowPreferenceSelector(true);
      } else {
        toast.error('Please add the course to cart first');
      }
    }
  };

  const handlePreferenceSelect = (preference: LearningPreference) => {
    setShowPreferenceSelector(false);
    navigate(`/courses/learn/${course.slug}`, { 
      state: { 
        course,
        learningPreference: preference 
      }
    });
  };

  return (
    <main>
      <section className="min-h-fit bg-high-contrast padding-x padding-y flex gap-5 justify-between text-secondary max-md:flex-col max-md:items-center">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl md:text-5xl">
            {course.title}
          </h1>
          <p className="font-montserrat">
            {course.description || "No description available"}
          </p>

          <div className="flex gap-4">
            <div className="flex gap-1">
              <span>{course.rating}</span>
              <Rating
                start={0}
                stop={5}
                fractions={2}
                initialRating={course.rating}
                emptySymbol={<Star />}
                fullSymbol={<Star className="fill-yellow-500" />}
                readonly={true}
              />
            </div>
            ({course.reviews} reviews)
          </div>

          <div className="flex gap-2">
            <span>Created By: </span>
            <NavLink to={course.instructorProfileURL} className="text-blue-foreground underline">
              {course.instructorName}
            </NavLink>
          </div>

          <div className="flex flex-wrap gap-3 *:font-montserrat">
            <div className="flex gap-1 items-center ">
              <Timer /> {course.date}
            </div>
            <div className="flex gap-1 items-center">
              <Languages /> English
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {course.type !== 'free' && (
            <p className="flex items-center">
                Price: &nbsp; <FaNairaSign size={14} /> {course.price}
                {course.oldPrice && (
                  <span className="line-through ml-2 text-low-contrast">
                    <FaNairaSign size={14} /> {course.oldPrice}
                  </span>
                )}
              </p>
            )}
            <div className="flex flex-wrap gap-3 *:font-montserrat *:flex *:gap-2 *:text-lg *:rounded-full">
              <ShareComponent
                child={
                  <Button variant={"outline"} className="text-primary-foreground">
                    <Share2 /> Share
                  </Button>
                }
                url={`https://www.netmifi.com/courses/course/${course.slug}`}
                title={course.title}
                text={course.description || ""}
              />
              {course.type !== 'free' && (
                <Button variant={"primary"} onClick={() => handleAddToCart(course)}>
                <FaCartPlus /> Add to cart
              </Button>
              )}
              <Button onClick={handleStartLearning}>
                {course.type === 'free' ? 'Start Learning' : 'Buy now'}
              </Button>
            </div>
          </div>
        </div>

        <div className="basis-[40%]">
          <img src={course.thumbnail} className="h-[300px]" alt="" />
        </div>
      </section>

      <section className="padding-x padding-y">
        <div className="flex flex-col gap-5 mx-auto sm:max-w-[80%]">
          <VideoPlayer thumbnail={course.thumbnail} currentCourseVideo={course.videoURL} videoUrl={course.videoURL} />

          <div className="flex flex-col items-start gap-5 border-b pb-8">
            <h3 className="text-high-contrast font-bold font-montserrat text-2xl">
              What You'll Learn
            </h3>

            <ol className="flex gap-6 flex-wrap *:flex *:gap-2 *:items-center">
              {course.learningObjectives?.map((objective, index) => (
                <li key={index}>
                  <Check size={16} /> {objective}
              </li>
              )) || (
                <>
              <li>
                    <Check size={16} /> Course objectives will be available after processing
              </li>
                </>
              )}
            </ol>
          </div>

          <div className="flex flex-col items-start gap-5 border-b pb-8">
            <h3 className="text-high-contrast font-bold font-montserrat text-2xl">
              Course Content
            </h3>

            <div className="flex flex-col w-full *:w-full *:bg-transparent *:border">
              <Accordion type="single" collapsible>
                {course.sections?.map((section, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="bg-secondary px-3 hover:no-underline">
                    <div className="flex items-center gap-3">
                        <h4 className="max-sm:text-sm">{section.title}</h4>
                      <p className="text-low-contrast text-xs flex items-center">
                          {section.lectures} lectures <Dot /> {section.duration}
                      </p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="p-5 flex flex-col gap-3">
                      {section.lectures?.map((lecture, idx) => (
                        <div key={idx} className="flex justify-between">
                          <h6 className="text-[14px]">{lecture.title}</h6>
                          <span>{lecture.duration}</span>
                    </div>
                      ))}
                  </AccordionContent>
                </AccordionItem>
                )) || (
                <AccordionItem value="item-1">
                  <AccordionTrigger className="bg-secondary px-3 hover:no-underline">
                    <div className="flex items-center gap-3">
                        <h4 className="max-sm:text-sm">Course content will be available after processing</h4>
                    </div>
                  </AccordionTrigger>
                </AccordionItem>
                )}
              </Accordion>
            </div>
          </div>

          <div className="flex flex-col items-start gap-5 border-b pb-8">
            <h3 className="text-high-contrast font-bold font-montserrat text-2xl">
              Requirements
            </h3>

            <ul className="list-inside list-disc pl-3">
              {course.requirements?.map((requirement, index) => (
                <li key={index}>{requirement}</li>
              )) || (
                <li>No specific requirements</li>
              )}
            </ul>
          </div>

          <div className="flex flex-col items-start gap-5 border-b pb-8">
            <h3 className="text-high-contrast font-bold font-montserrat text-2xl">
              Instructor
            </h3>

            <div className="flex flex-wrap gap-3">
              <Link to={course.instructorProfileURL}>
                <Button variant={"primary"} className="text-lg sm:text-xl">
                  <FaFacebook />
                </Button>
              </Link>
              <Link to={course.instructorProfileURL}>
                <Button variant={"primary"} className="text-lg sm:text-xl">
                  <FaInstagram />
                </Button>
              </Link>
              <Link to={course.instructorProfileURL}>
                <Button variant={"primary"} className="text-lg sm:text-xl">
                  <FaLinkedinIn />
                </Button>
              </Link>
              <Link to={course.instructorProfileURL}>
                <Button variant={"primary"} className="text-lg sm:text-xl">
                  <FaLink />
                </Button>
              </Link>
            </div>

            <div className="flex flex-col gap-5">
              <PostAvatar
                isVerified={course.isVerified}
                profileName={course.instructorName}
                profileURL={course.instructorProfileImage}
                description="Course Instructor"
              />

              <div className="flex flex-col gap-3">
                <h2 className="font-bold">About {course.instructorName}</h2>
                <p>
                  {course.instructorBio || "No instructor bio available"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-5 border-b pb-8">
            <h3 className="text-high-contrast font-bold font-montserrat text-2xl">
              Reviews
            </h3>

            <div className="flex flex-wrap gap-6 justify-center">
              {course.reviews > 0 ? (
              <ReviewCard
                className="lg:basis-[45%]"
                isVerified={false}
                name="reviewer name"
                profile={profile}
                  profileUrl="reviewerurl"
                  rating={course.rating}
                  review="Course review will be available after completion"
                />
              ) : (
                <p>No reviews yet</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col padding-x w-full mb-20">
        <CourseCarousel
          data={tempCourses.filter(c => c.id !== course.id).slice(0, 5)}
          link="courses/"
          title="More Courses You Might Like"
        />
      </section>

      {showPreferenceSelector && (
        <LearningPreferenceSelector
          onSelect={handlePreferenceSelect}
          onCancel={() => setShowPreferenceSelector(false)}
        />
      )}
    </main>
  );
};

export default CoursePreview;
