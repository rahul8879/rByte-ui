"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const FAQS = [
  {
    q: "Do I need prior coding or AI experience?",
    a: "No. We start from Python basics. If you can use a laptop and are willing to put in the work, you qualify. We've successfully placed MBA graduates, science teachers, and non-tech professionals.",
  },
  {
    q: "I have a full-time job. Can I manage this?",
    a: "Yes — that's exactly who we built this for. All live sessions are on weekends (Saturday + Sunday). You'll need 8–10 hours a week. Most of our placed learners were working full-time during the program.",
  },
  {
    q: "What's the difference between your 4 tracks?",
    a: "Data Science covers ML/DL fundamentals. GenAI + Agentic AI focuses on LLMs, RAG, and autonomous agents. Full Stack AI combines frontend + AI APIs. MLOps covers deployment, monitoring, and pipelines. You can pick one track or go full-stack across all four.",
  },
  {
    q: "Is placement guaranteed?",
    a: "We provide placement support until you get placed — resume reviews, mock interviews, referrals to hiring partners, and salary negotiation coaching. We don't use the word 'guaranteed' lightly, but our 94% placement rate speaks for itself.",
  },
  {
    q: "How is this different from Coursera, Udemy, or UpGrad?",
    a: "Those are recorded video libraries. Rbyte.ai is a live cohort — you build real projects with mentor code reviews, get direct feedback in live sessions, and graduate with a portfolio interviewers can actually see on GitHub. No pre-recorded binge-watching.",
  },
  {
    q: "What is the fee and are there EMI options?",
    a: "Pricing varies by track. All plans include no-cost EMI over 3, 6, or 12 months. Early-bird pricing is available until May 5. Check the pricing section below or WhatsApp us for a personalised quote.",
  },
  {
    q: "How small are the cohorts?",
    a: "Intentionally small — under 25 students per cohort. This keeps mentor time high and means you actually get reviewed, not just watched a recording and left alone.",
  },
  {
    q: "What happens if I miss a live session?",
    a: "All sessions are recorded and available within 24 hours. You won't fall behind. That said, live attendance is where the real learning happens — the recordings are a safety net, not the plan.",
  },
]

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="w-full py-16 md:py-24 bg-slate-50">
      <div className="container px-4 md:px-6 max-w-3xl mx-auto space-y-10">

        <div className="text-center space-y-3">
          <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm text-purple-600 font-medium">
            FAQ
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Questions We Always Get</h2>
          <p className="text-muted-foreground">Honest answers. No marketing fluff.</p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl border border-slate-200 bg-white overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left gap-4"
              >
                <span className="font-semibold text-slate-900 text-sm md:text-base">{faq.q}</span>
                <ChevronDown
                  className={`h-5 w-5 flex-shrink-0 text-slate-400 transition-transform duration-200 ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {open === i && (
                <div className="px-5 pb-5">
                  <p className="text-sm md:text-base text-slate-600 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-slate-500">
          Still have questions?{" "}
          <a
            href="https://wa.me/919893989103?text=Hi%2C%20I%20have%20a%20question%20about%20Rbyte.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 font-medium underline underline-offset-2"
          >
            WhatsApp us directly →
          </a>
        </p>

      </div>
    </section>
  )
}
