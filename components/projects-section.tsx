"use client"

import { useState } from "react"
import { CheckCircle, Lightbulb, Github, Trophy } from "lucide-react"
import ProjectShowcaseCard from "./project-showcase-card"

type TrackFilter = "All" | "Data Science" | "GenAI + Agentic" | "Full Stack AI" | "MLOps"

const PROJECTS = [
  // ── DATA SCIENCE ─────────────────────────────────────────────────────────
  {
    title: "Customer Churn Prediction System",
    track: "Data Science" as const,
    difficulty: "Intermediate" as const,
    description:
      "End-to-end ML pipeline that predicts which telecom or SaaS customers will cancel their subscription — with business-ready dashboards and alert thresholds.",
    whatYouBuild: [
      "Feature engineering pipeline on 15+ customer behavioural signals",
      "XGBoost + SHAP explainability dashboard so business teams understand why someone will churn",
      "REST API deployed on Render with real-time scoring & Streamlit monitoring UI",
    ],
    techStack: ["Python", "XGBoost", "SHAP", "Scikit-learn", "MLflow", "Streamlit", "FastAPI", "Render"],
    industryUse: "Jio, Airtel, Hotstar, SaaS companies — used by growth & retention teams to reduce CAC by 30–60%",
    demoUrl: "https://github.com/dmlc/xgboost/tree/master/demo",
  },
  {
    title: "Real-Time Fraud Detection Engine",
    track: "Data Science" as const,
    difficulty: "Advanced" as const,
    description:
      "A streaming ML system that flags fraudulent transactions in under 50 ms by combining rule-based filters with an isolation forest model — all in a production-grade pipeline.",
    whatYouBuild: [
      "Feature store with velocity features (transactions per hour, geo-distance anomaly)",
      "Isolation Forest + LightGBM ensemble with <50 ms inference on Kafka stream",
      "Alert system with Slack notifications and an explainability report per flagged transaction",
    ],
    techStack: ["Python", "LightGBM", "Kafka", "Redis", "FastAPI", "Docker", "PostgreSQL", "Grafana"],
    industryUse: "Razorpay, Paytm, HDFC Bank, PhonePe — every payment company runs a system like this 24/7",
  },
  {
    title: "Stock Sentiment & Price Movement Predictor",
    track: "Data Science" as const,
    difficulty: "Intermediate" as const,
    description:
      "Combines NLP sentiment analysis on financial news & Reddit with LSTM time-series forecasting to predict next-day stock price direction for NSE/BSE stocks.",
    whatYouBuild: [
      "News scraper + Reddit API pipeline feeding into a FinBERT sentiment classifier",
      "LSTM model fusing sentiment scores with OHLCV data for directional prediction",
      "Interactive Plotly Dash dashboard with live portfolio P&L simulation",
    ],
    techStack: ["Python", "FinBERT", "LSTM", "yfinance", "PRAW", "Plotly Dash", "PostgreSQL", "Airflow"],
    industryUse: "Quantitative desks at NSE brokerages, hedge funds, and algo-trading startups like Zerodha & Samco",
    demoUrl: "https://github.com/ProsusAI/finBERT",
  },

  // ── GENAI + AGENTIC ──────────────────────────────────────────────────────
  {
    title: "AI HR Recruiter Agent",
    track: "GenAI + Agentic" as const,
    difficulty: "Advanced" as const,
    description:
      "Multi-agent system that screens CVs against a job description, ranks candidates, auto-generates tailored interview question sets, and sends calendar invites — replacing 80% of manual HR work.",
    whatYouBuild: [
      "PDF CV parser → vector DB → semantic similarity ranking pipeline",
      "LangGraph orchestrator with 3 specialised agents (Screener, Ranker, Interviewer)",
      "Automated email/calendar integration via Gmail API with structured JSON output",
    ],
    techStack: ["LangGraph", "GPT-4o", "ChromaDB", "LangChain", "FastAPI", "Gmail API", "Pydantic"],
    industryUse:
      "HR SaaS products like Keka, Darwinbox, Freshteam — and any startup hiring at scale without a large recruiter team",
    demoUrl: "https://github.com/langchain-ai/langgraph/tree/main/examples",
  },
  {
    title: "WhatsApp Business AI Assistant",
    track: "GenAI + Agentic" as const,
    difficulty: "Intermediate" as const,
    description:
      "A production-ready WhatsApp bot that handles customer queries 24/7, processes orders, books appointments, and escalates to a human when it detects frustration — all powered by RAG over your business knowledge base.",
    whatYouBuild: [
      "Twilio WhatsApp webhook → intent classifier → RAG responder pipeline",
      "Emotion detection layer that auto-escalates negative-sentiment conversations to a human agent",
      "Admin dashboard showing conversation logs, escalation rate, and knowledge-base gaps",
    ],
    techStack: ["Twilio API", "GPT-4o-mini", "LangChain", "ChromaDB", "FastAPI", "Redis", "Next.js", "Supabase"],
    industryUse:
      "D2C e-commerce brands, clinics, real-estate agencies — any business that gets 100+ repetitive WhatsApp messages daily",
  },
  {
    title: "Legal Contract Analyser & Risk Flagger",
    track: "GenAI + Agentic" as const,
    difficulty: "Advanced" as const,
    description:
      "RAG-powered system that ingests contracts (PDF/DOCX), identifies high-risk clauses (indemnity, non-compete, penalties), compares them to standard templates, and answers free-text questions about the document.",
    whatYouBuild: [
      "Multi-format document ingestion pipeline (PDF, DOCX, scanned images via OCR)",
      "Clause-level chunking + custom retriever trained to surface risk-relevant passages first",
      "Interactive Q&A UI with side-by-side clause comparison and a risk-score heat map",
    ],
    techStack: ["GPT-4o", "LangChain", "ChromaDB", "Pytesseract", "PyMuPDF", "FastAPI", "React", "Tailwind"],
    industryUse:
      "Law firms, procurement teams at enterprises, startups reviewing investor term sheets — reduces contract review from days to minutes",
    demoUrl: "https://github.com/run-llama/llama_index/tree/main/llama-index-packs",
  },

  // ── FULL STACK AI ────────────────────────────────────────────────────────
  {
    title: "AI Job Portal with Smart CV Matching",
    track: "Full Stack AI" as const,
    difficulty: "Advanced" as const,
    description:
      "Full-stack platform where candidates upload their CV and instantly see job recommendations ranked by semantic similarity, plus AI-generated gap analysis and a prep plan for each role.",
    whatYouBuild: [
      "Next.js frontend with CV upload → OpenAI Embeddings → Supabase pgvector job search",
      "Gap analysis agent that compares CV skills to JD requirements and suggests courses",
      "Admin panel for companies to post jobs and view AI-scored candidate shortlists",
    ],
    techStack: ["Next.js 14", "FastAPI", "OpenAI Embeddings", "Supabase pgvector", "PostgreSQL", "Tailwind", "Docker"],
    industryUse:
      "Naukri, LinkedIn, Instahyre — any job platform where manual screening creates a bottleneck. Also used internally by large enterprises for internal mobility",
  },
  {
    title: "AI News Aggregator with Personalised Feed",
    track: "Full Stack AI" as const,
    difficulty: "Intermediate" as const,
    description:
      "Real-time app that scrapes 50+ news sources, deduplicates stories using NLP, summarises each with GPT-4o-mini, and learns your preferences to serve a ranked personalised feed — like a smart RSS reader.",
    whatYouBuild: [
      "Scheduled scraper (Bull queues) + NLP deduplication using cosine similarity on embeddings",
      "GPT-4o-mini summarisation pipeline with TL;DR, key entities, and sentiment tag per article",
      "React frontend with user preference learning via implicit feedback (clicks, saves, skips)",
    ],
    techStack: ["Next.js", "BullMQ", "Redis", "GPT-4o-mini", "OpenAI Embeddings", "PostgreSQL", "Tailwind", "Vercel"],
    industryUse:
      "Media aggregators like Inshorts, Feedly, Briefing — and B2B intelligence products that monitor competitor news for sales teams",
  },

  // ── MLOPS ─────────────────────────────────────────────────────────────────
  {
    title: "End-to-End ML Platform on AWS",
    track: "MLOps" as const,
    difficulty: "Advanced" as const,
    description:
      "Production-grade ML platform with automated retraining pipelines, experiment tracking, model registry, A/B deployment, and rollback — the kind of system that runs ML at every funded startup and large tech company.",
    whatYouBuild: [
      "Data pipeline (S3 → feature store → training) orchestrated with Apache Airflow on EC2",
      "MLflow experiment tracking + model registry with automated evaluation gates",
      "CI/CD pipeline (GitHub Actions → ECR → SageMaker Endpoint) with blue/green deployment",
    ],
    techStack: ["AWS SageMaker", "MLflow", "Apache Airflow", "Docker", "GitHub Actions", "ECR", "S3", "FastAPI"],
    industryUse:
      "Every company with ML in production: Swiggy, Meesho, CRED, Amazon India — MLOps engineers who build this earn ₹25–50 LPA",
    demoUrl: "https://github.com/mlflow/mlflow/tree/master/examples",
  },
  {
    title: "LLM Observability & Cost Dashboard",
    track: "MLOps" as const,
    difficulty: "Intermediate" as const,
    description:
      "Monitoring system for GenAI applications that tracks token costs, latency by prompt type, hallucination rate (via LLM-as-judge), user satisfaction scores, and alerts the team when quality degrades.",
    whatYouBuild: [
      "Langfuse integration to capture every LLM call with latency, tokens, cost, and user feedback",
      "LLM-as-judge pipeline that evaluates 5% of responses for hallucination and coherence",
      "Grafana dashboard with cost-per-feature alerts and a weekly model quality email report",
    ],
    techStack: ["Langfuse", "Prometheus", "Grafana", "FastAPI", "PostgreSQL", "Python", "Docker", "OpenAI"],
    industryUse:
      "Any team running GPT-4o at scale — startups spending ₹5L+/month on LLM API costs and enterprises with compliance requirements for AI output quality",
    demoUrl: "https://github.com/langfuse/langfuse",
  },
]

