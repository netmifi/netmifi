import { AboutUsSvg } from "@/assets/svg";
import CourseCard from "@/components/courses/CourseCard";
import CourseCarousel from "@/components/courses/CourseCarousel";
import PostAvatar from "@/components/PostAvatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { tempCourses as courses } from "@/constants/temp";
import { cn, convertToReadableNumber } from "@/lib/utils";
import { ChevronUp } from "lucide-react";
import { useState } from "react";

const Instructor = () => {
  const aboutInstructor =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi nesciunt doloribus recusandae repellat doloremque voluptate dolores, molestiae reiciendis magni labore quaerat libero error alias qui quia laboriosam non debitis tempore deserunt dolore provident. Asperiores quis veritatis, autem, omnis mollitia tenetur reiciendis nisi quidem, obcaecati perferendis consequatur ipsum ut fugit iure temporibus libero maiores soluta eligendi ducimus eveniet. Blanditiis non sapiente dolor nam maxime voluptas facere dolore tenetur molestias rem eius enim saepe sint officiis quo, unde magnam, aut aliquid, laboriosam velit quibusdam in. Asperiores, temporibus! Reprehenderit excepturi velit sapiente aut libero architecto quia minima nostrum sunt. Minus quos aperiam consequuntur numquam quae reiciendis dolorem nemo ipsa itaque at natus distinctio veniam delectus maxime exercitationem, hic repellat odio ex sapiente voluptas temporibus. Libero autem dolore in?";
  const [isShorten, setIsShorten] = useState<boolean>(
    aboutInstructor.length > 299
  );
  const [isFollowing, setIsFollowing] = useState(false);
  return (
    <main>
      <section className="relative flex flex-col">
        <div className="w-full relative h-[40dvh] flex justify-center overflow-hidden">
          <div className="bg-transparent-black absolute inset-0"></div>
          <img src={AboutUsSvg} className="object-cover w-full h-full" alt="" />
        </div>

        <Card className="w-full md:w-[70vw] md:mx-auto">
          <CardContent>
            <CardHeader className="relative flex items-center">
              <PostAvatar
                onlyAvatar={true}
                isVerified={false}
                profileName="instructor name"
                profileURL="instructor url"
                // profileImage={CoursesSvg}
                profileImageClassName="size-36 text-3xl -mt-[100px] drop-shadow-xl p-1"
              />
            </CardHeader>

            <CardFooter className="flex flex-col gap-10">
              <div className="flex flex-col items-center ">
                <h1 className="text-xl md:text-4xl">Instructor Name</h1>
                <p className="opacity-90 capitalize sm:text-lg">
                  certified content producer
                </p>
                <p className="opacity-80 sm:text-sm">instructorurl@gmail.com</p>
              </div>

              <div className="flex justify-center gap-4 flex-wrap">
                <div className="flex flex-col items-center">
                  <h3 className="font-semibold">
                    {convertToReadableNumber(300)}
                  </h3>
                  <p className="font-montserrat text-base uppercase">courses</p>
                </div>
                <div className="flex flex-col items-center">
                  <h3 className="font-semibold">
                    {convertToReadableNumber(32020)}
                  </h3>
                  <p className="font-montserrat text-base uppercase">
                    students
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <h3 className="font-semibold">
                    {convertToReadableNumber(18127)}
                  </h3>
                  <p className="font-montserrat text-base uppercase">
                    certificates
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <h3 className="font-semibold">
                    {convertToReadableNumber(22304)}
                  </h3>
                  <p className="font-montserrat text-base uppercase">
                    followers
                  </p>
                </div>
              </div>

              <Button
                onClick={() => setIsFollowing(!isFollowing)}
                className="rounded-full text-lg px-8"
              >
                {isFollowing ? "Following" : "Follow"}
              </Button>

              <div className="flex flex-col gap-4 ">
                <h3 className="text-lg sm:text-xl font-semibold">
                  About Instructor Name
                </h3>

                <div className="flex flex-col items-start">
                  <p>
                    {aboutInstructor.slice(
                      0,
                      isShorten ? 300 : aboutInstructor.length
                    )}
                    {isShorten && "..."}
                  </p>
                  {aboutInstructor.length > 299 && (
                    <Button
                      variant={"transparent"}
                      className="p-0 text-blue"
                      onClick={() => setIsShorten(!isShorten)}
                    >
                      {isShorten ? "Show more" : "Show Less"}
                      <ChevronUp
                        className={cn("", { "rotate-180": isShorten })}
                      />
                    </Button>
                  )}
                </div>
              </div>
            </CardFooter>
          </CardContent>
        </Card>
      </section>

      <section className="padding-x padding-y flex flex-col gap-20">
        {courses.length > 0 ? (
          <>
            <CourseCarousel data={courses} title="top courses" />
            <CourseCarousel data={courses} title="recent courses" />
            <CourseCarousel data={courses} title="top rated courses" />

            <div className="flex flex-col gap-5">
              <h2 className="text-lg md:text-xl font-semibold">
                All courses from instructor name
              </h2>

              {/* lazy load courses */}

              <div className="flex flex-wrap gap-5">
                {courses.map((course) => (
                  <CourseCard course={course} />
                ))}
              </div>
            </div>
          </>
        ) : (
          <h2 className="text-center opacity-70"> No course data found </h2>
        )}
      </section>
    </main>
  );
};

export default Instructor;
