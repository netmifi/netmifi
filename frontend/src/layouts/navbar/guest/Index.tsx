import BrandIcon from '@/components/navbar/BrandIcon';
import SearchBox from '@/components/navbar/SearchBox';
import { Button } from '@/components/ui/button';
import { navLinks } from '@/constants';
import { cn } from '@/lib/utils';
import { useStoreActions, useStoreState } from '@/store/store';
import { FaTimes, } from 'react-icons/fa';
import { FaBars } from 'react-icons/fa6';
import { NavLink } from 'react-router-dom';
const GuestNavbar = () => {
    const navState = useStoreState(state => state.nav.navState);
    const setNavState = useStoreActions((action) => action.nav.set);

    return (
        <div className='bg-background flex justify-between relative items-center padding-x py-3 shadow-sm max-sm:gap-1'>
            <BrandIcon />
            <div className={cn("h-full max-md:w-full max-md:fixed max-md:top-0 max-md:left-0 max-md:transition-all z-10", { 'max-md:hidden': !navState })}>
                <div className="md:hidden absolute bg-custom-transparent-black w-full h-full left-0 top-0 px-1 -z-10" onClick={() => setNavState(false)}></div>
                <div className="h-full max-md:w-[250px] max-md:flex max-md:flex-col max-md:gap-5 max-md:bg-background max-md:p-3">
                    <Button className='md:hidden bg-transparent text-low-contrast border ml-auto hover:text-secondary' onClick={() => setNavState(false)}><FaTimes /></Button>

                    <ul className=' flex gap-4 items-center text-lg  max-md:flex-col  
                    max-md:py-4
                    max-md:gap-5
                '>

                        {navLinks.map((link) => {
                            return (
                                !link.onlyUser
                                &&
                                <li key={link.label} className="*:flex *:items-center *:hover:text-red">
                                    <NavLink to={link.href} className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "text-red underline underline-offset-8 md:underline-offset-[25px]  decoration-4" : ""
                                    }>
                                        <span className="block md:hidden lg:block">{link.label}</span>
                                        <span className="hidden md:block lg:hidden text-2xl mr-2">{<link.icon />}</span>
                                    </NavLink>
                                </li>
                            )
                        }
                        )}

                    </ul>
                    <Button className="bg-red md:hidden mx-auto"><NavLink to="auth/signin">Signin</NavLink></Button>
                </div>
            </div>

            <div className="flex gap-1">
                <SearchBox type="guest" />
                <Button className="bg-red"><NavLink to="auth/signin">Signin</NavLink></Button>
            </div>

            <Button onClick={() => setNavState(true)} className='md:hidden bg-transparent text-low-contrast text-lg rounded-full hover:bg-primary-foreground'>
                <FaBars />
            </Button>
        </div >
    )
}

export default GuestNavbar