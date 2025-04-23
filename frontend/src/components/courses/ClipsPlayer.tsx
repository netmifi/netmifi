// @/pages/ClipPlayer.tsx
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { tempClips } from "@/constants/temp";
import ReelsPlayer from "./ReelsPlayer";

const ClipPlayer = () => {
  const { clipId } = useParams();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          const index = Number(visible.target.getAttribute("data-index"));
          setActiveIndex(index);
        }
      },
      {
        threshold: 0.6,
      }
    );

    const elements = containerRef.current?.children;
    if (elements) {
      Array.from(elements).forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center scrollbar-hide gap-3 w-full h-screen overflow-y-scroll snap-y snap-mandatory bg-black"
    >
      {tempClips.map((clip, index) => (
        <div
          key={clip.id}
          data-index={index}
          className="snap-start w-full h-screen"
        >
          <ReelsPlayer clip={clip} isActive={index === activeIndex} />
        </div>
      ))}
    </div>
  );
};

export default ClipPlayer;
