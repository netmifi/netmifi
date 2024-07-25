import ReactPlayer from "react-player";
import { convertToReadableTime } from "@/lib/utils";
import { useRef, useState } from "react";
type ReactPlayerProps = React.ComponentProps<typeof ReactPlayer>;

const useGetVideoDuration = (videoUrl: string) => {
  // const player = new ReactPlayer({ url: videoUrl });

  // // Simulate waiting for video to load (replace with actual event listener)
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  // if (player.getDuration()) {
  //   return player.getDuration();
  // } else {
  //   // Handle cases where duration is unavailable (e.g., errors)
  //   console.error("Error fetching video duration:", videoUrl);
  //   return null;
  // }

  // const videoRef = useRef<ReactPlayerProps>(null);
  const [rawDuration, setRawDuration] = useState(0);
  const [readableDuration, setReadableDuration] = useState("00:00");

  const handleDuration = (duration: number) => {
    setRawDuration(duration);
    setReadableDuration(convertToReadableTime(duration));
  };

  // const handleLoadedMetadata = () => {
  //   if (videoRef.current) {
  //     setDuration(videoRef.current.getDuration());
  //   }
  // };

  // // const reactPlayerNode =
  <ReactPlayer
    url={videoUrl}
    onDuration={(duration) => handleDuration(duration)}
  />;
  // console.log(videoRef.current?.getDuration());
  return { rawDuration, readableDuration };
  // (
  //     <div>
  //         {duration}
  //     <ReactPlayer
  //       height={0}
  //       ref={videoRef}
  //       url={videoUrl}
  //       // onLoadedMetadata={handleLoadedMetadata}
  //       onDuration={(duration) => setDuration(duration)}
  //     />
  //     {duration && (
  //       <p className="bg-red p-6">Video Duration: {duration} seconds</p>
  //     )}
  //   </div>
  // );
};

export default useGetVideoDuration;
