import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FaPlayCircle, FaUnlockAlt } from "react-icons/fa";
import { Button } from "../ui/button";
import { FaLock } from "react-icons/fa6";
import PostAvatar from "../PostAvatar";

const CourseCard = ({ className = "", id, thumbnail, title, videoURL, instructorName, instructorProfileImage, instructorProfileURL, date, type, isVerified, isFollowing }: CoursesCardProps) => {

  const handlePlay = () => {
    console.log(videoURL);
    // Parse video here and play video by directing to the play page
  }
  return (
    <Card key={id} className={className + " min-h-full basis-full sm:basis-[45%] sm:max-w-[45%] lg:basis-[30%] lg:max-w-[30%] flex flex-col "}>
      <CardHeader className="p-0 relative mb-auto">
        <div className="overflow-hidden">
          <img src={thumbnail} className="h-[250px] w-full object-cover hover:scale-125 transition-transform" alt="" />
        </div>
        <CardTitle className="capitalize text-low-contrast text-lg py-2 px-5 font-bold font-montserrat">{title.length > 45 ? title.slice(0, 45) + '...' : title}</CardTitle>
        <Button variant={"transparent"} className="absolute top-1/3 right-[40%] opacity-50 hover:opacity-80 drop-shadow"><FaPlayCircle fill="currentColor" className="fill-custom-eerie text-5xl" onClick={handlePlay} /></Button>

      </CardHeader>
      <CardContent>
        <CardFooter className="flex justify-between mt-auto">

          <div className="flex items-center gap-2">
            <PostAvatar
              profileName={instructorName}
              profileImage={instructorProfileImage}
              profileURL={instructorProfileURL}
              description={date}
              isVerified={isVerified}
            />
          </div>

          {type === 'paid' ? <FaLock className="text-red" /> : <FaUnlockAlt className="text-red" />}
        </CardFooter>
      </CardContent>
    </Card>
  )
}

export default CourseCard