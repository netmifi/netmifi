// import { logo, logoText } from "../../assets/svg"
import { logo, logoText } from "@/assets/svg";
import useWindowSize from "@/hooks/useWindowSize";

function BrandIcon({ type = '', className = "" }: { type?: string, className?: string, }) {

    const { width } = useWindowSize();

    return (
        <a href="" className={"flex items-center " + className}>
            <img className="md:w-36 h-full mr-4 sm:w-28 max-sm:w-24" src={type == 'user' && (width && width < 640 ? logo : '') || logoText} alt="netmifi" />
        </a>
    )
}

export default BrandIcon;