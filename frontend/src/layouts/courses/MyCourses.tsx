import MyCourseCard from "@/components/courses/my_courses/MyCourseCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tempPurchasedCourses as purchasedCourses } from "@/constants/temp";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Smile, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";

const MyCourses = () => {
  const tabs = ["all", "favorites", "collections"];

  const collections: string[] = [
    "content creation",
    "writing",
    "watched",
    "extra courses",
    "content production",
    "content writing",
    "email courses",
  ];

  const favoriteCourses = purchasedCourses.filter(
    (course) => course.isFavorite
  );

  return (
    <main className="flex flex-col">
      <section className="bg-secondary-foreground padding-x padding-y flex flex-col gap-3">
        <h2 className="text-3xl text-accent underline underline-offset-[12px]">
          My Courses
        </h2>
        <p className="flex text-secondary font-montserrat opacity-80 gap-1">
          All Your purchased courses will appear here. Happy{" "}
          <Smile className="text-yellow-500" /> Learning
        </p>
      </section>

      <section>
        <Tabs defaultValue="all">
          <TabsList className="p-0 h-fit w-full items-start justify-start">
            {tabs.map((tab) => (
              <TabsTrigger
                value={tab}
                className="uppercase text-base rounded-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all">
            <div className="flex flex-wrap gap-5 justify-center">
              {purchasedCourses.length > 0 ? (
                purchasedCourses.map((course) => (
                  <MyCourseCard course={course} type="self-page" />
                ))
              ) : (
                <h3 className="text-lg text-center mt-5 text-accent-foreground opacity-90">
                  No Course has been purchased
                </h3>
              )}
            </div>
          </TabsContent>

          <TabsContent value="favorites">
            <div className="flex flex-wrap gap-5 justify-center">
              {favoriteCourses.length > 0 ? (
                favoriteCourses.map((course) => (
                  <MyCourseCard course={course} type="self-page" />
                ))
              ) : (
                <h3 className="text-lg text-center mt-5 text-accent-foreground opacity-90">
                  No Course has been purchased
                </h3>
              )}
            </div>
          </TabsContent>

          <TabsContent value="collections">
            {collections.length ? (
              collections.map((collection) => (
                <Accordion key={collection} type="single" collapsible>
                  <AccordionItem value={collection}>
                    <AccordionTrigger className="bg-secondary px-3 hover:no-underline">
                      <h4 className="max-sm:text-sm capitalize">
                        {collection}
                      </h4>
                    </AccordionTrigger>
                    <AccordionContent className="p-5 flex gap-3">
                      {purchasedCourses
                        .filter((course) =>
                          course.collection?.some((item) => collection === item)
                        )
                        .map((course) => (
                          <MyCourseCard course={course} type="self-page" />
                        )) || (
                        <h3 className="text-lg text-center text-accent-foreground opacity-90">
                          No course on this collection
                        </h3>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))
            ) : (
              <h3 className="text-lg text-center mt-10 text-accent-foreground opacity-90">
                No collection has been added, please add a course from the all
                tab
              </h3>
            )}
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
};

export default MyCourses;
