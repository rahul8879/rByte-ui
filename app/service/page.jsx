import Link from "next/link"
import Logo from "@/components/logo"

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    icon: "🧭",
    tag: "Strategy",
    color: "#3b82f6",
    gradient: "linear-gradient(135deg,#3b82f6,#6366f1)",
    title: "AI Consulting & Roadmap",
    short: "Know exactly where AI fits — and where it doesn't.",
    bullets: [
      "Audit your stack and workflows for AI readiness",
      "Identify the 2–3 highest-ROI use cases for your business",
      "Build a phased roadmap with clear milestones",
      "Buy-vs-build decisions and vendor evaluations",
      "Written AI strategy doc your team acts on today",
    ],
    who: "For founders overwhelmed by AI options who need a clear starting point.",
  },
  {
    icon: "⚙️",
    tag: "Development",
    color: "#a855f7",
    gradient: "linear-gradient(135deg,#a855f7,#ec4899)",
    title: "Custom AI App Development",
    short: "We build the AI product — you ship it to your customers.",
    bullets: [
      "RAG assistants that read your documents, FAQs, or databases",
      "Agentic workflows: AI that takes actions, not just answers",
      "LLM fine-tuning and prompt engineering for your domain",
      "FastAPI / Next.js AI products ready for production",
      "Full source code delivered — no lock-in, no black boxes",
    ],
    who: "For product teams who want a working AI feature in weeks, not quarters.",
  },
  {
    icon: "🔗",
    tag: "Integration",
    color: "#10b981",
    gradient: "linear-gradient(135deg,#10b981,#06b6d4)",
    title: "AI Integration & Automation",
    short: "Plug AI into the tools you already use.",
    bullets: [
      "Connect AI to your CRM, Slack, Notion, HubSpot, or ERP",
      "Intelligent automation pipelines (n8n, Zapier, custom APIs)",
      "AI-powered data extraction, classification, tagging at scale",
      "Replace manual workflows with autonomous AI agents",
      "Integrate OpenAI, Anthropic, or open-source LLMs",
    ],
    who: "For ops teams drowning in manual work that AI can handle in seconds.",
  },
  {
    icon: "🎓",
    tag: "Training",
    color: "#f59e0b",
    gradient: "linear-gradient(135deg,#f59e0b,#ef4444)",
    title: "Team AI Upskilling",
    short: "Turn your engineers into AI engineers — in 8 weeks.",
    bullets: [
      "Live cohort training tailored to your team's tech stack",
      "Every engineer ships a real AI feature by week 4",
      "Covers LLMs, RAG, vector DBs, agents, and deployment",
      "Private channel + ongoing Q&A for 3 months post-training",
      "Custom curriculum aligned to your product roadmap",
    ],
    who: "For CTOs who want AI-capable teams without expensive new hires.",
  },
]

const PROJECTS = [
  {
    tag: "AI Automation",
    color: "#a855f7",
    icon: "🤖",
    title: "Automated Lead Qualification Pipeline",
    industry: "B2B SaaS",
    stack: ["Python", "LangChain", "FastAPI", "GPT-4o", "n8n"],
    what: "End-to-end pipeline that ingests inbound leads, scores them against an ICP using an LLM, drafts personalised outreach, and routes hot leads to the CRM — zero human touch.",
    metric: "3 min",
    metricLabel: "lead response time",
    metricBefore: "was 6 hours",
    metricColor: "#a855f7",
  },
  {
    tag: "RAG System",
    color: "#3b82f6",
    icon: "📄",
    title: "Internal Knowledge Base Assistant",
    industry: "Professional Services",
    stack: ["Python", "LangChain", "Pinecone", "Next.js", "OpenAI"],
    what: "Replaced a 200-page static PDF manual with a conversational AI that reads SOPs, policies, and product docs. Staff get cited answers in plain English — with source + page reference.",
    metric: "30 sec",
    metricLabel: "policy lookup",
    metricBefore: "was 12 minutes",
    metricColor: "#3b82f6",
  },
  {
    tag: "Workflow Automation",
    color: "#10b981",
    icon: "⚙️",
    title: "Invoice & PO Extraction Automation",
    industry: "Logistics & Supply Chain",
    stack: ["Python", "GPT-4o Vision", "FastAPI", "PostgreSQL", "Zapier"],
    what: "Document intelligence pipeline that ingests scanned invoices via email, extracts structured fields, validates against PO records, and flags mismatches — replacing a 3-person data-entry team.",
    metric: "11 sec",
    metricLabel: "per invoice",
    metricBefore: "was 8 minutes",
    metricColor: "#10b981",
  },
  {
    tag: "Agentic AI",
    color: "#f59e0b",
    icon: "🧠",
    title: "AI Research & Reporting Agent",
    industry: "Marketing Agency",
    stack: ["Python", "LangChain Agents", "Serper API", "GPT-4o", "FastAPI"],
    what: "Multi-step agent that takes a competitor or topic, searches the web autonomously, scrapes relevant pages, and produces a structured competitive analysis report — prompt to PDF, hands-free.",
    metric: "6 min",
    metricLabel: "per report",
    metricBefore: "was 4 hours",
    metricColor: "#f59e0b",
  },
]

const TECH_STACK = [
  { name: "OpenAI / GPT-4o", icon: "🤖" },
  { name: "LangChain", icon: "🔗" },
  { name: "FastAPI", icon: "⚡" },
  { name: "Pinecone", icon: "📌" },
  { name: "Next.js", icon: "▲" },
  { name: "n8n / Zapier", icon: "⚙️" },
  { name: "Anthropic Claude", icon: "🧠" },
  { name: "PostgreSQL", icon: "🗄️" },
  { name: "Python", icon: "🐍" },
  { name: "Docker / Cloud", icon: "☁️" },
]

