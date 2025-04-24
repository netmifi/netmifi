import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { MoreVertical, Heart, MessageCircle, Send, Music } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

type ClipsCardProps = {
  className?: string;
  clip: {
    id: string;
    videoUrl: string;
    title: string;
    views: number;
    username?: string;
    caption?: string;
    audioName?: string;
    profileImage?: string;
  };
  platform?: "youtube" | "instagram";
  autoplay?:boolean
};

const ClipsCard = ({
  className,
  clip,
  platform = "youtube",
  autoplay = true,
}: ClipsCardProps) => {
  const isYouTube = platform === "youtube";
  const videoRef = useRef<HTMLVideoElement | null>(null);
  
    useEffect(() => {
      const video = videoRef.current;
      if (autoplay && video) {
        video.muted = true;
        video.play().catch((err) => {
          console.warn("Autoplay failed:", err);
        });
      }
    }, [autoplay]);
    
      const containerRef = useRef<HTMLDivElement | null>(null);
      const [isHovered, setIsHovered] = useState(false);
      const [isInView, setIsInView] = useState(false);
    
      // ✅ Observer: Pause when not in viewport
      useEffect(() => {
        const observer = new IntersectionObserver(
          ([entry]) => setIsInView(entry.isIntersecting),
          { threshold: 0.6 }
        );
    
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
      }, []);
    
      // ✅ Pause/Play control
      useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
    
        if (isHovered && isInView) {
          video.muted = true;
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      }, [isHovered, isInView]);
    
      // ✅ Handle tap to toggle play (optional)
      const togglePlay = () => {
        const video = videoRef.current;
        if (!video) return;
        if (video.paused) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      };

  return (
    <Card key={clip.id} className={cn("bg-black relative", className)} ref={containerRef}>
      <CardContent className="p-0 relative mb-auto">
        <div
          className={cn(
            "overflow-hidden rounded-xl mx-auto relative bg-black transition-all duration-300 ease-in-out",
            isYouTube
              ? "w-[200px] h-[320px] sm:w-[280px] sm:h-[500px] md:w-[320px] md:h-[570px] xl:w-[360px] xl:h-[640px]"
              : "w-[180px] h-[320px] sm:w-[240px] sm:h-[420px] md:w-[280px] md:h-[500px] xl:w-[320px] xl:h-[580px]"
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={!isYouTube ? togglePlay : undefined} // Tap to pause/resume (optional)
        >
          <NavLink to={`/clips/${clip.id}/`}>
            <video
              ref={videoRef}
              src={clip.videoUrl}
              className="w-full h-full object-cover"
              muted
              loop
              playsInline
              controls={false}
            />
          </NavLink>
        </div>

        {isYouTube && (
          <div className="flex items-start justify-between mt-2 px-2">
            <div className="flex flex-col text-white text-sm w-full pr-2 overflow-hidden">
              <p className="font-semibold line-clamp-2 break-words max-w-full max-h-[3.5rem]">
                {clip.title}
              </p>
              <p className="text-xs text-gray-400">
                {Intl.NumberFormat().format(clip.views)} views
              </p>
            </div>
            <button className="text-gray-300 hover:text-white">
              <MoreVertical size={18} />
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ClipsCard;
