import { NavLink } from "react-router-dom"
import { Button } from "../ui/button"
import { AiOutlineArrowDown } from "react-icons/ai"

const Jumbotron = ({title, thumbnail, exploreSectionRef}) => {
    
    const handleHandleExplore = () => {
        exploreSectionRef?.current?.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <section className="h-screen py-16 padding-x bg-secondary-foreground flex items-center max-sm:flex-col">
            <div className="flex flex-col gap-3">
                <h1 className="text-white sm:text-6xl text-4xl">{title}</h1>
                <p className=" text-muted-foreground font-montserrat text-lg sm:text-xl">Unleash your inner craftsman, dive into our enriching courses. Because your journey to crafts mastery starts here.</p>

                <div className="mt-10">
                    <Button className="rounded-full hover:bg-secondary hover:text-red"><NavLink to="#explore" onClick={handleHandleExplore} className='flex items-center'> Explore<AiOutlineArrowDown /></NavLink></Button>
                </div>
            </div>

            <div className=""><img className="md:w-[800px] md:h-[400px]  sm:w-[800px] sm:h-[200px]" src={thumbnail} alt="" /></div>
        </section>

    )
}

export default Jumbotron