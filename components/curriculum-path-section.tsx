"use client"

import { useState } from "react"

const PHASES = [
  {
    id: "foundations",
    label: "Foundations",
    emoji: "🐍",
    topics: ["Python for AI", "NumPy & Pandas", "Statistics", "SQL & Data Wrangling"],
    color: "#3b82f6",
  },
  {
    id: "ml",
    label: "Machine Learning",
    emoji: "📊",
    topics: ["Supervised ML", "Unsupervised ML", "Feature Engineering", "Model Evaluation"],
    color: "#6366f1",
  },
  {
    id: "dl",
    label: "Deep Learning",
    emoji: "🧠",
    topics: ["Neural Networks", "CNNs & RNNs", "TensorFlow/PyTorch", "Transfer Learning"],
    color: "#8b5cf6",
  },
  {
    id: "llms",
    label: "LLMs & GenAI",
    emoji: "💬",
    topics: ["LLM Fundamentals", "Prompt Engineering", "Embeddings", "RAG Design"],
    color: "#a855f7",
  },
  {
    id: "agents",
    label: "Agentic AI",
    emoji: "🤖",
    topics: ["LangChain Agents", "Tool Calling", "Multi-Agent Systems", "Memory & Planning"],
    color: "#ec4899",
  },
  {
    id: "production",
    label: "Production",
    emoji: "🚀",
    topics: ["FastAPI", "Docker", "Cloud Deploy", "CI/CD Pipelines"],
    color: "#10b981",
  },
  {
    id: "mlops",
    label: "MLOps / LLMOps",
    emoji: "⚙️",
    topics: ["Feature Pipelines", "Model Registry", "Monitoring & Drift", "LLM Observability"],
    color: "#14b8a6",
  },
]

const TRACKS = [
  {
    id: "ds",
    label: "Data Science",
    shortLabel: "DS",
    color: "#3b82f6",
    glow: "rgba(59,130,246,0.3)",
    phases: ["foundations", "ml", "dl"],
    price: "₹17,999",
    weeks: "12-16 wks",
    desc: "Master the data foundations — ML, deep learning, real datasets.",
  },
  {
    id: "genai",
    label: "GenAI + Agentic AI",
    shortLabel: "GenAI",
    color: "#a855f7",
    glow: "rgba(168,85,247,0.3)",
    phases: ["llms", "agents", "production"],
    price: "₹19,999",
    weeks: "10-14 wks",
    desc: "Jump into LLMs, RAG, agents and deploy production GenAI apps.",
  },
  {
    id: "fullstack",
    label: "Full Stack AI",
    shortLabel: "Full Stack",
    color: "#ec4899",
    glow: "rgba(236,72,153,0.3)",
    phases: ["foundations", "ml", "dl", "llms", "agents", "production"],
    price: "₹29,999",
    weeks: "24-28 wks",
    desc: "The complete journey — from zero to deployed AI engineer.",
    highlight: true,
  },
  {
    id: "mlops",
    label: "MLOps + LLMOps",
    shortLabel: "MLOps",
    color: "#14b8a6",
    glow: "rgba(20,184,166,0.3)",
    phases: ["production", "mlops"],
    price: "₹14,999",
    weeks: "8-12 wks",
    desc: "Own the production layer — deploy, monitor, scale AI systems.",
  },
]

