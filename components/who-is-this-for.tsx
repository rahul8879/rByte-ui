import { CheckCircle, XCircle } from "lucide-react"

const PROFILES = [
  {
    emoji: "👨‍💼",
    title: "Working Professional",
    subtitle: "Software dev, analyst, or IT engineer",
    detail: "Want to move into AI roles without quitting your job. Live weekends — designed for you.",
  },
  {
    emoji: "🎓",
    title: "Fresh Graduate",
    subtitle: "CS, engineering, or any STEM degree",
    detail: "No experience needed. We build your portfolio from scratch so you compete from day one.",
  },
  {
    emoji: "📊",
    title: "Data / BI Analyst",
    subtitle: "Excel, SQL, Tableau background",
    detail: "Your domain knowledge + our AI skills = the exact profile companies are hunting for.",
  },
  {
    emoji: "🔄",
    title: "Career Switcher",
    subtitle: "Non-tech background (MBA, science, etc.)",
    detail: "We've placed MBAs and science grads. Domain expertise is your edge — we add the AI layer.",
  },
]

const GOOD_FIT = [
  "Can commit 8–10 hours/week on weekends",
  "Want a real portfolio, not just a certificate",
  "Serious about a ₹20 LPA+ AI role in 2026",
  "Willing to build, fail, and iterate on projects",
]

const NOT_FIT = [
  "Looking for a quick certificate with no real work",
  "Want completely self-paced with zero accountability",
  "Not willing to show up to live sessions",
]

export default function WhoIsThisFor() {
  return (
    <section className="w-full py-16 md:py-24 bg-white">
      <div className="container px-4 md:px-6 max-w-6xl mx-auto space-y-14">

        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-block rounded-lg bg-sky-100 px-3 py-1 text-sm text-sky-600 font-medium">
            Is This For Me?
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Who Gets Results From Rbyte.ai
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            We work with a wide range of backgrounds — but we're honest about what it takes.
          </p>
        </div>

        {/* Profile cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROFILES.map((p) => (
            <div
              key={p.title}
              className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-3 hover:border-sky-300 hover:shadow-sm transition-all"
            >
              <span className="text-4xl">{p.emoji}</span>
              <div>
                <h3 className="font-bold text-slate-900">{p.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{p.subtitle}</p>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{p.detail}</p>
            </div>
          ))}
        </div>

        {/* Good fit vs not */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 space-y-4">
            <h3 className="font-bold text-emerald-800 text-lg">You'll thrive here if you…</h3>
            <ul className="space-y-3">
              {GOOD_FIT.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-emerald-900">
                  <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 space-y-4">
            <h3 className="font-bold text-red-800 text-lg">This probably isn't for you if…</h3>
            <ul className="space-y-3">
              {NOT_FIT.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-red-900">
                  <XCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  )
}