const RESULTS = [
  { value: "10×", label: "average speed-up on manual workflows", color: "#a855f7" },
  { value: "< 2wk", label: "to first working demo", color: "#3b82f6" },
  { value: "100%", label: "source code ownership — no lock-in", color: "#10b981" },
  { value: "4–8wk", label: "from kick-off to production launch", color: "#f59e0b" },
]

const PROCESS = [
  { num: "01", icon: "📞", color: "#3b82f6",  title: "Discovery Call",     desc: "30-min no-pressure call. We learn your stack, your pain points, and where AI can move the needle fastest." },
  { num: "02", icon: "📋", color: "#a855f7",  title: "Scope & Proposal",   desc: "Written proposal in 48 hours — scope, timeline, fixed cost, expected outcomes. No vague retainers." },
  { num: "03", icon: "🔨", color: "#10b981",  title: "Build & Demo Weekly", desc: "You see real progress every 7 days. We ship in testable increments — no big reveals at the end." },
  { num: "04", icon: "🚀", color: "#f59e0b",  title: "Launch & Hand-off",  desc: "Deployed, documented, yours. Full source code + 30-day support window after go-live." },
]

const FAQS = [
  { q: "Do you work with international clients remotely?",     a: "Yes — 100% remote. We operate async-first: Slack or email for daily comms, weekly video calls for demos. We adapt to your time zone." },
  { q: "How quickly can you deliver a working prototype?",     a: "Most AI integration projects deliver a working demo in 10–14 business days. Full production builds take 4–8 weeks depending on scope." },
  { q: "What does it cost?",                                   a: "Consulting starts at $1,500 USD. Custom development starts at $3,000 USD. Team training is scoped per cohort size. All prices are fixed — no hourly surprises." },
  { q: "Do we keep ownership of the code and models?",        a: "Always. 100% of everything we build is yours — source code, fine-tuned models, prompts, architecture. We sign an NDA before any project starts." },
  { q: "We don't have an engineering team. Can you help?",    a: "Yes. We work with non-technical founders regularly. We handle the full build and hand over a deployed product. Ongoing maintenance retainers available." },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function FaqItem({ q, a }) {
  return (
    <details style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, overflow: "hidden" }}>
      <summary style={{
        padding: "16px 20px", cursor: "pointer", fontWeight: 700, fontSize: 15,
        color: "#f9fafb", background: "rgba(255,255,255,0.02)",
        listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12,
      }}>
        {q}
        <span style={{ color: "#c084fc", fontSize: 20, flexShrink: 0, transition: "transform 0.2s" }}>+</span>
      </summary>
      <div style={{ padding: "12px 20px 18px", fontSize: 14, color: "#9ca3af", lineHeight: 1.7, borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(168,85,247,0.03)" }}>
        {a}
      </div>
    </details>
  )
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata = {
  title: "AI Agency Services | Rbyte.ai — Build & Deploy AI for Your Business",
  description: "Rbyte.ai is an AI engineering agency helping startups and small businesses worldwide adopt AI — strategy, custom app development, automation, and team training.",
  openGraph: { title: "AI Agency Services | Rbyte.ai", description: "Custom AI development, consulting, and automation for startups worldwide. Working product in weeks.", siteName: "Rbyte.ai", type: "website" },
  twitter: { card: "summary_large_image", title: "AI Agency Services | Rbyte.ai" },
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ServicePage() {
  const PAGE_BG = "#020617"
  const BORDER  = "rgba(255,255,255,0.08)"

  const css = `
    @keyframes aurora-move {
      0%   { transform:translate(0,0) scale(1) }
      50%  { transform:translate(4%,3%) scale(1.06) }
      100% { transform:translate(-2%,5%) scale(0.97) }
    }
    @keyframes shimmer {
      0%   { transform:translateX(-100%) }
      100% { transform:translateX(200%) }
    }
    @keyframes float {
      0%,100% { transform:translateY(0) }
      50%      { transform:translateY(-8px) }
    }
    @keyframes pulse-ring {
      0%   { box-shadow:0 0 0 0 rgba(168,85,247,0.5) }
      70%  { box-shadow:0 0 0 12px rgba(168,85,247,0) }
      100% { box-shadow:0 0 0 0 rgba(168,85,247,0) }
    }
    @keyframes ticker {
      0%   { transform:translateX(0) }
      100% { transform:translateX(-50%) }
    }
    .svc-aurora {
      position:absolute; filter:blur(70px); mix-blend-mode:screen;
      opacity:0.55; pointer-events:none;
      animation:aurora-move 20s ease-in-out infinite alternate;
    }
    .svc-aurora--1 { width:60vw; height:60vw; left:-18vw; top:-18vh; background:radial-gradient(closest-side,rgba(168,85,247,0.5),transparent 60%); }
    .svc-aurora--2 { width:45vw; height:45vw; right:-10vw; top:5vh;  background:radial-gradient(closest-side,rgba(99,102,241,0.45),transparent 60%); animation-duration:25s; }
    .svc-aurora--3 { width:40vw; height:40vw; left:22vw; bottom:-14vh; background:radial-gradient(closest-side,rgba(236,72,153,0.4),transparent 60%); animation-duration:30s; }
    .svc-grid-bg {
      position:absolute; inset:0;
      background-image:linear-gradient(rgba(168,85,247,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(168,85,247,0.07) 1px,transparent 1px);
      background-size:44px 44px; pointer-events:none;
    }
    .svc-shimmer-btn { position:relative; overflow:hidden; }
    .svc-shimmer-btn::after {
      content:""; position:absolute; inset:0;
      background:linear-gradient(120deg,transparent,rgba(255,255,255,0.22),transparent);
      transform:translateX(-100%); animation:shimmer 2.6s linear infinite; pointer-events:none;
    }
    /* Service card */
    .svc-card {
      position:relative; overflow:hidden;
      border-radius:16px; padding:28px;
      background:rgba(255,255,255,0.03);
      border:1px solid rgba(255,255,255,0.08);
      transition:transform 0.25s, border-color 0.25s, box-shadow 0.25s;
    }
    .svc-card::before {
      content:""; position:absolute; top:0; left:0; bottom:0;
      width:4px; border-radius:4px 0 0 4px;
      background:var(--svc-accent);
      opacity:0.8;
    }
    .svc-card:hover {
      transform:translateY(-6px);
      border-color:rgba(168,85,247,0.45);
      box-shadow:0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(168,85,247,0.2);
    }
    /* Project card */
    .svc-proj-card {
      border-radius:14px; overflow:hidden;
      background:rgba(255,255,255,0.03);
      border:1px solid rgba(255,255,255,0.08);
      transition:transform 0.25s, box-shadow 0.25s;
    }
    .svc-proj-card:hover {
      transform:translateY(-4px);
      box-shadow:0 24px 60px rgba(0,0,0,0.5);
    }
    /* Metric block */
    .svc-metric {
      display:flex; flex-direction:column; align-items:center; justify-content:center;
      padding:28px 24px; text-align:center;
      background:rgba(0,0,0,0.3);
    }
    /* Result strip */
    .svc-result-card {
      padding:24px 20px; border-radius:14px; text-align:center;
      background:rgba(255,255,255,0.03);
      border:1px solid rgba(255,255,255,0.07);
      transition:transform 0.2s;
    }
    .svc-result-card:hover { transform:scale(1.03); }
    /* Tech ticker */
    .svc-ticker-wrap { overflow:hidden; }
    .svc-ticker-inner { display:flex; gap:0; animation:ticker 22s linear infinite; width:max-content; }
    .svc-ticker-inner:hover { animation-play-state:paused; }
    /* Process step */
    .svc-step { display:flex; gap:20px; align-items:flex-start; }
    .svc-step-dot {
      width:52px; height:52px; border-radius:50%; flex-shrink:0;
      display:flex; align-items:center; justify-content:center; font-size:22px;
    }
    details summary::-webkit-details-marker { display:none; }
    details[open] { border-color:rgba(168,85,247,0.45) !important; }
    details[open] summary { background:rgba(168,85,247,0.07) !important; }
    @media (max-width:900px) {
      .svc-hero-inner   { flex-direction:column !important; }
      .svc-hero-visual  { display:none !important; }
      .svc-svc-grid     { grid-template-columns:1fr !important; }
      .svc-proj-inner   { grid-template-columns:1fr !important; }
      .svc-why-grid     { grid-template-columns:1fr !important; }
      .svc-res-grid     { grid-template-columns:1fr 1fr !important; }
    }
    /* Industry use-case cards */
    .svc-uc-card {
      padding:22px 20px; border-radius:12px;
      background:rgba(255,255,255,0.03);
      border:1px solid rgba(255,255,255,0.08);
      transition:border-color 0.2s, transform 0.2s;
    }
    .svc-uc-card:hover { border-color:rgba(168,85,247,0.4); transform:translateY(-3px); }
    @media (max-width:600px) {
      .svc-uc-grid      { grid-template-columns:1fr !important; }
      .svc-res-grid     { grid-template-columns:1fr !important; }
      .svc-step         { flex-direction:column; gap:10px; }
    }
  `

  return (
    <div style={{ background: PAGE_BG, minHeight: "100vh", color: "#f9fafb", fontFamily: "inherit" }}>
      <style>{css}</style>

      {/* ── NAV ─────────────────────────────────────────────────────────────── */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, borderBottom: `1px solid ${BORDER}`, background: "rgba(2,6,23,0.92)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ textDecoration: "none" }}><Logo size="sm" /></Link>
          <nav style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Link href="/demo" style={{ fontSize: 14, color: "#9ca3af", textDecoration: "none" }}>Free Session</Link>
            <Link href="/#pricing" style={{ fontSize: 14, color: "#9ca3af", textDecoration: "none" }}>Courses</Link>
            <a href="https://calendly.com/rbyteai-info/rbyte-ai-ai-usecase-discussion" target="_blank" rel="noopener noreferrer" className="svc-shimmer-btn"
              style={{ padding: "9px 20px", borderRadius: 8, background: "linear-gradient(135deg,#a855f7,#ec4899,#6366f1)", color: "#fff", fontWeight: 700, fontSize: 14, textDecoration: "none", boxShadow: "0 2px 14px rgba(168,85,247,0.4)" }}>
              Book Discovery Call
            </a>
          </nav>
        </div>
      </header>

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section style={{ position: "relative", padding: "96px 0 80px", overflow: "hidden" }}>
        <div className="svc-grid-bg" />
        <div className="svc-aurora svc-aurora--1" />
        <div className="svc-aurora svc-aurora--2" />
        <div className="svc-aurora svc-aurora--3" />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          <div className="svc-hero-inner" style={{ display: "flex", gap: 60, alignItems: "center" }}>

            {/* LEFT */}
            <div style={{ flex: "1 1 0", minWidth: 0 }}>
              {/* Badge */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 18px", borderRadius: 99, marginBottom: 28, border: "1px solid rgba(168,85,247,0.45)", background: "rgba(168,85,247,0.12)", fontSize: 13, fontWeight: 700, color: "#c084fc", animation: "pulse-ring 2.5s ease-out infinite" }}>
                🤝 AI Agency · Remote-First, Global
              </div>

              {/* Headline */}
              <h1 style={{ fontSize: "clamp(38px, 5.5vw, 66px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em", margin: "0 0 8px" }}>
                <span style={{ background: "linear-gradient(100deg,#f0abfc 0%,#fff 45%,#93c5fd 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>We Build AI</span>
              </h1>
              <h1 style={{ fontSize: "clamp(38px, 5.5vw, 66px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em", margin: "0 0 28px" }}>
                <span style={{ color: "#f9fafb" }}>Into Your Business</span>
              </h1>

              {/* Sub */}
              <p style={{ fontSize: 18, color: "#9ca3af", lineHeight: 1.7, maxWidth: 560, margin: "0 0 36px" }}>
                From AI strategy and custom development to workflow automation and team training —
                Rbyte.ai is the engineering partner for{" "}
                <span style={{ color: "#e9d5ff", fontWeight: 600 }}>startups and small businesses worldwide</span>
                {" "}that want to use AI without hiring a full AI team.
              </p>

              {/* CTAs */}
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 44 }}>
                <a href="https://calendly.com/rbyteai-info/rbyte-ai-ai-usecase-discussion" target="_blank" rel="noopener noreferrer" className="svc-shimmer-btn"
                  style={{ padding: "15px 32px", borderRadius: 10, background: "linear-gradient(135deg,#a855f7,#ec4899,#6366f1)", color: "#fff", fontWeight: 800, fontSize: 16, textDecoration: "none", boxShadow: "0 8px 32px rgba(168,85,247,0.5)" }}>
                  Book Free Discovery Call →
                </a>
                <a href="mailto:info@rbyteai.com"
                  style={{ padding: "15px 28px", borderRadius: 10, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", color: "#d1d5db", fontWeight: 700, fontSize: 16, textDecoration: "none" }}>
                  Email Us
                </a>
              </div>

              {/* Trust pills */}
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                {[
                  { icon: "🌎", t: "Clients worldwide" },
                  { icon: "⚡", t: "Demo in ≤ 2 weeks" },
                  { icon: "📂", t: "Full source code yours" },
                  { icon: "🔒", t: "NDA on every project" },
                  { icon: "💬", t: "Async & timezone-friendly" },
                ].map(({ icon, t }) => (
                  <span key={t} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: "#9ca3af" }}>
                    <span>{icon}</span>{t}
                  </span>
                ))}
              </div>
            </div>

            {/* RIGHT — floating visual cards */}
            <div className="svc-hero-visual" style={{ flexShrink: 0, width: 340, position: "relative", height: 440 }}>
              {/* Glow orb */}
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 280, height: 280, background: "radial-gradient(closest-side,rgba(168,85,247,0.18),transparent 70%)", filter: "blur(30px)", borderRadius: "50%", pointerEvents: "none" }} />

              {/* Card 1 — top */}
              <div style={{ position: "absolute", top: 0, left: 20, right: 20, padding: "18px 20px", borderRadius: 14, background: "rgba(15,12,26,0.9)", border: "1px solid rgba(168,85,247,0.3)", boxShadow: "0 8px 32px rgba(0,0,0,0.5)", animation: "float 4s ease-in-out infinite" }}>
                <p style={{ fontSize: 11, color: "#6b7280", margin: "0 0 10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>🤖 Lead Pipeline · B2B SaaS</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <div>
                    <p style={{ fontSize: 11, color: "#9ca3af", margin: "0 0 2px" }}>Response time</p>
                    <p style={{ fontSize: 28, fontWeight: 900, color: "#c084fc", margin: 0, letterSpacing: "-0.02em" }}>3 min</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontSize: 11, color: "#6b7280", margin: "0 0 2px" }}>was before</p>
                    <p style={{ fontSize: 18, fontWeight: 700, color: "#4b5563", margin: 0, textDecoration: "line-through" }}>6 hrs</p>
                  </div>
                </div>
              </div>

              {/* Card 2 — middle */}
              <div style={{ position: "absolute", top: 140, left: 0, right: 0, padding: "18px 20px", borderRadius: 14, background: "rgba(15,12,26,0.9)", border: "1px solid rgba(59,130,246,0.35)", boxShadow: "0 8px 32px rgba(0,0,0,0.5)", animation: "float 5s ease-in-out 1s infinite" }}>
                <p style={{ fontSize: 11, color: "#6b7280", margin: "0 0 10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>📄 Knowledge Bot · Professional Svc</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <div>
                    <p style={{ fontSize: 11, color: "#9ca3af", margin: "0 0 2px" }}>Policy lookup</p>
                    <p style={{ fontSize: 28, fontWeight: 900, color: "#60a5fa", margin: 0 }}>30 sec</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontSize: 11, color: "#6b7280", margin: "0 0 2px" }}>was before</p>
                    <p style={{ fontSize: 18, fontWeight: 700, color: "#4b5563", margin: 0, textDecoration: "line-through" }}>12 min</p>
                  </div>
                </div>
              </div>

              {/* Card 3 — bottom */}
              <div style={{ position: "absolute", bottom: 0, left: 20, right: 20, padding: "18px 20px", borderRadius: 14, background: "rgba(15,12,26,0.9)", border: "1px solid rgba(16,185,129,0.35)", boxShadow: "0 8px 32px rgba(0,0,0,0.5)", animation: "float 4.5s ease-in-out 0.5s infinite" }}>
                <p style={{ fontSize: 11, color: "#6b7280", margin: "0 0 10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>⚙️ Invoice Automation · Logistics</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <div>
                    <p style={{ fontSize: 11, color: "#9ca3af", margin: "0 0 2px" }}>Per invoice</p>
                    <p style={{ fontSize: 28, fontWeight: 900, color: "#34d399", margin: 0 }}>11 sec</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontSize: 11, color: "#6b7280", margin: "0 0 2px" }}>was before</p>
                    <p style={{ fontSize: 18, fontWeight: 700, color: "#4b5563", margin: 0, textDecoration: "line-through" }}>8 min</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── RESULTS STRIP ───────────────────────────────────────────────────── */}
      <section style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, padding: "48px 0", background: "rgba(168,85,247,0.03)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div className="svc-res-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
            {RESULTS.map((r, i) => (
              <div key={i} className="svc-result-card">
                <p style={{ fontSize: "clamp(32px,4vw,48px)", fontWeight: 900, color: r.color, margin: "0 0 6px", letterSpacing: "-0.03em", lineHeight: 1 }}>
                  {r.value}
                </p>
                <p style={{ fontSize: 13, color: "#6b7280", margin: 0, lineHeight: 1.5 }}>{r.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH TICKER ─────────────────────────────────────────────────────── */}
      <section style={{ padding: "28px 0", borderBottom: `1px solid ${BORDER}`, overflow: "hidden" }}>
        <div className="svc-ticker-wrap">
          <div className="svc-ticker-inner">
            {[...TECH_STACK, ...TECH_STACK].map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 32px", whiteSpace: "nowrap", borderRight: `1px solid ${BORDER}` }}>
                <span style={{ fontSize: 20 }}>{t.icon}</span>
                <span style={{ fontSize: 14, color: "#6b7280", fontWeight: 600 }}>{t.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ────────────────────────────────────────────────────────── */}
      <section style={{ padding: "96px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span style={{ display: "inline-block", padding: "5px 16px", borderRadius: 99, marginBottom: 16, background: "rgba(168,85,247,0.12)", border: "1px solid rgba(168,85,247,0.35)", fontSize: 12, fontWeight: 700, color: "#c084fc", textTransform: "uppercase", letterSpacing: "0.12em" }}>
              What We Do
            </span>
            <h2 style={{ fontSize: "clamp(28px,4vw,46px)", fontWeight: 900, margin: "0 0 14px", letterSpacing: "-0.025em" }}>
              Four Ways We Help Your Business
            </h2>
            <p style={{ fontSize: 17, color: "#6b7280", maxWidth: 540, margin: "0 auto" }}>
              Pick one or combine — we scope exactly what you need and nothing you don't.
            </p>
          </div>

          <div className="svc-svc-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {SERVICES.map((svc, i) => (
              <div key={i} className="svc-card" style={{ "--svc-accent": svc.gradient }}>
                {/* Subtle glow in corner */}
                <div style={{ position: "absolute", top: -40, right: -40, width: 140, height: 140, borderRadius: "50%", background: `${svc.color}18`, filter: "blur(30px)", pointerEvents: "none" }} />

                <div style={{ position: "relative" }}>
                  {/* Header */}
                  <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 18 }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, flexShrink: 0, background: `${svc.color}20`, border: `1px solid ${svc.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, boxShadow: `0 4px 16px ${svc.color}30` }}>
                      {svc.icon}
                    </div>
                    <div style={{ paddingTop: 2 }}>
                      <span style={{ display: "inline-block", padding: "2px 10px", borderRadius: 99, marginBottom: 6, background: `${svc.color}1a`, border: `1px solid ${svc.color}40`, fontSize: 11, fontWeight: 800, color: svc.color, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                        {svc.tag}
                      </span>
                      <h3 style={{ fontSize: 18, fontWeight: 800, color: "#f9fafb", margin: 0, lineHeight: 1.25 }}>{svc.title}</h3>
                    </div>
                  </div>

                  {/* Short desc */}
                  <p style={{ fontSize: 15, color: "#d1d5db", fontWeight: 500, margin: "0 0 18px", lineHeight: 1.5 }}>{svc.short}</p>

                  {/* Bullets */}
                  <ul style={{ margin: "0 0 18px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                    {svc.bullets.map((b, j) => (
                      <li key={j} style={{ display: "flex", gap: 10, fontSize: 13, color: "#9ca3af", lineHeight: 1.55 }}>
                        <span style={{ color: svc.color, fontWeight: 800, flexShrink: 0 }}>→</span>{b}
                      </li>
                    ))}
                  </ul>

                  {/* Best for */}
                  <div style={{ padding: "12px 14px", borderRadius: 8, background: `${svc.color}0e`, border: `1px solid ${svc.color}28`, fontSize: 13, color: "#9ca3af", lineHeight: 1.55 }}>
                    <span style={{ color: svc.color, fontWeight: 700 }}>Best for: </span>{svc.who}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ────────────────────────────────────────────────────────── */}
      <section style={{ padding: "96px 0", borderTop: `1px solid ${BORDER}`, background: "rgba(168,85,247,0.015)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span style={{ display: "inline-block", padding: "5px 16px", borderRadius: 99, marginBottom: 16, background: "rgba(168,85,247,0.12)", border: "1px solid rgba(168,85,247,0.35)", fontSize: 12, fontWeight: 700, color: "#c084fc", textTransform: "uppercase", letterSpacing: "0.12em" }}>
              Our Work
            </span>
            <h2 style={{ fontSize: "clamp(28px,4vw,46px)", fontWeight: 900, margin: "0 0 14px", letterSpacing: "-0.025em" }}>
              Projects We've Shipped
            </h2>
            <p style={{ fontSize: 17, color: "#6b7280", maxWidth: 520, margin: "0 auto" }}>
              Real AI systems — designed, built, and deployed in production.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {PROJECTS.map((proj, i) => (
              <div key={i} className="svc-proj-card">
                <div className="svc-proj-inner" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 0 }}>

                  {/* Main */}
                  <div style={{ padding: "28px 32px", borderRight: `1px solid ${BORDER}` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                      <div style={{ width: 44, height: 44, borderRadius: 10, flexShrink: 0, background: `${proj.color}1a`, border: `1px solid ${proj.color}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>
                        {proj.icon}
                      </div>
                      <div>
                        <span style={{ display: "inline-block", padding: "2px 10px", borderRadius: 99, marginBottom: 4, background: `${proj.color}18`, border: `1px solid ${proj.color}33`, fontSize: 11, fontWeight: 800, color: proj.color, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                          {proj.tag}
                        </span>
                        <h3 style={{ fontSize: 17, fontWeight: 800, color: "#f9fafb", margin: 0 }}>{proj.title}</h3>
                      </div>
                    </div>

                    <p style={{ fontSize: 14, color: "#9ca3af", lineHeight: 1.7, margin: "0 0 16px" }}>{proj.what}</p>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                      {proj.stack.map((t, j) => (
                        <span key={j} style={{ padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 600, background: "rgba(255,255,255,0.05)", border: `1px solid ${BORDER}`, color: "#9ca3af" }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right — metric panel */}
                  <div style={{ width: 220, padding: "28px 24px", display: "flex", flexDirection: "column", gap: 20, justifyContent: "center", alignItems: "center", background: `${proj.color}09`, textAlign: "center" }}>
                    {/* Big metric */}
                    <div>
                      <p style={{ fontSize: "clamp(38px,4vw,54px)", fontWeight: 900, color: proj.color, margin: 0, letterSpacing: "-0.03em", lineHeight: 1 }}>
                        {proj.metric}
                      </p>
                      <p style={{ fontSize: 12, color: "#9ca3af", margin: "4px 0 0", fontWeight: 600 }}>{proj.metricLabel}</p>
                      <p style={{ fontSize: 11, color: "#4b5563", margin: "6px 0 0", textDecoration: "line-through" }}>{proj.metricBefore}</p>
                    </div>

                    <div style={{ width: 40, height: 1, background: `${proj.color}44` }} />

                    {/* Industry */}
                    <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 14px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: `1px solid ${BORDER}`, fontSize: 12, color: "#6b7280" }}>
                      <span>🏢</span><span>{proj.industry}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA below projects */}
          <div style={{ marginTop: 40, textAlign: "center", padding: "28px 20px", borderRadius: 14, background: "rgba(168,85,247,0.06)", border: "1px solid rgba(168,85,247,0.18)" }}>
            <p style={{ fontSize: 16, color: "#d1d5db", margin: "0 0 16px", fontWeight: 500 }}>Have a similar problem? Let's talk about what we can build for you.</p>
            <a href="https://calendly.com/rbyteai-info/rbyte-ai-ai-usecase-discussion" target="_blank" rel="noopener noreferrer" className="svc-shimmer-btn"
              style={{ display: "inline-block", padding: "13px 30px", borderRadius: 9, background: "linear-gradient(135deg,#a855f7,#ec4899,#6366f1)", color: "#fff", fontWeight: 800, fontSize: 15, textDecoration: "none", boxShadow: "0 4px 20px rgba(168,85,247,0.4)" }}>
              Book a Free Discovery Call →
            </a>
          </div>
        </div>
      </section>

      {/* ── PROCESS ─────────────────────────────────────────────────────────── */}
      <section style={{ padding: "96px 0", borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span style={{ display: "inline-block", padding: "5px 16px", borderRadius: 99, marginBottom: 16, background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.35)", fontSize: 12, fontWeight: 700, color: "#a5b4fc", textTransform: "uppercase", letterSpacing: "0.12em" }}>
              Our Process
            </span>
            <h2 style={{ fontSize: "clamp(26px,4vw,42px)", fontWeight: 900, margin: "0 0 12px", letterSpacing: "-0.025em" }}>From First Call to Launched Product</h2>
            <p style={{ fontSize: 16, color: "#6b7280", maxWidth: 500, margin: "0 auto" }}>No long discovery phases. No scope creep. A process that respects your time.</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {PROCESS.map((step, i) => (
              <div key={i} style={{ position: "relative" }}>
                {i < PROCESS.length - 1 && (
                  <div style={{ position: "absolute", left: 25, top: 56, bottom: 0, width: 2, background: `linear-gradient(180deg,${step.color}55,${PROCESS[i+1].color}55)`, zIndex: 0 }} />
                )}
                <div className="svc-step" style={{ position: "relative", zIndex: 1, paddingBottom: 36 }}>
                  <div className="svc-step-dot" style={{ background: `${step.color}1a`, border: `2px solid ${step.color}55` }}>
                    {step.icon}
                  </div>
                  <div style={{ paddingTop: 6 }}>
                    <p style={{ fontSize: 11, fontWeight: 900, color: step.color, textTransform: "uppercase", letterSpacing: "0.12em", margin: "0 0 4px" }}>Step {step.num}</p>
                    <h3 style={{ fontSize: 18, fontWeight: 800, color: "#f9fafb", margin: "0 0 8px" }}>{step.title}</h3>
                    <p style={{ fontSize: 14, color: "#9ca3af", lineHeight: 1.65, margin: 0 }}>{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY RBYTE ───────────────────────────────────────────────────────── */}
      <section style={{ padding: "80px 0", borderTop: `1px solid ${BORDER}`, background: "rgba(255,255,255,0.015)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <div className="svc-why-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
            <div>
              <span style={{ display: "inline-block", padding: "5px 16px", borderRadius: 99, marginBottom: 18, background: "rgba(168,85,247,0.12)", border: "1px solid rgba(168,85,247,0.35)", fontSize: 12, fontWeight: 700, color: "#c084fc", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                Why Rbyte.ai?
              </span>
              <h2 style={{ fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 900, margin: "0 0 18px", letterSpacing: "-0.025em" }}>
                Engineers who build AI daily — not consultants who read about it
              </h2>
              <p style={{ fontSize: 15, color: "#9ca3af", lineHeight: 1.75, margin: "0 0 28px" }}>
                Rbyte.ai was built by practitioners — engineers who build and ship production AI systems for a living. Every project is delivered by the people who write the code, not managers who oversee it.
              </p>
              <a href="https://calendly.com/rbyteai-info/rbyte-ai-ai-usecase-discussion" target="_blank" rel="noopener noreferrer" className="svc-shimmer-btn"
                style={{ display: "inline-block", padding: "13px 28px", borderRadius: 9, background: "linear-gradient(135deg,#a855f7,#ec4899,#6366f1)", color: "#fff", fontWeight: 800, fontSize: 15, textDecoration: "none", boxShadow: "0 4px 20px rgba(168,85,247,0.4)" }}>
                Schedule a Free Call →
              </a>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { icon: "🛠️", color: "#a855f7", title: "Practitioners, not consultants", desc: "We ship production code every day. Real deployed AI systems, not slide decks." },
                { icon: "🔬", color: "#3b82f6", title: "Niche-deep AI expertise",          desc: "LangChain, RAG, fine-tuning, vector DBs, agentic systems — this is all we do." },
                { icon: "⚡", color: "#10b981", title: "Speed without shortcuts",          desc: "First working demo in 2 weeks. Production-ready in 6–8. No bloated timelines." },
                { icon: "🌐", color: "#f59e0b", title: "Remote-native & async-first",      desc: "Slack, Loom, weekly calls. Seamlessly across any time zone." },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 14, padding: "16px 18px", borderRadius: 12, background: "rgba(255,255,255,0.03)", border: `1px solid ${BORDER}`, transition: "border-color 0.2s" }}>
                  <div style={{ width: 38, height: 38, borderRadius: 9, flexShrink: 0, background: `${item.color}1a`, border: `1px solid ${item.color}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "#f9fafb", marginBottom: 4 }}>{item.title}</div>
                    <div style={{ fontSize: 13, color: "#9ca3af", lineHeight: 1.55 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ──────────────────────────────────────────────────────── */}
      <section style={{ padding: "80px 0", borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ display: "inline-block", padding: "5px 16px", borderRadius: 99, marginBottom: 16, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", fontSize: 12, fontWeight: 700, color: "#34d399", textTransform: "uppercase", letterSpacing: "0.12em" }}>
              Industries
            </span>
            <h2 style={{ fontSize: "clamp(24px,4vw,40px)", fontWeight: 900, margin: "0 0 12px", letterSpacing: "-0.025em" }}>AI Works in Every Industry</h2>
            <p style={{ fontSize: 16, color: "#6b7280", maxWidth: 480, margin: "0 auto" }}>These are the types of systems we design and ship.</p>
          </div>
          <div className="svc-uc-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {[
              { e: "🏥", i: "Healthcare & Clinics",    x: "AI assistant answering patient FAQs and routing inquiries from website or WhatsApp" },
              { e: "⚖️", i: "Legal & Compliance",      x: "Document review bot reading contracts and flagging non-standard clauses in seconds" },
              { e: "🏪", i: "E-commerce & Retail",     x: "Personalised product recommendation engine integrated into your Shopify store" },
              { e: "🏗️", i: "Real Estate",              x: "AI that qualifies leads from listings, answers property questions, and books viewings" },
              { e: "📦", i: "Logistics & Operations",  x: "Automated invoice extraction, PO matching, and exception routing — zero human touch" },
              { e: "📚", i: "EdTech & Training",       x: "AI tutor trained on your curriculum that adapts explanations per student level" },
            ].map((uc, i) => (
              <div key={i} className="svc-uc-card">
                <div style={{ fontSize: 36, marginBottom: 10 }}>{uc.e}</div>
                <div style={{ fontWeight: 800, fontSize: 15, color: "#f9fafb", marginBottom: 8 }}>{uc.i}</div>
                <div style={{ fontSize: 13, color: "#9ca3af", lineHeight: 1.6 }}>{uc.x}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────────── */}
      <section style={{ padding: "80px 0", borderTop: `1px solid ${BORDER}`, background: "rgba(168,85,247,0.02)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <h2 style={{ fontSize: "clamp(24px,4vw,38px)", fontWeight: 900, margin: "0 0 10px", letterSpacing: "-0.025em" }}>Common Questions</h2>
            <p style={{ fontSize: 15, color: "#6b7280", margin: 0 }}>Everything you need to know before booking a call.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {FAQS.map((f, i) => <FaqItem key={i} {...f} />)}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ──────────────────────────────────────────────────────── */}
      <section style={{ padding: "96px 20px", textAlign: "center", borderTop: `1px solid ${BORDER}`, position: "relative", overflow: "hidden", background: "linear-gradient(160deg,rgba(168,85,247,0.08) 0%,rgba(2,6,23,0) 55%)" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 400, background: "radial-gradient(closest-side,rgba(168,85,247,0.12),transparent 70%)", filter: "blur(50px)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 640, margin: "0 auto" }}>
          <span style={{ display: "inline-block", padding: "5px 16px", borderRadius: 99, marginBottom: 22, background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)", fontSize: 12, fontWeight: 700, color: "#4ade80", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            ✓ First call is free · No obligation
          </span>
          <h2 style={{ fontSize: "clamp(30px,5vw,54px)", fontWeight: 900, margin: "0 0 18px", letterSpacing: "-0.03em" }}>
            Ready to add AI to your business?
          </h2>
          <p style={{ fontSize: 17, color: "#9ca3af", marginBottom: 36, lineHeight: 1.65 }}>
            30 minutes. We'll listen to what you're building, share honest thoughts on where AI helps, and give you a rough scope — completely free.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://calendly.com/rbyteai-info/rbyte-ai-ai-usecase-discussion" target="_blank" rel="noopener noreferrer" className="svc-shimmer-btn"
              style={{ padding: "17px 38px", borderRadius: 10, background: "linear-gradient(135deg,#a855f7,#ec4899,#6366f1)", color: "#fff", fontWeight: 800, fontSize: 17, textDecoration: "none", boxShadow: "0 8px 32px rgba(168,85,247,0.5)" }}>
              Book My Free Discovery Call →
            </a>
            <a href="https://wa.me/919893989103?text=Hi%2C+I%27d+like+to+know+more+about+your+AI+agency+services" target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: 8, padding: "17px 28px", borderRadius: 10, background: "rgba(22,163,74,0.12)", border: "1px solid rgba(22,163,74,0.3)", color: "#4ade80", fontWeight: 700, fontSize: 16, textDecoration: "none" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp Us
            </a>
          </div>
          <p style={{ marginTop: 22, fontSize: 13, color: "#4b5563" }}>
            Prefer email?{" "}<a href="mailto:info@rbyteai.com" style={{ color: "#c084fc", textDecoration: "none" }}>info@rbyteai.com</a>
          </p>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer style={{ borderTop: `1px solid ${BORDER}`, padding: "52px 0 28px", background: "#010812" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 40 }}>
            <div>
              <Logo variant="light" />
              <p style={{ fontSize: 13, color: "#4b5563", marginTop: 14, lineHeight: 1.6, maxWidth: 240 }}>AI engineering agency + training programmes for forward-thinking small businesses worldwide.</p>
            </div>
            <div>
              <h4 style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>Services</h4>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {["AI Consulting & Strategy","Custom AI Development","AI Integration & Automation","Team Training"].map(s => (
                  <li key={s}><a href="#" style={{ fontSize: 13, color: "#6b7280", textDecoration: "none" }}>{s}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>Training</h4>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {[{ l: "Free Demo Session", h: "/demo" },{ l: "GenAI + Agentic AI", h: "/#pricing" },{ l: "MLOps + LLMOps", h: "/#pricing" },{ l: "Full Stack AI", h: "/#pricing" }].map(({ l, h }) => (
                  <li key={l}><a href={h} style={{ fontSize: 13, color: "#6b7280", textDecoration: "none" }}>{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>Get in Touch</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <a href="mailto:info@rbyteai.com" style={{ fontSize: 13, color: "#6b7280", textDecoration: "none" }}>✉️ info@rbyteai.com</a>
                <span style={{ fontSize: 13, color: "#6b7280" }}>📍 Mumbai, India · Remote-first</span>
                <span style={{ fontSize: 13, color: "#6b7280" }}>🌎 Clients worldwide</span>
                <a href="https://calendly.com/rbyteai-info/rbyte-ai-ai-usecase-discussion" target="_blank" rel="noopener noreferrer"
                  style={{ marginTop: 6, display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.25)", fontSize: 13, color: "#c084fc", textDecoration: "none", fontWeight: 600 }}>
                  📅 Book Discovery Call
                </a>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 40, paddingTop: 22, borderTop: `1px solid ${BORDER}`, display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 14 }}>
            <p style={{ fontSize: 12, color: "#374151", margin: 0 }}>© 2026 Rbyte.ai. All rights reserved.</p>
            <div style={{ display: "flex", gap: 20 }}>
              {[{ l: "Privacy Policy", h: "/privacy" },{ l: "Terms", h: "/terms" },{ l: "Refund Policy", h: "/refund" }].map(({ l, h }) => (
                <a key={l} href={h} style={{ fontSize: 12, color: "#374151", textDecoration: "none" }}>{l}</a>
              ))}
            </div>
            <p style={{ fontSize: 12, color: "#374151", margin: 0 }}>Made with ❤️ for global AI teams</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
