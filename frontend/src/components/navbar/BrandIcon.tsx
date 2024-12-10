// import { logo, logoText } from "../../assets/svg"
import { logo, logoText } from "@/assets/logo";
import useWindowSize from "@/hooks/useWindowSize";

function BrandIcon({ type = 'guest', className = "" }: { type?: 'guest' | 'user', className?: string, }) {

    const { width } = useWindowSize();

    return (
        <a href="" className={"flex items-center " + className}>
            <img className="w-14 h-10 sm:w-36 sm:h-full" src={type == 'user' && (width && width < 640 ? logo : '') || logoText} alt="netmifi" />
        </a>
    )
}

export default BrandIcon;