"use client"

import { useState, useEffect, useRef } from "react"

const ERAS = [
  {
    id: 1,
    period: "Before 2016",
    label: "Pre-AI",
    icon: "🗄️",
    tagline: "If-else rules and spreadsheets",
    color: "#64748b",
    glow: "rgba(100,116,139,0.25)",
    border: "rgba(100,116,139,0.3)",
    bg: "rgba(100,116,139,0.07)",
    dim: true,
    description:
      "Business logic was hard-coded. 'Smart systems' meant a chain of if-else rules. Data lived in Excel. Insights required a data analyst, a week of work, and a PowerPoint deck.",
    skills: ["SQL", "Excel", "VBA Macros", "Rule-based systems", "Basic stats"],
    reality: "Slow, expensive, and brittle. One new business rule broke everything.",
    realityColor: "#ef4444",
  },
  {
    id: 2,
    period: "2016 – 2021",
    label: "ML Era",
    icon: "📊",
    tagline: "Predict from patterns in data",
    color: "#3b82f6",
    glow: "rgba(59,130,246,0.25)",
    border: "rgba(59,130,246,0.3)",
    bg: "rgba(59,130,246,0.07)",
    dim: true,
    description:
      "Machine Learning arrived. Models could learn from historical data, predict outcomes, and classify at scale. But it still required specialist ML engineers, clean datasets, and months of tuning.",
    skills: ["Scikit-learn", "XGBoost", "TensorFlow", "Pandas", "Jupyter"],
    reality: "Powerful but siloed. Getting a model to production took 6 months and a team.",
    realityColor: "#f59e0b",
  },
  {
    id: 3,
    period: "2022 – 2023",
    label: "LLM Boom",
    icon: "💬",
    tagline: "ChatGPT changes everything",
    color: "#a855f7",
    glow: "rgba(168,85,247,0.25)",
    border: "rgba(168,85,247,0.3)",
    bg: "rgba(168,85,247,0.07)",
    dim: true,
    description:
      "Large Language Models made AI accessible to everyone. A single prompt could write code, summarise documents, and answer questions. But using ChatGPT is not the same as building AI products.",
    skills: ["OpenAI API", "Prompt Engineering", "Embeddings", "Fine-tuning basics"],
    reality: "Everyone can use AI. Almost no-one can build and ship reliable AI products.",
    realityColor: "#f59e0b",
  },
  {
    id: 4,
    period: "2024 → Now",
    label: "Agentic AI",
    icon: "🤖",
    tagline: "AI that reasons, retrieves & acts",
    color: "#10b981",
    glow: "rgba(16,185,129,0.35)",
    border: "rgba(16,185,129,0.45)",
    bg: "rgba(16,185,129,0.08)",
    dim: false,
    badge: "What we teach",
    description:
      "AI systems that don't just respond — they plan, retrieve external knowledge, use tools, call APIs, and complete multi-step tasks autonomously. This is the current frontier. Engineers who can build agentic AI are the rarest and highest-paid in the market.",
    skills: ["LangChain Agents", "RAG Pipelines", "Vector Databases", "FastAPI", "LLMOps", "Multi-agent systems"],
    reality: "3% of developers can build this. The other 97% are trying to catch up.",
    realityColor: "#10b981",
  },
]

const TICK_MS = 3200

