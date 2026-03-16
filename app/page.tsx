"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  CheckCircle,
  Zap,
  Database,
  Brain,
  BookOpen,
  Code,
  Lightbulb,
  BarChart,
  BookMarked,
  Briefcase,
  GraduationCap,
  ClipboardCheck,
  UserCheck,
  FileText,
  BookOpenIcon,
  Sparkles,
  Gift,
  PartyPopper,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import CourseFeatureCard from "@/components/course-feature-card"
import Logo from "@/components/logo"
import VideoPlayer from "@/components/video-player"
import CountdownTimer from "@/components/countdown-timer"
import EnrollmentBanner from "@/components/enrollment-banner"
import FeatureBadge from "@/components/feature-badge"
import WhyGenAISection from "@/components/why-genai-section"
import WhoIsThisFor from "@/components/who-is-this-for"
import FAQSection from "@/components/faq-section"
import CourseDifferentiators from "@/components/course-differentiators"
import FreeMasterclassBanner from "@/components/free-masterclass-banner"
import DetailedCurriculum from "@/components/detailed-curriculum"
import SalaryComparison from "@/components/salary-comparison"
import SuccessMetrics from "@/components/success-metrics"
import PlacementGuarantee from "@/components/placement-guarantee"
import { useState, useEffect } from "react"
// Update the import to include the new FutureJobMarketPredictions component
// First, let's fix the enrollment drawer functionality by adding the missing import and component
// Add this import at the top with the other imports:
import EnrollmentDrawer from "@/components/enrollment-drawer"
import { Input } from "@/components/ui/input"
import WhatsAppButton from "@/components/whatsapp-button"
// Add the import for API utilities
import { sendOtp, verifyOtp, getCurriculumUrl, registerLead } from "@/lib/api"
import { toast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
// Import the ConsistentButton component
import { ConsistentButton } from "@/components/ui/consistent-button"
// Find the section where pricing is displayed and replace it with our new component
// Import the PricingSection component at the top of the file
import PricingSection from "@/components/pricing-section"
// ProjectsSection moved to /projects page
import CareerPathQuiz from "@/components/career-path-quiz"
import AnnouncementBar from "@/components/announcement-bar"
import SocialProof from "@/components/social-proof"
import TrustSection from "@/components/trust-section"
import AIEraSection from "@/components/ai-era-section"
import CurriculumPathSection from "@/components/curriculum-path-section"
import DiwaliSaleModal from "@/components/diwali-sale-modal"

export default function Home() {
  // Next batch date: May 5, 2026
  const targetDate = new Date("2026-05-05T09:00:00+05:30")

  const holidayLightColors = ["#dc2626", "#16a34a", "#facc15", "#38bdf8", "#dc2626", "#16a34a", "#facc15", "#38bdf8"]

  const holidayHighlights = [
    {
      title: "2026 Agentic AI Launch",
      category: "Agentic AI",
      description: "Build autonomous agents, multi-tool copilots, and RAG systems that deliver real business outcomes.",
      icon: Sparkles,
      accent: "from-emerald-400/20 via-sky-300/10 to-transparent",
    },
    {
      title: "Career-Ready Portfolio",
      category: "Career Portfolio",
      description: "Ship deployable projects with LLMOps, evals, and monitoring to prove production readiness.",
      icon: Gift,
      accent: "from-amber-400/20 via-orange-300/10 to-transparent",
    },
    {
      title: "Focused Learning Tracks",
      category: "Learning Tracks",
      description: "Pick Data Science, GenAI + Agentic AI, Full Stack AI, or MLOps—tailored for your role.",
      icon: PartyPopper,
      accent: "from-sky-400/20 via-indigo-300/10 to-transparent",
    },
  ]

  const [isRegistrationDrawerOpen, setIsRegistrationDrawerOpen] = useState(false)

  const [showSyllabusForm, setShowSyllabusForm] = useState(false)
  const [syllabusFormMode, setSyllabusFormMode] = useState<"syllabus" | "enroll">("syllabus")
  const [syllabusFormData, setSyllabusFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+91",
  })
  const [syllabusOtpSent, setSyllabusOtpSent] = useState(false)
  const [syllabusOtp, setSyllabusOtp] = useState<string[]>(Array(6).fill(""))
  const [syllabusOtpError, setSyllabusOtpError] = useState<string | null>(null)
  const [syllabusSuccess, setSyllabusSuccess] = useState(false)
  // Add loading states
  const [syllabusFormLoading, setSyllabusFormLoading] = useState(false)
  const [syllabusVerifying, setSyllabusVerifying] = useState(false)
  const isEnrollMode = syllabusFormMode === "enroll"
  const [syllabusResendCooldown, setSyllabusResendCooldown] = useState(0)

  /* Tick down OTP resend cooldown every second */
  useEffect(() => {
    if (syllabusResendCooldown <= 0) return
    const t = setTimeout(() => setSyllabusResendCooldown((c) => c - 1), 1000)
    return () => clearTimeout(t)
  }, [syllabusResendCooldown])

  // ────────────────────────────────────────────────────────

  const openEnrollmentDrawer = () => {
    setSyllabusFormMode("enroll")
    setShowSyllabusForm(true)
  }

  const openRegistrationDrawer = () => {
    setIsRegistrationDrawerOpen(true)
  }

  const closeRegistrationDrawer = () => {
    setIsRegistrationDrawerOpen(false)
  }

  const openSyllabusForm = () => {
    setSyllabusFormMode("syllabus")
    setShowSyllabusForm(true)
  }

  const closeSyllabusForm = () => {
    setShowSyllabusForm(false)
    setSyllabusFormMode("syllabus")
    setSyllabusOtpSent(false)
    setSyllabusOtp(Array(6).fill(""))
    setSyllabusOtpError(null)
    setSyllabusSuccess(false)
  }

  const handleSyllabusFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setSyllabusFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Update the handleSyllabusFormSubmit function
  const handleSyllabusFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Validate form
    if (!syllabusFormData.name || !syllabusFormData.phone) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setSyllabusFormLoading(true)
    const otpRes = await sendOtp({ phone: syllabusFormData.phone, country_code: syllabusFormData.countryCode })
    setSyllabusFormLoading(false)

    if (otpRes.error) {
      toast({
        title: "Failed to send OTP",
        description: otpRes.error,
        variant: "destructive",
      })
      return
    }

    setSyllabusOtpSent(true)
    setSyllabusResendCooldown(10)
    toast({
      title: "OTP Sent",
      description: `A verification code has been sent to ${syllabusFormData.countryCode} ${syllabusFormData.phone}`,
    })
  }

  const handleSyllabusOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value
    if (value.match(/^[0-9]$/) || value === "") {
      const newOtp = [...syllabusOtp]
      newOtp[index] = value
      setSyllabusOtp(newOtp)

      // Auto-focus next input if a digit was entered
      if (value !== "" && index < 5) {
        const nextInput = document.getElementById(`syllabus-otp-${index + 1}`)
        if (nextInput) {
          nextInput.focus()
        }
      }
      // Auto-focus previous input if current input is cleared
      else if (value === "" && index > 0) {
        const prevInput = document.getElementById(`syllabus-otp-${index - 1}`)
        if (prevInput) {
          prevInput.focus()
        }
      }
    }
  }

  const verifySyllabusOtp = async () => {
    setSyllabusVerifying(true)

    const verifyRes = await verifyOtp({
      phone: syllabusFormData.phone,
      country_code: syllabusFormData.countryCode,
      otp: syllabusOtp.join(""),
    })

    if (verifyRes.error) {
      setSyllabusOtpError(verifyRes.error)
      toast({ title: "Verification Failed", description: verifyRes.error, variant: "destructive" })
      setSyllabusVerifying(false)
      return
    }

    // Always save the lead — differentiate source by mode
    const leadRes = await registerLead({
      name: syllabusFormData.name,
      email: syllabusFormData.email || undefined,
      phone: syllabusFormData.phone,
      country_code: syllabusFormData.countryCode,
      heard_from: isEnrollMode ? "Homepage Enroll CTA" : "Curriculum Download",
    })

    setSyllabusVerifying(false)

    if (leadRes.error) {
      setSyllabusOtpError(leadRes.error)
      toast({ title: "Submission Failed", description: leadRes.error, variant: "destructive" })
      return
    }

    setSyllabusSuccess(true)
    setSyllabusOtpError(null)
    toast({
      title: isEnrollMode ? "Enrollment request received" : "Verification Successful!",
      description: isEnrollMode
        ? "Our admissions team will reach out shortly to help you secure your seat."
        : "You can now download the curriculum.",
    })
  }

  const downloadSyllabus = () => {
    // Track the download and open PDF — passes user info so backend can log the request
    window.open(
      getCurriculumUrl({
        name: syllabusFormData.name,
        phone: syllabusFormData.phone,
        email: syllabusFormData.email || undefined,
      }),
      "_blank"
    )
    closeSyllabusForm()
  }

  const modalTitle = !syllabusOtpSent
    ? isEnrollMode
      ? "Enroll Now"
      : "Get Course Details"
    : !syllabusSuccess
      ? "Verify Your Phone Number"
      : isEnrollMode
        ? "Enrollment Request Received"
        : "Download Syllabus"

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden w-full pb-16 sm:pb-0">
      <DiwaliSaleModal onEnroll={openEnrollmentDrawer} storageKey="cohort-may2026-modal-seen" />
      {/* Announcement Bar */}
      <AnnouncementBar
        nextBatchDateText="Next batch: May 5, 2026 — Only 5 seats left"
        ctaText="Claim 50% Off"
        onCtaClick={openEnrollmentDrawer}
      />
      {/* Navbar */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <Logo size="sm" />
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Link
                href="#features"
                className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-primary sm:block"
              >
                Features
              </Link>
              <Link
                href="#curriculum"
                className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-primary sm:block"
              >
                Curriculum
              </Link>
              <Link
                href="#roadmap"
                className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-primary sm:block"
              >
                Roadmap
              </Link>
              <Link
                href="/masterclass"
                className="hidden text-sm font-medium transition-colors sm:flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 px-3 py-1"
              >
                🎓 Free Masterclass
              </Link>
              <Link
                href="/service"
                className="hidden text-sm font-medium transition-colors sm:flex items-center gap-1 rounded-full bg-purple-950 border border-purple-700/40 text-purple-300 hover:bg-purple-900/60 px-3 py-1"
              >
                🤝 AI Services
              </Link>
              <Link
                href="#pricing"
                className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-primary sm:block"
              >
                Pricing
              </Link>
              <ConsistentButton size="sm" variant="gradient" onClick={openEnrollmentDrawer}>
                Enroll Now
              </ConsistentButton>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="relative w-full py-14 md:py-24 lg:py-28 bg-gradient-to-br from-slate-950 via-sky-950 to-emerald-950 overflow-hidden">
          {/* Background layers */}
          <div className="ai-grid" />
          <div className="absolute inset-0 -z-10">
            <div className="ai-aurora ai-aurora--1" />
            <div className="ai-aurora ai-aurora--2" />
            <div className="ai-aurora ai-aurora--3" />
            <div className="ai-noise" />
          </div>
          <div className="holiday-light-string">
            {holidayLightColors.map((color, index) => (
              <span key={`holiday-bulb-${index}`} className="holiday-bulb"
                style={{ "--bulb-color": color } as React.CSSProperties} />
            ))}
          </div>

          <div className="container px-4 md:px-6 relative">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">

              {/* ── Left: text (always first — mobile & desktop) ── */}
              <div className="flex flex-col gap-6">

                {/* Pills — program name + urgency */}
                <div className="flex flex-wrap items-center gap-2 self-start">
                  <div
                    className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-black tracking-wide backdrop-blur-sm"
                    style={{
                      background: "linear-gradient(135deg, rgba(168,85,247,0.2), rgba(236,72,153,0.15))",
                      border: "1px solid rgba(168,85,247,0.4)",
                      color: "#e879f9",
                    }}
                  >
                    Full Stack AI Engineering
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/15 px-4 py-1.5 text-sm font-semibold text-emerald-300 backdrop-blur-sm">
                    <Sparkles className="h-3.5 w-3.5" />
                    May 2026 · Only 5 seats left
                  </div>
                </div>

                {/* Headline */}
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl xl:text-6xl leading-[1.1] text-gradient-ai">
                  Become a Full Stack AI Engineer in 2026
                </h1>

                {/* Subline — punchy, 15 words */}
                <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-lg">
                  Live weekend cohorts. Real projects. Mentor reviews.
                  <span className="text-white font-semibold"> Supported until you land a ₹20 LPA+ AI role.</span>
                </p>

                {/* Trust stats */}
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                  {[
                    { icon: "🚀", stat: "May 2026", label: "first cohort launching" },
                    { icon: "🔥", stat: "3 seats",  label: "already claimed" },
                    { icon: "👥", stat: "20 max",   label: "batch cap — by design" },
                  ].map(({ icon, stat, label }) => (
                    <div key={label} className="flex items-center gap-1.5 text-slate-300">
                      <span>{icon}</span>
                      <span className="font-bold text-white">{stat}</span>
                      <span className="text-slate-400">{label}</span>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <ConsistentButton
                    size="lg"
                    variant="gradient"
                    className="btn-shimmer w-full sm:w-auto"
                    onClick={openEnrollmentDrawer}
                    rightIcon={<ArrowRight className="ml-1 h-4 w-4" />}
                  >
                    Secure My Spot
                  </ConsistentButton>
                  <ConsistentButton
                    size="lg"
                    variant="outline"
                    className="text-white border-white/40 hover:bg-white/10 w-full sm:w-auto"
                    onClick={openSyllabusForm}
                  >
                    Get Course Details
                  </ConsistentButton>
                </div>

                {/* Countdown */}
                <div className="flex flex-col items-start gap-1">
                  <p className="text-xs text-slate-400 uppercase tracking-wide font-medium">Next batch starts in</p>
                  <CountdownTimer targetDate={targetDate} className="text-white" />
                </div>

              </div>

              {/* ── Right: image ─────────────────────────────── */}
              <div className="relative flex justify-center lg:justify-end">
                <div className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl shadow-sky-900/40 aspect-[4/3]">
                  <Image
                    src="/rbyte-ai-team-hero.png"
                    alt="Rbyte.ai learners building AI projects"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 520px"
                    priority
                  />
                  {/* Subtle bottom gradient only — no competing CTA */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* ── Video — below fold once user is interested ────── */}
        <section className="w-full py-12 bg-slate-950 border-t border-slate-800/60">
          <div className="container px-4 md:px-6 max-w-3xl mx-auto text-center space-y-4">
            <p className="text-sm font-medium text-slate-400 uppercase tracking-wide">See it in action</p>
            <h2 className="text-2xl font-bold text-white">Watch: Data Science → GenAI → Agentic AI in one program</h2>
            <VideoPlayer
              thumbnailUrl="/course-preview-thumbnail.png"
              videoTitle="Data Science, GenAI, and Agentic AI in one platform"
              videoDescription="Explore the tracks and projects that take you from basics to production-grade AI systems"
              youtubeId="mdcEz7Gg7b4"
            />
          </div>
        </section>

        {/* ── Why GenAI + Agentic AI ──────────────────────── */}
        <WhyGenAISection />

        {/* ── Social Proof bar ────────────────────────────── */}
        <SocialProof />

        {/* ── Who Is This For ─────────────────────────────── */}
        <WhoIsThisFor />

        {/* ── Instructor ──────────────────────────────────── */}
        <section className="w-full py-16 md:py-20 bg-slate-950 border-t border-slate-800/60">
          <div className="container px-4 md:px-6 max-w-4xl mx-auto">
            {/* Label */}
            <div className="flex justify-center mb-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-purple-300">
                Your Instructor
              </span>
            </div>

            <div className="rounded-2xl border border-slate-700/60 overflow-hidden"
              style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.07), rgba(168,85,247,0.05), rgba(2,6,23,0.6))" }}>
              <div className="flex flex-col md:flex-row gap-0">

                {/* Left — avatar + tag */}
                <div className="flex-shrink-0 flex flex-col items-center justify-center gap-4 px-8 py-10 border-b md:border-b-0 md:border-r border-slate-700/50"
                  style={{ minWidth: 200, background: "rgba(168,85,247,0.06)" }}>
                  <div className="w-24 h-24 rounded-full flex items-center justify-center text-5xl"
                    style={{ background: "linear-gradient(135deg,#6366f1,#a855f7)", boxShadow: "0 0 0 4px rgba(168,85,247,0.2), 0 8px 32px rgba(99,102,241,0.4)" }}>
                    🧑‍💼
                  </div>
                  <div className="text-center">
                    <p className="font-black text-white text-base">Lead Instructor</p>
                    <p className="text-xs text-slate-400 mt-1">Senior AI/ML Engineer · IIITHyd Alumni</p>
                  </div>
                  {/* Credential pills */}
                  <div className="flex flex-col gap-2 w-full">
                    {["Alumni · IIITHyd", "Fortune 500 clients", "Ships daily in prod"].map(c => (
                      <div key={c} className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-300"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                        <span className="text-purple-400">✓</span>{c}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right — bio */}
                <div className="flex-1 px-8 py-10 flex flex-col justify-between gap-6">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-black text-white mb-1 leading-tight">
                      The person teaching you is{" "}
                      <span className="text-transparent bg-clip-text"
                        style={{ backgroundImage: "linear-gradient(90deg,#a78bfa,#f0abfc)" }}>
                        still in the field.
                      </span>
                    </h2>
                    <p className="text-sm text-slate-400 mb-5">Not a YouTuber. Not a bootcamp grad.</p>

                    <p className="text-slate-300 leading-relaxed text-sm md:text-base mb-4">
                      Our lead instructor is a <span className="text-white font-semibold">Senior AI/ML Engineer</span> and{" "}
                      <span className="text-white font-semibold">Alumni of IIIT Hyderabad</span> — currently
                      working with Fortune 500 clients across pharma and energy, building real GenAI and Agentic AI
                      systems that run in production. 7+ years across top Indian IT firms and global consulting.
                    </p>
                    <p className="text-slate-300 leading-relaxed text-sm md:text-base mb-4">
                      Has shipped <span className="text-white font-semibold">MLOps pipelines, RAG systems, and multi-agent workflows</span> for
                      enterprise clients. Someone who does this work every day.
                    </p>
                  </div>

                  {/* Bottom trust strip */}
                  <div className="flex flex-wrap gap-3 pt-2 border-t border-slate-800/60">
                    {[
                      { icon: "🏭", t: "Pharma & energy sector AI" },
                      { icon: "🤖", t: "Agentic AI in production" },
                      { icon: "🎙️", t: "Live every session" },
                      { icon: "💬", t: "Direct access to you" },
                    ].map(({ icon, t }) => (
                      <span key={t} className="flex items-center gap-1.5 text-xs text-slate-400 rounded-full px-3 py-1"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                        <span>{icon}</span>{t}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ── Free Masterclass nudge ──────────────────────── */}
        <section className="w-full py-12 md:py-16 bg-slate-50">
          <div className="container px-4 md:px-6">
            <FreeMasterclassBanner onRegister={openRegistrationDrawer} />
          </div>
        </section>

        {/* ── What You'll Build — teaser ──────────────────── */}
        <section className="w-full py-12 md:py-16 relative overflow-hidden" style={{ background: "#020617" }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(99,102,241,0.08), transparent 65%)" }} />
          <div className="container px-4 md:px-6 relative">
            <div className="max-w-4xl mx-auto rounded-2xl border border-slate-700/50 overflow-hidden"
              style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(168,85,247,0.06), rgba(236,72,153,0.04))" }}
            >
              <div className="p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-8">
                {/* Left text */}
                <div className="flex-1">
                  <div className="inline-block rounded-full bg-indigo-500/15 border border-indigo-500/25 px-3 py-1 text-xs font-bold text-indigo-300 uppercase tracking-widest mb-3">
                    Real-World Projects
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-3 leading-tight">
                    Ship 10 projects hiring managers actually want to see
                  </h2>
                  <p className="text-slate-400 text-sm leading-relaxed mb-5">
                    Every project runs on a live URL — not just a Jupyter notebook. Fraud detection engines, RAG chatbots,
                    LLM monitoring dashboards, agentic AI systems — all deployed to the cloud and ready for your portfolio.
                  </p>
                  {/* Mini track pills */}
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: "Data Science", color: "#3b82f6" },
                      { label: "GenAI + Agentic", color: "#a855f7" },
                      { label: "Full Stack AI", color: "#10b981" },
                      { label: "MLOps", color: "#f59e0b" },
                    ].map(t => (
                      <span key={t.label} className="text-xs font-semibold px-3 py-1 rounded-full"
                        style={{ background: `${t.color}18`, border: `1px solid ${t.color}35`, color: t.color }}
                      >
                        {t.label}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Right CTA */}
                <div className="flex-shrink-0 flex flex-col items-center gap-4 text-center">
                  <div className="grid grid-cols-2 gap-3 text-center mb-2">
                    {[
                      { num: "10", label: "Projects" },
                      { num: "4", label: "Tracks" },
                      { num: "100%", label: "Deployed" },
                      { num: "GitHub", label: "Ready" },
                    ].map(s => (
                      <div key={s.label} className="rounded-xl px-4 py-3 bg-slate-900/60 border border-slate-700/40">
                        <div className="text-xl font-black text-white">{s.num}</div>
                        <div className="text-xs text-slate-400">{s.label}</div>
                      </div>
                    ))}
                  </div>
                  <Link href="/projects">
                    <ConsistentButton variant="gradient" size="lg" className="btn-shimmer w-full" rightIcon={<ArrowRight className="ml-1 h-4 w-4" />}>
                      See All Projects →
                    </ConsistentButton>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── How It Works (4 steps) ──────────────────────── */}
        <section id="how-it-works" className="w-full py-16 md:py-24 bg-white">
          <div className="container px-4 md:px-6 max-w-5xl mx-auto">
            <div className="text-center space-y-3 mb-12">
              <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-600 font-medium">
                How It Works
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                From Enrolment to Offer Letter
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                4 phases. 6 months. One career transformation.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: "01", icon: "📋", title: "Enrol & Assess", desc: "Register, complete a short skills assessment, and get placed in the right track. No prior AI experience needed." },
                { step: "02", icon: "🏗️", title: "Learn by Building", desc: "Live weekend sessions every Saturday & Sunday. Build 3–5 real projects per track with weekly mentor code reviews." },
                { step: "03", icon: "🚀", title: "Ship Your Portfolio", desc: "Push your projects to GitHub. We help you write case studies and structure your profile for AI job applications." },
                { step: "04", icon: "💼", title: "Land the Role", desc: "Resume reviews, mock interviews, hiring partner referrals, and salary negotiation coaching until you're placed." },
              ].map((s) => (
                <div key={s.step} className="relative rounded-xl border border-slate-200 bg-slate-50 p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{s.icon}</span>
                    <span className="text-4xl font-black text-slate-100">{s.step}</span>
                  </div>
                  <h3 className="font-bold text-slate-900">{s.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ── Testimonials ────────────────────────────────── */}
        <TrustSection />

        {/* ── Full Curriculum Map ──────────────────────────── */}
        <CurriculumPathSection />

        {/* ── Pricing ─────────────────────────────────────── */}
        <section id="pricing" className="py-16 bg-gray-50">
          <PricingSection onEnroll={openEnrollmentDrawer} />
        </section>

        {/* ── FAQ ─────────────────────────────────────────── */}
        <FAQSection />

        {/* ── CTA ─────────────────────────────────────────── */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center text-white">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ready to Transform Your Career in AI Engineering?
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our course delivers exceptional return on investment with complete placement assistance
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl max-w-2xl">
                <p className="font-medium mb-4">We support you until you successfully transition to an AI role!</p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                  <ConsistentButton
                    size="lg"
                    className="text-purple-600 hover:bg-gray-100"
                    variant="secondary"
                    rightIcon={<ArrowRight className="ml-2 h-4 w-4" />}
                    onClick={openEnrollmentDrawer}
                  >
                    Secure Your Spot Now
                  </ConsistentButton>
                  <ConsistentButton
                    size="lg"
                    variant="outline"
                    className="text-white border-white hover:bg-white/20"
                    onClick={() =>
                      window.open(
                        "https://wa.me/919893989103?text=Hi%2C%20I%27m%20interested%20in%20the%20Rbyte.ai%20AI%20Engineering%20course.%20Can%20you%20share%20more%20details%3F",
                        "_blank",
                      )
                    }
                  >
                    Contact via WhatsApp
                  </ConsistentButton>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-10 md:py-14 bg-slate-900 text-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div className="space-y-4">
              <Logo variant="light" />
              <p className="text-sm text-gray-400 leading-relaxed">
                Empowering working professionals to transition into high-demand AI engineering roles with live cohorts,
                1-on-1 mentorship, and placement support.
              </p>
              {/* Social links */}
              <div className="flex gap-3 pt-1">
                <a
                  href="https://www.linkedin.com/company/rbyte-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/@rbyteai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="YouTube"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                <a
                  href="https://twitter.com/rbyteai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Twitter / X"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/919893989103"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="WhatsApp"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Programs */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300">Programs</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#pricing" className="hover:text-white transition-colors">Data Science (ML + DL)</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">GenAI + Agentic AI</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Full Stack AI</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">MLOps + LLMOps</a></li>
                <li><a href="/masterclass" className="hover:text-white transition-colors">Free Masterclass 🎓</a></li>
                <li><a href="/service" className="hover:text-white transition-colors">AI Services 🤝</a></li>
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#curriculum" className="hover:text-white transition-colors">Curriculum</a></li>
                <li><a href="#roadmap" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#career-roi" className="hover:text-white transition-colors">Placement Record</a></li>
                <li>
                  <a
                    href="https://wa.me/919893989103?text=Hi%2C%20I%27m%20interested%20in%20Rbyte.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact & Legal */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:+919893989103" className="hover:text-white transition-colors">+91 98939 89103</a>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:hello@rbyte.ai" className="hover:text-white transition-colors">hello@rbyte.ai</a>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="h-4 w-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Mumbai, India</span>
                </li>
              </ul>
              <div className="pt-2 space-y-1 text-xs text-gray-500">
                <a href="/privacy" className="block hover:text-gray-300 transition-colors">Privacy Policy</a>
                <a href="/terms" className="block hover:text-gray-300 transition-colors">Terms & Conditions</a>
                <a href="/refund" className="block hover:text-gray-300 transition-colors">Refund Policy</a>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500">© 2026 Rbyte.ai. All rights reserved.</p>
            <p className="text-xs text-gray-500">Made with ❤️ for India's AI Engineers</p>
          </div>
        </div>
      </footer>

      {/* Syllabus Form Modal */}
      {showSyllabusForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 py-3 px-6">
              <h3 className="text-xl font-bold text-white">{modalTitle}</h3>
            </div>

            <div className="p-6">
              {!syllabusOtpSent ? (
                <form onSubmit={handleSyllabusFormSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="syllabus-name" className="text-sm font-medium">
                      Full Name*
                    </label>
                    <Input
                      id="syllabus-name"
                      name="name"
                      value={syllabusFormData.name}
                      onChange={handleSyllabusFormChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="syllabus-email" className="text-sm font-medium">
                      Email Address
                    </label>
                    <Input
                      id="syllabus-email"
                      name="email"
                      type="email"
                      value={syllabusFormData.email}
                      onChange={handleSyllabusFormChange}
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="syllabus-phone" className="text-sm font-medium">
                      Phone Number*
                    </label>
                    <div className="flex gap-2">
                      <select
                        name="countryCode"
                        className="w-24 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        value={syllabusFormData.countryCode}
                        onChange={handleSyllabusFormChange}
                      >
                        <option value="+91">+91 🇮🇳</option>
                        <option value="+1">+1 🇺🇸</option>
                        <option value="+44">+44 🇬🇧</option>
                        <option value="+61">+61 🇦🇺</option>
                        <option value="+65">+65 🇸🇬</option>
                        <option value="+971">+971 🇦🇪</option>
                      </select>
                      <Input
                        id="syllabus-phone"
                        name="phone"
                        value={syllabusFormData.phone}
                        onChange={handleSyllabusFormChange}
                        placeholder="Enter your phone number"
                        className="flex-1"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <ConsistentButton type="button" variant="outline" onClick={closeSyllabusForm} className="flex-1">
                      Cancel
                    </ConsistentButton>
                    <ConsistentButton
                      type="submit"
                      variant="gradient"
                      className="flex-1"
                      disabled={syllabusFormLoading}
                    >
                      {syllabusFormLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending OTP...
                        </>
                      ) : (
                        "Continue"
                      )}
                    </ConsistentButton>
                  </div>
                </form>
              ) : !syllabusSuccess ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-lg font-medium mb-2">Verify Your Phone Number</p>
                    <p className="text-sm text-slate-600">
                      We've sent a 6-digit verification code to {syllabusFormData.countryCode} {syllabusFormData.phone}
                    </p>
                  </div>

                  <div className="flex justify-center gap-2 my-6">
                    {Array(6)
                      .fill(0)
                      .map((_, index) => (
                        <Input
                          key={index}
                          id={`syllabus-otp-${index}`}
                          type="text"
                          maxLength={1}
                          className="w-10 h-12 text-center text-lg font-bold border-purple-200"
                          value={syllabusOtp[index] || ""}
                          onChange={(e) => handleSyllabusOtpChange(e, index)}
                          onKeyDown={(e) => {
                            // Handle backspace to move to previous input
                            if (e.key === "Backspace" && !syllabusOtp[index] && index > 0) {
                              const prevInput = document.getElementById(`syllabus-otp-${index - 1}`)
                              if (prevInput) {
                                prevInput.focus()
                              }
                            }
                          }}
                        />
                      ))}
                  </div>

                  {syllabusOtpError && (
                    <div className="text-center">
                      <p className="text-sm text-red-500">{syllabusOtpError}</p>
                    </div>
                  )}

                  <div className="flex flex-col gap-3">
                    <ConsistentButton
                      onClick={verifySyllabusOtp}
                      variant="gradient"
                      disabled={syllabusOtp.join("").length !== 6 || syllabusVerifying}
                    >
                      {syllabusVerifying ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        "Verify & Continue"
                      )}
                    </ConsistentButton>

                    <div className="flex justify-between text-sm mt-2">
                      <button
                        type="button"
                        disabled={syllabusResendCooldown > 0}
                        className={syllabusResendCooldown > 0 ? "text-slate-400 cursor-not-allowed" : "text-purple-600 hover:text-purple-800"}
                        onClick={async () => {
                          const res = await sendOtp({ phone: syllabusFormData.phone, country_code: syllabusFormData.countryCode })
                          if (res.error) {
                            toast({ title: "Failed to resend OTP", description: res.error, variant: "destructive" })
                          } else {
                            setSyllabusResendCooldown(10)
                            toast({ title: "OTP Resent", description: "A new verification code has been sent." })
                          }
                        }}
                      >
                        {syllabusResendCooldown > 0 ? `Resend in ${syllabusResendCooldown}s` : "Resend OTP"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setSyllabusOtpSent(false)}
                        className="text-slate-600 hover:text-slate-800"
                      >
                        Edit Phone Number
                      </button>
                    </div>

                    <div className="text-center text-xs text-slate-500 mt-4">
                      <p>Please call us at +91 9893989103</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">
                    {isEnrollMode ? "You're all set!" : "Verification Successful!"}
                  </h4>
                  <p className="text-slate-600 mb-6">
                    {isEnrollMode
                      ? `Thank you, ${syllabusFormData.name}! Our admissions team will reach out within 24 hours to help you secure your seat.`
                      : `Thank you, ${syllabusFormData.name}! You can now download our detailed course syllabus.`}
                  </p>
                  {isEnrollMode ? (
                    <ConsistentButton onClick={closeSyllabusForm} variant="gradient">
                      Close
                    </ConsistentButton>
                  ) : (
                    <ConsistentButton onClick={downloadSyllabus} variant="gradient">
                      Download Syllabus
                    </ConsistentButton>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Chat Button */}
      <WhatsAppButton />

      {/* Registration drawer */}
      <EnrollmentDrawer isOpen={isRegistrationDrawerOpen} onClose={closeRegistrationDrawer} mode="register" />

      {/* ── Sticky mobile bottom CTA bar ─────────────────────────────────────
          Visible only on phones (hidden sm+). Keeps the two most important
          actions always in thumb-reach while the user scrolls.              */}
      <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden border-t border-slate-700/80 bg-slate-950/95 backdrop-blur-md px-3 py-2.5 flex gap-2 safe-area-pb">
        <button
          onClick={openEnrollmentDrawer}
          className="flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2.5 text-sm font-bold text-white"
          style={{ background: "linear-gradient(135deg,#a855f7,#ec4899,#6366f1)", boxShadow: "0 2px 12px rgba(168,85,247,0.45)" }}
        >
          🎓 Enroll Now
        </button>
        <a
          href="https://wa.me/919893989103?text=Hi%2C%20I%27m%20interested%20in%20the%20Rbyte.ai%20AI%20course.%20Can%20you%20share%20details%3F"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2.5 text-sm font-bold text-white bg-green-600 hover:bg-green-500 transition-colors"
        >
          💬 WhatsApp
        </a>
      </div>
    </div>
  )
}
