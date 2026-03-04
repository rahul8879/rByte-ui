"use client"

import { Badge } from "@/components/ui/badge"
import { CheckCircle, ExternalLink, Building2 } from "lucide-react"

type Track = "Data Science" | "GenAI + Agentic" | "Full Stack AI" | "MLOps"
type Difficulty = "Beginner" | "Intermediate" | "Advanced"

interface ProjectShowcaseCardProps {
  title: string
  description: string
  track: Track
  techStack: string[]
  whatYouBuild: string[]
  industryUse: string
  difficulty: Difficulty
  demoUrl?: string
}

const trackConfig: Record<Track, { color: string; bg: string; border: string; dot: string }> = {
  "Data Science": {
    color: "text-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-200",
    dot: "bg-blue-500",
  },
  "GenAI + Agentic": {
    color: "text-purple-700",
    bg: "bg-purple-50",
    border: "border-purple-200",
    dot: "bg-purple-500",
  },
  "Full Stack AI": {
    color: "text-emerald-700",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    dot: "bg-emerald-500",
  },
  MLOps: {
    color: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-200",
    dot: "bg-amber-500",
  },
}

const difficultyConfig: Record<Difficulty, string> = {
  Beginner: "bg-green-100 text-green-800 border-green-200",
  Intermediate: "bg-amber-100 text-amber-800 border-amber-200",
  Advanced: "bg-purple-100 text-purple-800 border-purple-200",
}

export default function ProjectShowcaseCard({
  title,
  description,
  track,
  techStack,
  whatYouBuild,
  industryUse,
  difficulty,
  demoUrl,
}: ProjectShowcaseCardProps) {
  const tc = trackConfig[track]

  return (
    <div className="flex flex-col rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all overflow-hidden group">
      {/* Track accent bar */}
      <div className={`h-1.5 w-full ${tc.dot}`} />

      <div className="flex flex-col flex-1 p-5 gap-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${tc.color} ${tc.bg} ${tc.border}`}>
                {track}
              </span>
              <Badge className={`text-xs ${difficultyConfig[difficulty]}`}>{difficulty}</Badge>
            </div>
            <h3 className="text-lg font-bold text-slate-900 leading-snug">{title}</h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-600 leading-relaxed">{description}</p>

        {/* What you'll build */}
        <div className="space-y-1.5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">What you'll build</p>
          <ul className="space-y-1">
            {whatYouBuild.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech stack */}
        <div className="space-y-1.5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Tech Stack</p>
          <div className="flex flex-wrap gap-1.5">
            {techStack.map((tech, i) => (
              <span
                key={i}
                className="inline-flex items-center rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-medium text-slate-700"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Industry use */}
        <div className={`flex items-start gap-2 rounded-lg p-3 ${tc.bg} border ${tc.border}`}>
          <Building2 className={`h-4 w-4 flex-shrink-0 mt-0.5 ${tc.color}`} />
          <p className={`text-xs leading-relaxed ${tc.color}`}>
            <span className="font-semibold">Used by: </span>{industryUse}
          </p>
        </div>

        {/* Demo link */}
        {demoUrl && (
          <button
            type="button"
            onClick={() => window.open(demoUrl, "_blank")}
            className="mt-auto flex items-center justify-center gap-2 rounded-lg border border-slate-200 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
          >
            View Reference Implementation
            <ExternalLink className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  )
}
