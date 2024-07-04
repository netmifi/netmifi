import { meeting } from "@/assets/images";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useRef, useState } from "react";
import { FaEllipsis } from "react-icons/fa6";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "@/components/Loader";
import Jumbotron from "@/components/courses/Jumbotron";
import { courseSubjects } from "@/constants";
import CourseCard from "@/components/courses/CourseCard";
import { testVid } from "@/assets/videos";
import { tempCourses } from "@/constants/temp";
import { AiOutlineWarning } from "react-icons/ai";


const Course = ({ className }: PageProps) => {
    const { state } = useLocation();
    const { course } = state;
    const [data, setData] = useState<Course[]>([...tempCourses, ...tempCourses, ...tempCourses]);
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
                                {data.length > 0 ? data.map((datum) => (
                                    <CourseCard
                                        id={datum.id}
                                        title={datum.title}
                                        subject={datum.subject}
                                        thumbnail={datum.thumbnail}
                                        type={datum.type}
                                        videoURL={testVid}
                                        instructorName={datum.instructorName}
                                        instructorProfileImage={datum.instructorProfileImage}
                                        instructorProfileURL={datum.instructorProfileURL}
                                        isVerified={datum.isVerified}
                                        isFollowing={datum.isFollowing}
                                        date={datum.date}
                                    />
                                )) :
                                    <div className="text-lg w-full flex flex-col items-center">
                                        <AiOutlineWarning className="text-6xl" />
                                        <h2 >No Course Found</h2>
                                    </div>
                                }
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