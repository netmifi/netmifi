import { logo } from '@/assets/svg';
import BrandIcon from '@/components/navbar/BrandIcon';
import NavToggler from '@/components/navbar/NavToggler';
import SearchBox from '@/components/navbar/SearchBox';
import { Button } from '@/components/ui/button';
import { navLinks } from '@/constants';
import useWindowSize from '@/hooks/useWindowSize';
import store from '@/store/store';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { FaAlignRight } from 'react-icons/fa6';
import { NavLink } from 'react-router-dom';
const GuestNavbar = () => {
    const { width } = useWindowSize();
    const navState = store.getState().nav.navState;
    // const navState = useStoreState((state) => state.navState);
    const setNavState = store.getActions().nav.setNavState();

    return (
        <div className='flex justify-between relative items-center padding-x py-3 shadow-sm max-sm:gap-1'>
            <BrandIcon />

            <ul className='h-full flex gap-4 items-center max-md:flex-col max-md:gap-0 text-lg'>
                {navLinks.map((link) => (
                    !link.onlyUser
                    &&
                    <li key={link.label} className="">
                        <NavLink to={link.href} className={` flex items-center hover:text-custom-red ${({ isActive, isPending, isTransitioning }: NavbarNavLinks) =>
                            [
                                isPending ? "pending" : "",
                                isActive ? "active" : "",
                                isTransitioning ? "transitioning" : "",
                            ].join(" ")}`
                        }>
                            <span className="hidden lg:block">{link.label}</span>
                            <span className="lg:hidden">{<link.icon />}</span>
                        </NavLink>
                    </li>

                ))}
            </ul>

            <div className="flex gap-1">
                <SearchBox type="guest" />
                <Button className="bg-custom-red"><NavLink to="auth/signin">Signin</NavLink></Button>
            </div>

            <Button onClick={() => setNavState(true)} className='md:hidden bg-transparent text-custom-jet text-lg rounded-full hover:bg-primary-foreground'>
                <FaAlignRight />
            </Button>
            {/* <NavToggler /> */}
        </div>
    )
}

export default GuestNavbar