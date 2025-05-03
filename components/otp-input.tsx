"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface OTPInputProps {
  length?: number
  onComplete: (otp: string) => void
  disabled?: boolean
  autoFocus?: boolean
  className?: string
}

export function OTPInput({ length = 6, onComplete, disabled = false, autoFocus = true, className }: OTPInputProps) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length)
  }, [length])

  // Auto focus on first input when component mounts
  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0]?.focus()
    }
  }, [autoFocus])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value

    // Only allow digits
    if (!/^\d*$/.test(value)) return

    // Update the OTP array
    const newOtp = [...otp]

    // If user is pasting multiple digits
    if (value.length > 1) {
      // Fill the current and subsequent inputs
      const pastedValues = value.split("").slice(0, length - index)
      pastedValues.forEach((val, i) => {
        if (index + i < length) {
          newOtp[index + i] = val
        }
      })
      setOtp(newOtp)

      // Focus on the next empty input or the last input
      const nextIndex = Math.min(index + pastedValues.length, length - 1)
      if (inputRefs.current[nextIndex]) {
        inputRefs.current[nextIndex]?.focus()
      }
    } else {
      // Handle single digit input
      newOtp[index] = value.slice(-1)
      setOtp(newOtp)

      // Auto-focus next input if available
      if (value && index < length - 1 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1]?.focus()
      }
    }

    // Check if OTP is complete
    const filledOtp = newOtp.join("")
    if (filledOtp.length === length) {
      onComplete(filledOtp)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // Handle backspace
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        // If current input is empty, focus previous input
        const newOtp = [...otp]
        newOtp[index - 1] = ""
        setOtp(newOtp)
        if (inputRefs.current[index - 1]) {
          inputRefs.current[index - 1]?.focus()
        }
      } else {
        // Clear current input
        const newOtp = [...otp]
        newOtp[index] = ""
        setOtp(newOtp)
      }
    }

    // Handle arrow keys
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
    if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, index: number) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").trim()

    // Only allow digits
    if (!/^\d*$/.test(pastedData)) return

    const newOtp = [...otp]
    const pastedChars = pastedData.split("").slice(0, length - index)

    pastedChars.forEach((char, i) => {
      if (index + i < length) {
        newOtp[index + i] = char
      }
    })

    setOtp(newOtp)

    // Focus on the next empty input or the last input
    const nextIndex = Math.min(index + pastedChars.length, length - 1)
    if (inputRefs.current[nextIndex]) {
      inputRefs.current[nextIndex]?.focus()
    }

    // Check if OTP is complete
    const filledOtp = newOtp.join("")
    if (filledOtp.length === length) {
      onComplete(filledOtp)
    }
  }

  return (
    <div className={cn("flex flex-col space-y-4", className)}>
      <div className="flex justify-center space-x-2">
        {Array.from({ length }).map((_, index) => (
          <Input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={otp[index]}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={(e) => handlePaste(e, index)}
            disabled={disabled}
            className="w-12 h-12 text-center text-xl font-bold"
            aria-label={`OTP digit ${index + 1}`}
          />
        ))}
      </div>
      <Button
        onClick={() => onComplete(otp.join(""))}
        disabled={disabled || otp.join("").length !== length}
        className="w-full"
      >
        Verify OTP
      </Button>
    </div>
  )
}
