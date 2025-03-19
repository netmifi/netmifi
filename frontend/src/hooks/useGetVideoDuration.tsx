// hooks for getting video duration
import ReactPlayer from "react-player";
import { convertToReadableTime } from "@/lib/utils";
import { useState } from "react";

const useGetVideoDuration = (videoUrl: string) => {
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
