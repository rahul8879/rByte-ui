"use client"

import { ShieldCheck, Code2, Layers, Rocket, GitBranch, Users, Star, RefreshCw } from "lucide-react"

const PROJECTS = [
  {
    icon: <Layers className="h-6 w-6" />,
    track: "GenAI + Agentic AI",
    color: "from-purple-500/20 to-indigo-500/20",
    border: "border-purple-500/20",
    iconColor: "text-purple-400",
    title: "RAG-Powered HR Chatbot",
    desc: "An AI assistant that reads your company's HR policy PDFs and answers employee questions in real-time — deployed with a live API.",
    tags: ["LangChain", "ChromaDB", "FastAPI", "OpenAI"],
  },
  {
    icon: <GitBranch className="h-6 w-6" />,
    track: "Full Stack AI",
    color: "from-emerald-500/20 to-teal-500/20",
    border: "border-emerald-500/20",
    iconColor: "text-emerald-400",
    title: "AI-Powered Sales Intelligence Tool",
    desc: "Ingests CRM data, detects patterns with ML, summarises deal risk with an LLM, and surfaces insights via a React dashboard.",
    tags: ["Scikit-learn", "LangChain", "Next.js", "Azure"],
  },
  {
    icon: <Code2 className="h-6 w-6" />,
    track: "Data Science (ML + DL)",
    color: "from-blue-500/20 to-cyan-500/20",
    border: "border-blue-500/20",
    iconColor: "text-blue-400",
    title: "Real-Time Fraud Detection API",
    desc: "Trains an anomaly detection model on 500k+ transaction records, deploys it as a live FastAPI service that flags suspicious transactions in milliseconds — with a monitoring dashboard tracking model drift and false positive rates.",
    tags: ["XGBoost", "Isolation Forest", "FastAPI", "Streamlit"],
  },
  {
    icon: <Rocket className="h-6 w-6" />,
    track: "MLOps + LLMOps",
    color: "from-sky-500/20 to-indigo-500/20",
    border: "border-sky-500/20",
    iconColor: "text-sky-400",
    title: "Production LLM Monitoring System",
    desc: "Deploys a GenAI app to cloud, wires up CI/CD with GitHub Actions, adds drift detection, alerting, and a live observability dashboard.",
    tags: ["Docker", "GitHub Actions", "Prometheus", "LLMOps"],
  },
]

const TRUST_POINTS = [
  {
    icon: <ShieldCheck className="h-7 w-7 text-emerald-400" />,
    bg: "bg-emerald-500/10 border-emerald-500/20",
    title: "7-Day No-Questions-Asked Refund",
    desc: "Attend the first week. If it's not worth your money for any reason — bad fit, too fast, too slow — we refund 100%. No hoops, no conditions. Email us once.",
  },
  {
    icon: <Users className="h-7 w-7 text-purple-400" />,
    bg: "bg-purple-500/10 border-purple-500/20",
    title: "Batch Size Capped at 20",
    desc: "This isn't a 500-student class where you're a number. 20 seats, live weekends, and direct WhatsApp access to your instructor throughout the cohort.",
  },
  {
    icon: <Star className="h-7 w-7 text-amber-400" />,
    bg: "bg-amber-500/10 border-amber-500/20",
    title: "Be a Founding Student — Not Just a Learner",
    desc: "First-batch students shape what we build. You get direct input on curriculum pace, project choice, and session topics. Your feedback makes the programme better for everyone.",
  },
  {
    icon: <RefreshCw className="h-7 w-7 text-sky-400" />,
    bg: "bg-sky-500/10 border-sky-500/20",
    title: "Lifetime Access to All Updates",
    desc: "AI moves fast. Founding batch students get free access to every curriculum update we ship — new modules, new tools, new projects — forever.",
  },
]

export default function TrustSection() {
  return (
    <section className="w-full py-16 md:py-24 relative overflow-hidden" style={{ background: "#020617" }}>
      {/* Aurora accent top + bottom */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(168,85,247,0.08), transparent 60%)" }} />

      <div className="container px-4 md:px-6 relative z-10">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-800/60 border border-slate-700/50 px-4 py-1.5 text-sm text-slate-300 mb-4">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            No testimonials yet — here's why you can trust us anyway
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-white">
            We're new.{" "}
            <span style={{
              background: "linear-gradient(90deg, #a855f7, #ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Our guarantee isn't.
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            We don't have 500 alumni reviews. We're honest about that. What we do have is a transparent curriculum,
            real projects you can verify, and a refund policy that puts the risk entirely on us — not you.
          </p>
        </div>

        {/* ── 4 Trust Cards ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {TRUST_POINTS.map((pt, i) => (
            <div
              key={i}
              className={`rounded-2xl border p-6 flex flex-col gap-4 ${pt.bg} backdrop-blur-sm`}
            >
              <div>{pt.icon}</div>
              <div>
                <h3 className="text-white font-bold text-base mb-2 leading-snug">{pt.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{pt.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── What You'll Actually Build ──────────────────────────────────── */}
        <div className="mb-6 text-center">
          <div className="inline-block rounded-full bg-purple-500/10 border border-purple-500/25 px-4 py-1 text-xs font-bold text-purple-300 uppercase tracking-widest mb-3">
            Proof is in the projects
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-white mb-3">
            What You'll Build and Deploy
          </h3>
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            Every project ships to the cloud with a real URL. You own the code. It goes on your portfolio and your LinkedIn. These are the apps hiring managers actually want to see.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PROJECTS.map((p, i) => (
            <div
              key={i}
              className={`rounded-2xl border ${p.border} bg-gradient-to-br ${p.color} backdrop-blur-sm p-6 flex flex-col gap-4 group hover:scale-[1.01] transition-transform duration-200`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className={`p-2 rounded-xl bg-slate-900/60 ${p.iconColor}`}>{p.icon}</div>
                <span className="text-xs font-semibold text-slate-400 bg-slate-900/50 rounded-full px-3 py-1 border border-slate-700/40">
                  {p.track}
                </span>
              </div>
              <div>
                <h4 className="text-white font-bold text-lg mb-2">{p.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-auto pt-2">
                {p.tags.map(tag => (
                  <span key={tag} className="text-xs font-mono bg-slate-900/60 text-slate-300 border border-slate-700/50 rounded px-2 py-0.5">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom nudge ───────────────────────────────────────────────── */}
        <div className="mt-14 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-slate-900/60 border border-slate-700/40 rounded-2xl px-8 py-6">
            <div className="text-left">
              <p className="text-white font-bold text-lg">Still unsure? Attend the free live session first.</p>
              <p className="text-slate-400 text-sm mt-1">
                Every Saturday & Sunday — 90 minutes, live, zero commitment. See how we teach before you pay anything.
              </p>
            </div>
            <a
              href="/demo"
              className="flex-shrink-0 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white btn-shimmer"
              style={{ background: "linear-gradient(135deg, #a855f7, #ec4899, #6366f1)" }}
            >
              Book Free Session →
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
