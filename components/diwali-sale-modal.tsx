"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { Rocket, Sparkles, Zap } from "lucide-react"

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

const DEFAULT_STORAGE_KEY = "cohort-2026-launch-modal-seen"

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
      <DialogContent className="max-w-md overflow-hidden border-none bg-gradient-to-br from-slate-950 via-sky-950 to-emerald-950 p-0 shadow-2xl">
        <div className="relative h-full w-full">
          <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-emerald-500/20 blur-3xl" />
          <div className="absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-sky-500/20 blur-3xl" />
          <div className="relative p-6 sm:p-8">
            <DialogHeader className="items-center text-center">
              <div className="flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-300">
                <Rocket className="h-4 w-4" />
                2026 Cohort — Now Open
              </div>
              <DialogTitle className="mt-4 text-2xl font-bold text-white sm:text-3xl">
                Become an{" "}
                <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
                  Agentic AI Engineer
                </span>{" "}
                in 2026
              </DialogTitle>
              <DialogDescription className="mt-3 text-sm text-slate-300 sm:text-base">
                New cohort starts <strong className="text-white">April 5, 2026</strong>. Only 5 seats
                remaining. Claim your 50% early-bird discount before they're gone.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 grid gap-3 text-sm">
              <div className="flex items-center gap-3 rounded-lg border border-emerald-500/30 bg-white/5 p-3">
                <Sparkles className="h-5 w-5 flex-shrink-0 text-emerald-400" />
                <span className="text-slate-200">
                  50% early-bird discount — limited to the first 5 enrollments.
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-sky-500/30 bg-white/5 p-3">
                <Zap className="h-5 w-5 flex-shrink-0 text-sky-400" />
                <span className="text-slate-200">
                  Choose your track: Data Science · GenAI + Agentic AI · Full Stack AI · MLOps
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ConsistentButton
                size="lg"
                variant="gradient"
                className="btn-shimmer w-full"
                onClick={handleEnroll}
                rightIcon={<Rocket className="h-4 w-4" />}
              >
                Claim My Seat — 50% Off
              </ConsistentButton>
              <button
                type="button"
                className="w-full rounded-lg border border-transparent bg-transparent text-sm font-semibold text-slate-400 transition hover:text-slate-200"
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
