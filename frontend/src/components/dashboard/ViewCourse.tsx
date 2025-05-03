/* eslint-disable @typescript-eslint/no-explicit-any */
import { StarIcon, X } from "lucide-react";
import {
  AlertDialogCancel,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import VideoPlayer from "../VideoPlayer";
import Rating from "react-rating";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
const ViewCourse = ({
  datum,
  setIsViewOpen,
}: {
  datum: any;
  setIsViewOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="">
      <AlertDialogHeader className="flex sticky -top-6 bg-background w-full z-30">
        <div className="flex justify-between">
          <AlertDialogTitle className="text-xl p-0">
            View Course
          </AlertDialogTitle>
          <AlertDialogCancel
            className="border-0 p-0 outline-none ring-0"
            onClick={() => (setIsViewOpen ? setIsViewOpen(false) : "")}
          >
            <X />
          </AlertDialogCancel>
        </div>
      </AlertDialogHeader>

      <div className="flex flex-col gap-2">
        <fieldset>
          <label className="text-xs sm:text-sm">Course Title</label>
          <p className="font-bold text-base sm:text-lg capitalize">
            {datum?.title}
          </p>
        </fieldset>
        {datum?.oldPrice && (
          <fieldset>
            <label className="text-xs sm:text-sm">Former Price</label>
            <p className="font-bold text-base sm:text-lg capitalize line-through">
              #{datum?.oldPrice.toLocaleString()}
            </p>
          </fieldset>
        )}
        <fieldset>
          <label className="text-xs sm:text-sm">Price Tag</label>
          <p className="font-bold text-base sm:text-lg capitalize">
            #{datum?.price.toLocaleString()}
          </p>
        </fieldset>
        <fieldset>
          <label className="text-xs sm:text-sm">Number of purchases</label>
          <p className="font-bold text-base sm:text-lg capitalize">
            {datum?.students}
          </p>
        </fieldset>
        <fieldset>
          <label className="text-xs sm:text-sm">Last Update</label>
          <p className="font-bold text-base sm:text-lg capitalize">
            {datum?.updatedAt.toDateString()}
          </p>
        </fieldset>
        <fieldset>
          <label className="text-xs sm:text-sm">Date</label>
          <p className="font-bold text-base sm:text-lg capitalize">
            {datum?.createdAt.toDateString()}
          </p>
        </fieldset>
      </div>

      <div className="flex flex-col gap-5 mt-10">
        <h1 className="text-red text-base sm:text-xl bg-background">
          Course Information
        </h1>

        <div className="flex flex-col gap-2">
          <fieldset>
            <label className="text-xs sm:text-sm font-bold">
              Course Description
            </label>
            <p className="text-sm">{datum?.description}</p>
          </fieldset>
          <fieldset>
            <label className="text-xs sm:text-sm font-bold">
              Course Thumbnail
            </label>
            <img
              src={datum?.thumbnail}
              alt="course thumbnail"
              className="w-full h-[10em]"
            />
          </fieldset>
          <fieldset>
            <label className="text-xs sm:text-sm font-bold">
              Introduction Video
            </label>
            <VideoPlayer
              thumbnail={datum?.thumbnail}
              videoUrl={datum?.introductionVideo}
            />
          </fieldset>

          <fieldset>
            <label className="text-xs sm:text-sm font-bold">Requirements</label>
            {/* {console.log(datum.requirements.map((requirement, index)=> requirement+in))} */}
            {datum?.requirements.length > 0 ? (
              datum?.requirements.map((requirement: string, index: number) => (
                <p key={index} className="text-base capitalize">
                  {requirement}
                </p>
              ))
            ) : (
              <p className="text-base">None</p>
            )}
          </fieldset>

          <fieldset className="flex flex-col gap-2">
            <label className="text-xs sm:text-sm font-bold">Rating</label>

            <div className="w-full flex justify-between">
              <Rating
                start={0}
                stop={5}
                fractions={2}
                initialRating={datum?.rating || 0}
                emptySymbol={<StarIcon className="size-4  text-primary" />}
                fullSymbol={
                  <StarIcon className="size-4 fill-red text-primary" />
                }
                readonly={true}
              />

              <span className="text-sm font-bold">{datum?.rating}</span>
            </div>
          </fieldset>

          {datum?.sections.length > 0 && (
            <fieldset className="flex flex-col gap-5">
              <p className="text-red">Sections {">"}</p>

              <div className="flex flex-col gap-2">
                {datum?.sections.map(
                  (
                    section: {
                      title: string;
                      description: string;
                      video: string;
                    },
                    index: number
                  ) => (
                    <div key={index} className="flex flex-col">
                      <Accordion type="single" collapsible>
                        <AccordionItem value={section.title}>
                          <AccordionTrigger className="capitalize text-xs">
                            {section.title}
                          </AccordionTrigger>
                          <AccordionContent className="flex flex-col gap-2">
                            <VideoPlayer
                              thumbnail={datum?.thumbnail}
                              videoUrl={datum?.video}
                            />

                            <div className="flex flex-col">
                              <b className="text-sm">Description</b>
                              <p className="text-xs">{section.description}</p>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  )
                )}
              </div>
            </fieldset>
          )}
        </div>
      </div>
      {/* TODO: add other course contents below */}
    </div>
  );
};

export default ViewCourse;
