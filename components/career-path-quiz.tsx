"use client"

import { useMemo, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ConsistentButton } from "@/components/ui/consistent-button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Lightbulb, ArrowRight, BarChart3, Brain, Boxes, Code } from "lucide-react"

type TrackKey = "foundations" | "ml" | "nlp" | "mlops" | "product"

type Option = {
  label: string
  weight: Partial<Record<TrackKey, number>>
}

type Question = {
  id: string
  prompt: string
  options: Option[]
}

const QUESTIONS: Question[] = [
  {
    id: "bg",
    prompt: "What best describes your current background?",
    options: [
      { label: "New to data/AI", weight: { foundations: 2, product: 1 } },
      { label: "Software engineer", weight: { product: 2, ml: 1, mlops: 1 } },
      { label: "Data analyst/BI", weight: { foundations: 1, ml: 2 } },
      { label: "Research/Math heavy", weight: { nlp: 2, ml: 1 } },
    ],
  },
  {
    id: "goal",
    prompt: "Your primary goal in 6 months?",
    options: [
      { label: "Solid DS/ML fundamentals", weight: { foundations: 2, ml: 1 } },
      { label: "Ship AI features in apps", weight: { product: 2, ml: 1 } },
      { label: "Work with LLMs/NLP", weight: { nlp: 2, product: 1 } },
      { label: "Own pipelines/infra (MLOps)", weight: { mlops: 2, ml: 1 } },
    ],
  },
  {
    id: "strength",
    prompt: "Pick your current strength",
    options: [
      { label: "Frontend/Backend dev", weight: { product: 2 } },
      { label: "SQL/Data wrangling", weight: { foundations: 2, ml: 1 } },
      { label: "Modeling/Math", weight: { ml: 2, nlp: 1 } },
      { label: "DevOps/Cloud", weight: { mlops: 2, product: 1 } },
    ],
  },
  {
    id: "interest",
    prompt: "What excites you most?",
    options: [
      { label: "Turning ideas into shipped AI features", weight: { product: 2 } },
      { label: "Training/evaluating models", weight: { ml: 2 } },
      { label: "LLMs, RAG, prompts, agents", weight: { nlp: 2 } },
      { label: "Data pipelines, deployment, monitoring", weight: { mlops: 2 } },
    ],
  },
]

const TRACK_META: Record<TrackKey, { title: string; icon: React.ComponentType<any>; blurb: string; highlights: string[] }>
  = {
    foundations: {
      title: "Data Science Foundations",
      icon: BarChart3,
      blurb:
        "Master Python, statistics, and data wrangling to build a rock‑solid base for ML and LLM work.",
      highlights: ["Python + Pandas", "EDA & Stats", "Feature Engineering"],
    },
    ml: {
      title: "Machine Learning Engineer",
      icon: Brain,
      blurb: "Go deep on supervised/unsupervised learning, model evaluation, and production‑ready ML.",
      highlights: ["Classic ML", "TF/PyTorch", "Evaluation & Tuning"],
    },
    nlp: {
      title: "LLM/NLP Engineer",
      icon: Lightbulb,
      blurb: "Build with transformers, RAG systems, and fine‑tune models for domain tasks.",
      highlights: ["Transformers", "RAG Systems", "Fine‑tuning"],
    },
    mlops: {
      title: "MLOps/Platform Engineer",
      icon: Boxes,
      blurb: "Own the lifecycle: data → training → deployment, with CI/CD, observability and scaling.",
      highlights: ["Pipelines", "Deployment", "Monitoring"],
    },
    product: {
      title: "AI Product/Full‑Stack",
      icon: Code,
      blurb: "Design and ship AI features end‑to‑end with strong UX, APIs, and evaluation.",
      highlights: ["Prototyping", "LLM APIs", "Product Thinking"],
    },
  }

function computeTrack(scores: Record<TrackKey, number>): TrackKey {
  return (Object.keys(scores) as TrackKey[]).reduce((best, key) =>
    scores[key] > scores[best] ? key : best,
  "foundations")
}

