// @/components/ReelsPlayer.tsx
import { useEffect, useRef, useState } from "react";
import { Music, Heart, MessageCircle, Send } from "lucide-react";
import { AiOutlineMuted, AiOutlineSound } from "react-icons/ai";

type ReelsPlayerProps = {
  clip: {
    id: string;
    videoUrl: string;
    title?: string;
    views?: number;
    username?: string;
    caption?: string;
    audioName?: string;
    profileImage?: string;
  };
  isActive: boolean;
};

const ReelsPlayer = ({ clip, isActive }: ReelsPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      video.play();
    } else {
      video.pause();
    }
  }, [isActive]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="relative w-full xl:w-[40%] lg:w-1/2 md:w-3/4 rounded-xl mx-auto h-screen overflow-hidden bg-black">
      <video
        ref={videoRef}
        src={clip.videoUrl}
        className="object-cover w-full h-full"
        muted={isMuted}
        loop
        playsInline
        onClick={togglePlay}
      />
      {/* Overlay */}
      <div className="absolute bottom-[10%] left-4 text-white z-10 w-[80%]">
        <div className="flex items-center mb-1">
          {clip.profileImage && (
            <img
              src={clip.profileImage}
              alt="profile"
              className="w-6 h-6 rounded-full mr-2"
            />
          )}
          <span className="text-sm font-semibold">{clip.username}</span>
        </div>
        <p className="text-sm line-clamp-2">{clip.caption}</p>
        <div className="flex items-center mt-1 text-xs text-white">
          <Music size={20} className="mr-1" />
          <span className="truncate">{clip.audioName}</span>
        </div>
      </div>
      {/* Right-side actions */}
      <div className="absolute right-4 bottom-[10%] z-10 flex flex-col items-end gap-4 text-white">
        <p className="text-xs flex text-gray-400 gap-1">
          120 <Heart size={25} />
        </p>
        <p className="text-xs flex text-gray-400 gap-1">
          123k <MessageCircle size={25} />
        </p>
        <p className="text-xs flex text-gray-400 gap-1">
          20m <Send size={25} />
        </p>
        <button
          onClick={() => setIsMuted((prev) => !prev)}
          className="mt-2 text-xs"
        >
          {isMuted ? <AiOutlineMuted size={25}/>: <AiOutlineSound size={25}/>}
        </button>
      </div>
    </div>
  );
};

export default ReelsPlayer;
