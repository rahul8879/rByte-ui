"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { Gift, Snowflake, Sparkles } from "lucide-react"

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

const DEFAULT_STORAGE_KEY = "holiday-sale-modal-seen"

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
          <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-sky-300/30 blur-3xl" />
          <div className="absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-emerald-300/30 blur-3xl" />
          <div className="relative p-6 sm:p-8">
            <DialogHeader className="items-center text-center">
              <div className="flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sky-700">
                <Snowflake className="h-4 w-4" />
                Christmas &amp; New Year Flash Sale
              </div>
              <DialogTitle className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">
                Celebrate Year-End with <span className="text-emerald-700">Joyful Savings</span>
              </DialogTitle>
              <DialogDescription className="mt-3 text-sm text-slate-600 sm:text-base">
                Close the year strong with our biggest holiday offer—unlock the online program at ₹59,000 with a 50%
                slash plus festive bonuses.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 grid gap-4 text-sm text-slate-700">
              <div className="flex items-center gap-3 rounded-lg border border-sky-200 bg-white/80 p-3 shadow-sm">
                <Sparkles className="h-5 w-5 text-sky-600" />
                <span>50% off the online program—now ₹59,000 for the holiday cohort.</span>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-emerald-200 bg-white/80 p-3 shadow-sm">
                <Gift className="h-5 w-5 text-emerald-600" />
                <span>Festive starter kit + 1:1 mentor call when you enroll before the New Year countdown ends.</span>
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
