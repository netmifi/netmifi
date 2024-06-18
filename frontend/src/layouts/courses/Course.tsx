import { classroom2, dice, meeting, profile, userLaptop1 } from "@/assets/images";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useRef, useState } from "react";
import { AiOutlineArrowDown } from "react-icons/ai";
import { FaEllipsis, FaLock } from "react-icons/fa6";
import { Navigate, NavLink, useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { FaPlayCircle, FaUnlockAlt } from "react-icons/fa";
import Loader from "@/components/Loader";


const Course = ({ className }: PageProps) => {
    const { state } = useLocation();
    const { course } = state;
    const [isLazyLoading, setIsLazyLoading] = useState<boolean>(true);
    const [courseType, setCourseType] = useState<'paid' | 'free'>(state.courseType || 'paid');


    const mainSection = useRef<HTMLElement>(null)

    const handleHandleExplore = () => {
        mainSection?.current?.scrollIntoView({ behavior: "smooth" })
    }

    const handleLazyLoad = () => {
        setIsLazyLoading(true);
        // collect type and course and handle lazy loading
    }

    return (
        <main className={className}>
            {
                state ?
                    <div className='min-h-screen flex flex-col gap-7 mb-20'>
                        <section className="py-16 padding-x bg-secondary-foreground flex items-center max-sm:flex-col">
                            <div className="flex flex-col gap-3">
                                <h1 className="text-white sm:text-6xl text-4xl capitalize">{course}</h1>
                                <p className=" text-muted-foreground font-montserrat text-lg sm:text-xl">Unleash your inner craftsman, dive into our enriching courses. Because your journey to crafts mastery starts here.</p>

                                <div className="mt-10">
                                    <Button onClick={handleHandleExplore} className="rounded-full py-6 text-lg flex items-center bg-custom-red hover:bg-secondary hover:text-custom-red px-10"> Explore<AiOutlineArrowDown /></Button>
                                </div>
                            </div>

                            <div className=""><img className="md:w-[800px] md:h-[400px]  sm:w-[800px] sm:h-[200px]" src={classroom2} alt="" /></div>
                        </section>

                        <section ref={mainSection} className="flex flex-col gap-7 padding-x mt-20">
                            <div className="flex justify-between">
                                <h3 className="text-2xl font-montserrat font-bold capitalize"> {course}</h3>

                                <Popover>
                                    <PopoverTrigger ><Button className="bg-custom-red hover:bg-custom-red"><FaEllipsis /></Button></PopoverTrigger>
                                    <PopoverContent className="flex flex-col w-[100px] gap-2 *:bg-custom-red *:hover:text-secondary">
                                        <Button disabled={courseType === 'paid'} onClick={() => setCourseType('paid')} className="bg-custom-red hover:text-secondary" >Paid</Button>

                                        <Button disabled={courseType === 'free'} onClick={() => setCourseType('free')} className="bg-custom-red hover:text-secondary">Free</Button>
                                    </PopoverContent>
                                </Popover>
                            </div>


                            <div className="flex flex-wrap gap-5 justify-center items-center">
                                <Card className=" basis-full md:basis-[45%] lg:basis-[30%]">
                                    <CardHeader className="p-0 relative">
                                        <img src={dice} className="h-[200px] w-full object-cover" alt="" />
                                        <CardDescription className="capitalize text-custom-jet text-lg px-2 font-bold font-montserrat">Photo Editing for pro</CardDescription>
                                        <Button className="absolute top-1/3 left-[45%] bg-transparent opacity-50 hover:bg-transparent hover:opacity-80  drop-shadow"><FaPlayCircle fill="currentColor" className="fill-custom-eerie text-5xl" /></Button>

                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex justify-between">

                                            <div className="flex items-center gap-2">
                                                <Avatar>
                                                    <AvatarImage src={profile} />
                                                    <AvatarFallback>IN</AvatarFallback>
                                                </Avatar>

                                                <div className="flex flex-col">
                                                    <NavLink to="/user/collins-mahal" className="text-custom-red text-base">Collins Mahal</NavLink>
                                                    <p className="text-sm font-montserrat">Instructor</p>
                                                </div>
                                            </div>

                                            {
                                                courseType === 'paid' ? <FaLock className="text-custom-red" /> : <FaUnlockAlt className="text-custom-red" />
                                            }


                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className=" basis-full md:basis-[45%] lg:basis-[30%]">
                                    <CardHeader className="p-0 relative">
                                        <img src={meeting} className="h-[200px] w-full object-cover" alt="" />
                                        <CardDescription className="capitalize text-custom-jet text-lg px-2 font-bold font-montserrat">Photo Editing for pro</CardDescription>
                                        <Button className="absolute top-1/3 left-[45%] bg-transparent opacity-50 hover:bg-transparent hover:opacity-80  drop-shadow"><FaPlayCircle fill="currentColor" className="fill-custom-eerie text-5xl" /></Button>

                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex justify-between">

                                            <div className="flex items-center gap-2">
                                                <Avatar>
                                                    <AvatarImage src={profile} />
                                                    <AvatarFallback>IN</AvatarFallback>
                                                </Avatar>

                                                <div className="flex flex-col">
                                                    <NavLink to="/user/collins-mahal" className="text-custom-red text-base">Collins Mahal</NavLink>
                                                    <p className="text-sm font-montserrat">Instructor</p>
                                                </div>
                                            </div>

                                            {
                                                courseType === 'paid' ? <FaLock className="text-custom-red" /> : <FaUnlockAlt className="text-custom-red" />
                                            }


                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className=" basis-full md:basis-[45%] lg:basis-[30%]">
                                    <CardHeader className="p-0 relative">
                                        <img src={userLaptop1} className="h-[200px] w-full object-cover" alt="" />
                                        <CardDescription className="capitalize text-custom-jet text-lg px-2 font-bold font-montserrat">Photo Editing for pro</CardDescription>
                                        <Button className="absolute top-1/3 left-[45%] bg-transparent opacity-50 hover:bg-transparent hover:opacity-80  drop-shadow"><FaPlayCircle fill="currentColor" className="fill-custom-eerie text-5xl" /></Button>

                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex justify-between">

                                            <div className="flex items-center gap-2">
                                                <Avatar>
                                                    <AvatarImage src={profile} />
                                                    <AvatarFallback>IN</AvatarFallback>
                                                </Avatar>

                                                <div className="flex flex-col">
                                                    <NavLink to="/user/collins-mahal" className="text-custom-red text-base">Collins Mahal</NavLink>
                                                    <p className="text-sm font-montserrat">Instructor</p>
                                                </div>
                                            </div>

                                            {
                                                courseType === 'paid' ? <FaLock className="text-custom-red" /> : <FaUnlockAlt className="text-custom-red" />
                                            }


                                        </div>
                                    </CardContent>
                                </Card>
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