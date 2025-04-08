import type React from "react"
import { useEffect, useRef, useState } from "react"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
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
} from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { FaVolumeDown, FaVolumeMute } from "react-icons/fa"
import { cn, convertToReadableTime } from "@/lib/utils"
import { FullScreen, useFullScreenHandle } from "react-full-screen"
import { FaVolumeHigh } from "react-icons/fa6"
import type { ClassValue } from "clsx"
import ReactPlayer from "react-player"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import useWindowSize from "@/hooks/useWindowSize"
import CustomElementClick from "./CustomElementClick"

type ReactPlayerProps = React.ComponentProps<typeof ReactPlayer>

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

export function PlayerTooltip({ onClick, children, hoverLabel, disabled = false }: PlayerTooltipProps) {
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
  )
}

const VideoPlayer = ({
  className,
  thumbnail,
  videoUrl,
  videoCollection = [],
  currentCourseVideo = "",
  setCurrentCourseVideo,
  onCourseComplete,
  title,
  subtitles = [],
}: VideoPlayerProps) => {
  const videoPlayerRef = useRef<ReactPlayer>(null)
  const [currentVideo, setCurrentVideo] = useState((currentCourseVideo || videoCollection[0]) ?? videoUrl)
  const [isPreview, setIsPreview] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isControlsVisible, setIsControlsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loop, setLoop] = useState(false)
  const [isPIP, setIsPIP] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [playBackSpeed, setPlayBackSpeed] = useState(1)
  const [currentTime, setCurrentTime] = useState(0)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [stepBack10s, setStepBack10s] = useState(false)
  const [stepForward10s, setStepForward10s] = useState(false)
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(false)
  const [selectedSubtitle, setSelectedSubtitle] = useState<string | null>(null)
  const [courseProgress, setCourseProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const handle = useFullScreenHandle()
  const videoElement = useRef<HTMLVideoElement | null>(null)

  const { width } = useWindowSize()

  const defaultIconClass = (className?: ClassValue) =>
    cn("drop-shadow-lg text-white size-4 sm:size-5 hover:text-slate-100", className)

  // Calculate course progress
  useEffect(() => {
    if (videoCollection.length > 0) {
      const currentIndex = videoCollection.indexOf(currentVideo)
      const progress = ((currentIndex + 1) / videoCollection.length) * 100
      setCourseProgress(progress)
    }
  }, [currentVideo, videoCollection])

  // Reset selected subtitle when video changes
  useEffect(() => {
    setSelectedSubtitle(null)
    setSubtitlesEnabled(false)
  }, [currentVideo])

  // Set default subtitle when subtitles are enabled
  useEffect(() => {
    if (subtitlesEnabled && subtitles.length > 0 && !selectedSubtitle) {
      setSelectedSubtitle(subtitles[0].src)
    }
  }, [subtitlesEnabled, subtitles, selectedSubtitle])

  // Get reference to the video element
  useEffect(() => {
    if (videoPlayerRef.current) {
      const player = videoPlayerRef.current.getInternalPlayer() as HTMLVideoElement
      if (player) {
        videoElement.current = player
      }
    }
  }, [isPlaying])

  const extendedControls = () => {
    const breakWidth = width && width < 425
    const controls = (
      <div
        className={cn("flex gap-3 items-center", {
          "flex-col bg-black/80 min-w-fit px-5 py-3 rounded-lg": breakWidth,
        })}
      >
        <PlayerTooltip hoverLabel="Playback speed" onClick={handlePlayBackSpeed}>
          <div className="flex items-center bg-white rounded-sm p-1 text-black text-xs font-medium">
            {playBackSpeed}x
          </div>
        </PlayerTooltip>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <Settings className={defaultIconClass()} />
              <span className="sr-only">Settings</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-black/90 border-gray-700 text-white">
            <DropdownMenuLabel>Settings</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-700" />

            {subtitles.length > 0 && (
              <>
                <DropdownMenuLabel className="flex items-center gap-2">
                  <Subtitles className="h-4 w-4" /> Subtitles
                </DropdownMenuLabel>
                <DropdownMenuItem className="cursor-pointer" onClick={() => setSubtitlesEnabled(!subtitlesEnabled)}>
                  {subtitlesEnabled ? "Disable" : "Enable"} Subtitles
                  {subtitlesEnabled && <Check className="h-4 w-4 ml-auto" />}
                </DropdownMenuItem>

                {subtitlesEnabled && (
                  <DropdownMenuRadioGroup
                    value={selectedSubtitle || ""}
                    onValueChange={(value) => {
                      setSelectedSubtitle(value)

                      // Force refresh subtitles
                      if (videoElement.current) {
                        const tracks = videoElement.current.textTracks
                        if (tracks.length > 0) {
                          // Disable all tracks first
                          for (let i = 0; i < tracks.length; i++) {
                            tracks[i].mode = "disabled"
                          }

                          // Enable the selected track
                          const selectedTrackIndex = subtitles.findIndex((s) => s.src === value)
                          if (selectedTrackIndex >= 0 && tracks[selectedTrackIndex]) {
                            tracks[selectedTrackIndex].mode = "showing"
                          }
                        }
                      }

                      toast.success(
                        `Subtitles changed to ${subtitles.find((s) => s.src === value)?.label || "selected language"}`,
                      )
                    }}
                  >
                    {subtitles.map((subtitle, index) => (
                      <DropdownMenuRadioItem key={index} value={subtitle.src} className="cursor-pointer">
                        {subtitle.label}
                        {selectedSubtitle === subtitle.src && <Check className="h-4 w-4 ml-auto" />}
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

        <PlayerTooltip hoverLabel="Fullscreen" onClick={handleFullscreen}>
          <FullscreenIcon className={defaultIconClass()} />
        </PlayerTooltip>
      </div>
    )

    return (
      <>
        {breakWidth ? (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <EllipsisVertical className={defaultIconClass()} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-transparent border-0">{controls}</PopoverContent>
          </Popover>
        ) : (
          controls
        )}
      </>
    )
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleReady = (player: ReactPlayer) => {
    setIsLoading(false)
    setDuration(player.getDuration())

    // Get reference to the video element
    const videoEl = player.getInternalPlayer() as HTMLVideoElement
    if (videoEl) {
      videoElement.current = videoEl
    }
  }

  const handleLoop = () => {
    setLoop(!loop)
  }

  const handlePIP = () => {
    setIsPIP(!isPIP)
  }

  const handleBuffering = () => {
    setIsLoading(true)
  }

  const handleBufferingEnd = () => {
    setIsLoading(false)
  }

  const handleControlsVisibility = () => {
    setIsControlsVisible(!isControlsVisible)
  }

  const handleClickPreview = () => {
    setIsPreview(false)
    handlePlayPause()
  }

  const handleFullscreen = () => {
    isFullScreen ? handle.exit() : handle.enter()
  }

  const handleProgress = (state: { played: number; playedSeconds: number; loaded: number; loadedSeconds: number }) => {
    setCurrentTime(state.played)
  }

  const handleSliderChange = (value: number) => {
    if (value === 100) return
    const newTime = value / 100
    setCurrentTime(newTime)
    videoPlayerRef.current?.seekTo(newTime)
  }

  const handleVolumeChange = (value: number) => {
    setVolume(value)
  }

  const handleStepBack10s = () => {
    setStepBack10s(true)
    if (videoPlayerRef.current) {
      const currentTime = videoPlayerRef.current.getCurrentTime()
      videoPlayerRef.current.seekTo(Math.max(0, currentTime - 10))
    }

    setTimeout(() => {
      setStepBack10s(false)
    }, 100)
  }

  const handleStepForward10s = () => {
    if (videoPlayerRef.current) {
      const currentTime = videoPlayerRef.current.getCurrentTime()
      const duration = videoPlayerRef.current.getDuration()

      if (currentTime + 10 > duration) {
        return
      }

      setStepForward10s(true)
      videoPlayerRef.current.seekTo(currentTime + 10)

      setTimeout(() => {
        setStepForward10s(false)
      }, 100)
    }
  }

  const handlePlayBackSpeed = () => {
    if (playBackSpeed === 1) setPlayBackSpeed(1.5)
    else if (playBackSpeed === 1.5) setPlayBackSpeed(2)
    else if (playBackSpeed === 2) setPlayBackSpeed(0.5)
    else setPlayBackSpeed(1)
  }

  const handleUpdateUrl = (url: string) => {
    setCurrentVideo(url)
    setCurrentCourseVideo && setCurrentCourseVideo(url)
  }

  const handlePrev = () => {
    const currentVideoIndex = videoCollection.indexOf(currentVideo)
    currentVideoIndex > 0
      ? videoCollection.find((url, index) => {
          return index === currentVideoIndex - 1 && handleUpdateUrl(url)
        })
      : handleUpdateUrl(videoCollection[0])
  }

  const handleNext = () => {
    const currentVideoIndex = videoCollection.indexOf(currentVideo)

    if (currentVideoIndex < videoCollection.length - 1) {
      videoCollection.find((url, index) => {
        return index === currentVideoIndex + 1 && handleUpdateUrl(url)
      })
    } else {
      // Course completed
      if (onCourseComplete) {
        onCourseComplete()
      } else {
        toast.success("Course completed!", {
          description: "You've finished watching all videos in this course.",
        })
      }
    }
  }

  const handleOnEnded = () => {
    if (videoCollection.length > 0) {
      handleNext()
    } else {
      setIsPlaying(false)
    }
  }

  useEffect(() => {
    if (currentCourseVideo) {
      setCurrentVideo(currentCourseVideo)
    }
  }, [currentCourseVideo])

  // Find the currently selected subtitle
  const currentSubtitle = subtitles.find((subtitle) => subtitle.src === selectedSubtitle)

  // Toggle subtitles
  const toggleSubtitles = () => {
    if (subtitlesEnabled) {
      setSubtitlesEnabled(false)
    } else {
      setSubtitlesEnabled(true)
      if (!selectedSubtitle && subtitles.length > 0) {
        setSelectedSubtitle(subtitles[0].src)
      }
    }
  }

  return (
    <TooltipProvider>
      <FullScreen
        handle={handle}
        className={cn("w-full", { "h-screen": isFullScreen })}
        onChange={(state) => setIsFullScreen(state)}
      >
        <ContextMenu>
          <ContextMenuTrigger asChild>
            <div
              className={cn(
                "relative bg-black flex flex-col justify-center items-center w-full h-[50dvh] sm:h-[60vh] z-10 rounded-lg overflow-hidden",
                className,
                { "h-screen sm:h-screen": isFullScreen },
              )}
            >
              {/* Title bar */}
              {title && (
                <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 to-transparent p-4">
                  <h2 className="text-white font-medium truncate">{title}</h2>
                </div>
              )}

              {/* Course progress indicator */}
              {videoCollection.length > 1 && (
                <div className="absolute top-0 left-0 right-0 z-10">
                  <Progress value={courseProgress} className="h-1 rounded-none bg-gray-800" />
                </div>
              )}

              <CustomElementClick handleSingleClick={handleControlsVisibility}>
                <div className="w-full h-full flex rounded-md justify-center items-center">
                  <ReactPlayer
                    url={currentVideo}
                    ref={videoPlayerRef}
                    light={thumbnail}
                    width="100%"
                    height="100%"
                    loop={loop}
                    pip={isPIP}
                    volume={volume}
                    playbackRate={playBackSpeed}
                    onClickPreview={handleClickPreview}
                    playing={isPlaying}
                    onBuffer={handleBuffering}
                    onBufferEnd={handleBufferingEnd}
                    onReady={handleReady}
                    onProgress={handleProgress}
                    onDisablePIP={handlePlayPause}
                    onEnded={handleOnEnded}
                    config={{
                      file: {
                        attributes: {
                          crossOrigin: "anonymous",
                        },
                        tracks:
                          subtitlesEnabled && subtitles.length > 0
                            ? subtitles.map((subtitle, index) => ({
                                kind: "subtitles",
                                src: subtitle.src,
                                srcLang: subtitle.language,
                                label: subtitle.label,
                                default: subtitle.src === selectedSubtitle,
                              }))
                            : [],
                      },
                    }}
                  />
                </div>
              </CustomElementClick>

              {!isPreview && (
                <>
                  <CustomElementClick handleSingleClick={handleControlsVisibility}>
                    <div
                      className={cn(
                        "absolute w-full h-full min-h-fit transition-opacity flex justify-between items-center",
                      )}
                    >
                      <CustomElementClick handleDoubleClick={handleStepBack10s}>
                        <Button
                          variant="ghost"
                          className={cn(
                            "h-full basis-1/3 bg-black/20 opacity-0 flex gap-2 text-white rounded-e-[50%] rounded-s-none transition-opacity delay-200 cursor-default",
                            { "opacity-70 delay-0": stepBack10s },
                          )}
                        >
                          <StepBack className={defaultIconClass("opacity-70 size-12")} />
                          <span className="opacity-70 text-3xl">-10s</span>
                        </Button>
                      </CustomElementClick>

                      <CustomElementClick
                        handleSingleClick={!isPlaying ? handlePlayPause : () => {}}
                        handleDoubleClick={handlePlayPause}
                      >
                        <Button
                          variant="ghost"
                          className={cn(
                            "h-full basis-1/3 opacity-0 bg-transparent transition-opacity delay-1000 cursor-default",
                            { "opacity-95 delay-0": !isPlaying || isLoading },
                          )}
                        >
                          {isLoading ? (
                            <Loader className={defaultIconClass("animate-spin size-16 sm:size-20 drop-shadow-3xl")} />
                          ) : isPlaying ? (
                            <Pause className={defaultIconClass("size-16 sm:size-20")} />
                          ) : (
                            <Play className={defaultIconClass("size-16 sm:size-20")} />
                          )}
                        </Button>
                      </CustomElementClick>

                      <CustomElementClick handleDoubleClick={handleStepForward10s}>
                        <Button
                          variant="ghost"
                          className={cn(
                            "h-full basis-1/3 bg-black/20 opacity-0 flex gap-2 text-white rounded-s-[50%] rounded-e-none cursor-default",
                            { "opacity-70 delay-0": stepForward10s },
                          )}
                        >
                          <span className="opacity-70 text-3xl">+10s</span>{" "}
                          <StepForward className={defaultIconClass("opacity-70 size-12")} />
                        </Button>
                      </CustomElementClick>
                    </div>
                  </CustomElementClick>

                  <div
                    className={cn("absolute flex flex-col w-full h-fit min-h-fit bottom-0 transition-opacity", {
                      "opacity-0 pointer-events-none": !isControlsVisible,
                    })}
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

                    <div className="flex justify-between items-center gap-5 px-4 py-2 bg-gradient-to-t from-black/80 to-black/40">
                      <div className="flex gap-2 sm:gap-5 items-center">
                        <div className="flex gap-1 sm:gap-3 items-center">
                          <PlayerTooltip
                            hoverLabel="Previous"
                            onClick={() => handlePrev()}
                            disabled={videoCollection.length < 2 || videoCollection.indexOf(currentVideo) === 0}
                          >
                            <SkipBack className={defaultIconClass()} />
                          </PlayerTooltip>

                          <PlayerTooltip
                            hoverLabel={isLoading ? "Loading" : isPlaying ? "Pause" : "Play"}
                            onClick={handlePlayPause}
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <Loader className={defaultIconClass("animate-spin")} />
                            ) : isPlaying ? (
                              <Pause className={defaultIconClass("size-5 sm:size-6")} />
                            ) : (
                              <Play className={defaultIconClass("size-5 sm:size-6")} />
                            )}
                          </PlayerTooltip>

                          <PlayerTooltip
                            hoverLabel="Next"
                            onClick={() => handleNext()}
                            disabled={
                              videoCollection.length < 2 ||
                              videoCollection.indexOf(currentVideo) === videoCollection.length - 1
                            }
                          >
                            <SkipForward className={defaultIconClass()} />
                          </PlayerTooltip>

                          <PlayerTooltip hoverLabel={loop ? "Looped" : "Loop"} onClick={handleLoop}>
                            <Repeat
                              className={cn(defaultIconClass(), {
                                "text-primary": loop,
                              })}
                            />
                          </PlayerTooltip>
                        </div>

                        <div className="flex gap-3 items-center">
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                {volume === 0 ? (
                                  <FaVolumeMute className={defaultIconClass()} />
                                ) : volume > 0.5 ? (
                                  <FaVolumeHigh className={defaultIconClass()} />
                                ) : (
                                  <FaVolumeDown className={defaultIconClass()} />
                                )}
                              </Button>
                            </PopoverTrigger>

                            <PopoverContent
                              sideOffset={-10}
                              className="bg-black/80 rounded p-4 w-52 flex gap-2 border-gray-700"
                            >
                              <p className="text-white text-sm">{Math.round(volume * 100)}%</p>
                              <Slider
                                className="volume-slider"
                                step={0.01}
                                min={0}
                                max={1}
                                value={[volume]}
                                onValueChange={([value]) => handleVolumeChange(value)}
                              />
                            </PopoverContent>
                          </Popover>

                          <time className="text-white/80 text-[10px] sm:text-[13px]">
                            {convertToReadableTime(currentTime * duration)}/{convertToReadableTime(duration)}
                          </time>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {subtitles.length > 0 && (
                          <PlayerTooltip
                            hoverLabel={subtitlesEnabled ? "Subtitles On" : "Subtitles Off"}
                            onClick={toggleSubtitles}
                          >
                            <Subtitles
                              className={cn(defaultIconClass(), {
                                "text-primary": subtitlesEnabled,
                              })}
                            />
                          </PlayerTooltip>
                        )}

                        {videoCollection.length > 1 && (
                          <Badge variant="outline" className="text-xs text-white border-gray-600 bg-black/40">
                            {videoCollection.indexOf(currentVideo) + 1}/{videoCollection.length}
                          </Badge>
                        )}

                        {extendedControls()}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent className="bg-black/90 border-gray-700 *:text-white *:cursor-pointer *:flex *:gap-3">
            <ContextMenuItem onClick={handleLoop}>
              <Repeat /> {loop ? "Disable Loop" : "Enable Loop"}
            </ContextMenuItem>
            <ContextMenuItem onClick={handleFullscreen}>
              <FullscreenIcon /> {isFullScreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            </ContextMenuItem>
            {subtitles.length > 0 && (
              <ContextMenuItem onClick={toggleSubtitles}>
                <Subtitles /> {subtitlesEnabled ? "Disable Subtitles" : "Enable Subtitles"}
              </ContextMenuItem>
            )}
            <ContextMenuItem>
              <Info /> Video Info
            </ContextMenuItem>
            <ContextMenuItem>
              <Save /> Save
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </FullScreen>
    </TooltipProvider>
  )
}

export default VideoPlayer

