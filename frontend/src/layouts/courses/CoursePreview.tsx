import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AboutUsSvg } from "@/assets/svg";
import Rating from "react-rating";
import { Check, Dot, Languages, Star, Timer, TimerReset } from "lucide-react";
import { NavLink } from "react-router-dom";
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

const CoursePreview = () => {
  return (
    <main>
      <section className="min-h-fit bg-high-contrast padding-x padding-y flex gap-5 justify-between text-secondary max-md:flex-col max-md:items-center">
        <div className="flex flex-col gap-6 basis-[60%]">
          <h1 className=" text-4xl md:text-5xl">
            Course Title: The Title of the course from response
          </h1>
          <p className="font-montserrat">
            Course Description: Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Dolores vel facilis nihil hic ratione minima
            debitis, adipisci quo magni, ipsa quos voluptatem inventore suscipit
            modi consequatur placeat maxime error eaque!
          </p>

          <div className="flex gap-4">
            <div className="flex gap-1">
              <span>4.6</span>
              <Rating
                start={0}
                stop={5}
                fractions={2}
                initialRating={4.6}
                emptySymbol={<Star />}
                fullSymbol={<Star className="fill-yellow-500" />}
                readonly={true}
              />
            </div>
            (23,000 reviews) 21,014 students
          </div>

          <div className="flex gap-2">
            <span>Created By: </span>
            <NavLink to="" className="text-blue-foreground underline">
              Maximilian Johnson
            </NavLink>
          </div>

          <div className="flex flex-wrap gap-3 *:font-montserrat">
            <div className="flex gap-1 items-center ">
              <Timer /> 3 years ago
            </div>
            <div className="flex gap-1 items-center">
              <TimerReset /> 2 months ago
            </div>
            <div className="flex gap-1 items-center">
              <Languages /> English
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="flex items-center">
              Price: &nbsp; <FaNairaSign size={14} /> 8500
            </p>
            <div className="flex flex-wrap gap-3 *:font-montserrat *:flex *:gap-2 *:text-lg *:rounded-full">
              <Button variant={"primary"}>
                <FaCartPlus /> Add to cart
              </Button>
              <Button>
                <FaMoneyBillTransfer /> Buy now
              </Button>
            </div>
          </div>
        </div>

        <div className="basis-[40%]">
          <img src={AboutUsSvg} className="h-[300px]" alt="" />
        </div>
      </section>

      <section className="padding-x padding-y flex flex-col">
        <div className="flex flex-col gap-5 mx-auto sm:max-w-[80%]">
          <VideoPlayer thumbnail={AboutUsSvg} videoUrl={testVid} />

          <div className="flex flex-col items-start gap-5 border-b pb-8">
            <h3 className="text-high-contrast font-bold font-montserrat text-2xl">
              What You'll Learn
            </h3>

            <ol className="flex gap-6 flex-wrap *:flex *:gap-2 *:items-center">
              <li>
                <Check size={16} /> Lorem ipsum dolor sit amet.
              </li>
              <li>
                <Check size={16} />
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Tempora, maiores!
              </li>
              <li>
                <Check size={16} /> Lorem ipsum dolor sit amet.
              </li>
              <li>
                {" "}
                <Check size={16} /> Lorem ipsum dolor sit amet.
              </li>
              <li>
                {" "}
                <Check size={16} /> Lorem ipsum dolor sit amet.
              </li>
            </ol>
          </div>

          <div className="flex flex-col items-start gap-5 border-b pb-8">
            <h3 className="text-high-contrast font-bold font-montserrat text-2xl">
              Course Content
            </h3>

            <div className="flex flex-col w-full *:w-full *:bg-transparent *:border">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="bg-secondary px-3 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <h4 className="max-sm:text-sm">Getting Started</h4>

                      <p className="text-low-contrast text-xs flex items-center">
                        4 lectures <Dot /> 2:08:03
                      </p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="p-5 flex flex-col gap-3">
                    <div className="flex justify-between">
                      <h6 className="text-[14px]">Welcome to course</h6>
                      <span>0:30:45</span>
                    </div>
                    <div className="flex justify-between">
                      <h6 className="text-[14px]">Welcome to course</h6>
                      <span>0:30:45</span>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="bg-secondary px-3 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <h4 className="max-sm:text-sm">
                        Integrating New Features
                      </h4>

                      <p className="text-low-contrast text-xs flex items-center">
                        4 lectures <Dot /> 2:08:03
                      </p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="p-5 flex flex-col gap-3">
                    <div className="flex justify-between">
                      <h6 className="text-[14px]">Welcome to course</h6>
                      <span>0:30:45</span>
                    </div>
                    <div className="flex justify-between">
                      <h6 className="text-[14px]">Welcome to course</h6>
                      <span>0:30:45</span>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          <div className="flex flex-col items-start gap-5 border-b pb-8">
            <h3 className="text-high-contrast font-bold font-montserrat text-2xl">
              Requirements
            </h3>

            <ul className="list-inside list-disc pl-3">
              <li>A laptop</li>
              <li>Quality service</li>
              <li>
                Basic knowledge of AWS or other web server provider service
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-start gap-5 border-b pb-8">
            <h3 className="text-high-contrast font-bold font-montserrat text-2xl">
              Instructor
            </h3>

            <div className="flex flex-wrap gap-3">
              <Link to={"https://facebook"}>
                <Button variant={"primary"} className="text-lg sm:text-xl">
                  <FaFacebook />
                </Button>
              </Link>
              <Link to={"https://instagram"}>
                <Button variant={"primary"} className="text-lg sm:text-xl">
                  <FaInstagram />
                </Button>
              </Link>
              <Link to={"https://linkedin"}>
                <Button variant={"primary"} className="text-lg sm:text-xl">
                  <FaLinkedinIn />
                </Button>
              </Link>
              <Link to={"https://linkedin"}>
                <Button variant={"primary"} className="text-lg sm:text-xl">
                  <FaLink />
                </Button>
              </Link>
            </div>
            <div className="flex flex-col gap-10">
              <PostAvatar
                isVerified={true}
                profileName="Maxmilian Junior"
                profileURL={AboutUsSvg}
                description="facebook certified content management professional"
              />

              <div className="flex flex-col gap-3">
                <h2 className="font-bold">About Maxmilian Junior</h2>

                <p>
                  Maxmilian Junior is an experienced content producer with 25
                  years of experience. Lorem ipsum dolor sit amet, consectetur
                  adipisicing elit. Molestiae, sint magni eligendi sit eaque
                  quasi delectus possimus. Reprehenderit eius libero distinctio
                  dicta cupiditate possimus, molestias, assumenda voluptatum
                  deserunt odio animi.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-5 border-b pb-8">
            <h3 className="text-high-contrast font-bold font-montserrat text-2xl">
              Reviews
            </h3>

            <div className="flex flex-wrap gap-6 justify-center">
              <ReviewCard
                className="lg:basis-[45%]"
                isVerified={false}
                name="reviewer name"
                profile={profile}
                profileUrl="reviwerurl"
                rating={5}
                review="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus asperiores commodi est modi debitis inventore iste, velit accusantium possimus vitae?"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col padding-x w-full mb-20">
        <CourseCarousel
          data={tempCourses}
          link="courses/4125867912/"
          title="More Courses from Maxmilian"
        />
      </section>
    </main>
  );
};

export default CoursePreview;
