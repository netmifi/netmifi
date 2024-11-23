import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, getFirstLettersForProfile } from "@/lib/utils";
import { Verified } from "lucide-react";
import { NavLink } from "react-router-dom";

const PostAvatar = ({
  profileImage,
  profileImageClassName,
  profileName,
  profileURL,
  description = "",
  isVerified,
  onlyAvatar = false,
}: PostAvatarProps) => {
  return (
    <div className="flex items-center gap-1">
      <NavLink to={profileURL} className="relative w-fit rounded-full">
        <Avatar className={cn("relative", profileImageClassName)}>
          <AvatarImage src={profileImage} className="object-cover" />
          <AvatarFallback className="uppercase bg-primary text-secondary flex justify-center overflow-visible">
            {getFirstLettersForProfile(profileName)}
          </AvatarFallback>
        </Avatar>

        {isVerified && (
          <Verified
            className="absolute -top-1 -right-0 text-primary-foreground fill-red z-10"
            size={20}
          />
        )}
      </NavLink>
      {!onlyAvatar && (
        <div className="flex flex-col">
          <NavLink to={profileURL} className="text-red text-sm capitalize">
            {profileName}
          </NavLink>
          <p className="text-xs font-montserrat">{description}</p>
        </div>
      )}
    </div>
  );
};

export default PostAvatar;
