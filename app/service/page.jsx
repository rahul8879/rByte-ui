import Link from "next/link"
import Logo from "@/components/logo"
import ServiceLeadForm from "./lead-form"

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    icon: "🧭",
    tag: "Strategy",
    color: "#3b82f6",
    gradient: "linear-gradient(135deg,#3b82f6,#6366f1)",
    title: "AI Consulting & Roadmap",
    price: "From $1,500",
    short: "Know exactly where AI fits — and where it doesn't.",
    bullets: [
      "Audit your stack and workflows for AI readiness",
      "Identify the 2–3 highest-ROI use cases for your business",
      "Build a phased roadmap with clear milestones",
      "Buy-vs-build decisions and vendor evaluations",
      "Written AI strategy doc your team acts on today",
    ],
    who: "For founders overwhelmed by AI options who need a clear starting point.",
    code: `# rbyte.ai — Stack Audit\naudit = scan_infrastructure(client)\nuse_cases = rank_by_roi(audit, n=3)\nroadmap = Roadmap(\n  use_cases, timeline="12wk"\n)\nreturn roadmap.export_strategy_doc()`,
  },
  {
    icon: "⚙️",
    tag: "Development",
    color: "#a855f7",
    gradient: "linear-gradient(135deg,#a855f7,#ec4899)",
    title: "Custom AI App Development",
    price: "From $4,000",
    short: "We build the AI product — you ship it to your customers.",
    bullets: [
      "RAG assistants that read your documents, FAQs, or databases",
      "Agentic workflows: AI that takes actions, not just answers",
      "LLM fine-tuning and prompt engineering for your domain",
      "FastAPI / Next.js AI products ready for production",
      "Full source code delivered — no lock-in, no black boxes",
    ],
    who: "For product teams who want a working AI feature in weeks, not quarters.",
    code: `# Production RAG Pipeline\npipe = (\n  DocumentLoader(client_docs)\n  | Chunker(size=512, overlap=64)\n  | Embedder("text-embedding-3-large")\n  | PineconeStore("prod-v1")\n  | GPT4oRAGChain(temp=0.1)\n)\nFastAPI.mount("/v1/ask", pipe)`,
  },
  {
    icon: "🔗",
    tag: "Integration",
    color: "#10b981",
    gradient: "linear-gradient(135deg,#10b981,#06b6d4)",
    title: "AI Integration & Automation",
    price: "From $2,500",
    short: "Plug AI into the tools you already use.",
    bullets: [
      "Connect AI to your CRM, Slack, Notion, HubSpot, or ERP",
      "Intelligent automation pipelines (n8n, Zapier, custom APIs)",
      "AI-powered data extraction, classification, tagging at scale",
      "Replace manual workflows with autonomous AI agents",
      "Integrate OpenAI, Anthropic, or open-source LLMs",
    ],
    who: "For ops teams drowning in manual work that AI can handle in seconds.",
    code: `# Autonomous Lead Agent\nagent = Agent(\n  llm=GPT4o(), memory=Buffer(k=20),\n  tools=[CRM, Slack, HubSpot, Email]\n)\nn8n.on("webhook:/inbound-leads")\n  .pipe(agent.score_and_qualify)\n  .pipe(crm.route_hot_leads)\n  .pipe(slack.notify_sales_team)`,
  },
  {
    icon: "🎓",
    tag: "Training",
    color: "#f59e0b",
    gradient: "linear-gradient(135deg,#f59e0b,#ef4444)",
    title: "Team AI Upskilling",
    price: "From $2,000",
    short: "Turn your engineers into AI engineers — in 8 weeks.",
    bullets: [
      "Live cohort training tailored to your team's tech stack",
      "Every engineer ships a real AI feature by week 4",
      "Covers LLMs, RAG, vector DBs, agents, and deployment",
      "Private channel + ongoing Q&A for 3 months post-training",
      "Custom curriculum aligned to your product roadmap",
    ],
    who: "For CTOs who want AI-capable teams without expensive new hires.",
    code: `# 8-Week AI Engineering Sprint\ncohort = Cohort(team.engineers)\nfor wk, module in enumerate(CURRICULUM):\n  cohort.live_session(module)  # Sat+Sun\n  cohort.ship_feature(sprint=wk+1)\nassert all(\n  eng.shipped_ai_feature\n  for eng in cohort\n)  # → True ✓`,
  },
]

