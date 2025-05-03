"use client"

import { useState } from "react"
import { Play, Pause, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface VideoPlayerProps {
  thumbnailUrl: string
  videoTitle: string
  videoDescription: string
  youtubeId?: string
  onClose?: () => void
}

export default function VideoPlayer({
  thumbnailUrl,
  videoTitle,
  videoDescription,
  youtubeId,
  onClose,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlayClick = () => {
    setIsPlaying(true)
  }

  return (
    <div className="relative rounded-xl overflow-hidden shadow-xl">
      {!isPlaying ? (
        <div className="aspect-video bg-slate-900 relative flex items-center justify-center">
          <img
            src={thumbnailUrl || "/placeholder.svg"}
            alt={videoTitle}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 to-pink-900/40"></div>
          <div className="absolute flex flex-col items-center justify-center text-white">
            <Button
              onClick={handlePlayClick}
              className="bg-white/20 backdrop-blur-sm rounded-full p-8 mb-4 hover:bg-white/30 transition-all"
              variant="ghost"
              size="icon"
            >
              <Play className="h-10 w-10" />
            </Button>
            <h3 className="text-xl font-bold mb-2">{videoTitle}</h3>
            <p className="text-sm text-center max-w-md px-4">{videoDescription}</p>
          </div>
        </div>
      ) : (
        <div className="w-full aspect-video bg-black">
          {youtubeId ? (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
              title={videoTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-white text-center">
                <p className="text-xl font-bold mb-4">Video is playing</p>
                <Button
                  onClick={() => setIsPlaying(false)}
                  variant="outline"
                  className="border-white text-white hover:bg-white/20"
                >
                  <Pause className="mr-2 h-4 w-4" />
                  Pause Video
                </Button>
              </div>
            </div>
          )}

          {onClose && (
            <Button
              onClick={onClose}
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20 z-10"
            >
              <X className="h-6 w-6" />
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
