"use client"

import { TrendingUp, Bot, Zap, AlertTriangle, ArrowRight, BrainCircuit, Layers } from "lucide-react"

const SHIFT_ROWS = [
  {
    year: "2022–23",
    world: "Everyone learns to use ChatGPT",
    reality: "Prompt engineering hype. Zero job security.",
    tone: "text-slate-400",
  },
  {
    year: "2024–25",
    world: "Companies deploy AI in every department",
    reality: "Roles get automated. Teams shrink. Salaries stagnate.",
    tone: "text-amber-400",
  },
  {
    year: "2026+",
    world: "Agentic AI engineers design the systems",
    reality: "₹22–45 LPA. Highest demand in tech history.",
    tone: "text-emerald-400",
  },
]

const AGENT_VS_USER = [
  {
    label: "AI User",
    icon: "💬",
    points: ["Types prompts into ChatGPT", "Depends on what the model gives", "Replaceable by next prompt tool", "₹6–12 LPA ceiling"],
    bg: "bg-red-950/40 border-red-800/40",
    badge: "bg-red-900/60 text-red-300",
    badgeText: "Commodity Skill",
  },
  {
    label: "AI Engineer",
    icon: "⚙️",
    points: ["Builds multi-step AI agents", "Designs RAG pipelines & LLM apps", "Creates the automation others use", "₹22–45 LPA — growing every quarter"],
    bg: "bg-emerald-950/40 border-emerald-700/40",
    badge: "bg-emerald-900/60 text-emerald-300",
    badgeText: "The Moat",
  },
]

const WHY_AGENTIC = [
  {
    icon: BrainCircuit,
    title: "Not just chat — autonomous action",
    desc: "An AI agent browses the web, writes code, books meetings, and files reports on its own. Companies are replacing entire workflow teams with a single well-built agent.",
    color: "text-sky-400",
    bg: "bg-sky-950/30 border-sky-800/30",
  },
  {
    icon: Layers,
    title: "Every industry is racing to build them",
    desc: "Zomato, Razorpay, PhonePe, Meesho — every funded startup in India has active Agentic AI projects. They can't find engineers fast enough.",
    color: "text-purple-400",
    bg: "bg-purple-950/30 border-purple-800/30",
  },
  {
    icon: Zap,
    title: "The skill gap is massive — and temporary",
    desc: "Only ~3% of Indian developers can build production-grade AI systems today. That window closes within 18 months as universities catch up.",
    color: "text-amber-400",
    bg: "bg-amber-950/30 border-amber-800/30",
  },
]

export default function WhyGenAISection() {
  return (
    <section className="w-full bg-slate-950 text-white py-16 md:py-24">
      <div className="container px-4 md:px-6 max-w-6xl mx-auto space-y-20">

        {/* ── Headline ─────────────────────────────────────── */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-1.5 text-sm text-amber-400 font-medium">
            <AlertTriangle className="h-4 w-4" />
            The shift happening right now
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            The World Just Split Into<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">
              Two Types of Workers
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Those who <strong className="text-white">build AI systems</strong> — and those whose jobs those systems replace.
            GenAI and Agentic AI aren't the future. They're <strong className="text-white">happening right now.</strong>
          </p>
        </div>

        {/* ── AI User vs AI Engineer ────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {AGENT_VS_USER.map((col) => (
            <div
              key={col.label}
              className={`rounded-2xl border p-6 space-y-4 ${col.bg}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{col.icon}</span>
                  <h3 className="text-xl font-bold text-white">{col.label}</h3>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${col.badge}`}>
                  {col.badgeText}
                </span>
              </div>
              <ul className="space-y-2.5">
                {col.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="mt-0.5 text-slate-500">—</span>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Timeline ─────────────────────────────────────── */}
        <div className="space-y-4">
          <h3 className="text-center text-xl font-bold text-slate-200">How We Got Here</h3>
          <div className="overflow-hidden rounded-2xl border border-slate-800">
            {SHIFT_ROWS.map((row, i) => (
              <div
                key={row.year}
                className={`flex flex-col sm:flex-row sm:items-center gap-3 px-6 py-5 ${
                  i !== SHIFT_ROWS.length - 1 ? "border-b border-slate-800" : ""
                } ${i === SHIFT_ROWS.length - 1 ? "bg-emerald-950/20" : ""}`}
              >
                <span className={`w-24 flex-shrink-0 text-sm font-bold ${row.tone}`}>
                  {row.year}
                </span>
                <span className="flex-1 text-white font-medium">{row.world}</span>
                <span className={`text-sm ${row.tone}`}>{row.reality}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Why Agentic AI specifically ────────────────────── */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl md:text-3xl font-bold">
              Why <span className="text-sky-400">Agentic AI</span> — not just GenAI?
            </h3>
            <p className="text-slate-400 max-w-xl mx-auto">
              ChatGPT answers questions. Agents <em>do things</em>. That distinction is worth ₹10–30 LPA extra.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {WHY_AGENTIC.map((card) => (
              <div
                key={card.title}
                className={`rounded-xl border p-5 space-y-3 ${card.bg}`}
              >
                <card.icon className={`h-7 w-7 ${card.color}`} />
                <h4 className="font-semibold text-white leading-snug">{card.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Stats bar ────────────────────────────────────── */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 grid grid-cols-2 md:grid-cols-4">
          {[
            { value: "375M", label: "Workers need to reskill by 2030", source: "McKinsey" },
            { value: "₹45 LPA", label: "Senior AI Engineer avg. salary (India)", source: "AmbitionBox 2025" },
            { value: "3%", label: "Developers who can build AI systems today", source: "NASSCOM" },
            { value: "18 mo.", label: "Window before universities close the gap", source: "WEF estimate" },
          ].map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col items-center text-center px-4 py-6 gap-1
                ${i % 2 !== 0 ? "border-l border-slate-800" : ""}
                ${i >= 2 ? "border-t border-slate-800" : ""}
                md:border-t-0
                ${i > 0 ? "md:border-l md:border-slate-800" : ""}
              `}
            >
              <span className="text-2xl md:text-3xl font-extrabold text-white">{s.value}</span>
              <span className="text-xs text-slate-400 leading-snug">{s.label}</span>
              <span className="text-[10px] text-slate-600 mt-1">{s.source}</span>
            </div>
          ))}
        </div>

        {/* ── CTA nudge ────────────────────────────────────── */}
        <div className="text-center space-y-3">
          <p className="text-slate-400 text-base">
            Rbyte.ai is built for exactly this moment — practical, portfolio-first, job-focused.
          </p>
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:opacity-90 transition-opacity"
          >
            See how we train AI engineers <ArrowRight className="h-4 w-4" />
          </a>
        </div>

      </div>
    </section>
  )
}
