import { cn } from '@/lib/utils'
import { useStoreState } from '@/store/store';
import { AiFillWarning } from 'react-icons/ai'
import { NavLink } from 'react-router-dom'

const NotFound = () => {
    const isAuth = useStoreState((state) => state.auth.isAuth);

    return (
        <main className={cn("max-container h-screen flex flex-col gap-2 justify-center items-center", { "md:ml-20": isAuth })}>
            <AiFillWarning className='fill-custom-red text-9xl' />
            <h2 className='text-2xl text-center md:text-3xl'>Page not found, <NavLink to="/" className="text-custom-blue underline underline-offset-4 ">Back to Home</NavLink></h2>
        </main>
    )
}

export default NotFound