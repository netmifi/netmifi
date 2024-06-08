import { AiFillWarning } from 'react-icons/ai'
import { NavLink } from 'react-router-dom'

const NotFound = () => {
    return (
        <main className='max-container  h-screen flex flex-col gap-2 justify-center items-center'>
            <AiFillWarning className='fill-custom-red text-9xl' />
            <h2 className='text-3xl'>Page not found, <NavLink to="/" className="text-custom-blue underline underline-offset-4 ">Back to Home</NavLink></h2>
        </main>
    )
}

export default NotFound