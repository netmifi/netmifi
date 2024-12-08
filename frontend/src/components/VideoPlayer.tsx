//  FIXME: fix react player
import ReactPlayer from "react-player";
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
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  EllipsisVertical,
  FullscreenIcon,
  Info,
  Loader,
  Pause,
  PictureInPicture,
  Play,
  Repeat,
  Save,
  SkipBack,
  SkipForward,
  StepBack,
  StepForward,
} from "lucide-react";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";
import { Popover, PopoverTrigger } from "./ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { FaVolumeDown, FaVolumeMute } from "react-icons/fa";
import { cn, convertToReadableTime } from "@/lib/utils";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { FaVolumeHigh } from "react-icons/fa6";
import { ClassValue } from "clsx";
import CustomElementClick from "./CustomElementClick";
import useWindowSize from "@/hooks/useWindowSize";

type ReactPlayerProps = React.ComponentProps<typeof ReactPlayer>;

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
          variant={"transparent"}
          className="opacity-80 p-0 hover:opacity-90"
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
}: VideoPlayerProps) => {
  const videoPlayerRef = useRef<ReactPlayerProps>(null);
  const [currentVideo, setCurrentVideo] = useState(
    currentCourseVideo || videoUrl || videoCollection[0]
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
  const handle = useFullScreenHandle();

  const { width } = useWindowSize();

  const defaultIconClass = (className?: ClassValue) =>
    cn(
      "drop-shadow-lg fill-slate-200 text-white size-4 sm:size-5 hover:fill-slate-100",
      className
    );

  const extendedControls = () => {
    const breakWidth = width && width < 425;
    const controls = (
      <div
        className={cn("flex gap-3 items-center", {
          "flex-col bg-transparent-black min-w-fit px-5 py-3": breakWidth,
        })}
      >
        <PlayerTooltip
          hoverLabel="Playback speed"
          onClick={handlePlayBackSpeed}
        >
          <div className="flex items-center bg-white rounded-sm p-1 text-black text-xs font-montserrat font-bold">
            {playBackSpeed}x
          </div>
        </PlayerTooltip>

        <PlayerTooltip hoverLabel="Picture-in-Picture" onClick={handlePIP}>
          <PictureInPicture className={defaultIconClass()} />
        </PlayerTooltip>

        <PlayerTooltip hoverLabel="Fullscreen" onClick={handleFullscreen}>
          <FullscreenIcon className={defaultIconClass()} />
        </PlayerTooltip>
      </div>
    );

    return (
      <>
        {breakWidth ? (
          <Popover>
            <PopoverTrigger>
              <EllipsisVertical className={defaultIconClass()} />
            </PopoverTrigger>
            <PopoverContent>{controls}</PopoverContent>
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

  const handleReady = () => {
    setIsLoading(false);
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
    isFullScreen ? handle.exit() : handle.enter();
  };

  const handleProgress = (played: number) => {
    setCurrentTime(played);
  };

  const handleSliderChange = (value: number) => {
    if (value === 100) return;
    const newTime = value / 100;
    setCurrentTime(newTime);
    videoPlayerRef.current?.seekTo(newTime);
  };
  const handleVolumeChange = (value: number) => {
    setVolume(value);
  };
  const handleStepBack10s = () => {
    setStepBack10s(true);
    videoPlayerRef.current?.seekTo(
      videoPlayerRef.current?.getCurrentTime() - 10
    );

    setTimeout(() => {
      setStepBack10s(false);
    }, 100);
  };
  const handleStepForward10s = () => {
    if (
      videoPlayerRef.current?.getCurrentTime() + 10 >
      videoPlayerRef.current?.getDuration()
    ) {
      return;
    }
    setStepForward10s(true);

    videoPlayerRef.current?.seekTo(
      videoPlayerRef.current?.getCurrentTime() + 10
    );

    setTimeout(() => {
      setStepForward10s(false);
    }, 100);
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

    currentVideoIndex < videoCollection.length - 1
      ? videoCollection.find((url, index) => {
          return index === currentVideoIndex + 1 && handleUpdateUrl(url);
        })
      : alert("Course completed");

    console.log(currentVideoIndex, currentVideoIndex < videoCollection.length);
  };

  const handleOnEnded = () => {
    handleNext();
  };

  useEffect(() => {
    return setCurrentVideo(currentCourseVideo);
  }, [currentCourseVideo]);

  return (
    <FullScreen
      handle={handle}
      className={cn("w-full", { "h-screen": isFullScreen })}
      onChange={(state) => setIsFullScreen(state)}
    >
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <div
            className={cn(
              " relative bg-black flex justify-center items-center w-full h-[50dvh] sm:h-[60vh] z-10",
              className,
              { "h-screen sm:h-screen": isFullScreen }
            )}
          >
            <CustomElementClick handleSingleClick={handleControlsVisibility}>
              <div className="w-full h-full flex rounded-md justify-center items-center">
                <ReactPlayer
                  url={currentVideo}
                  ref={videoPlayerRef}
                  light={thumbnail}
                  width={"100%"}
                  height={"100%"}
                  loop={loop}
                  pip={isPIP}
                  volume={volume}
                  playbackRate={playBackSpeed}
                  onClickPreview={handleClickPreview}
                  playing={isPlaying}
                  onBuffer={handleBuffering}
                  onBufferEnd={handleBufferingEnd}
                  onReady={handleReady}
                  onProgress={(progress) => handleProgress(progress.played)}
                  onDisablePIP={handlePlayPause}
                  onEnded={handleOnEnded}
                />
              </div>
            </CustomElementClick>

            {!isPreview && (
              <>
                <CustomElementClick
                  handleSingleClick={handleControlsVisibility}
                >
                  <div
                    className={cn(
                      "absolute w-full h-full min-h-fit  transition-opacity flex justify-between items-center"
                    )}
                  >
                    <CustomElementClick handleDoubleClick={handleStepBack10s}>
                      <Button
                        variant={"transparent"}
                        className={cn(
                          "h-full basis-1/3 bg-transparent-black opacity-0 flex gap-2 text-secondary rounded-e-[50%] rounded-s-none transition-opacity delay-200 cursor-default",
                          { "opacity-70 delay-0": stepBack10s }
                        )}
                      >
                        <StepBack
                          className={defaultIconClass("opacity-70 size-12")}
                        />
                        <span className="opacity-70 text-3xl">-10s</span>
                      </Button>
                    </CustomElementClick>

                    <CustomElementClick
                      handleSingleClick={
                        !isPlaying ? handlePlayPause : () => {}
                      }
                      handleDoubleClick={handlePlayPause}
                    >
                      <Button
                        variant={"transparent"}
                        className={cn(
                          "h-full basis-1/3 opacity-0 bg-transparent transition-opacity delay-1000 cursor-default",
                          { "opacity-95 delay-0": !isPlaying || isLoading }
                        )}
                      >
                        {isLoading ? (
                          <Loader
                            className={defaultIconClass(
                              "animate-spin size-16 sm:size-20 drop-shadow-3xl"
                            )}
                          />
                        ) : isPlaying ? (
                          <Pause
                            className={defaultIconClass("size-16 sm:size-20")}
                          />
                        ) : (
                          <Play
                            className={defaultIconClass("size-16 sm:size-20")}
                          />
                        )}
                      </Button>
                    </CustomElementClick>

                    <CustomElementClick
                      handleDoubleClick={handleStepForward10s}
                    >
                      <Button
                        variant={"transparent"}
                        className={cn(
                          "h-full basis-1/3 bg-transparent-black opacity-0 flex gap-2 text-secondary rounded-s-[50%] rounded-e-none cursor-default",
                          { "opacity-70 delay-0": stepForward10s }
                        )}
                      >
                        <span className="opacity-70 text-3xl">+10s</span>{" "}
                        <StepForward
                          className={defaultIconClass("opacity-70 size-12")}
                        />
                      </Button>
                    </CustomElementClick>
                  </div>
                </CustomElementClick>

                <div
                  className={cn(
                    "absolute flex flex-col w-full h-fit min-h-fit bottom-0 transition-opacity",
                    { "opacity-0 pointer-events-none": !isControlsVisible }
                  )}
                >
                  <div className="h-fit">
                    <Slider
                      className="custom-slider"
                      step={0.1}
                      min={0}
                      max={100}
                      value={[currentTime * 100]}
                      onValueChange={([value]) => handleSliderChange(value)}
                    />
                  </div>

                  <div className="flex justify-between items-center gap-5 px-4 bg-[#33333363]">
                    <div className="flex gap-2 sm:gap-5 items-center">
                      <div className="flex gap-1 sm:gap-3 items-center">
                        <PlayerTooltip
                          hoverLabel="Previous"
                          onClick={() => handlePrev()}
                          disabled={
                            videoCollection.length < 2 ||
                            videoCollection.indexOf(currentVideo) === 0
                          }
                        >
                          <SkipBack className={defaultIconClass()} />
                        </PlayerTooltip>

                        <PlayerTooltip
                          hoverLabel={
                            isLoading ? "Loading" : isPlaying ? "Pause" : "Play"
                          }
                          onClick={handlePlayPause}
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <Loader
                              className={defaultIconClass("animate-spin")}
                            />
                          ) : isPlaying ? (
                            <Pause
                              className={defaultIconClass("size-5 sm:size-6")}
                            />
                          ) : (
                            <Play
                              className={defaultIconClass("size-5 sm:size-6")}
                            />
                          )}
                        </PlayerTooltip>

                        <PlayerTooltip
                          hoverLabel="Next"
                          onClick={() => handleNext()}
                          disabled={
                            videoCollection.length < 2 ||
                            videoCollection.indexOf(currentVideo) ===
                              videoCollection.length - 1
                          }
                        >
                          <SkipForward className={defaultIconClass()} />
                        </PlayerTooltip>

                        <PlayerTooltip
                          hoverLabel={loop ? "Looped" : "Loop"}
                          onClick={handleLoop}
                        >
                          <Repeat
                            className={defaultIconClass({
                              "fill-red text-red": loop,
                            })}
                          />
                        </PlayerTooltip>
                      </div>

                      <div className="flex gap-3 items-center">
                        <Popover>
                          <PopoverTrigger className="opacity-80 p-0 hover:opacity-90">
                            {volume === 0 ? (
                              <FaVolumeMute className={defaultIconClass()} />
                            ) : volume > 0.5 ? (
                              <FaVolumeHigh className={defaultIconClass()} />
                            ) : (
                              <FaVolumeDown className={defaultIconClass()} />
                            )}
                          </PopoverTrigger>

                          <PopoverContent
                            sideOffset={-10}
                            className="bg-transparent-black rounded p-4 w-52 flex gap-2"
                          >
                            <p className="text-white text-sm">
                              {volume * 100}%
                            </p>
                            <Slider
                              className="volume-slider"
                              step={0.1}
                              min={0}
                              max={1}
                              value={[volume]}
                              onValueChange={([value]) =>
                                handleVolumeChange(value)
                              }
                            />
                          </PopoverContent>
                        </Popover>

                        <time className="text-white/60 opacity-8 text-[10px] sm:text-[13px]">
                          {convertToReadableTime(
                            currentTime * videoPlayerRef.current?.getDuration()
                          )}
                          /
                          {convertToReadableTime(
                            videoPlayerRef.current?.getDuration()
                          )}
                        </time>
                      </div>
                    </div>

                    {extendedControls()}
                  </div>
                </div>
              </>
            )}
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="bg-primary border-0 *:text-secondary *:cursor-pointer *:flex *:gap-3">
          <ContextMenuItem>
            <Repeat /> Loop
          </ContextMenuItem>
          <ContextMenuItem>
            <FullscreenIcon /> FullScreen
          </ContextMenuItem>
          <ContextMenuItem>
            <Info /> Info
          </ContextMenuItem>
          <ContextMenuItem>
            <Save /> Save
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </FullScreen>
  );
};

export default VideoPlayer;
