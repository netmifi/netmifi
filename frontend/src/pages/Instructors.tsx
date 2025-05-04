import { IllustrationsSvg, InstructorsSvg } from "@/assets/svg";
import InstructorCarousel from "@/components/instructors/IntrsuctorCarousel";
import Jumbotron from "@/components/Jumbotron";
import { Button } from "@/components/ui/button";

import { tempInstructors as instructors } from "@/constants/temp";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const Instructors = () => {
  const rootCourses = ["/instructors/", "/instructors"];
  const { pathname } = useLocation();

  return (
    <>
      {rootCourses.some((route) => pathname === route) ? (
        <main>
          <Jumbotron
            className="bg-sidebar"
            image={InstructorsSvg}
            title={"Instructors"}
            body="Meet your experienced and elite instructors; always willing to tutor and mentor you through your chosen course path."
       bodyClassName={'opacity-70'}
          />
          <section className="padding-x padding-y flex flex-col gap-16">
            <InstructorCarousel
              data={instructors}
              title="popular instructors"
            />
            <InstructorCarousel
              data={instructors}
              title="top star instructors"
            />
            <InstructorCarousel data={instructors} title="top instructors" />
            <InstructorCarousel data={instructors} title="our newest" />
          </section>
          <Jumbotron
            className="bg-accent-foreground/80"
            image={IllustrationsSvg}
            title="join our community"
            titleClassName="text-secondary"
            bodyClassName="text-secondary/60"
            body="Join our growing community of INSTRUCTORS. Sell your course contents and provide mentorship to the future generations."
            button={
              <Button variant={"primary"} asChild>
                <NavLink to="/auth/instructor-application">
                  Become a Part
                </NavLink>
              </Button>
            }
          />
          <section className="padding-x padding-y flex flex-col gap-16">
            <InstructorCarousel data={instructors} title="suggested for you" />
          </section>
        </main>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default Instructors;