const TRACK_COUNTS = {
  "Data Science": PROJECTS.filter((p) => p.track === "Data Science").length,
  "GenAI + Agentic": PROJECTS.filter((p) => p.track === "GenAI + Agentic").length,
  "Full Stack AI": PROJECTS.filter((p) => p.track === "Full Stack AI").length,
  MLOps: PROJECTS.filter((p) => p.track === "MLOps").length,
}

const TRACK_COLORS: Record<string, string> = {
  All: "bg-slate-900 text-white border-slate-900",
  "Data Science": "bg-blue-600 text-white border-blue-600",
  "GenAI + Agentic": "bg-purple-600 text-white border-purple-600",
  "Full Stack AI": "bg-emerald-600 text-white border-emerald-600",
  MLOps: "bg-amber-500 text-white border-amber-500",
}

const TRACK_INACTIVE: Record<string, string> = {
  All: "bg-white text-slate-600 border-slate-200 hover:border-slate-400",
  "Data Science": "bg-white text-blue-700 border-blue-200 hover:border-blue-400",
  "GenAI + Agentic": "bg-white text-purple-700 border-purple-200 hover:border-purple-400",
  "Full Stack AI": "bg-white text-emerald-700 border-emerald-200 hover:border-emerald-400",
  MLOps: "bg-white text-amber-700 border-amber-200 hover:border-amber-400",
}

