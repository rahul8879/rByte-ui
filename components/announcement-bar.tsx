"use client"

import { Megaphone, CalendarDays } from "lucide-react"

interface AnnouncementBarProps {
  nextBatchDateText?: string
  ctaText?: string
  onCtaClick?: () => void
}

export default function AnnouncementBar({
  nextBatchDateText = "Next weekend batch starts soon",
  ctaText = "View Schedule",
  onCtaClick,
}: AnnouncementBarProps) {
  return (
    <div className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white">
      <div className="container px-4 md:px-6 py-2.5 flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <Megaphone className="h-4 w-4" />
          <span className="hidden sm:inline">Limited seats available •</span>
          <span className="flex items-center gap-1">
            <CalendarDays className="h-4 w-4 opacity-90" /> {nextBatchDateText}
          </span>
        </div>
        <button
          type="button"
          onClick={onCtaClick}
          className="rounded-full bg-white/15 hover:bg-white/25 transition-colors px-3 py-1"
        >
          {ctaText}
        </button>
      </div>
    </div>
  )
}

