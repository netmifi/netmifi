import { NavLink } from "react-router-dom";
import { AiFillFacebook, AiOutlineInstagram } from 'react-icons/ai'
import { FaTiktok, FaXTwitter, FaYoutube } from 'react-icons/fa6'
import { cn } from "@/lib/utils";
import { useStoreState } from "@/store/store";

const Footer = () => {
    const year = new Date().getFullYear().toString();

    const isAuth = useStoreState((state) => state.auth.isAuth);
    // grid md:grid-cols-3 grid-cols-2 max-md:gap-3 justify-between 
    return (
        <footer className={cn("flex flex-col", { "md:ml-20": isAuth })}>
            <div className="padding-x padding-y bg-custom-jet 
            flex flex-wrap sm:justify-evenly justify-between gap-4 
            *:flex *:flex-col *:gap-4">
                <div>
                    <h3 className="text-2xl capitalize text-destructive">about netmifi</h3>
                    <div className="text-secondary flex flex-col">
                        <NavLink to={''}>About</NavLink>
                        <NavLink to={''}>Courses</NavLink>
                        <NavLink to={''}>Instructors</NavLink>
                        <NavLink to={''}>Mentors</NavLink>
                        <NavLink to={''}>Ebook</NavLink>
                        <NavLink to={''}>Blogs</NavLink>
                        <NavLink to={''}>Pricing</NavLink>
                        <NavLink to={''}>Become an affiliate</NavLink>
                        <NavLink to={''}>Become an instructor</NavLink>
                        <NavLink to={''}>Privacy and Policy</NavLink>
                        <NavLink to={''}>Terms of use</NavLink>
                        <NavLink to={''}>Help</NavLink>
                    </div>
                </div >

                <div>
                    <h3 className="text-2xl capitalize text-destructive">featured courses</h3>
                    <div className="text-secondary flex flex-col">
                        <NavLink to={''}>Content Production</NavLink>
                        <NavLink to={''}>Digital Marketing</NavLink>
                        <NavLink to={''}>Technical Writing</NavLink>
                        <NavLink to={''}>Copy Writing</NavLink>
                        <NavLink to={''}>Email copy-writing</NavLink>
                        <NavLink to={''}>Video Editing</NavLink>
                        <NavLink to={''}>Photo Editing</NavLink>
                        <NavLink to={''}>2d Animation</NavLink>
                        <NavLink to={''}>3d Animation</NavLink>
                        <NavLink to={''}>Graphic Design</NavLink>
                        <NavLink to={''}>Photography</NavLink>
                    </div>
                </div>
                <div>
                    <h3 className="text-2xl capitalize text-destructive">contact</h3>
                    <div className="flex flex-col text-secondary gap-2">
                        <p>support@netmifi.com</p>
                        <p>+234-8160-1746-68</p>

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

            <div className=" bg-custom-eerie text-gray-300 py-3 text-center">
                Copyright &copy; {year}, Netmifi Edutech Ltd. All rights reserved
            </div>
        </footer >
    )
}

export default Footer