export default function ProjectsSection() {
  const [activeTrack, setActiveTrack] = useState<TrackFilter>("All")

  const visible = activeTrack === "All" ? PROJECTS : PROJECTS.filter((p) => p.track === activeTrack)

  return (
    <section id="projects" className="w-full py-12 md:py-24 lg:py-32 bg-slate-50 dark:bg-slate-900">
      <div className="container px-4 md:px-6">

        {/* Header */}
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
          <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-600 font-medium">
            Real-World Projects
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Ship Projects Employers Actually Pay For
          </h2>
          <p className="max-w-[760px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Every project is based on a real system running inside Indian and global companies today — not toy
            examples. You graduate with a GitHub portfolio that speaks for itself in interviews.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-6 pt-2 text-sm">
            <div className="flex items-center gap-1.5">
              <Trophy className="h-4 w-4 text-amber-500" />
              <span className="font-semibold">10 projects</span>
              <span className="text-muted-foreground">across 4 tracks</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Github className="h-4 w-4 text-slate-700" />
              <span className="font-semibold">GitHub-ready</span>
              <span className="text-muted-foreground">with full code + docs</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="font-semibold">Deployed live</span>
              <span className="text-muted-foreground">not just Jupyter notebooks</span>
            </div>
          </div>
        </div>

        {/* Track filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {(["All", "Data Science", "GenAI + Agentic", "Full Stack AI", "MLOps"] as TrackFilter[]).map((track) => (
            <button
              key={track}
              type="button"
              onClick={() => setActiveTrack(track)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
                activeTrack === track ? TRACK_COLORS[track] : TRACK_INACTIVE[track]
              }`}
            >
              {track}
              {track !== "All" && (
                <span className="ml-1.5 opacity-70">
                  ({TRACK_COUNTS[track as keyof typeof TRACK_COUNTS]})
                </span>
              )}
              {track === "All" && (
                <span className="ml-1.5 opacity-70">({PROJECTS.length})</span>
              )}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <div className="mx-auto max-w-6xl grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((project) => (
            <ProjectShowcaseCard key={project.title} {...project} />
          ))}
        </div>

        {/* Portfolio callout */}
        <div className="mt-14 max-w-5xl mx-auto bg-gradient-to-r from-slate-900 to-indigo-950 rounded-2xl p-8 text-white">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="flex-shrink-0">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 border border-white/20">
                <Lightbulb className="h-7 w-7 text-amber-300" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">What Sets Your Portfolio Apart</h3>
              <p className="text-slate-300 text-sm mb-5 leading-relaxed">
                Most bootcamps give you notebook exercises. We make you build, deploy, and explain production systems.
                Hiring managers at top companies have told us: <em>&quot;Your students&apos; projects look like they came
                from our own engineers.&quot;</em>
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Live deployment URL for every project — not just code",
                  "Mentor code review on every submission before it hits your GitHub",
                  "Each project maps to a real job description you&apos;ll interview for",
                  "SHAP/explainability reports — interviewers love this",
                  "Architecture diagrams + README written for recruiters",
                  "LLMOps / monitoring included — not just model training",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-200">{item.replace(/&apos;/g, "'")}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
