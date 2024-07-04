import { NavLink } from "react-router-dom";
import { AiFillFacebook, AiOutlineInstagram } from 'react-icons/ai'
import { FaEnvelope, FaTiktok, FaXTwitter, FaYoutube } from 'react-icons/fa6'
import { ChevronRight } from "lucide-react";
import { FaMobileAlt } from "react-icons/fa";

const Footer = ({ className }: PageProps) => {
    const year = new Date().getFullYear().toString();
    return (
        <footer className={className}>
            <div className="padding-x padding-y bg-low-contrast 
            flex flex-wrap sm:justify-evenly justify-between gap-4 
            *:flex *:flex-col *:gap-4">
                <div>
                    <h3 className="text-2xl capitalize text-destructive">about netmifi</h3>
                    <div className="text-secondary flex flex-col">
                        <NavLink to={''} className="flex gap-1 items-center"><ChevronRight /> About</NavLink>
                        <NavLink to={''} className="flex gap-1 items-center"><ChevronRight /> Courses</NavLink>
                        <NavLink to={''} className="flex gap-1 items-center"><ChevronRight /> Instructors</NavLink>
                        <NavLink to={''} className="flex gap-1 items-center"><ChevronRight /> Mentors</NavLink>
                        <NavLink to={''} className="flex gap-1 items-center"><ChevronRight /> Ebook</NavLink>
                        <NavLink to={''} className="flex gap-1 items-center"><ChevronRight /> Blogs</NavLink>
                        <NavLink to={''} className="flex gap-1 items-center"><ChevronRight /> Pricing</NavLink>
                        <NavLink to={''} className="flex gap-1 items-center"><ChevronRight /> Become an affiliate</NavLink>
                        <NavLink to={''} className="flex gap-1 items-center"><ChevronRight /> Become an instructor</NavLink>
                        <NavLink to={''} className="flex gap-1 items-center"><ChevronRight /> Privacy and Policy</NavLink>
                        <NavLink to={''} className="flex gap-1 items-center"><ChevronRight /> Terms of use</NavLink>
                        <NavLink to={''} className="flex gap-1 items-center"><ChevronRight /> Help</NavLink>
                    </div>
                </div >

                <div>
                    <h3 className="text-2xl capitalize text-destructive">featured courses</h3>
                    <div className="text-secondary flex flex-col">
                        <NavLink to={''} className="flex gap-1 items-center"><ChevronRight /> Content Production</NavLink>
                        <NavLink to={''} className="flex gap-1 items-center"><ChevronRight /> Digital Marketing</NavLink>
                        <NavLink to={''} className="flex gap-1 items-center"><ChevronRight /> Technical Writing</NavLink>
                        <NavLink to={''} className="flex gap-1 items-center"><ChevronRight /> Copy Writing</NavLink>
                        <NavLink to={''} className="flex gap-1 items-center"><ChevronRight /> Email copy-writing</NavLink>
                        <NavLink to={''} className="flex gap-1 items-center"><ChevronRight /> Video Editing</NavLink>
                        <NavLink to={''} className="flex gap-1 items-center"><ChevronRight /> Photo Editing</NavLink>
                        <NavLink to={''} className="flex gap-1 items-center"><ChevronRight /> 2d Animation</NavLink>
                        <NavLink to={''} className="flex gap-1 items-center"><ChevronRight /> 3d Animation</NavLink>
                        <NavLink to={''} className="flex gap-1 items-center"><ChevronRight /> Graphic Design</NavLink>
                        <NavLink to={''} className="flex gap-1 items-center"><ChevronRight /> Photography</NavLink>
                    </div>
                </div>
                <div>
                    <h3 className="text-2xl capitalize text-destructive">contact</h3>
                    <div className="flex flex-col text-secondary gap-2 ">
                        <p className="flex gap-1 items-center"><FaEnvelope /> support@netmifi.com</p>
                        <p className="flex gap-1 items-center"><FaMobileAlt />+234-8160-1746-68</p>

                        <div className="handles flex gap-2 items-center justify-center text-xl mt-3">
                            <NavLink to={'https://facebook.com/netmifi'} className="hover:text-destructive" ><AiFillFacebook /></NavLink>
                            <NavLink to={'https://instagram.com/netmifi'} className="hover:text-destructive" ><AiOutlineInstagram /></NavLink>
                            <NavLink to={'https://x.com/netmifi'} className="hover:text-destructive" ><FaXTwitter /></NavLink>
                            <NavLink to={'https://tiktok.com/netmifi'} className="hover:text-destructive" ><FaTiktok /></NavLink>
                            <NavLink to={'https://youtube.com/netmifi'} className="hover:text-destructive" ><FaYoutube /></NavLink>
                        </div>
                    </div>
                </div>
            </div >

            <div className="bg-high-contrast text-gray-300 py-3 text-center">
                Copyright &copy; {year}, Netmifi Edutech Ltd. All rights reserved
            </div>
        </footer >
    )
}

export default Footer