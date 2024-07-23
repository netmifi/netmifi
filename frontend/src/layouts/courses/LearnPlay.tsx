import { CoursesSvg } from "@/assets/svg"
import { testVid } from "@/assets/videos"
import VideoPlayer from "@/components/VideoPlayer"

const LearnPlay = () => {
  return (
    <main className="flex w-full bg-red">
      <VideoPlayer thumbnail={CoursesSvg} videoUrl={testVid} hasCollection={true}  className=""/>
    </main>
  )
}

export default LearnPlay