export default function AIEraSection() {
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startTimers = (fromIndex: number) => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (progressRef.current) clearInterval(progressRef.current)

    setProgress(0)

    progressRef.current = setInterval(() => {
      setProgress(p => Math.min(p + (100 / (TICK_MS / 50)), 100))
    }, 50)

    timerRef.current = setInterval(() => {
      setActive(prev => {
        const next = (prev + 1) % ERAS.length
        return next
      })
      setProgress(0)
    }, TICK_MS)
  }

  useEffect(() => {
    startTimers(0)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (progressRef.current) clearInterval(progressRef.current)
    }
  }, [])

  const handleSelect = (i: number) => {
    setActive(i)
    startTimers(i)
  }

  const era = ERAS[active]

  return (
    <section className="w-full py-16 md:py-24 relative overflow-hidden" style={{ background: "#020617" }}>
      {/* Top / bottom dividers */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-700/60 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-700/60 to-transparent" />

      {/* Background glow that follows active era */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700"
        style={{ background: `radial-gradient(ellipse 70% 50% at 50% 50%, ${era.glow}, transparent 65%)` }}
      />

      <div className="container px-4 md:px-6 relative z-10 max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-800/70 border border-slate-700/50 px-4 py-1.5 text-sm text-slate-300 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
            The AI landscape has shifted — 4 times
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-3">
            Where are you in the AI timeline?
          </h2>
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            Every era demanded different skills. The engineers who saw each shift early built the biggest careers.
            The next shift is happening right now.
          </p>
        </div>

        {/* Era selector tabs */}
        <div className="flex items-stretch gap-2 md:gap-3 mb-8 overflow-x-auto pb-1">
          {ERAS.map((e, i) => (
            <button
              key={e.id}
              onClick={() => handleSelect(i)}
              className="flex-1 min-w-[120px] rounded-xl border px-3 py-3 text-left transition-all duration-300 cursor-pointer"
              style={{
                background: active === i ? e.bg : "rgba(255,255,255,0.02)",
                borderColor: active === i ? e.border : "rgba(255,255,255,0.07)",
                opacity: active === i ? 1 : 0.55,
                transform: active === i ? "scale(1.02)" : "scale(1)",
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{e.icon}</span>
                {e.badge && (
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                    style={{ background: `${e.color}22`, color: e.color, border: `1px solid ${e.border}` }}
                  >
                    {e.badge}
                  </span>
                )}
              </div>
              <div className="text-white font-bold text-sm leading-tight">{e.label}</div>
              <div className="text-xs mt-0.5" style={{ color: active === i ? e.color : "#64748b" }}>{e.period}</div>
            </button>
          ))}
        </div>

        {/* Progress bar */}
        <div className="h-0.5 rounded-full bg-slate-800 mb-8 overflow-hidden">
          <div
            className="h-full rounded-full transition-none"
            style={{
              width: `${progress}%`,
              background: `linear-gradient(90deg, ${era.color}, ${era.color}88)`,
              transition: "width 0.05s linear",
            }}
          />
        </div>

        {/* Active era card */}
        <div
          className="rounded-2xl border p-7 md:p-10 transition-all duration-500"
          style={{ background: era.bg, borderColor: era.border }}
          key={active}
        >
          <div className="flex flex-col md:flex-row gap-8">

            {/* Left — description */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{era.icon}</span>
                <div>
                  <h3 className="text-white text-xl font-black">{era.label} Era</h3>
                  <p className="text-sm font-medium" style={{ color: era.color }}>{era.tagline}</p>
                </div>
              </div>

              <p className="text-slate-300 text-base leading-relaxed mb-6">{era.description}</p>

              {/* Reality check */}
              <div
                className="rounded-xl px-4 py-3 text-sm font-medium"
                style={{
                  background: `${era.realityColor}11`,
                  border: `1px solid ${era.realityColor}30`,
                  color: era.realityColor,
                }}
              >
                {active === 3 ? "⚡ " : active === 0 ? "⚠️ " : "⚡ "}
                {era.reality}
              </div>
            </div>

            {/* Right — skills */}
            <div className="md:w-64 flex-shrink-0">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
                {active === 3 ? "What you learn at RByte" : "Key skills of this era"}
              </p>
              <div className="flex flex-wrap gap-2">
                {era.skills.map(s => (
                  <span
                    key={s}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg"
                    style={{
                      background: `${era.color}15`,
                      border: `1px solid ${era.color}30`,
                      color: active === 3 ? era.color : "#94a3b8",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>

              {active === 3 && (
                <div className="mt-5 rounded-xl p-4 text-center" style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)" }}>
                  <p className="text-emerald-400 text-sm font-bold mb-1">This is the frontier.</p>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Our cohort starts May 5. Founder pricing closes when seats fill.
                  </p>
                  <a
                    href="#pricing"
                    className="mt-3 inline-block text-xs font-bold px-4 py-2 rounded-lg text-white"
                    style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}
                  >
                    See Founder Pricing →
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom connector → CurriculumPath */}
        <div className="text-center mt-10 space-y-2">
          <p className="text-slate-400 text-sm">
            At RByte.ai we skip the history lesson and put you directly in{" "}
            <span className="text-emerald-400 font-semibold">Era 4</span> — from day one.
          </p>
          <p className="text-slate-500 text-xs">
            ↓ Here's exactly what that curriculum looks like
          </p>
        </div>

      </div>
    </section>
  )
}
