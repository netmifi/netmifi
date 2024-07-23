import { CoursesSvg } from "@/assets/svg";
import { testVid } from "@/assets/videos";
import VideoPlayer from "@/components/VideoPlayer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LearnPlay = () => {
  return (
    <main className="flex flex-col w-full ">
      <VideoPlayer
        thumbnail={CoursesSvg}
        videoUrl={testVid}
        hasCollection={true}
      />
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="account">Overview</TabsTrigger>
          <TabsTrigger value="password">Course content</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </main>
  );
};

export default LearnPlay;