export default function CareerPathQuiz({
  triggerVariant = "default",
}: {
  triggerVariant?: "default" | "soft"
}) {
  const [open, setOpen] = useState(false)
  const [answers, setAnswers] = useState<Record<string, number>>({})

  const step = Object.keys(answers).length
  const total = QUESTIONS.length
  const progress = Math.round((step / total) * 100)

  const scores = useMemo(() => {
    const s: Record<TrackKey, number> = { foundations: 0, ml: 0, nlp: 0, mlops: 0, product: 0 }
    QUESTIONS.forEach((q, i) => {
      const idx = answers[q.id]
      if (idx != null) {
        const opt = q.options[idx]
        Object.entries(opt.weight).forEach(([k, v]) => {
          s[k as TrackKey] += v || 0
        })
      }
    })
    return s
  }, [answers])

  const result = step === total ? computeTrack(scores) : null

  const reset = () => setAnswers({})

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) reset() }}>
      <DialogTrigger asChild>
        <ConsistentButton variant={triggerVariant === "soft" ? "secondary" : "gradient"}>
          Find Your AI Path <ArrowRight className="ml-2 h-4 w-4" />
        </ConsistentButton>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-amber-500" />
            2‑Minute Career Path Quiz
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Progress value={progress} />

          {QUESTIONS.map((q, i) => (
            <div key={q.id} className={i > step ? "hidden" : "block"}>
              <p className="font-medium mb-3">{i + 1}. {q.prompt}</p>
              <RadioGroup
                value={answers[q.id]?.toString() ?? ""}
                onValueChange={(v) => setAnswers((prev) => ({ ...prev, [q.id]: Number(v) }))}
                className="grid gap-2"
              >
                {q.options.map((opt, idx) => (
                  <div key={idx} className="flex items-center space-x-3 rounded-md border p-3 hover:bg-muted/40">
                    <RadioGroupItem id={`${q.id}-${idx}`} value={idx.toString()} />
                    <Label htmlFor={`${q.id}-${idx}`}>{opt.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ))}

          {result && (
            <div className="mt-2 rounded-lg border bg-card p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    {(() => { const Icon = TRACK_META[result].icon; return <Icon className="h-5 w-5 text-purple-500" /> })()}
                    <h3 className="text-lg font-semibold">Recommended Track: {TRACK_META[result].title}</h3>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{TRACK_META[result].blurb}</p>
                </div>
                <div className="flex gap-1">
                  {TRACK_META[result].highlights.map((h) => (
                    <Badge key={h} variant="secondary">{h}</Badge>
                  ))}
                </div>
              </div>

              <Separator className="my-3" />

              <div className="grid gap-2 text-sm">
                <p className="font-medium">What you’ll build:</p>
                {result === "nlp" && (
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>Production‑ready RAG app with evaluations</li>
                    <li>Fine‑tuned LLM for domain tasks</li>
                    <li>Agentic workflow with tools</li>
                  </ul>
                )}
                {result === "ml" && (
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>End‑to‑end ML project with CI</li>
                    <li>Feature store + model registry</li>
                    <li>Model monitoring dashboard</li>
                  </ul>
                )}
                {result === "foundations" && (
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>Exploratory data analysis portfolio</li>
                    <li>Feature engineering cookbook</li>
                    <li>Capstone ML classification project</li>
                  </ul>
                )}
                {result === "mlops" && (
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>Orchestrated training pipeline</li>
                    <li>Blue/green model deployments</li>
                    <li>Alerts, traces, and metrics</li>
                  </ul>
                )}
                {result === "product" && (
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>AI feature in a full‑stack app</li>
                    <li>Evaluation harness (A/B + prompts)</li>
                    <li>UX patterns for LLM features</li>
                  </ul>
                )}
              </div>

              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <ConsistentButton className="w-full sm:w-auto" variant="gradient" onClick={() => setOpen(false)}>
                  Enroll Now
                </ConsistentButton>
                <ConsistentButton className="w-full sm:w-auto" variant="secondary" onClick={() => setOpen(false)}>
                  Download Curriculum
                </ConsistentButton>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

