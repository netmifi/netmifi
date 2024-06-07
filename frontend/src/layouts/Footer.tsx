import { NavLink } from "react-router-dom";
import { AiFillFacebook, AiOutlineInstagram } from 'react-icons/ai'
import { useStoreState } from "easy-peasy";
import { cn } from "@/lib/utils";

const Footer = () => {
    const year = new Date().getFullYear().toString();

    const isAuth = useStoreState((state) => state.isAuth);
    return (
        <footer className={cn("flex flex-col", { "md:ml-20": isAuth })}>
            <div className="padding-x py-6 grid md:grid-cols-3 grid-cols-2 max-md:gap-3 justify-between *:flex *:flex-col *:gap-4 *:m-auto">
                <div className="about">
                    <h3 className="text-2xl capitalize text">about netmifi</h3>
                    <div className="links">
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
                </div>
                <div className="features">
                    <h3>featured courses</h3>
                    <div className="links">
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
                <div className="contact">
                    <h3>contact</h3>
                    <div className="suffix">
                        <p>support@netmifi.com</p>
                        <p>+234-8160-1746-68</p>

                        <div className="handles">
                            <NavLink to={'https://facebook.com/netmifi'}><AiFillFacebook /></NavLink>
                            <NavLink to={'https://instagram.com/netmifi'}><AiOutlineInstagram /></NavLink>
                            <NavLink to={'https://x.com/netmifi'}><AiOutlineInstagram /></NavLink>
                            <NavLink to={'https://tiktok.com/netmifi'}><AiOutlineInstagram /></NavLink>
                            <NavLink to={'https://youtube.com/netmifi'}><AiOutlineInstagram /></NavLink>
                        </div>
                    </div>
                </div>
            </div>

            <div className="right">
                Copyright &copy; {year}, Netmifi Edutech Ltd. All rights reserved
            </div>
        </footer>
    )
}

export default Footer