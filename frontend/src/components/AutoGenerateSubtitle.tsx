"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

interface AutoSubtitleGeneratorProps {
  videoUrl: string
  onSubtitlesGenerated: (subtitlesUrl: string) => void
}

export default function AutoSubtitleGenerator({ videoUrl, onSubtitlesGenerated }: AutoSubtitleGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const audioContextRef = useRef<AudioContext | null>(null)
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const generateSubtitles = async () => {
    if (!videoUrl) {
      toast.error("Error", {
        description: "No video URL provided",
      })
      return
    }

    setIsGenerating(true)
    setProgress(0)

    try {
      // Create a hidden video element to extract audio
      const video = document.createElement("video")
      video.crossOrigin = "anonymous"
      video.src = videoUrl
      video.muted = true
      videoRef.current = video

      // Wait for video metadata to load
      await new Promise<void>((resolve) => {
        video.onloadedmetadata = () => resolve()
        video.onerror = () => {
          throw new Error("Failed to load video")
        }
      })

      // Initialize audio context
      const audioContext = new AudioContext()
      audioContextRef.current = audioContext
      const sourceNode = audioContext.createMediaElementSource(video)
      sourceNodeRef.current = sourceNode
      sourceNode.connect(audioContext.destination)

      // Start playing the video to process audio
      await video.play()

      // Simulate processing with progress updates
      const duration = video.duration
      const updateInterval = setInterval(() => {
        const currentProgress = (video.currentTime / duration) * 100
        setProgress(Math.min(currentProgress, 95)) // Cap at 95% until final processing

        if (video.currentTime >= duration) {
          clearInterval(updateInterval)
          finalizeSubtitles()
        }
      }, 500)

      // Function to finalize subtitle generation
      const finalizeSubtitles = async () => {
        setProgress(100)

        // In a real implementation, you would send the audio data to a speech recognition service
        // and receive back a subtitle file. Here we're simulating that with a timeout.

        setTimeout(() => {
          // Create a simple VTT file as an example
          const vttContent = generateSampleVTT(duration)
          const vttBlob = new Blob([vttContent], { type: "text/vtt" })
          const subtitlesUrl = URL.createObjectURL(vttBlob)

          onSubtitlesGenerated(subtitlesUrl)

          setIsGenerating(false)
          cleanup()

          toast.success("Subtitles Generated", {
            description: "Auto-generated subtitles are now available",
          })
        }, 1000)
      }
    } catch (error) {
      console.error("Error generating subtitles:", error)
      toast.error("Error", {
        description: "Failed to generate subtitles",
      })
      setIsGenerating(false)
      cleanup()
    }
  }

  // Clean up resources
  const cleanup = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.src = ""
      videoRef.current = null
    }

    if (sourceNodeRef.current && audioContextRef.current) {
      sourceNodeRef.current.disconnect()
      audioContextRef.current.close()
      sourceNodeRef.current = null
      audioContextRef.current = null
    }
  }

  // Generate a sample VTT file for demonstration
  const generateSampleVTT = (duration: number) => {
    let vtt = "WEBVTT\n\n"

    // Create sample cues every 5 seconds
    for (let i = 0; i < Math.floor(duration); i += 5) {
      const startTime = formatVTTTime(i)
      const endTime = formatVTTTime(Math.min(i + 5, duration))

      // Generate some placeholder text based on the timestamp
      const text = `This is auto-generated text at ${Math.floor(i / 60)}:${String(i % 60).padStart(2, "0")}`

      vtt += `${startTime} --> ${endTime}\n${text}\n\n`
    }

    return vtt
  }

  // Format time for VTT format (HH:MM:SS.mmm)
  const formatVTTTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = Math.floor(seconds % 60)
    const ms = Math.floor((seconds % 1) * 1000)

    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(ms).padStart(3, "0")}`
  }

  return (
    <div className="flex flex-col gap-2">
      <Button onClick={generateSubtitles} disabled={isGenerating} className="w-full">
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating Subtitles ({Math.round(progress)}%)
          </>
        ) : (
          "Generate Auto Subtitles"
        )}
      </Button>

      {isGenerating && (
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-primary h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
    </div>
  )
}