const PROJECTS = [
  {
    tag: "AI Automation",
    color: "#a855f7",
    icon: "🤖",
    title: "Automated Lead Qualification Pipeline",
    industry: "B2B SaaS",
    client: "US-based SaaS startup",
    stack: ["Python", "LangChain", "FastAPI", "GPT-4o", "n8n"],
    what: "End-to-end pipeline that ingests inbound leads, scores them against an ICP using an LLM, drafts personalised outreach, and routes hot leads to the CRM — zero human touch.",
    metric: "3 min",
    metricLabel: "lead response time",
    metricBefore: "was 6 hours",
    metricColor: "#a855f7",
    terminalLines: [
      { c: "#4b5563", t: "$ lead_pipeline run --env=production" },
      { c: "#9ca3af", t: "> Fetching 847 inbound leads from HubSpot..." },
      { c: "#9ca3af", t: "> Scoring against ICP (GPT-4o)..." },
      { c: "#60a5fa", t: "> [████████████████████] 100% complete" },
      { c: "#34d399", t: "> HOT (score >85): 124 leads → routed to CRM" },
      { c: "#9ca3af", t: "> Drafting personalised outreach..." },
      { c: "#34d399", t: "> ✓ Done. Response time: 3 min ← was 6 hrs" },
    ],
  },
  {
    tag: "RAG System",
    color: "#3b82f6",
    icon: "📄",
    title: "Internal Knowledge Base Assistant",
    industry: "Professional Services",
    client: "Consulting firm",
    stack: ["Python", "LangChain", "Pinecone", "Next.js", "OpenAI"],
    what: "Replaced a 200-page static PDF manual with a conversational AI that reads SOPs, policies, and product docs. Staff get cited answers in plain English — with source + page reference.",
    metric: "30 sec",
    metricLabel: "policy lookup",
    metricBefore: "was 12 minutes",
    metricColor: "#3b82f6",
    terminalLines: [
      { c: "#4b5563", t: "$ rag_system query --index=company-policies" },
      { c: "#9ca3af", t: `> Q: "Refund policy for enterprise clients?"` },
      { c: "#9ca3af", t: "> Retrieving top-5 chunks from Pinecone..." },
      { c: "#60a5fa", t: "> Reranking by relevance score..." },
      { c: "#9ca3af", t: "> Source: policy_v3.pdf [page 14, §3.2]" },
      { c: "#9ca3af", t: "> Generating cited response..." },
      { c: "#34d399", t: "> ✓ Answered in 28s ← was 12 minutes" },
    ],
  },
  {
    tag: "Workflow Automation",
    color: "#10b981",
    icon: "⚙️",
    title: "Invoice & PO Extraction Automation",
    industry: "Logistics & Supply Chain",
    client: "Logistics company",
    stack: ["Python", "GPT-4o Vision", "FastAPI", "PostgreSQL", "Zapier"],
    what: "Document intelligence pipeline that ingests scanned invoices via email, extracts structured fields, validates against PO records, and flags mismatches — replacing a 3-person data-entry team.",
    metric: "11 sec",
    metricLabel: "per invoice",
    metricBefore: "was 8 minutes",
    metricColor: "#10b981",
    terminalLines: [
      { c: "#4b5563", t: "$ invoice_processor --mode=production" },
      { c: "#9ca3af", t: "> Watching inbox: ops@logistics-client.com" },
      { c: "#60a5fa", t: "> New invoice: INV-2024-8821.pdf received" },
      { c: "#9ca3af", t: "> GPT-4o Vision extracting fields..." },
      { c: "#9ca3af", t: "> Validating against PO database..." },
      { c: "#34d399", t: "> ✓ All fields matched | Amount: $12,480" },
      { c: "#34d399", t: "> ✓ Processed in 11s ← was 8 minutes" },
    ],
  },
  {
    tag: "Agentic AI",
    color: "#f59e0b",
    icon: "🧠",
    title: "AI Research & Reporting Agent",
    industry: "Marketing Agency",
    client: "Digital marketing agency",
    stack: ["Python", "LangChain Agents", "Serper API", "GPT-4o", "FastAPI"],
    what: "Multi-step agent that takes a competitor or topic, searches the web autonomously, scrapes relevant pages, and produces a structured competitive analysis report — prompt to PDF, hands-free.",
    metric: "6 min",
    metricLabel: "per report",
    metricBefore: "was 4 hours",
    metricColor: "#f59e0b",
    terminalLines: [
      { c: "#4b5563", t: `$ research_agent run --topic="CompetitorX"` },
      { c: "#9ca3af", t: "> Step 1/5: Web search (12 queries)..." },
      { c: "#9ca3af", t: "> Step 2/5: Scraping 8 relevant pages..." },
      { c: "#9ca3af", t: "> Step 3/5: Extracting key insights..." },
      { c: "#9ca3af", t: "> Step 4/5: Synthesising competitive analysis..." },
      { c: "#9ca3af", t: "> Step 5/5: Generating PDF report..." },
      { c: "#34d399", t: "> ✓ Report ready in 6 min ← was 4 hours" },
    ],
  },
]

const TECH_STACK = [
  { name: "OpenAI GPT-4o", icon: "🤖" },
  { name: "LangChain", icon: "🔗" },
  { name: "FastAPI", icon: "⚡" },
  { name: "Pinecone", icon: "📌" },
  { name: "Next.js", icon: "▲" },
  { name: "n8n / Zapier", icon: "⚙️" },
  { name: "Anthropic Claude", icon: "🧠" },
  { name: "PostgreSQL", icon: "🗄️" },
  { name: "Python 3.11", icon: "🐍" },
  { name: "Docker / Cloud", icon: "☁️" },
  { name: "LangGraph", icon: "🕸️" },
  { name: "Weaviate / Chroma", icon: "🔮" },
]

const RESULTS = [
  { value: "10×", label: "avg speed-up on manual workflows", color: "#a855f7" },
  { value: "≤ 2wk", label: "to first working demo", color: "#3b82f6" },
  { value: "100%", label: "IP yours — zero lock-in", color: "#10b981" },
  { value: "4–8wk", label: "kick-off to production launch", color: "#f59e0b" },
]

const ARCH_NODES = [
  { label: "Your Data",    sub: "PDFs, DBs\nAPIs, CSVs",           color: "#6b7280",  icon: "📁" },
  { label: "Preprocess",   sub: "Chunk, Clean\nEmbed",              color: "#3b82f6",  icon: "⚙️" },
  { label: "LLM Core",     sub: "GPT-4o\nClaude · Llama",          color: "#a855f7",  icon: "🧠" },
  { label: "Vector Store", sub: "Pinecone\nWeaviate · Chroma",      color: "#ec4899",  icon: "📌" },
  { label: "API Layer",    sub: "FastAPI\nLangServe · n8n",         color: "#10b981",  icon: "⚡" },
  { label: "Your Product", sub: "Web · Mobile\nCRM · Slack",        color: "#f59e0b",  icon: "🚀" },
]

const PROCESS = [
  { num: "01", icon: "📞", color: "#3b82f6",  title: "Discovery Call",      desc: "30-min no-pressure call. We learn your stack, your pain points, and where AI can move the needle fastest." },
  { num: "02", icon: "📋", color: "#a855f7",  title: "Scope & Proposal",    desc: "Written proposal in 48 hours — scope, timeline, fixed cost, expected outcomes. We match the right engineers from our network to your project." },
  { num: "03", icon: "🔨", color: "#10b981",  title: "Build & Demo Weekly", desc: "Your matched engineers build. Dipanjali manages. You see real progress every 7 days — testable increments, no big reveals at the end." },
  { num: "04", icon: "🚀", color: "#f59e0b",  title: "Launch & Hand-off",   desc: "Deployed, documented, yours. Full source code + 30-day support window after go-live." },
]

