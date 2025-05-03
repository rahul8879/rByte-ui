"use client"

import { useState } from "react"

// Define toast types
type ToastVariant = "default" | "destructive" | "success"

// Define toast props
interface ToastProps {
  title: string
  description?: string
  variant?: ToastVariant
  duration?: number
}

// Define toast state
interface Toast extends ToastProps {
  id: string
  visible: boolean
}

// Global toast state
let toasts: Toast[] = []
const listeners: Function[] = []

// Function to notify listeners
const notifyListeners = () => {
  listeners.forEach((listener) => listener([...toasts]))
}

// Function to add a toast
export function toast(props: ToastProps) {
  const id = Math.random().toString(36).substring(2, 9)
  const newToast: Toast = {
    id,
    visible: true,
    variant: "default",
    duration: 5000,
    ...props,
  }

  toasts = [...toasts, newToast]
  notifyListeners()

  // Auto-dismiss after duration
  setTimeout(() => {
    dismissToast(id)
  }, newToast.duration)

  return id
}

// Function to dismiss a toast
export function dismissToast(id: string) {
  toasts = toasts.filter((toast) => toast.id !== id)
  notifyListeners()
}

// Hook to use toasts in components
export function useToast() {
  const [currentToasts, setCurrentToasts] = useState<Toast[]>(toasts)

  // Add listener on mount
  useState(() => {
    const listenerIndex = listeners.push(setCurrentToasts) - 1

    // Remove listener on unmount
    return () => {
      listeners.splice(listenerIndex, 1)
    }
  })

  return {
    toasts: currentToasts,
    toast,
    dismiss: dismissToast,
  }
}

// Default export for convenience
export default { toast, dismiss: dismissToast, useToast }
