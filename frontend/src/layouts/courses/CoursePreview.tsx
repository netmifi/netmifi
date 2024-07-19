import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AboutUsSvg } from "@/assets/svg";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Check, Dot, Languages, Timer, TimerReset } from "lucide-react";
import { NavLink } from "react-router-dom";
import VideoPlayer from "@/components/VideoPlayer";

const CoursePreview = ({ className }: PageProps) => {
  return (
    <main className={className}>
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
                value={4}
                halfFillMode="svg"
                className="w-20 h-5 py-0"
                readOnly
              />
            </div>
            (23,000 reviews) 21,014 students
          </div>

          <div className="flex gap-2">
            <span>Created By: </span>{" "}
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
        </div>

        <div className="basis-[40%]">
          <img src={AboutUsSvg} className="h-[300px]" alt="" />
        </div>
      </section>

      <section className="padding-x padding-y flex flex-col">
        <div className="flex flex-col gap-5 mx-auto sm:max-w-[80%]">
          <VideoPlayer />

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
                      <h4>Getting Started</h4>

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
                      <h4>Integrating New Features</h4>

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

            <ul></ul>
          </div>

          <div className="flex flex-col items-start gap-5 border-b pb-8">
            <h3 className="text-high-contrast font-bold font-montserrat text-2xl">
              Instructor
            </h3>
          </div>

          <div className="flex flex-col items-start gap-5 border-b pb-8">
            <h3 className="text-high-contrast font-bold font-montserrat text-2xl">
              Reviews
            </h3>
          </div>

          <div className="flex flex-col items-start gap-5 border-b pb-8">
            <h3 className="text-high-contrast font-bold font-montserrat text-2xl">
              More Courses my Maxmilian
            </h3>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CoursePreview;