const FAQS = [
  { q: "Who actually builds the AI — is it you or a third party?", a: "Dipanjali acts as your AI Project Manager and single point of contact. The build is handled by vetted senior AI engineers from our global network — specialists in LLMs, RAG, automation, and deployment. Every engineer is pre-screened. You always know who's on your project." },
  { q: "Do you work with international clients remotely?",     a: "Yes — 100% remote. We operate async-first: Slack or email for daily comms, weekly video calls for demos. We adapt to your time zone." },
  { q: "How quickly can you deliver a working prototype?",     a: "Most AI integration projects deliver a working demo in 10–14 business days. Full production builds take 4–8 weeks depending on scope." },
  { q: "What does it cost?",                                   a: "Consulting starts at $1,500 USD. Custom development starts at $4,000 USD. Team training is scoped per cohort size. All prices are fixed — no hourly surprises." },
  { q: "Do we keep ownership of the code and models?",        a: "Always. 100% of everything built is yours — source code, fine-tuned models, prompts, architecture. Full IP transfer is included in every project." },
  { q: "We don't have an engineering team. Can you help?",    a: "Yes — that's exactly who we work best with. We handle the full build and hand over a deployed product with documentation. Ongoing maintenance retainers available." },
]

const TERMINAL_LINES = [
  { c: "#4b5563", t: "$ rbyte-ai connect --project=new-client" },
  { c: "#34d399", t: "✓ Secure connection established" },
  { c: "#4b5563", t: "$ audit --stack=auto-detect --env=prod" },
  { c: "#9ca3af", t: "  Scanning infrastructure... done" },
  { c: "#60a5fa", t: "  Found: 3 high-ROI AI opportunities" },
  { c: "#4b5563", t: "$ build --service=rag-pipeline" },
  { c: "#9ca3af", t: "  Matching engineers from global network..." },
  { c: "#c084fc", t: "  ✓ 2 senior AI engineers assigned" },
  { c: "#9ca3af", t: "  Building: Pinecone + GPT-4o + FastAPI..." },
  { c: "#9ca3af", t: "  [████████████████████] 100% deployed" },
  { c: "#34d399", t: "✓ v1.0.0 live — Day 14 🚀" },
  { c: "#f59e0b", t: "  → ROI: 820% improvement in month 1" },
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
        <span style={{ color: "#c084fc", fontSize: 20, flexShrink: 0 }}>+</span>
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
    /* ── Base animations ── */
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
      0%   { box-shadow:0 0 0 0 rgba(168,85,247,0.55) }
      70%  { box-shadow:0 0 0 14px rgba(168,85,247,0) }
      100% { box-shadow:0 0 0 0 rgba(168,85,247,0) }
    }
    @keyframes ticker {
      0%   { transform:translateX(0) }
      100% { transform:translateX(-50%) }
    }
    /* ── Terminal animations ── */
    @keyframes t-appear {
      from { opacity:0; transform:translateY(5px) }
      to   { opacity:1; transform:translateY(0) }
    }
    @keyframes cursor-blink {
      0%,100% { opacity:1 }
      50%      { opacity:0 }
    }
    .tl { opacity:0; animation:t-appear 0.25s ease forwards; }
    .tl-0  { animation-delay:0.3s  }
    .tl-1  { animation-delay:0.75s }
    .tl-2  { animation-delay:1.2s  }
    .tl-3  { animation-delay:1.55s }
    .tl-4  { animation-delay:1.9s  }
    .tl-5  { animation-delay:2.25s }
    .tl-6  { animation-delay:2.7s  }
    .tl-7  { animation-delay:3.1s  }
    .tl-8  { animation-delay:3.5s  }
    .tl-9  { animation-delay:3.85s }
    .tl-10 { animation-delay:4.2s  }
    .tl-11 { animation-delay:4.55s }
    .t-cursor {
      opacity:0;
      animation:cursor-blink 1s step-end infinite;
      animation-delay:5s;
      color:#c084fc;
    }
    /* ── Project terminal lines ── */
    .ptl { opacity:0; animation:t-appear 0.2s ease forwards; }
    .ptl-0 { animation-delay:0.1s } .ptl-1 { animation-delay:0.4s }
    .ptl-2 { animation-delay:0.7s } .ptl-3 { animation-delay:1.0s }
    .ptl-4 { animation-delay:1.3s } .ptl-5 { animation-delay:1.6s }
    .ptl-6 { animation-delay:1.9s }
    /* ── Scan line ── */
    @keyframes scan-line {
      0%   { top:-15% }
      100% { top:115% }
    }
    .scan-wrap { position:relative; overflow:hidden; }
    .scan-wrap::after {
      content:""; position:absolute; left:0; right:0; height:80px; pointer-events:none; z-index:3;
      background:linear-gradient(180deg,transparent,rgba(168,85,247,0.06),transparent);
      animation:scan-line 4s linear infinite;
    }
    /* ── Architecture flow ── */
    @keyframes flow-pulse {
      0%,100% { opacity:0.4 }
      50%      { opacity:1 }
    }
    @keyframes flow-arrow {
      0%   { background-position:0% center }
      100% { background-position:200% center }
    }
    .arch-arrow {
      flex-shrink:0; align-self:center;
      width:36px; height:2px;
      background:linear-gradient(90deg,#6366f1,#a855f7,#ec4899,#6366f1);
      background-size:200%;
      animation:flow-arrow 1.8s linear infinite;
      position:relative;
    }
    .arch-arrow::after {
      content:"▸"; position:absolute; right:-10px; top:50%;
      transform:translateY(-50%); font-size:12px;
      color:#a855f7; animation:flow-pulse 1.8s ease-in-out infinite;
    }
    .arch-node {
      display:flex; flex-direction:column; align-items:center; text-align:center;
      padding:20px 16px; border-radius:14px; min-width:110px;
      background:rgba(255,255,255,0.03); position:relative; overflow:hidden;
      transition:transform 0.2s, border-color 0.2s;
    }
    .arch-node:hover { transform:translateY(-4px); }
    .arch-node::before {
      content:""; position:absolute; bottom:0; left:0; right:0; height:2px;
    }
    /* ── Live indicator ── */
    @keyframes live-pulse {
      0%,100% { opacity:1; transform:scale(1) }
      50%      { opacity:0.5; transform:scale(0.85) }
    }
    .live-dot {
      display:inline-block; width:7px; height:7px; border-radius:50%;
      background:#34d399; margin-right:6px;
      animation:live-pulse 1.4s ease-in-out infinite;
    }
    /* ── Aurora ── */
    .svc-aurora {
      position:absolute; filter:blur(70px); mix-blend-mode:screen;
      opacity:0.55; pointer-events:none;
      animation:aurora-move 20s ease-in-out infinite alternate;
    }
    .svc-aurora--1 { width:60vw;height:60vw;left:-18vw;top:-18vh;background:radial-gradient(closest-side,rgba(168,85,247,0.5),transparent 60%); }
    .svc-aurora--2 { width:45vw;height:45vw;right:-10vw;top:5vh;background:radial-gradient(closest-side,rgba(99,102,241,0.45),transparent 60%);animation-duration:25s; }
    .svc-aurora--3 { width:40vw;height:40vw;left:22vw;bottom:-14vh;background:radial-gradient(closest-side,rgba(236,72,153,0.4),transparent 60%);animation-duration:30s; }
    /* ── Grid bg ── */
    .svc-grid-bg {
      position:absolute; inset:0;
      background-image:linear-gradient(rgba(168,85,247,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(168,85,247,0.06) 1px,transparent 1px);
      background-size:44px 44px; pointer-events:none;
    }
    /* ── Shimmer button ── */
    .svc-shimmer-btn { position:relative; overflow:hidden; }
    .svc-shimmer-btn::after {
      content:""; position:absolute; inset:0;
      background:linear-gradient(120deg,transparent,rgba(255,255,255,0.22),transparent);
      transform:translateX(-100%); animation:shimmer 2.6s linear infinite; pointer-events:none;
    }
    /* ── Service card ── */
    .svc-card {
      position:relative; overflow:hidden; border-radius:16px; padding:28px;
      background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08);
      transition:transform 0.25s, border-color 0.25s, box-shadow 0.25s;
      display:flex; flex-direction:column;
    }
    .svc-card::before {
      content:""; position:absolute; top:0; left:0; bottom:0;
      width:4px; border-radius:4px 0 0 4px; background:var(--svc-accent); opacity:0.85;
    }
    .svc-card:hover {
      transform:translateY(-6px);
      border-color:rgba(168,85,247,0.5);
      box-shadow:0 24px 70px rgba(0,0,0,0.6), 0 0 0 1px rgba(168,85,247,0.2);
    }
    /* ── Project terminal card ── */
    .proj-terminal {
      border-radius:14px; overflow:hidden;
      border:1px solid rgba(255,255,255,0.1);
      background:#0d0d1a;
      transition:transform 0.25s, box-shadow 0.25s;
    }
    .proj-terminal:hover {
      transform:translateY(-4px);
      box-shadow:0 28px 70px rgba(0,0,0,0.7), 0 0 0 1px rgba(168,85,247,0.25);
    }
    .proj-terminal-header {
      padding:10px 16px; display:flex; align-items:center; gap:8px;
      background:rgba(255,255,255,0.04); border-bottom:1px solid rgba(255,255,255,0.07);
    }
    .proj-dot { width:12px; height:12px; border-radius:50%; flex-shrink:0; }
    /* ── Result card ── */
    .svc-result-card {
      padding:28px 20px; border-radius:14px; text-align:center;
      background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.07);
      transition:transform 0.2s, box-shadow 0.2s; position:relative; overflow:hidden;
    }
    .svc-result-card:hover { transform:scale(1.04); box-shadow:0 12px 40px rgba(0,0,0,0.5); }
    /* ── Ticker ── */
    .svc-ticker-wrap { overflow:hidden; }
    .svc-ticker-inner { display:flex; gap:0; animation:ticker 26s linear infinite; width:max-content; }
    .svc-ticker-inner:hover { animation-play-state:paused; }
    /* ── Process step ── */
    .svc-step { display:flex; gap:20px; align-items:flex-start; }
    .svc-step-dot {
      width:52px; height:52px; border-radius:50%; flex-shrink:0;
      display:flex; align-items:center; justify-content:center; font-size:22px;
    }
    /* ── Why card ── */
    .why-card {
      display:flex; gap:14px; padding:16px 18px; border-radius:12px;
      background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.07);
      transition:border-color 0.2s, box-shadow 0.2s;
    }
    .why-card:hover { border-color:rgba(168,85,247,0.35); box-shadow:0 4px 20px rgba(168,85,247,0.1); }
    /* ── Industry card ── */
    .svc-uc-card {
      padding:22px 20px; border-radius:12px;
      background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08);
      transition:border-color 0.2s, transform 0.2s;
    }
    .svc-uc-card:hover { border-color:rgba(168,85,247,0.4); transform:translateY(-3px); }
    /* ── FAQ ── */
    details summary::-webkit-details-marker { display:none; }
    details[open] { border-color:rgba(168,85,247,0.45) !important; }
    details[open] summary { background:rgba(168,85,247,0.07) !important; }
    /* ── Code block ── */
    .code-block {
      font-family:'Courier New',Courier,monospace;
      font-size:11.5px; line-height:1.75;
      background:rgba(0,0,0,0.45);
      border:1px solid rgba(255,255,255,0.07);
      border-radius:8px; padding:14px 16px;
      white-space:pre; overflow-x:auto;
      color:#a3e635; margin-top:auto;
    }
    .code-header {
      display:flex; align-items:center; gap:7px;
      padding:7px 12px;
      background:rgba(255,255,255,0.04);
      border-bottom:1px solid rgba(255,255,255,0.07);
      border-radius:8px 8px 0 0;
    }
    .code-dot { width:10px; height:10px; border-radius:50%; }
    /* ── Responsive ── */
    @media (max-width:960px) {
      .svc-hero-inner  { flex-direction:column !important; }
      .svc-hero-visual { display:none !important; }
      .svc-svc-grid    { grid-template-columns:1fr !important; }
      .svc-proj-inner  { grid-template-columns:1fr !important; }
      .svc-why-grid    { grid-template-columns:1fr !important; }
      .svc-res-grid    { grid-template-columns:1fr 1fr !important; }
      .arch-scroll     { flex-wrap:wrap; justify-content:center; }
      .arch-arrow      { display:none; }
    }
    @media (max-width:600px) {
      .svc-uc-grid     { grid-template-columns:1fr !important; }
      .svc-res-grid    { grid-template-columns:1fr !important; }
      .svc-step        { flex-direction:column; gap:10px; }
      .svc-hero-cta-wrap { flex-direction:column !important; }
      .svc-hero-cta-wrap a { width:100% !important; text-align:center !important; box-sizing:border-box; }
      .svc-ticker-wrap { display:none !important; }
    }
  `

  return (
    <div style={{ background: PAGE_BG, minHeight: "100vh", color: "#f9fafb", fontFamily: "inherit" }}>
      <style>{css}</style>

      {/* ── NAV ──────────────────────────────────────────────────────────────── */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, borderBottom: `1px solid ${BORDER}`, background: "rgba(2,6,23,0.92)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <Link href="/" style={{ textDecoration: "none" }}><Logo size="sm" /></Link>
            <span style={{ fontSize: 11, fontFamily: "monospace", color: "#4b5563", display: "flex", alignItems: "center" }}>
              <span className="live-dot" />
              <span style={{ color: "#34d399" }}>systems live</span>
            </span>
          </div>
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

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section style={{ position: "relative", padding: "96px 0 80px", overflow: "hidden" }}>
        <div className="svc-grid-bg" />
        <div className="svc-aurora svc-aurora--1" />
        <div className="svc-aurora svc-aurora--2" />
        <div className="svc-aurora svc-aurora--3" />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          <div className="svc-hero-inner" style={{ display: "flex", gap: 56, alignItems: "center" }}>

            {/* LEFT */}
            <div style={{ flex: "1 1 0", minWidth: 0 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 18px", borderRadius: 99, marginBottom: 28, border: "1px solid rgba(168,85,247,0.45)", background: "rgba(168,85,247,0.12)", fontSize: 13, fontWeight: 700, color: "#c084fc", animation: "pulse-ring 2.5s ease-out infinite" }}>
                🌍 AI Project Management · Global Engineer Network
              </div>

              <h1 style={{ fontSize: "clamp(34px, 5vw, 62px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em", margin: "0 0 8px" }}>
                <span style={{ background: "linear-gradient(100deg,#f0abfc 0%,#fff 45%,#93c5fd 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Ship Your First AI Feature</span>
              </h1>
              <h1 style={{ fontSize: "clamp(34px, 5vw, 62px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em", margin: "0 0 22px" }}>
                <span style={{ color: "#f9fafb" }}>in 2 Weeks.</span>
              </h1>

              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 8, marginBottom: 20, background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.25)", fontSize: 13, color: "#86efac" }}>
                <span>🎯</span>
                <span>For founders &amp; SMBs who need senior AI talent — without the 6-month hiring process.</span>
              </div>

              <p style={{ fontSize: 17, color: "#9ca3af", lineHeight: 1.7, maxWidth: 540, margin: "0 0 32px" }}>
                We <span style={{ color: "#f9fafb", fontWeight: 600 }}>connect you with vetted senior AI engineers</span> from our global network
                and manage the entire project — scope, delivery, and weekly demos.
                Working AI feature in 2 weeks. Zero job ads posted.
              </p>

              <div className="svc-hero-cta-wrap" style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 44 }}>
                <a href="https://calendly.com/rbyteai-info/rbyte-ai-ai-usecase-discussion" target="_blank" rel="noopener noreferrer" className="svc-shimmer-btn"
                  style={{ padding: "15px 32px", borderRadius: 10, background: "linear-gradient(135deg,#a855f7,#ec4899,#6366f1)", color: "#fff", fontWeight: 800, fontSize: 16, textDecoration: "none", boxShadow: "0 8px 32px rgba(168,85,247,0.5)" }}>
                  Book Free Discovery Call →
                </a>
                <a href="mailto:info@rbyteai.com"
                  style={{ padding: "15px 28px", borderRadius: 10, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", color: "#d1d5db", fontWeight: 700, fontSize: 16, textDecoration: "none" }}>
                  Email Us
                </a>
              </div>

              <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                {[
                  { icon: "🌎", t: "Clients worldwide" },
                  { icon: "⚡", t: "Demo in ≤ 2 weeks" },
                  { icon: "📂", t: "Full source code yours" },
                  { icon: "🔒", t: "IP fully yours" },
                  { icon: "💬", t: "Async & timezone-friendly" },
                ].map(({ icon, t }) => (
                  <span key={t} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: "#6b7280" }}>
                    <span>{icon}</span>{t}
                  </span>
                ))}
              </div>
            </div>

            {/* RIGHT — Terminal window */}
            <div className="svc-hero-visual" style={{ flexShrink: 0, width: 380 }}>
              <div className="scan-wrap" style={{ borderRadius: 14, border: "1px solid rgba(168,85,247,0.3)", background: "#080d1a", boxShadow: "0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(168,85,247,0.1)" }}>
                {/* Terminal header bar */}
                <div style={{ padding: "11px 16px", background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", gap: 8, borderRadius: "14px 14px 0 0" }}>
                  <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
                  <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#f59e0b", display: "inline-block" }} />
                  <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#34d399", display: "inline-block" }} />
                  <span style={{ flex: 1, textAlign: "center", fontSize: 11, color: "#4b5563", fontFamily: "monospace" }}>rbyte-ai — bash</span>
                </div>
                {/* Terminal body */}
                <div style={{ padding: "20px 20px 24px", fontFamily: "'Courier New', monospace", fontSize: 12.5, lineHeight: 1.9, minHeight: 300 }}>
                  {TERMINAL_LINES.map((line, i) => (
                    <div key={i} className={`tl tl-${i}`} style={{ color: line.c }}>
                      {line.t}
                    </div>
                  ))}
                  <span className="t-cursor">█</span>
                </div>
              </div>
              {/* Glow underneath terminal */}
              <div style={{ height: 1, background: "radial-gradient(ellipse 80% 1px at 50% 0, rgba(168,85,247,0.6), transparent)", marginTop: -1 }} />
            </div>

          </div>
        </div>
      </section>

      {/* ── RESULTS STRIP ────────────────────────────────────────────────────── */}
      <section style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, padding: "48px 0", background: "rgba(168,85,247,0.03)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div className="svc-res-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
            {RESULTS.map((r, i) => (
              <div key={i} className="svc-result-card">
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: r.color, opacity: 0.7, borderRadius: "14px 14px 0 0" }} />
                <p style={{ fontSize: "clamp(32px,4vw,50px)", fontWeight: 900, color: r.color, margin: "0 0 6px", letterSpacing: "-0.03em", lineHeight: 1 }}>
                  {r.value}
                </p>
                <p style={{ fontSize: 13, color: "#6b7280", margin: 0, lineHeight: 1.5 }}>{r.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH TICKER ──────────────────────────────────────────────────────── */}
      <section style={{ padding: "22px 0", borderBottom: `1px solid ${BORDER}`, overflow: "hidden", background: "rgba(0,0,0,0.2)" }}>
        <div className="svc-ticker-wrap">
          <div className="svc-ticker-inner">
            {[...TECH_STACK, ...TECH_STACK].map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 28px", whiteSpace: "nowrap", borderRight: `1px solid ${BORDER}` }}>
                <span style={{ fontSize: 16 }}>{t.icon}</span>
                <span style={{ fontSize: 12, color: "#6b7280", fontWeight: 700, fontFamily: "monospace", letterSpacing: "0.05em" }}>{t.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ARCHITECTURE PIPELINE (NEW) ───────────────────────────────────────── */}
      <section style={{ padding: "80px 0", borderBottom: `1px solid ${BORDER}`, background: "rgba(168,85,247,0.02)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 16px", borderRadius: 99, marginBottom: 16, background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.35)", fontSize: 12, fontWeight: 700, color: "#a5b4fc", textTransform: "uppercase", letterSpacing: "0.12em" }}>
              <span className="live-dot" />Technical Architecture
            </span>
            <h2 style={{ fontSize: "clamp(24px,3.5vw,40px)", fontWeight: 900, margin: "0 0 12px", letterSpacing: "-0.025em" }}>
              How We Build AI Systems
            </h2>
            <p style={{ fontSize: 15, color: "#6b7280", maxWidth: 480, margin: "0 auto" }}>
              Every project follows a battle-tested pipeline — from raw data to production deployment.
            </p>
          </div>

          {/* Pipeline */}
          <div className="arch-scroll" style={{ display: "flex", alignItems: "stretch", gap: 0, justifyContent: "center", overflowX: "auto", paddingBottom: 8 }}>
            {ARCH_NODES.map((node, i) => (
              <span key={node.label} style={{ display: "contents" }}>
                <div className="arch-node" style={{ border: `1px solid ${node.color}33`, boxShadow: `0 0 24px ${node.color}12` }}>
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: node.color, opacity: 0.6, borderRadius: "0 0 14px 14px" }} />
                  <div style={{ fontSize: 30, marginBottom: 10, filter: `drop-shadow(0 0 8px ${node.color}88)` }}>{node.icon}</div>
                  <div style={{ fontWeight: 800, fontSize: 13, color: "#f9fafb", marginBottom: 5, whiteSpace: "nowrap" }}>{node.label}</div>
                  <div style={{ fontSize: 10.5, color: "#4b5563", lineHeight: 1.5, whiteSpace: "pre-line", fontFamily: "monospace" }}>{node.sub}</div>
                </div>
                {i < ARCH_NODES.length - 1 && <div className="arch-arrow" />}
              </span>
            ))}
          </div>

          {/* Bottom note */}
          <p style={{ textAlign: "center", marginTop: 32, fontSize: 13, color: "#4b5563", fontFamily: "monospace" }}>
            stack adapts per project · we select the best tools for your use case
          </p>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────────────── */}
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
                {/* Glow orb */}
                <div style={{ position: "absolute", top: -40, right: -40, width: 140, height: 140, borderRadius: "50%", background: `${svc.color}18`, filter: "blur(30px)", pointerEvents: "none" }} />

                <div style={{ position: "relative", display: "flex", flexDirection: "column", height: "100%", gap: 0 }}>
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

                  <p style={{ fontSize: 15, color: "#d1d5db", fontWeight: 500, margin: "0 0 18px", lineHeight: 1.5 }}>{svc.short}</p>

                  <ul style={{ margin: "0 0 18px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                    {svc.bullets.map((b, j) => (
                      <li key={j} style={{ display: "flex", gap: 10, fontSize: 13, color: "#9ca3af", lineHeight: 1.55 }}>
                        <span style={{ color: svc.color, fontWeight: 800, flexShrink: 0 }}>→</span>{b}
                      </li>
                    ))}
                  </ul>

                  <div style={{ padding: "12px 14px", borderRadius: 8, background: `${svc.color}0e`, border: `1px solid ${svc.color}28`, fontSize: 13, color: "#9ca3af", lineHeight: 1.55, marginBottom: 16 }}>
                    <span style={{ color: svc.color, fontWeight: 700 }}>Best for: </span>{svc.who}
                  </div>

                  {/* Code snippet */}
                  <div style={{ marginBottom: 16 }}>
                    <div className="code-header">
                      <span className="code-dot" style={{ background: "#ef4444" }} />
                      <span className="code-dot" style={{ background: "#f59e0b" }} />
                      <span className="code-dot" style={{ background: "#34d399" }} />
                      <span style={{ fontSize: 10, color: "#4b5563", fontFamily: "monospace", marginLeft: 6 }}>snippet.py</span>
                    </div>
                    <div className="code-block" style={{ borderRadius: "0 0 8px 8px", borderTop: "none" }}>
                      {svc.code}
                    </div>
                  </div>

                  {/* Pricing */}
                  <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 16, fontWeight: 900, color: svc.color }}>{svc.price}</span>
                    <a href="https://calendly.com/rbyteai-info/rbyte-ai-ai-usecase-discussion" target="_blank" rel="noopener noreferrer"
                      style={{ fontSize: 13, fontWeight: 700, color: svc.color, textDecoration: "none", display: "flex", alignItems: "center", gap: 5 }}>
                      Book a call →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS — terminal style ─────────────────────────────────────────── */}
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

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {PROJECTS.map((proj, i) => (
              <div key={i} className="proj-terminal">
                {/* Terminal title bar */}
                <div className="proj-terminal-header">
                  <span className="proj-dot" style={{ background: "#ef4444" }} />
                  <span className="proj-dot" style={{ background: "#f59e0b" }} />
                  <span className="proj-dot" style={{ background: "#34d399" }} />
                  <span style={{ flex: 1, textAlign: "center", fontSize: 11, color: "#4b5563", fontFamily: "monospace" }}>
                    {proj.title.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z_]/g, "")}.py
                  </span>
                  <span style={{ padding: "2px 8px", borderRadius: 99, background: `${proj.color}18`, border: `1px solid ${proj.color}33`, fontSize: 10, fontWeight: 700, color: proj.color, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    {proj.tag}
                  </span>
                </div>

                {/* Top info */}
                <div style={{ padding: "18px 20px 14px", borderBottom: `1px solid ${BORDER}` }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 10 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 9, flexShrink: 0, background: `${proj.color}1a`, border: `1px solid ${proj.color}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
                      {proj.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: 15, fontWeight: 800, color: "#f9fafb", margin: "0 0 4px" }}>{proj.title}</h3>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 11, color: "#6b7280" }}>🏢 {proj.industry}</span>
                        <span style={{ fontSize: 11, color: "#6b7280" }}>· {proj.client}</span>
                      </div>
                    </div>
                    {/* Metric badge */}
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontSize: 26, fontWeight: 900, color: proj.metricColor, lineHeight: 1, letterSpacing: "-0.03em" }}>{proj.metric}</div>
                      <div style={{ fontSize: 10, color: "#6b7280", marginTop: 2 }}>{proj.metricLabel}</div>
                      <div style={{ fontSize: 10, color: "#374151", textDecoration: "line-through" }}>{proj.metricBefore}</div>
                    </div>
                  </div>
                  <p style={{ fontSize: 12.5, color: "#6b7280", lineHeight: 1.65, margin: 0 }}>{proj.what}</p>
                </div>

                {/* Stack pills */}
                <div style={{ padding: "10px 20px", borderBottom: `1px solid ${BORDER}`, display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {proj.stack.map((t, j) => (
                    <span key={j} style={{ padding: "2px 9px", borderRadius: 99, fontSize: 10.5, fontWeight: 600, fontFamily: "monospace", background: "rgba(255,255,255,0.04)", border: `1px solid ${BORDER}`, color: "#6b7280" }}>
                      {t}
                    </span>
                  ))}
                </div>

                {/* Terminal output */}
                <div style={{ padding: "14px 18px 18px", fontFamily: "monospace", fontSize: 11.5, lineHeight: 1.85, background: "rgba(0,0,0,0.2)" }}>
                  {proj.terminalLines.map((line, j) => (
                    <div key={j} className={`ptl ptl-${j}`} style={{ color: line.c }}>
                      {line.t}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 40, textAlign: "center", padding: "28px 20px", borderRadius: 14, background: "rgba(168,85,247,0.06)", border: "1px solid rgba(168,85,247,0.18)" }}>
            <p style={{ fontSize: 16, color: "#d1d5db", margin: "0 0 16px", fontWeight: 500 }}>Have a similar problem? Let's talk about what we can build for you.</p>
            <a href="https://calendly.com/rbyteai-info/rbyte-ai-ai-usecase-discussion" target="_blank" rel="noopener noreferrer" className="svc-shimmer-btn"
              style={{ display: "inline-block", padding: "13px 30px", borderRadius: 9, background: "linear-gradient(135deg,#a855f7,#ec4899,#6366f1)", color: "#fff", fontWeight: 800, fontSize: 15, textDecoration: "none", boxShadow: "0 4px 20px rgba(168,85,247,0.4)" }}>
              Book a Free Discovery Call →
            </a>
          </div>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────────────────────── */}
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
                  <div className="svc-step-dot" style={{ background: `${step.color}1a`, border: `2px solid ${step.color}55`, boxShadow: `0 0 18px ${step.color}30` }}>
                    {step.icon}
                  </div>
                  <div style={{ paddingTop: 6 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                      <p style={{ fontSize: 11, fontWeight: 900, color: step.color, textTransform: "uppercase", letterSpacing: "0.12em", margin: 0, fontFamily: "monospace" }}>Step {step.num}</p>
                      <div style={{ width: 30, height: 1, background: `${step.color}44` }} />
                    </div>
                    <h3 style={{ fontSize: 18, fontWeight: 800, color: "#f9fafb", margin: "0 0 8px" }}>{step.title}</h3>
                    <p style={{ fontSize: 14, color: "#9ca3af", lineHeight: 1.65, margin: 0 }}>{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY RBYTE ────────────────────────────────────────────────────────── */}
      <section style={{ padding: "80px 0", borderTop: `1px solid ${BORDER}`, background: "rgba(255,255,255,0.015)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <div className="svc-why-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
            <div>
              <span style={{ display: "inline-block", padding: "5px 16px", borderRadius: 99, marginBottom: 18, background: "rgba(168,85,247,0.12)", border: "1px solid rgba(168,85,247,0.35)", fontSize: 12, fontWeight: 700, color: "#c084fc", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                Why Rbyte.ai?
              </span>
              <h2 style={{ fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 900, margin: "0 0 18px", letterSpacing: "-0.025em" }}>
                Senior AI engineers, sourced and managed for you
              </h2>
              <p style={{ fontSize: 15, color: "#9ca3af", lineHeight: 1.75, margin: "0 0 28px" }}>
                Hiring one good AI engineer takes 3–6 months and costs $150k+/yr. We give you access to our
                global network of vetted AI specialists — and Dipanjali manages the project end-to-end so
                you never deal with scope creep, missed deadlines, or technical miscommunication.
              </p>
              <a href="https://calendly.com/rbyteai-info/rbyte-ai-ai-usecase-discussion" target="_blank" rel="noopener noreferrer" className="svc-shimmer-btn"
                style={{ display: "inline-block", padding: "13px 28px", borderRadius: 9, background: "linear-gradient(135deg,#a855f7,#ec4899,#6366f1)", color: "#fff", fontWeight: 800, fontSize: 15, textDecoration: "none", boxShadow: "0 4px 20px rgba(168,85,247,0.4)" }}>
                Schedule a Free Call →
              </a>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { icon: "🌍", color: "#a855f7", title: "Global AI engineer network",   desc: "We source from a vetted pool of senior AI engineers worldwide — you get the best fit for your stack and budget, fast." },
                { icon: "📋", color: "#3b82f6", title: "Full project management",       desc: "Dipanjali owns the scope, timeline, and communication. You get weekly demos and a clear delivery date — no surprises." },
                { icon: "⚡", color: "#10b981", title: "Fraction of the hiring cost",   desc: "Same engineer quality as a $150k+/yr hire. No recruiting fees, no onboarding, no HR overhead. Pay per project." },
                { icon: "🔒", color: "#f59e0b", title: "Outcome accountability",        desc: "Fixed scope, fixed price. If it's not right, we fix it. You own all source code — no lock-in, ever." },
              ].map((item, i) => (
                <div key={i} className="why-card">
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

      {/* ── FOUNDER ──────────────────────────────────────────────────────────── */}
      <section style={{ padding: "72px 0", borderTop: `1px solid ${BORDER}`, background: "rgba(168,85,247,0.025)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", gap: 36, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ flexShrink: 0, width: 88, height: 88, borderRadius: "50%", background: "linear-gradient(135deg,#a855f7 0%,#ec4899 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 38, boxShadow: "0 0 0 4px rgba(168,85,247,0.2), 0 8px 32px rgba(168,85,247,0.35)" }}>
              🤝
            </div>
            <div style={{ flex: "1 1 300px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10, flexWrap: "wrap" }}>
                <h3 style={{ fontSize: 22, fontWeight: 900, margin: 0, color: "#f9fafb" }}>Dipanjali Shukla</h3>
                <span style={{ padding: "3px 12px", borderRadius: 99, background: "rgba(168,85,247,0.12)", border: "1px solid rgba(168,85,247,0.35)", fontSize: 12, fontWeight: 700, color: "#c084fc" }}>
                  AI Project Manager · Founder, Rbyte.ai
                </span>
              </div>
              <p style={{ fontSize: 15, color: "#9ca3af", lineHeight: 1.7, margin: "0 0 16px", maxWidth: 580 }}>
                I help businesses transition to AI — without the 6-month hiring headache.
                I don't just consult; I <span style={{ color: "#e9d5ff", fontWeight: 600 }}>connect you with vetted senior AI engineers from our global network</span> and
                manage the entire project for you: scope, timelines, weekly demos, and delivery.
                You stay focused on your business. I make sure the right engineers build the right thing.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href="https://www.linkedin.com/in/dipanjali-shukla-aa1b16243/" target="_blank" rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "9px 18px", borderRadius: 8, background: "rgba(10,102,194,0.15)", border: "1px solid rgba(10,102,194,0.4)", color: "#60a5fa", fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  Connect on LinkedIn
                </a>
                <a href="https://calendly.com/rbyteai-info/rbyte-ai-ai-usecase-discussion" target="_blank" rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "9px 18px", borderRadius: 8, background: "rgba(168,85,247,0.12)", border: "1px solid rgba(168,85,247,0.35)", color: "#c084fc", fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
                  📅 Book a call with me →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ───────────────────────────────────────────────────────── */}
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

      {/* ── QUICK ENQUIRY FORM ────────────────────────────────────────────────── */}
      <ServiceLeadForm />

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
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

      {/* ── BOTTOM CTA ───────────────────────────────────────────────────────── */}
      <section style={{ padding: "100px 20px", textAlign: "center", borderTop: `1px solid ${BORDER}`, position: "relative", overflow: "hidden" }}>
        {/* Background glows */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg,rgba(168,85,247,0.1) 0%,rgba(2,6,23,0) 55%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 800, height: 500, background: "radial-gradient(closest-side,rgba(168,85,247,0.14),transparent 70%)", filter: "blur(50px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 400, height: 250, background: "radial-gradient(closest-side,rgba(236,72,153,0.08),transparent 70%)", filter: "blur(30px)", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 640, margin: "0 auto" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 16px", borderRadius: 99, marginBottom: 22, background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)", fontSize: 12, fontWeight: 700, color: "#4ade80", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            <span className="live-dot" />First call is free · No obligation
          </span>
          <h2 style={{ fontSize: "clamp(30px,5vw,58px)", fontWeight: 900, margin: "0 0 18px", letterSpacing: "-0.03em" }}>
            Ready to add AI<br />
            <span style={{ background: "linear-gradient(100deg,#f0abfc,#c084fc,#818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>to your business?</span>
          </h2>
          <p style={{ fontSize: 17, color: "#9ca3af", marginBottom: 40, lineHeight: 1.65 }}>
            30 minutes. We'll listen to what you're building, share honest thoughts on where AI helps, and give you a rough scope — completely free.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://calendly.com/rbyteai-info/rbyte-ai-ai-usecase-discussion" target="_blank" rel="noopener noreferrer" className="svc-shimmer-btn"
              style={{ padding: "17px 40px", borderRadius: 10, background: "linear-gradient(135deg,#a855f7,#ec4899,#6366f1)", color: "#fff", fontWeight: 800, fontSize: 17, textDecoration: "none", boxShadow: "0 8px 40px rgba(168,85,247,0.55)" }}>
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

    </div>
  )
}
