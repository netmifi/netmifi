import { dice, hold_bulb, meeting, profile, userLaptop1, userLaptop2 } from "@/assets/images";
import Newsletter from "@/components/Newsletter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { courseSubjects } from "@/constants";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import { AiOutlineArrowDown, AiOutlineArrowRight } from "react-icons/ai";
import { FaCircle, FaPlayCircle, FaSearch, FaUnlockAlt } from "react-icons/fa";
import { FaEllipsis, FaLock } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const Courses = ({ className }: PageProps) => {
    const [search, setSearch] = useState<string>('');
    const exploreSectionRef = useRef<HTMLElement>(null);

    const [currentSubject, setCurrentSubject] = useState<string>('for you');
    const [courseType, setCourseType] = useState<'paid' | 'free'>('paid');

    const handleHandleExplore = () => {
        exploreSectionRef?.current?.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <main className={className}>

            <section className="py-16 padding-x bg-secondary-foreground flex items-center max-sm:flex-col">
                <div className="flex flex-col gap-3">
                    <h1 className="text-white sm:text-6xl text-4xl">Courses</h1>
                    <p className=" text-muted-foreground font-montserrat text-lg sm:text-xl">Unleash your inner craftsman, dive into our enriching courses. Because your journey to crafts mastery starts here.</p>

                    <div className="mt-10">
                        <Button className="bg-custom-red rounded-full  p-5 text-lg hover:bg-secondary hover:text-custom-red "><NavLink to="#explore" onClick={handleHandleExplore} className='flex items-center'> Explore<AiOutlineArrowDown /></NavLink></Button>
                    </div>
                </div>

                <div className=""><img className="md:w-[800px] md:h-[400px]  sm:w-[800px] sm:h-[200px]" src={meeting} alt="" /></div>
            </section>

            <section ref={exploreSectionRef} className="flex flex-col gap-7 padding-x py-24">
                <div className="flex flex-col gap-5">
                    <h2 className="text-xl text-custom-jet font-bold font-montserrat text-center">Pick over 50+ online video course with new addition published every month.</h2>
                    <div className="flex  justify-center items-center">
                        <Input
                            className=" w-2/5 p-6 rounded-e-none focus-visible:outline-none text-lg font-bold"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search favorite course here"
                        />
                        <Button className="p-6  rounded-s-none"><FaSearch /></Button>
                    </div>

                </div>
                <hr />

                <div className="flex flex-col gap-20 w-full">
                    <h2 className="text-custom-red sm:text-3xl text-2xl text-center mb-7">Explore Our Diverse Learning Landscape </h2>

                    <div className="flex flex-col gap-2">
                        <h3 className="text-2xl font-montserrat font-bold"> Top courses</h3>

                        <div className="flex justify-center items-center">
                            <Carousel opts={{ align: 'center' }} className="w-full flex justify-center"
                            >
                                <CarouselContent>
                                    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                                        <Card>
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
                                    </CarouselItem>
                                    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                                        <Card>
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

                                                    <FaLock className="text-custom-red" />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </CarouselItem>
                                    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                                        <Card>
                                            <CardHeader className="p-0 relative">
                                                <img src={hold_bulb} className="h-[200px] w-full object-cover" alt="" />
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

                                                    <FaLock className="text-custom-red" />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </CarouselItem>
                                    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                                        <Card>
                                            <CardHeader className="p-0 relative">
                                                <img src={hold_bulb} className="h-[200px] w-full object-cover" alt="" />
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

                                                    <FaLock className="text-custom-red" />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </CarouselItem>
                                    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                                        <Card>
                                            <CardHeader className="p-0 relative">
                                                <img src={hold_bulb} className="h-[200px] w-full object-cover" alt="" />
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

                                                    <FaLock className="text-custom-red" />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </CarouselItem>
                                </CarouselContent>
                                <CarouselPrevious className=" left-0" />
                                <CarouselNext className="right-0" />

                            </Carousel>
                        </div>

                        <Button className="mx-auto rounded-full  mt-5 bg-custom-red *:flex *:items-center"><NavLink to={'courses/top'}> <span>View more</span> <AiOutlineArrowRight /></NavLink></Button>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h3 className="text-2xl font-montserrat font-bold"> Recent courses</h3>

                        <div className="flex justify-center items-center">
                            <Carousel opts={{ align: 'center' }} className="w-full flex justify-center"
                            >
                                <CarouselContent>
                                    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                                        <Card>
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

                                                    <FaLock className="text-custom-red" />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </CarouselItem>
                                    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                                        <Card>
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

                                                    <FaLock className="text-custom-red" />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </CarouselItem>
                                    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                                        <Card>
                                            <CardHeader className="p-0 relative">
                                                <img src={hold_bulb} className="h-[200px] w-full object-cover" alt="" />
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

                                                    <FaLock className="text-custom-red" />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </CarouselItem>
                                    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                                        <Card>
                                            <CardHeader className="p-0 relative">
                                                <img src={hold_bulb} className="h-[200px] w-full object-cover" alt="" />
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

                                                    <FaLock className="text-custom-red" />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </CarouselItem>
                                    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                                        <Card>
                                            <CardHeader className="p-0 relative">
                                                <img src={hold_bulb} className="h-[200px] w-full object-cover" alt="" />
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

                                                    <FaLock className="text-custom-red" />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </CarouselItem>
                                </CarouselContent>
                                <CarouselPrevious className=" left-0" />
                                <CarouselNext className="right-0" />

                            </Carousel>
                        </div>

                        <Button className="mx-auto mt-5 rounded-full  bg-custom-red *:flex *:items-center"><NavLink to={'courses/top'}> <span>View more</span> <AiOutlineArrowRight /></NavLink></Button>
                    </div>

                    <div className="flex flex-col gap-16 ">
                        <div className="flex justify-between">
                            <h3 className="text-2xl font-montserrat font-bold"> Recommended for you</h3>

                            <Popover>
                                <PopoverTrigger ><Button className="bg-custom-red hover:bg-custom-red"><FaEllipsis /></Button></PopoverTrigger>
                                <PopoverContent className="flex flex-col w-[100px] gap-2 *:bg-custom-red *:hover:text-secondary">
                                    <Button disabled={courseType === 'paid'} onClick={() => setCourseType('paid')} className="bg-custom-red hover:text-secondary" >Paid</Button>

                                    <Button disabled={courseType === 'free'} onClick={() => setCourseType('free')} className="bg-custom-red hover:text-secondary">Free</Button>
                                </PopoverContent>
                            </Popover>
                        </div>

                        <Carousel>
                            <CarouselContent>
                                <CarouselItem className={cn("basis-3/12 sm:basis-[20%] md:basis-[11%] min-w-fit", {})}>
                                    <Button onClick={() => setCurrentSubject('for you')} disabled={currentSubject === 'for you'} className={cn("bg-transparent border-2 border-custom-red text-custom-red font-montserrat hover:bg-custom-red hover:text-secondary w-full rounded-full", { "bg-custom-red text-secondary": currentSubject === 'for you' })}>
                                        For you
                                    </Button>
                                </CarouselItem>

                                {courseSubjects.map((subject) =>
                                    <CarouselItem className=" basis-3/12 sm:basis-[20%] md:basis-[11%] min-w-fit ">
                                        <Button onClick={() => setCurrentSubject(subject)} disabled={currentSubject === subject} className={cn("bg-transparent border-2 border-custom-red text-custom-red font-montserrat hover:bg-custom-red hover:text-secondary capitalize w-full rounded-full", { "bg-custom-red text-secondary": currentSubject === subject })}>{subject}</Button>
                                    </CarouselItem>)}
                            </CarouselContent>
                        </Carousel>

                        <div className="flex flex-wrap gap-5 justify-center items-center">

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


                        <NavLink state={{ course: currentSubject, courseType }} to={`/courses/${currentSubject}`}>
                            <Button className="mx-auto mt-5 bg-custom-red flex items-center"> <span>Load more</span> <AiOutlineArrowRight /></Button>
                        </NavLink>
                    </div>


                </div>
            </section>

            <section className="flex flex-wrap justify-between items-center padding-x py-24 bg-custom-blue">
                <img src={userLaptop2} className=" -scale-x-[1] max-md:w-[300px] max-md:h-[300px]" alt="" />

                <div className="flex flex-col justify-between gap-5">
                    <h2 className="text-secondary sm:text-3xl text-xl">How to Become a Successful <span className=" text-destructive"> Content Creator</span></h2>

                    <ul className="flex flex-col gap-3 text-sm sm:text-lg *:flex *:gap-2 *:items-center text-gray-300">
                        <li><FaCircle className="fill-destructive" /> <span>Discover the latest trends about your content</span></li>
                        <li><FaCircle className="fill-destructive" /> <span>Understand what content creation is all about</span></li>
                        <li><FaCircle className="fill-destructive" /> <span>To go viral, your content has to be QUICK, ENTERTAINING, and INFORMATIVE</span></li>
                    </ul>

                    <Button className="mx-auto px-16">Download PDF</Button>
                </div>
            </section>


            <Newsletter />
        </main>
    )
}

export default Courses