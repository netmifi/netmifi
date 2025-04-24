// @/components/ReelsPlayer.tsx
import { useEffect, useRef, useState } from "react";
import { Music, Heart, MessageCircle, Send, UserCheck, UserPlus } from "lucide-react";
import { AiOutlineMuted, AiOutlineSound } from "react-icons/ai";
import { handleShare } from "@/lib/utils";

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
    isFavourite?: boolean;
    isFollowing?: boolean;
  };
  isActive: boolean;
};

const ReelsPlayer = ({ clip, isActive }: ReelsPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isFavourite, setIsFavourite] = useState(clip.isFavourite);
  const [isFollowing, setIsFollowing] = useState(clip.isFollowing);

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
      <div className="absolute right-4 bottom-[10%] z-10 md:w-20 flex flex-col items-center gap-4 text-white">
        {/* Likes */}
        <button
          onClick={() => setIsFavourite((prev) => !prev)}
          className="flex flex-col items-center text-xs text-white"
        >
          {isFavourite ? <Heart fill="red" size={25} /> : <Heart size={25} />}
          <span>120</span>
        </button>

        {/* Shares */}
        <button
          onClick={() => handleShare(clip)}
          className="flex flex-col items-center text-xs text-white"
        >
          <Send size={25} />
          <span>20m</span>
        </button>

        {/* Mute/Unmute */}
        <button
          onClick={() => setIsMuted((prev) => !prev)}
          className="flex flex-col items-center text-xs text-white"
        >
          {isMuted ? (
            <AiOutlineMuted size={25} />
          ) : (
            <AiOutlineSound size={25} />
          )}
          <span>{isMuted ? "Muted" : "Sound"}</span>
        </button>

        {/* Follow/Unfollow */}
        <button
          onClick={() => setIsFollowing((prev) => !prev)}
          className="flex flex-col items-center text-xs text-white"
        >
          {isFollowing ? <UserCheck size={25} /> : <UserPlus size={25} />}
          <span>{isFollowing ? "Following" : "Follow"}</span>
        </button>
      </div>
    </div>
  );
};

export default ReelsPlayer;