export default function CurriculumPathSection() {
  const [activeTrack, setActiveTrack] = useState<string | null>(null)

  const active = TRACKS.find(t => t.id === activeTrack) ?? null

  const isPhaseActive = (phaseId: string) => {
    if (!active) return true
    return active.phases.includes(phaseId)
  }

  return (
    <section className="w-full py-16 md:py-24 relative overflow-hidden" style={{ background: "#020617" }}>
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700"
        style={{
          background: active
            ? `radial-gradient(ellipse 70% 60% at 50% 40%, ${active.glow}, transparent 65%)`
            : "radial-gradient(ellipse 60% 40% at 50% 40%, rgba(168,85,247,0.06), transparent 65%)",
        }}
      />

      <div className="container px-4 md:px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-800/70 border border-slate-700/50 px-4 py-1.5 text-sm text-slate-300 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
            Full Stack AI Engineering · Complete Curriculum
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-3">
            We teach{" "}
            <span style={{
              background: "linear-gradient(90deg, #a855f7, #ec4899, #10b981)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              all of this.
            </span>
          </h2>
          <p className="text-slate-400 text-base max-w-2xl mx-auto">
            One complete path from Python foundations to deployed agentic AI systems.
            Tracks are just entry points into the same journey.{" "}
            <span className="text-slate-300">Hover any track to see which phases it covers.</span>
          </p>
        </div>

        {/* Phase nodes — full path */}
        <div className="relative mb-4">
          {/* Connector line */}
          <div className="absolute top-8 left-0 right-0 h-px z-0 hidden md:block"
            style={{ background: "linear-gradient(90deg, #3b82f6, #6366f1, #8b5cf6, #a855f7, #ec4899, #10b981, #14b8a6)" }}
          />

          <div className="grid grid-cols-4 md:grid-cols-7 gap-3 relative z-10">
            {PHASES.map(phase => {
              const lit = isPhaseActive(phase.id)
              return (
                <div
                  key={phase.id}
                  className="flex flex-col items-center gap-2 transition-all duration-300"
                  style={{ opacity: lit ? 1 : 0.25, transform: lit ? "scale(1)" : "scale(0.95)" }}
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl border transition-all duration-300"
                    style={{
                      background: lit ? `${phase.color}18` : "rgba(255,255,255,0.03)",
                      borderColor: lit ? `${phase.color}50` : "rgba(255,255,255,0.06)",
                      boxShadow: lit ? `0 0 20px ${phase.color}25` : "none",
                    }}
                  >
                    {phase.emoji}
                  </div>
                  <span
                    className="text-xs font-bold text-center leading-tight transition-colors duration-300"
                    style={{ color: lit ? phase.color : "#334155" }}
                  >
                    {phase.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Track coverage bars */}
        <div className="mb-10 space-y-2">
          {TRACKS.map(track => {
            const startIdx = PHASES.findIndex(p => track.phases.includes(p.id))
            const endIdx   = PHASES.map(p => track.phases.includes(p.id) ? 1 : 0).lastIndexOf(1)
            const colStart = startIdx + 1
            const colSpan  = endIdx - startIdx + 1

            return (
              <div key={track.id} className="grid grid-cols-4 md:grid-cols-7 gap-3 items-center">
                {/* Spacer columns before */}
                {Array.from({ length: startIdx }).map((_, i) => <div key={i} />)}
                {/* Colored bar */}
                <div
                  className={`col-span-${colSpan} rounded-full h-6 flex items-center px-3 cursor-pointer transition-all duration-200 select-none`}
                  style={{
                    gridColumn: `${colStart} / span ${colSpan}`,
                    background: activeTrack === track.id
                      ? `linear-gradient(90deg, ${track.color}55, ${track.color}33)`
                      : `${track.color}18`,
                    border: `1px solid ${track.color}${activeTrack === track.id ? "70" : "35"}`,
                    boxShadow: activeTrack === track.id ? `0 0 16px ${track.color}30` : "none",
                  }}
                  onMouseEnter={() => setActiveTrack(track.id)}
                  onMouseLeave={() => setActiveTrack(null)}
                >
                  <span
                    className="text-[11px] font-bold truncate"
                    style={{ color: activeTrack === track.id ? track.color : `${track.color}cc` }}
                  >
                    {track.label}
                  </span>
                </div>
                {/* Spacer columns after */}
                {Array.from({ length: PHASES.length - endIdx - 1 }).map((_, i) => <div key={i} />)}
              </div>
            )
          })}
        </div>

        {/* Track cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TRACKS.map(track => (
            <div
              key={track.id}
              className="rounded-2xl border p-5 cursor-pointer transition-all duration-200 relative"
              style={{
                background: activeTrack === track.id
                  ? `${track.color}10`
                  : "rgba(255,255,255,0.02)",
                borderColor: activeTrack === track.id ? `${track.color}50` : "rgba(255,255,255,0.07)",
                transform: activeTrack === track.id ? "translateY(-2px)" : "none",
                boxShadow: activeTrack === track.id ? `0 8px 32px ${track.color}20` : "none",
              }}
              onMouseEnter={() => setActiveTrack(track.id)}
              onMouseLeave={() => setActiveTrack(null)}
            >
              {track.highlight && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full text-white"
                  style={{ background: `linear-gradient(90deg, ${track.color}, #a855f7)` }}
                >
                  Best Value · All Phases
                </div>
              )}
              <div className="flex items-center justify-between mb-3">
                <span
                  className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                  style={{ background: `${track.color}20`, color: track.color, border: `1px solid ${track.color}35` }}
                >
                  {track.shortLabel}
                </span>
                <span className="text-slate-500 text-xs">{track.weeks}</span>
              </div>
              <h4 className="text-white font-bold text-sm mb-1 leading-snug">{track.label}</h4>
              <p className="text-slate-500 text-xs leading-relaxed mb-3">{track.desc}</p>
              <div className="flex items-center justify-between">
                <span className="font-black text-base" style={{ color: track.color }}>{track.price}</span>
                <span className="text-slate-600 text-xs">Founder price</span>
              </div>
              {/* Phase dots */}
              <div className="flex gap-1 mt-3 flex-wrap">
                {PHASES.map(p => (
                  <div
                    key={p.id}
                    className="w-1.5 h-1.5 rounded-full transition-all duration-200"
                    style={{
                      background: track.phases.includes(p.id)
                        ? track.color
                        : "rgba(255,255,255,0.1)",
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-slate-600 text-sm mt-8">
          Not sure which track fits you?{" "}
          <a href="/demo" className="underline underline-offset-2" style={{ color: "#a855f7" }}>
            Attend the free live session first →
          </a>
        </p>
      </div>
    </section>
  )
}
