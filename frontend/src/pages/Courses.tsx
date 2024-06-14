import { hold_bulb, meeting, profile, userLaptop2 } from "@/assets/images"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AvatarFallback } from "@radix-ui/react-avatar"
import { useRef, useState } from "react"
import { AiOutlineArrowDown, AiOutlineArrowRight } from "react-icons/ai"
import { FaCircle, FaDotCircle, FaPlayCircle, FaSearch } from "react-icons/fa"
import { FaLock } from "react-icons/fa6"
import { NavLink } from "react-router-dom"

const Courses = ({ className }: PageProps) => {
    const [search, setSearch] = useState<string>('');
    const exploreSectionRef = useRef<HTMLElement>(null);
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
                        <Button className="bg-custom-red text-lg hover:bg-secondary hover:text-custom-red "><NavLink to="#explore" onClick={handleHandleExplore} className='flex items-center'> Explore<AiOutlineArrowDown /></NavLink></Button>
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

                <div className="flex flex-col gap-5 ">
                    <h2 className="text-custom-red sm:text-3xl text-2xl text-center mb-7">Explore Our Diverse Learning Landscape </h2>

                    <div className="flex flex-col gap-2">
                        <h3 className="text-2xl font-montserrat font-bold"> - Top courses</h3>
                        <div className="flex flex-wrap gap-7">
                            <Card className="min-w-full sm:min-w-[350px] max-w-full">
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

                            <Card className="min-w-full sm:min-w-[350px] max-w-full">
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

                            <Card className="min-w-full sm:min-w-[350px] max-w-full">
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

                        </div>

                        <Button className="mx-auto mt-5 bg-custom-red *:flex *:items-center"><NavLink to={''}> <span>View more</span> <AiOutlineArrowRight /></NavLink></Button>
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


            <section>

            </section>
        </main>
    )
}

export default Courses