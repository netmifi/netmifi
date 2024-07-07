import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Verified } from "lucide-react";
import { NavLink } from "react-router-dom";

const PostAvatar = ({ profileImage, profileName, profileURL, description = "", isVerified, onlyAvatar = false }: PostAvatarProps) => {

    const profileNameArray = profileName.split(' ');
    const profileNameFirstLetterOfFirstName = profileNameArray[0].charAt(0);
    const profileNameFirstLetterOfLastName = profileNameArray[1].charAt(0);

    return (
        <div className="flex items-center gap-1">
            <NavLink to={profileURL} className='relative'>
                <Avatar>
                    <AvatarImage src={profileImage} className="object-cover" />
                    <AvatarFallback className="uppercase">{profileNameFirstLetterOfFirstName}{profileNameFirstLetterOfLastName}</AvatarFallback>
                </Avatar>

                {isVerified && <Verified className="absolute -top-1 right-0 text-primary-foreground fill-red" size={20} />}
            </NavLink>
            {!onlyAvatar &&
                <div className="flex flex-col">
                    <NavLink to={profileURL} className="text-red text-sm capitalize">{profileName}</NavLink>
                    <p className="text-xs font-montserrat">{description}</p>
                </div>
            }
        </div>
    )
}

export default PostAvatar