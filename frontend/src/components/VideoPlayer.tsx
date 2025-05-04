import type React from "react";
import { useEffect, useRef, useState } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  Check,
  EllipsisVertical,
  FullscreenIcon,
  Info,
  Loader,
  Pause,
  PictureInPicture,
  Play,
  Repeat,
  Save,
  Settings,
  SkipBack,
  SkipForward,
  StepBack,
  StepForward,
  Subtitles,
  Maximize2,
  Minimize2,
  FastForward,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaArrowAltCircleRight, FaRedo, FaUndo, FaVolumeDown, FaVolumeMute } from "react-icons/fa";
import { cn, convertToReadableTime } from "@/lib/utils";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { FaVolumeHigh } from "react-icons/fa6";
import type { ClassValue } from "clsx";
import ReactPlayer from "react-player";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import useWindowSize from "@/hooks/useWindowSize";
import CustomElementClick from "./CustomElementClick";

type ReactPlayerProps = React.ComponentProps<typeof ReactPlayer>;

// interface PlayerTooltipProps {
//   onClick: () => void
//   children: React.ReactNode
//   hoverLabel: string
//   disabled?: boolean
// }

// interface VideoPlayerProps {
//   className?: string
//   thumbnail?: string
//   videoUrl?: string
//   videoCollection?: string[]
//   currentCourseVideo?: string
//   setCurrentCourseVideo?: (url: string) => void
//   onCourseComplete?: () => void
//   title?: string
//   subtitles?: {
//     src: string
//     label: string
//     language: string
//   }[]
// }

export function PlayerTooltip({
  onClick,
  children,
  hoverLabel,
  disabled = false,
}: PlayerTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          className="opacity-80 p-0 hover:opacity-90 h-8 w-8 rounded-full"
          onClick={onClick}
          disabled={disabled}
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent className="bg-black text-white border-primary">
        <p>{hoverLabel}</p>
      </TooltipContent>
    </Tooltip>
  );
}

