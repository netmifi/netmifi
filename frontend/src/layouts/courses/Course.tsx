import { meeting, profile, students1 } from "@/assets/images";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useRef, useState } from "react";
import { FaEllipsis } from "react-icons/fa6";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "@/components/Loader";
import Jumbotron from "@/components/courses/Jumbotron";
import { courseSubjects } from "@/constants";
import CourseCard from "@/components/CourseCard";
import { testVid } from "@/assets/videos";


const Course = ({ className }: PageProps) => {
    const { state } = useLocation();
    const { course } = state;
    const [isLazyLoading, setIsLazyLoading] = useState<boolean>(false);
    const [courseType, setCourseType] = useState<'paid' | 'free'>(state.courseType || 'paid');

    const courseThumbnail = courseSubjects.find((subject) => { return subject.label === course })?.thumbnail || meeting;

    const mainSection = useRef<HTMLElement>(null);

    const handleLazyLoad = () => {
        setIsLazyLoading(true);
        // collect type and course and handle lazy loading
    }

    return (
        <main className={className}>
            {
                state ?
                    <div className='min-h-screen flex flex-col gap-7 mb-20'>
                        <Jumbotron title={course} thumbnail={courseThumbnail} exploreSectionRef={mainSection} />

                        <section ref={mainSection} className="flex flex-col gap-7 padding-x mt-20">
                            <div className="flex justify-between">
                                <h3 className="text-2xl font-montserrat font-bold capitalize"> {course}</h3>

                                <Popover>
                                    <PopoverTrigger ><Button className="bg-red hover:bg-red"><FaEllipsis /></Button></PopoverTrigger>
                                    <PopoverContent className="flex flex-col w-[100px] gap-2 *:bg-red *:hover:text-secondary">
                                        <Button disabled={courseType === 'paid'} onClick={() => setCourseType('paid')} className="bg-red hover:text-secondary" >Paid</Button>

                                        <Button disabled={courseType === 'free'} onClick={() => setCourseType('free')} className="bg-red hover:text-secondary">Free</Button>
                                    </PopoverContent>
                                </Popover>
                            </div>


                            <div className="flex flex-wrap gap-5 justify-center items-center">
                            <CourseCard id="12079127097287087" title="photoshop pro" thumbnail={students1} type={courseType} videoURL={testVid} instructorName="roman reigns" instructorProfileImage={'https://github.com/api/users/45'} instructorProfileURL={profile} date="2 years ago" />
                            <CourseCard id="12079127097287087" title="photoshop pro" thumbnail={students1} type={courseType} videoURL={testVid} instructorName="roman reigns" instructorProfileImage={'https://github.com/api/users/45'} instructorProfileURL={profile} date="2 years ago" />
                            <CourseCard id="12079127097287087" title="photoshop pro" thumbnail={students1} type={courseType} videoURL={testVid} instructorName="roman reigns" instructorProfileImage={'https://github.com/api/users/45'} instructorProfileURL={profile} date="2 years ago" />
                            <CourseCard id="12079127097287087" title="photoshop pro" thumbnail={students1} type={courseType} videoURL={testVid} instructorName="roman reigns" instructorProfileImage={'https://github.com/api/users/45'} instructorProfileURL={profile} date="2 years ago" />
                            <CourseCard id="12079127097287087" title="photoshop pro" thumbnail={students1} type={courseType} videoURL={testVid} instructorName="roman reigns" instructorProfileImage={'https://github.com/api/users/45'} instructorProfileURL={profile} date="2 years ago" />

                            </div>

                            <Button disabled={isLazyLoading} onClick={handleLazyLoad} className="mx-auto px-10 rounded-full">
                                {isLazyLoading ? <Loader type="all" size={20} /> : 'Load more'}
                            </Button>
                        </section>
                    </div>
                    : <Navigate to={'/404'} />
            }
        </main>
    )
}

export default Course;