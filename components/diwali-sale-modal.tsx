"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { Sparkles, Flame } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ConsistentButton } from "@/components/ui/consistent-button"

interface DiwaliSaleModalProps {
  onEnroll: () => void
  storageKey?: string
}

const DEFAULT_STORAGE_KEY = "diwali-sale-modal-seen"

export default function DiwaliSaleModal({
  onEnroll,
  storageKey,
}: DiwaliSaleModalProps) {
  const [open, setOpen] = useState(false)
  const key = useMemo(() => storageKey ?? DEFAULT_STORAGE_KEY, [storageKey])

  useEffect(() => {
    if (typeof window === "undefined") return

    const hasSeen = window.localStorage.getItem(key)
    if (hasSeen) return

    const timer = window.setTimeout(() => {
      setOpen(true)
    }, 800)

    return () => window.clearTimeout(timer)
  }, [key])

  const handleClose = useCallback(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, "true")
    }
    setOpen(false)
  }, [key])

  const handleEnroll = useCallback(() => {
    onEnroll()
    handleClose()
  }, [handleClose, onEnroll])

  if (!open) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={(value) => (value ? setOpen(true) : handleClose())}>
      <DialogContent className="max-w-md overflow-hidden border-none bg-gradient-to-br from-orange-50 via-white to-purple-50 p-0 shadow-2xl">
        <div className="relative h-full w-full">
          <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-orange-500/20 blur-3xl" />
          <div className="absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-purple-500/20 blur-3xl" />
          <div className="relative p-6 sm:p-8">
            <DialogHeader className="items-center text-center">
              <div className="flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-700">
                <Flame className="h-4 w-4" />
                Diwali Flash Sale
              </div>
              <DialogTitle className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">
                Celebrate Diwali with <span className="text-orange-600">Brighter Savings</span>
              </DialogTitle>
              <DialogDescription className="mt-3 text-sm text-slate-600 sm:text-base">
                Enroll during the Festival of Lights and unlock limited-time bonuses plus a Diwali-exclusive pricing
                upgrade.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 grid gap-4 text-sm text-slate-700">
              <div className="flex items-center gap-3 rounded-lg border border-orange-200 bg-white/80 p-3 shadow-sm">
                <Sparkles className="h-5 w-5 text-orange-500" />
                <span>Flat 30% Diwali discount across online, offline, and accelerator programs.</span>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-purple-200 bg-white/80 p-3 shadow-sm">
                <Sparkles className="h-5 w-5 text-purple-500" />
                <span>Bonus AI micro-project kit worth ₹9,999 plus 1:1 mentorship with our lead architect.</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ConsistentButton
                size="lg"
                variant="gradient"
                className="btn-shimmer w-full"
                onClick={handleEnroll}
                rightIcon={<Sparkles className="h-4 w-4" />}
              >
                Enroll Now
              </ConsistentButton>
              <button
                type="button"
                className="w-full rounded-lg border border-transparent bg-transparent text-sm font-semibold text-slate-500 transition hover:text-slate-700"
                onClick={handleClose}
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