const VideoPlayer = ({
  className,
  thumbnail,
  videoUrl,
  videoCollection = [],
  currentCourseVideo = "",
  setCurrentCourseVideo,
  onCourseComplete,
  onEnded,
  title,
  subtitles = [],
}: VideoPlayerProps) => {
  const videoPlayerRef = useRef<ReactPlayer>(null);
  const [currentVideo, setCurrentVideo] = useState(
    (currentCourseVideo || videoCollection[0]) ?? videoUrl
  );
  const [isPreview, setIsPreview] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isControlsVisible, setIsControlsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loop, setLoop] = useState(false);
  const [isPIP, setIsPIP] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [playBackSpeed, setPlayBackSpeed] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [stepBack10s, setStepBack10s] = useState(false);
  const [stepForward10s, setStepForward10s] = useState(false);
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(false);
  const [selectedSubtitle, setSelectedSubtitle] = useState<string | null>(null);
  const [courseProgress, setCourseProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const handle = useFullScreenHandle();
  const videoElement = useRef<HTMLVideoElement | null>(null);
  const [isCinemaMode, setIsCinemaMode] = useState(false);
  const [stepBack15s, setStepBack15s] = useState(false);

  const { width } = useWindowSize();

  const defaultIconClass = (className?: ClassValue) =>
    cn(
      "drop-shadow-lg text-white size-4 sm:size-5 hover:text-slate-100",
      className
    );

  // Calculate course progress
  useEffect(() => {
    if (videoCollection.length > 0) {
      const currentIndex = videoCollection.indexOf(currentVideo);
      const progress = ((currentIndex + 1) / videoCollection.length) * 100;
      setCourseProgress(progress);
    }
  }, [currentVideo, videoCollection]);

  // Reset selected subtitle when video changes
  useEffect(() => {
    setSelectedSubtitle(null);
    setSubtitlesEnabled(false);
  }, [currentVideo]);

  // Set default subtitle when subtitles are enabled
  useEffect(() => {
    if (subtitlesEnabled && subtitles.length > 0 && !selectedSubtitle) {
      setSelectedSubtitle(subtitles[0].src);
    }
  }, [subtitlesEnabled, subtitles, selectedSubtitle]);

  // Get reference to the video element
  useEffect(() => {
    if (videoPlayerRef.current) {
      const player = videoPlayerRef.current.getInternalPlayer() as HTMLVideoElement;
      if (player) {
        videoElement.current = player;
      }
    }
  }, [isPlaying]);

  const extendedControls = () => {
    const breakWidth = width && width < 425;
    const controls = (
      <div
        className={cn("flex gap-3 items-center", {
          "flex-col bg-black/80 min-w-fit px-5 py-3 rounded-lg": breakWidth,
        })}
      >
        <PlayerTooltip
          hoverLabel="Playback speed"
          onClick={handlePlayBackSpeed}
        >
          <div className="flex items-center bg-white rounded-sm p-1 text-black text-xs font-medium">
            {playBackSpeed}x
          </div>
        </PlayerTooltip>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
            >
              <Settings className={defaultIconClass()} />
              <span className="sr-only">Settings</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 bg-black/90 border-gray-700 text-white"
          >
            <DropdownMenuLabel>Settings</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-700" />

            {subtitles.length > 0 && (
              <>
                <DropdownMenuLabel className="flex items-center gap-2">
                  <Subtitles className="h-4 w-4" /> Subtitles
                </DropdownMenuLabel>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => setSubtitlesEnabled(!subtitlesEnabled)}
                >
                  {subtitlesEnabled ? "Disable" : "Enable"} Subtitles
                  {subtitlesEnabled && <Check className="h-4 w-4 ml-auto" />}
                </DropdownMenuItem>

                {subtitlesEnabled && (
                  <DropdownMenuRadioGroup
                    value={selectedSubtitle || ""}
                    onValueChange={(value) => {
                      setSelectedSubtitle(value);

                      // Force refresh subtitles
                      if (videoElement.current) {
                        const tracks = videoElement.current.textTracks;
                        if (tracks.length > 0) {
                          // Disable all tracks first
                          for (let i = 0; i < tracks.length; i++) {
                            tracks[i].mode = "disabled";
                          }

                          // Enable the selected track
                          const selectedTrackIndex = subtitles.findIndex(
                            (s) => s.src === value
                          );
                          if (
                            selectedTrackIndex >= 0 &&
                            tracks[selectedTrackIndex]
                          ) {
                            tracks[selectedTrackIndex].mode = "showing";
                          }
                        }
                      }

                      toast.success(
                        `Subtitles changed to ${
                          subtitles.find((s) => s.src === value)?.label ||
                          "selected language"
                        }`
                      );
                    }}
                  >
                    {subtitles.map((subtitle, index) => (
                      <DropdownMenuRadioItem
                        key={index}
                        value={subtitle.src}
                        className="cursor-pointer"
                      >
                        {subtitle.label}
                        {selectedSubtitle === subtitle.src && (
                          <Check className="h-4 w-4 ml-auto" />
                        )}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                )}
                <DropdownMenuSeparator className="bg-gray-700" />
              </>
            )}

            <DropdownMenuLabel className="flex items-center gap-2">
              <PictureInPicture className="h-4 w-4" /> Picture-in-Picture
            </DropdownMenuLabel>
            <DropdownMenuItem onClick={handlePIP} className="cursor-pointer">
              {isPIP ? "Disable" : "Enable"}
              {isPIP && <Check className="h-4 w-4 ml-auto" />}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );

    return (
      <>
        {breakWidth ? (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
              >
                <EllipsisVertical className={defaultIconClass()} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-transparent border-0">
              {controls}
            </PopoverContent>
          </Popover>
        ) : (
          controls
        )}
      </>
    );
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReady = (player: ReactPlayer) => {
    setIsLoading(false);
    setDuration(player.getDuration());

    // Get reference to the video element
    const videoEl = player.getInternalPlayer() as HTMLVideoElement;
    if (videoEl) {
      videoElement.current = videoEl;
    }
  };

  const handleLoop = () => {
    setLoop(!loop);
  };

  const handlePIP = () => {
    setIsPIP(!isPIP);
  };

  const handleBuffering = () => {
    setIsLoading(true);
  };

  const handleBufferingEnd = () => {
    setIsLoading(false);
  };

  const handleControlsVisibility = () => {
    setIsControlsVisible(!isControlsVisible);
  };

  const handleClickPreview = () => {
    setIsPreview(false);
    handlePlayPause();
  };

  const handleFullscreen = () => {
    if (videoPlayerRef.current) {
      const player = videoPlayerRef.current.getInternalPlayer();
      if (player) {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          player.requestFullscreen();
        }
      }
    }
  };

  const handleProgress = (state: {
    played: number;
    playedSeconds: number;
    loaded: number;
    loadedSeconds: number;
  }) => {
    setCurrentTime(state.playedSeconds);
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const handleSeek = (value: number) => {
    if (videoPlayerRef.current) {
      videoPlayerRef.current.seekTo(value);
      setCurrentTime(value);
    }
  };

  const handleStepBack10s = () => {
    setStepBack10s(true);
    if (videoPlayerRef.current) {
      const currentTime = videoPlayerRef.current.getCurrentTime();
      videoPlayerRef.current.seekTo(Math.max(0, currentTime - 10));
    }

    setTimeout(() => {
      setStepBack10s(false);
    }, 100);
  };

  const handleStepForward10s = () => {
    if (videoPlayerRef.current) {
      const currentTime = videoPlayerRef.current.getCurrentTime();
      const duration = videoPlayerRef.current.getDuration();

      if (currentTime + 10 > duration) {
        return;
      }

      setStepForward10s(true);
      videoPlayerRef.current.seekTo(currentTime + 10);

      setTimeout(() => {
        setStepForward10s(false);
      }, 100);
    }
  };

  const handlePlayBackSpeed = () => {
    if (playBackSpeed === 1) setPlayBackSpeed(1.5);
    else if (playBackSpeed === 1.5) setPlayBackSpeed(2);
    else if (playBackSpeed === 2) setPlayBackSpeed(0.5);
    else setPlayBackSpeed(1);
  };

  const handleUpdateUrl = (url: string) => {
    setCurrentVideo(url);
    setCurrentCourseVideo && setCurrentCourseVideo(url);
  };

  const handlePrev = () => {
    const currentVideoIndex = videoCollection.indexOf(currentVideo);
    currentVideoIndex > 0
      ? videoCollection.find((url, index) => {
          return index === currentVideoIndex - 1 && handleUpdateUrl(url);
        })
      : handleUpdateUrl(videoCollection[0]);
  };

  const handleNext = () => {
    const currentVideoIndex = videoCollection.indexOf(currentVideo);

    if (currentVideoIndex < videoCollection.length - 1) {
      videoCollection.find((url, index) => {
        return index === currentVideoIndex + 1 && handleUpdateUrl(url);
      });
    } else {
      // Course completed
      if (onCourseComplete) {
        onCourseComplete();
      } else {
        toast.success("Course completed!", {
          description: "You've finished watching all videos in this course.",
        });
      }
    }
  };

  const handleOnEnded = () => {
    if (videoCollection.length > 0) {
      handleNext();
    } else {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (currentCourseVideo) {
      setCurrentVideo(currentCourseVideo);
    }
  }, [currentCourseVideo]);

  // Find the currently selected subtitle
  const currentSubtitle = subtitles.find(
    (subtitle) => subtitle.src === selectedSubtitle
  );

  // Toggle subtitles
  const toggleSubtitles = () => {
    if (subtitlesEnabled) {
      setSubtitlesEnabled(false);
    } else {
      setSubtitlesEnabled(true);
      if (!selectedSubtitle && subtitles.length > 0) {
        setSelectedSubtitle(subtitles[0].src);
      }
    }
  };

  const handleCinemaMode = () => {
    setIsCinemaMode(!isCinemaMode);
  };

  const handleStepBack15s = () => {
    if (videoPlayerRef.current) {
      const currentTime = videoPlayerRef.current.getCurrentTime();
      videoPlayerRef.current.seekTo(currentTime - 15, "seconds");
      setStepBack15s(true);
      setTimeout(() => setStepBack15s(false), 500);
    }
  };

  return (
            <div
              className={cn(
        "relative w-full bg-black group",
        {
          "absolute top-0 left-0 w-full h-full z-50": isCinemaMode,
          "rounded-lg overflow-hidden": !isCinemaMode,
        },
        className
      )}
    >
      <div className="relative aspect-video">
                  <ReactPlayer
          ref={videoPlayerRef}
                    url={currentVideo}
                    width="100%"
          height={`${isCinemaMode ?"100%": "70%"}`}
          playing={isPlaying}
                    loop={loop}
                    volume={volume}
                    playbackRate={playBackSpeed}
          onProgress={handleProgress}
          onDuration={handleDuration}
          onReady={handleReady}
          onEnded={onEnded}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
                    onBuffer={handleBuffering}
                    onBufferEnd={handleBufferingEnd}
                    config={{
                      file: {
                        attributes: {
                controlsList: "nodownload",
                          crossOrigin: "anonymous",
                        },
              tracks: subtitles.map((subtitle) => ({
                                kind: "subtitles",
                                src: subtitle.src,
                                srcLang: subtitle.language,
                                label: subtitle.label,
                default: selectedSubtitle === subtitle.src,
              })),
                      },
                    }}
                  />

        {/* Controls overlay */}
                    <div
                      className={cn(
            "absolute inset-0 flex flex-col justify-between p-4 transition-opacity duration-300",
            {
              "opacity-0 group-hover:opacity-100":
                !isControlsVisible && isPlaying,
              "opacity-100": isControlsVisible || !isPlaying,
              "bg-black/50": isControlsVisible || !isPlaying,
            }
          )}
          onMouseEnter={() => setIsControlsVisible(true)}
          onMouseLeave={() => setIsControlsVisible(false)}
        >
          {/* Top controls */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              {title && <span className="text-white font-medium">{title}</span>}
                    </div>
            <div className="flex items-center gap-2">{extendedControls()}</div>
                    </div>

          {/* Center controls */}
          <div className="flex items-center justify-center gap-6">
            <PlayerTooltip hoverLabel="15s" onClick={handleStepBack15s}>
              <FaUndo
                className={cn(defaultIconClass("size-8"), {
                  "animate-pulse": stepBack15s,
                })}
              />
                          </PlayerTooltip>
                          <PlayerTooltip
              hoverLabel={isPlaying ? "Pause" : "Play"}
                            onClick={handlePlayPause}
            >
              {isPlaying ? (
                <Pause className={defaultIconClass("size-12")} />
              ) : (
                <Play className={defaultIconClass("size-12")} />
                            )}
                          </PlayerTooltip>
                          <PlayerTooltip
              hoverLabel="15s"
              onClick={handleStepForward10s}
            >
              <FaRedo
                className={cn(defaultIconClass("size-8"), {
                  "animate-pulse": stepForward10s,
                              })}
                            />
                          </PlayerTooltip>
                        </div>

          {/* Bottom controls */}
          <div className="flex flex-col gap-2">
            <div className="w-full h-1 bg-gray-600 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-200"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <span className="text-white text-sm">
                    {convertToReadableTime(currentTime)}
                  </span>
                  <span className="text-white text-sm">/</span>
                  <span className="text-white text-sm">
                    {convertToReadableTime(duration)}
                  </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                          <PlayerTooltip
                  hoverLabel={
                    isCinemaMode ? "Cinema Mode" : "Cinema Mode"
                  }
                  onClick={handleCinemaMode}
                >
                  {isCinemaMode ? (
                    <Minimize2 className={defaultIconClass()} />
                  ) : (
                    <Maximize2 className={defaultIconClass()} />
                  )}
                          </PlayerTooltip>
                {/* <PlayerTooltip
                  hoverLabel="Fullscreen"
                  onClick={handleFullscreen}
                >
                  <Maximize2 className={defaultIconClass()} />
                </PlayerTooltip> */}
              </div>
            </div>
                      </div>
                    </div>
                  </div>
            </div>
  );
};

export default VideoPlayer;
