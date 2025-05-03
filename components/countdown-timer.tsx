"use client"

import { useState, useEffect } from "react"

interface CountdownTimerProps {
  targetDate: Date
  className?: string
}

export default function CountdownTimer({ targetDate, className }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      if (difference <= 0) {
        clearInterval(interval)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  return (
    <div className={`flex items-center justify-center space-x-4 ${className}`}>
      <div className="flex flex-col items-center">
        <div className="text-3xl font-bold bg-white text-purple-600 rounded-lg w-16 h-16 flex items-center justify-center shadow-md">
          {timeLeft.days}
        </div>
        <span className="text-xs mt-1 font-medium">Days</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-3xl font-bold bg-white text-purple-600 rounded-lg w-16 h-16 flex items-center justify-center shadow-md">
          {timeLeft.hours}
        </div>
        <span className="text-xs mt-1 font-medium">Hours</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-3xl font-bold bg-white text-purple-600 rounded-lg w-16 h-16 flex items-center justify-center shadow-md">
          {timeLeft.minutes}
        </div>
        <span className="text-xs mt-1 font-medium">Minutes</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-3xl font-bold bg-white text-purple-600 rounded-lg w-16 h-16 flex items-center justify-center shadow-md">
          {timeLeft.seconds}
        </div>
        <span className="text-xs mt-1 font-medium">Seconds</span>
      </div>
    </div>
  )
}
