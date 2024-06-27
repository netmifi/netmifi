import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaPlayCircle, FaUnlockAlt } from "react-icons/fa";
import { Button } from "./ui/button";
import { NavLink } from "react-router-dom";
import { FaLock } from "react-icons/fa6";

const CourseCard = ({ className = "", id, thumbnail, title, videoURL, instructorName, instructorProfileImage, instructorProfileURL, date, type }: CoursesCardProps) => {
  const instructorNameArray = instructorName.split('');
  const instructorNameFirstLetter = instructorNameArray[0];
  const instructorNameLastLetter = instructorName[instructorName.length - 1];

  const handlePlay = () => {
    console.log(videoURL);
    // Parse video here and play video by directing to the play page
  }
  return (
    <Card key={id} className={className + " min-h-full basis-full md:basis-[45%] lg:basis-[30%] flex flex-col "}>
      <CardHeader className="p-0 relative mb-auto">
        <img src={thumbnail} className="h-[200px] w-full object-scale-down" alt="" />
        <CardTitle className="capitalize text-low-contrast text-lg py-2 px-5 font-bold font-montserrat">{title.length > 45 ? title.slice(0, 45) + '...' : title}</CardTitle>
        <Button variant={"transparent"} className="absolute top-1/3 left-[45%] opacity-45 hover:opacity-80 drop-shadow"><FaPlayCircle fill="currentColor" className="fill-custom-eerie text-5xl" onClick={handlePlay} /></Button>

      </CardHeader>
      <CardContent>
        <div className="flex justify-between mt-auto">

          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={instructorProfileImage} />
              <AvatarFallback className="uppercase">{instructorNameFirstLetter}{instructorNameLastLetter}</AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <NavLink to={instructorProfileURL} className="text-red text-base capitalize">{instructorName}</NavLink>
              <p className="text-sm font-montserrat">{date}</p>
            </div>
          </div>

          {type === 'paid' ? <FaLock className="text-red" /> : <FaUnlockAlt className="text-red" />}
        </div>
      </CardContent>
    </Card>
  )
}

export default CourseCard