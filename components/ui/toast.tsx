"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { dismissToast, useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

interface ToastProps {
  id: string
  title: string
  description?: string
  variant?: "default" | "destructive" | "success"
  visible: boolean
}

export function Toast({ id, title, description, variant = "default", visible }: ToastProps) {
  const [isVisible, setIsVisible] = useState(visible)

  useEffect(() => {
    setIsVisible(visible)
  }, [visible])

  const handleDismiss = () => {
    setIsVisible(false)
    setTimeout(() => {
      dismissToast(id)
    }, 300) // Animation duration
  }

  if (!isVisible) return null

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-50 max-w-md rounded-lg shadow-lg transition-all duration-300 transform",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
        variant === "destructive"
          ? "bg-red-50 border border-red-200"
          : variant === "success"
            ? "bg-green-50 border border-green-200"
            : "bg-white border border-gray-200",
      )}
    >
      <div className="flex p-4">
        <div className="flex-1">
          <h3
            className={cn(
              "font-medium",
              variant === "destructive" ? "text-red-800" : variant === "success" ? "text-green-800" : "text-gray-900",
            )}
          >
            {title}
          </h3>
          {description && (
            <p
              className={cn(
                "text-sm mt-1",
                variant === "destructive" ? "text-red-700" : variant === "success" ? "text-green-700" : "text-gray-700",
              )}
            >
              {description}
            </p>
          )}
        </div>
        <button
          onClick={handleDismiss}
          className={cn(
            "ml-4 inline-flex shrink-0 items-center justify-center rounded-md p-1",
            variant === "destructive"
              ? "text-red-500 hover:bg-red-100"
              : variant === "success"
                ? "text-green-500 hover:bg-green-100"
                : "text-gray-500 hover:bg-gray-100",
          )}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export function ToastContainer() {
  const { toasts } = useToast()

  return (
    <div className="fixed bottom-0 right-0 z-50 p-4 space-y-4">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  )
}
