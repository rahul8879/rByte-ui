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
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import CourseFeatureCard from "@/components/course-feature-card"
import Logo from "@/components/logo"
import VideoPlayer from "@/components/video-player"
import CountdownTimer from "@/components/countdown-timer"
import EnrollmentBanner from "@/components/enrollment-banner"
import FeatureBadge from "@/components/feature-badge"
import JobMarketTrends from "@/components/job-market-trends"
import ProjectShowcaseCard from "@/components/project-showcase-card"
import CourseDifferentiators from "@/components/course-differentiators"
import FreeMasterclassBanner from "@/components/free-masterclass-banner"
import DetailedCurriculum from "@/components/detailed-curriculum"
import SalaryComparison from "@/components/salary-comparison"
import SuccessMetrics from "@/components/success-metrics"
import PlacementGuarantee from "@/components/placement-guarantee"
import { useState } from "react"
// Update the import to include the new FutureJobMarketPredictions component
import FutureJobMarketPredictions from "@/components/future_job_market_predictions"
// First, let's fix the enrollment drawer functionality by adding the missing import and component
// Add this import at the top with the other imports:
import EnrollmentDrawer from "@/components/enrollment-drawer"
import { Input } from "@/components/ui/input"
import WhatsAppButton from "@/components/whatsapp-button"
// Add the import for API utilities
import { sendOTP, verifyOTP, downloadCurriculum } from "@/utils/api"
import { toast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
// Import the ConsistentButton component
import { ConsistentButton } from "@/components/ui/consistent-button"
// Find the section where pricing is displayed and replace it with our new component
// Import the PricingSection component at the top of the file
import PricingSection from "@/components/pricing-section"
import CareerPathQuiz from "@/components/career-path-quiz"

export default function Home() {
  // Set the target date for the next batch (2 weeks from now)
  const targetDate = new Date()
  targetDate.setDate(targetDate.getDate() + 14)

  const [isEnrollmentDrawerOpen, setIsEnrollmentDrawerOpen] = useState(false)
  const [isRegistrationDrawerOpen, setIsRegistrationDrawerOpen] = useState(false)
  const [isEnrollmentLoading, setIsEnrollmentLoading] = useState(false)

  const [showSyllabusForm, setShowSyllabusForm] = useState(false)
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

  const openEnrollmentDrawer = () => {
    // Remove the artificial delay and loading state
    setIsEnrollmentDrawerOpen(true)
  }

  const closeEnrollmentDrawer = () => {
    setIsEnrollmentDrawerOpen(false)
  }

  const openRegistrationDrawer = () => {
    setIsRegistrationDrawerOpen(true)
  }

  const closeRegistrationDrawer = () => {
    setIsRegistrationDrawerOpen(false)
  }

  const openSyllabusForm = () => {
    setShowSyllabusForm(true)
  }

  const closeSyllabusForm = () => {
    setShowSyllabusForm(false)
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

    try {
      setSyllabusFormLoading(true)

      // Send OTP
      await sendOTP(syllabusFormData.phone, syllabusFormData.countryCode)

      // Set OTP sent state
      setSyllabusOtpSent(true)

      toast({
        title: "OTP Sent",
        description: `A verification code has been sent to ${syllabusFormData.countryCode} ${syllabusFormData.phone}`,
      })
    } catch (error) {
      console.error("Error sending OTP:", error)
      toast({
        title: "Failed to send OTP",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive",
      })
    } finally {
      setSyllabusFormLoading(false)
    }
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

  // Update the verifySyllabusOtp function
  const verifySyllabusOtp = async () => {
    try {
      setSyllabusVerifying(true)

      // Call the API to verify OTP
      await verifyOTP(syllabusFormData.phone, syllabusOtp.join(""), syllabusFormData.countryCode)

      setSyllabusSuccess(true)
      setSyllabusOtpError(null)

      toast({
        title: "Verification Successful!",
        description: "You can now download the curriculum.",
      })
    } catch (error) {
      console.error("Error verifying OTP:", error)
      setSyllabusOtpError(error instanceof Error ? error.message : "Invalid OTP. Please try again.")
      toast({
        title: "Verification Failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      })
    } finally {
      setSyllabusVerifying(false)
    }
  }

  // Update the downloadSyllabus function
  const downloadSyllabus = () => {
    // Call the API utility to download the curriculum
    downloadCurriculum()
    closeSyllabusForm()
  }

  return (
    <div className="flex min-h-screen flex-col">
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
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-36 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 overflow-hidden">
          <div className="container px-4 md:px-6 relative">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-start">
              <div className="flex flex-col justify-center space-y-4 order-2 lg:order-1">
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-200">
                    6-Month Program
                  </Badge>
                  <Badge className="bg-pink-100 text-pink-800 hover:bg-pink-200 border-pink-200">Weekend Batches</Badge>
                  <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200">
                    For Working Professionals
                  </Badge>
                </div>
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white">
                    Transform Your Career Into AI Engineering
                  </h1>
                  <p className="max-w-[600px] text-gray-200 md:text-xl">
                    Skyrocket your income and future-proof your career with our exclusive weekend program! Join 500+
                    professionals who've doubled their salaries by mastering the AI skills companies are desperately
                    seeking. No prior AI experience needed — just 6 months to transform your career trajectory forever.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 my-2">
                  <FeatureBadge text="Python & Data Science" />
                  <FeatureBadge text="Machine Learning" />
                  <FeatureBadge text="Deep Learning" />
                  <FeatureBadge text="TensorFlow" />
                  <FeatureBadge text="NLP & Transformers" />
                  <FeatureBadge text="LLM Fine-tuning" />
                  <FeatureBadge text="RAG Systems" />
                  <FeatureBadge text="Langgraph" />
                </div>

                <EnrollmentBanner seatsLeft={5} />

                {/* Why to Join Video */}
                <VideoPlayer
                  thumbnailUrl="/course-preview-thumbnail.png"
                  videoTitle="Applied Data Science course with GenAI"
                  videoDescription="Learn how our comprehensive program can transform your career with AI/ML & GenAI skills"
                  youtubeId="mdcEz7Gg7b4"
                />

                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20 mt-4">
                  <p className="font-medium text-center text-white">Next Batch Starting In:</p>
                  <CountdownTimer targetDate={targetDate} className="my-3" />
                  <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center mt-2">
                    <ConsistentButton
                      size="lg"
                      variant="gradient"
                      onClick={openEnrollmentDrawer}
                      rightIcon={<ArrowRight className="ml-2 h-4 w-4" />}
                    >
                      Secure Your Spot Now
                    </ConsistentButton>
                    <ConsistentButton
                      size="lg"
                      variant="outline"
                      className="text-white border-white hover:bg-white/20"
                      onClick={openSyllabusForm}
                    >
                      Get Course Details
                    </ConsistentButton>
                  </div>
                  <div className="mt-3 flex justify-center">
                    <CareerPathQuiz />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center order-1 lg:order-2">
                <div className="relative w-full max-w-[640px] aspect-video rounded-xl overflow-hidden shadow-2xl">
                  {/* Hero Image */}
                  <Image
                    src="/rbyte-ai-team-hero.png"
                    alt="Rbyte.ai - Learn AI, Build Products"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    priority
                  />

                  {/* Interactive overlay */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-transparent to-transparent flex items-end justify-center p-6 cursor-pointer transition-all duration-300 hover:from-purple-900/90"
                    onClick={openEnrollmentDrawer}
                  >
                    <div className="text-center">
                      <h2 className="text-white text-2xl font-bold mb-2">Rbyte.ai - Learn AI, Build Products</h2>
                      <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full hover:bg-white/30 transition-all inline-block">
                        <span className="text-white font-medium">Enroll Now</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Free Masterclass Section */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <FreeMasterclassBanner onRegister={openRegistrationDrawer} />
          </div>
        </section>

        {/* Job Market Trends Section */}
        <section className="w-full py-12 md:py-16 bg-slate-50 dark:bg-slate-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-indigo-100 px-3 py-1 text-sm text-indigo-500 dark:bg-indigo-800/30 dark:text-indigo-300">
                  Industry Transformation
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  The Shift from Data Science to GenAI
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Stay ahead of the curve as traditional data science roles evolve into GenAI engineering positions
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-5xl">
              <JobMarketTrends />
            </div>
            {/* Inside the Job Market Trends Section, add: */}
            <div className="mx-auto max-w-5xl mt-8">
              <FutureJobMarketPredictions />
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section id="why-us" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm text-purple-500 dark:bg-purple-800/30 dark:text-purple-300">
                  Why Choose Us
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Makes Our Program Different</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our program is specifically designed for working professionals looking to transition into AI
                  engineering roles
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-6xl mt-12">
              <CourseDifferentiators />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-slate-50 dark:bg-slate-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm text-purple-500 dark:bg-purple-800/30 dark:text-purple-300">
                  What We Offer
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Comprehensive AI Engineering Program
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our program takes you from fundamentals to advanced AI engineering concepts with hands-on projects and
                  expert guidance
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
              <CourseFeatureCard
                icon={<BookMarked className="h-10 w-10 text-purple-500" />}
                title="Python & Data Science"
                description="Master Python programming and essential libraries like Pandas, NumPy, and SciPy"
              />
              <CourseFeatureCard
                icon={<BarChart className="h-10 w-10 text-indigo-500" />}
                title="Machine Learning"
                description="Learn core ML algorithms, feature engineering, and model evaluation techniques"
              />
              <CourseFeatureCard
                icon={<Brain className="h-10 w-10 text-pink-500" />}
                title="Deep Learning"
                description="Build neural networks with TensorFlow and understand CNN, RNN architectures"
              />
              <CourseFeatureCard
                icon={<BookOpen className="h-10 w-10 text-blue-500" />}
                title="NLP & Transformers"
                description="Master natural language processing and transformer architectures like BERT"
              />
              <CourseFeatureCard
                icon={<Zap className="h-10 w-10 text-amber-500" />}
                title="LLM Fine-tuning"
                description="Learn to customize large language models for specific tasks and domains"
              />
              <CourseFeatureCard
                icon={<Database className="h-10 w-10 text-green-500" />}
                title="RAG Applications"
                description="Build retrieval-augmented generation systems for knowledge-intensive tasks"
              />
              <CourseFeatureCard
                icon={<Code className="h-10 w-10 text-red-500" />}
                title="Software Engineering"
                description="Master CI/CD pipelines and software engineering best practices for AI systems"
              />
              <CourseFeatureCard
                icon={<Briefcase className="h-10 w-10 text-teal-500" />}
                title="Career Transition"
                description="Get specialized guidance for transitioning from your current role to AI engineering"
              />
              <CourseFeatureCard
                icon={<GraduationCap className="h-10 w-10 text-cyan-500" />}
                title="Placement Assistance"
                description="Receive support until you successfully transition to an AI engineering role"
              />
            </div>
          </div>
        </section>

        {/* Roadmap Section */}
        <section id="roadmap" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-500 dark:bg-blue-800/30 dark:text-blue-300">
                  Your Journey
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Your Path to AI Engineering Excellence
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  A clear step-by-step process from enrollment to career transformation
                </p>
              </div>
            </div>

            <div className="mt-16 max-w-5xl mx-auto">
              <div className="relative">
                {/* Connecting line - hidden on mobile, visible on md screens and up */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-400 to-pink-500 hidden md:block"></div>

                {/* Step 1: Registration */}
                <div className="relative mb-16 md:mb-24">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="w-full md:w-1/2 md:pr-12 mb-8 md:mb-0 text-center md:text-right order-2 md:order-1">
                      <h3 className="text-2xl font-bold mb-3">1. Course Registration</h3>
                      <p className="text-slate-600">
                        Begin your AI journey by registering for the course. Our team will guide you through the
                        enrollment process and answer any questions you may have about the program.
                      </p>
                      <div className="mt-4 flex justify-center md:justify-end">
                        <ConsistentButton
                          variant="outline"
                          className="border-purple-300 text-purple-700 hover:bg-purple-50"
                          onClick={openRegistrationDrawer}
                          rightIcon={<ArrowRight className="ml-2 h-4 w-4" />}
                        >
                          Register Now
                        </ConsistentButton>
                      </div>
                    </div>
                    {/* Circle indicator - centered on mobile, positioned at timeline on md screens */}
                    <div className="flex items-center justify-center mb-6 md:mb-0 md:absolute md:left-1/2 md:transform md:-translate-x-1/2 z-10">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                        <ClipboardCheck className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 md:pl-12 order-1 md:order-2">
                      <div className="bg-purple-50 p-6 rounded-xl border border-purple-100 shadow-sm">
                        <h4 className="font-medium text-purple-800 mb-2">What to Expect:</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Simple online registration form</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Course fee payment options</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Welcome email with next steps</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2: Pre-test Assessment */}
                <div className="relative mb-16 md:mb-24">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="w-full md:w-1/2 md:pr-12 mb-8 md:mb-0 order-2">
                      <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 shadow-sm">
                        <h4 className="font-medium text-blue-800 mb-2">Assessment Areas:</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Python programming knowledge</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Basic data science understanding</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Learning style preferences</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Career goals and aspirations</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    {/* Circle indicator - centered on mobile, positioned at timeline on md screens */}
                    <div className="flex items-center justify-center my-6 md:my-0 md:absolute md:left-1/2 md:transform md:-translate-x-1/2 z-10">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
                        <FileText className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 md:pl-12 text-center md:text-left order-1">
                      <h3 className="text-2xl font-bold mb-3">2. Pre-Course Assessment</h3>
                      <p className="text-slate-600">
                        Complete a comprehensive pre-test to assess your current skills and knowledge. This helps us
                        tailor the learning experience to your specific needs and starting point.
                      </p>
                      <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-r-md">
                        <p className="text-sm text-yellow-800">
                          <span className="font-bold">Note:</span> No prior AI experience is required. This assessment
                          helps us understand your learning needs.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3: Role Understanding */}
                <div className="relative mb-16 md:mb-24">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="w-full md:w-1/2 md:pr-12 mb-8 md:mb-0 text-center md:text-right order-2 md:order-1">
                      <h3 className="text-2xl font-bold mb-3">3. Current Role Analysis</h3>
                      <p className="text-slate-600">
                        Our career advisors will conduct a detailed analysis of your current role and responsibilities
                        to identify transferable skills and areas for development in your AI career transition.
                      </p>
                      <div className="mt-4 bg-green-50 border-l-4 border-green-400 p-3 rounded-r-md">
                        <p className="text-sm text-green-800">
                          <span className="font-bold">Benefit:</span> Personalized guidance on how to leverage your
                          existing expertise in your AI career transition.
                        </p>
                      </div>
                    </div>
                    {/* Circle indicator - centered on mobile, positioned at timeline on md screens */}
                    <div className="flex items-center justify-center my-6 md:my-0 md:absolute md:left-1/2 md:transform md:-translate-x-1/2 z-10">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center">
                        <UserCheck className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 md:pl-12 order-1 md:order-2">
                      <div className="bg-green-50 p-6 rounded-xl border border-green-100 shadow-sm">
                        <h4 className="font-medium text-green-800 mb-2">What We'll Analyze:</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Current technical skills and expertise</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Industry-specific knowledge</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Soft skills and leadership experience</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Career goals and aspirations</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 4: Course Journey */}
                <div className="relative mb-16 md:mb-24">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="w-full md:w-1/2 md:pr-12 mb-8 md:mb-0 order-2">
                      <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 shadow-sm">
                        <h4 className="font-medium text-indigo-800 mb-2">Course Structure:</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Live coding sessions with instructors</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Weekly mentorship and doubt-clearing</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Industry expert guest lectures</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    {/* Circle indicator - centered on mobile, positioned at timeline on md screens */}
                    <div className="flex items-center justify-center my-6 md:my-0 md:absolute md:left-1/2 md:transform md:-translate-x-1/2 z-10">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                        <BookOpenIcon className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 md:pl-12 text-center md:text-left order-1">
                      <h3 className="text-2xl font-bold mb-3">4. Comprehensive Course Journey</h3>
                      <p className="text-slate-600">
                        Embark on your 6-month learning journey covering everything from Python fundamentals to advanced
                        GenAI engineering. Our curriculum is designed to build your skills progressively with hands-on
                        projects.
                      </p>
                      <div className="mt-4 flex justify-center md:justify-start">
                        <ConsistentButton
                          variant="outline"
                          className="border-indigo-300 text-indigo-700 hover:bg-indigo-50"
                          onClick={() => document.getElementById("curriculum")?.scrollIntoView({ behavior: "smooth" })}
                          rightIcon={<ArrowRight className="ml-2 h-4 w-4" />}
                        >
                          View Full Curriculum
                        </ConsistentButton>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 5: Career Transition */}
                <div className="relative mb-8">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="w-full md:w-1/2 md:pr-12 mb-8 md:mb-0 text-center md:text-right order-2 md:order-1">
                      <h3 className="text-2xl font-bold mb-3">5. Career Transition Support</h3>
                      <p className="text-slate-600">
                        After completing the course, our dedicated placement team will help you transition into an AI
                        engineering role with resume building, interview preparation, and direct connections to hiring
                        partners.
                      </p>
                      <div className="mt-4 bg-pink-50 border-l-4 border-pink-400 p-3 rounded-r-md">
                        <p className="text-sm text-pink-800">
                          <span className="font-bold">Our Promise:</span> We provide ongoing support until you
                          successfully transition to an AI role.
                        </p>
                      </div>
                    </div>
                    {/* Circle indicator - centered on mobile, positioned at timeline on md screens */}
                    <div className="flex items-center justify-center my-6 md:my-0 md:absolute md:left-1/2 md:transform md:-translate-x-1/2 z-10">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center">
                        <Briefcase className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 md:pl-12 order-1 md:order-2">
                      <div className="bg-pink-50 p-6 rounded-xl border border-pink-100 shadow-sm">
                        <h4 className="font-medium text-pink-800 mb-2">Placement Support:</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Resume and portfolio optimization</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Mock interviews with AI professionals</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Direct referrals to hiring partners</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Salary negotiation guidance</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Ongoing career coaching</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Final CTA */}
                <div className="mt-16 md:mt-24 text-center">
                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 md:p-8 rounded-xl border border-purple-200">
                    <h3 className="text-2xl font-bold mb-4">Ready to Begin Your AI Engineering Journey?</h3>
                    <p className="text-slate-700 mb-6 max-w-2xl mx-auto">
                      Join our 6-month weekend program and transform your career with in-demand AI skills. Our
                      structured roadmap ensures a smooth transition from your current role to AI engineering
                      excellence.
                    </p>
                    <ConsistentButton
                      size="lg"
                      variant="gradient"
                      rightIcon={<ArrowRight className="ml-2 h-5 w-5" />}
                      onClick={openEnrollmentDrawer}
                    >
                      Start Your Journey Today
                    </ConsistentButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Showcase Section */}
        <section id="projects" className="w-full py-12 md:py-24 lg:py-32 bg-slate-50 dark:bg-slate-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-500 dark:bg-blue-800/30 dark:text-blue-300">
                  Hands-on Experience
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Build Cutting-Edge AI Projects</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Apply your knowledge by building impressive, portfolio-worthy AI applications that showcase your
                  skills
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
              <ProjectShowcaseCard
                title="AI Tutor Multi-Agent System"
                description="Build a personalized AI tutoring system with multiple specialized agents that collaborate to provide tailored learning experiences."
                imageUrl="/ai-tutor-multi-agent.png"
                tags={["LangGraph", "Multi-Agent", "Education", "Tool Use"]}
                difficulty="Advanced"
                demoUrl="https://github.com/langchain-ai/langgraph/blob/main/examples/multi_agent/multi_agent_collaboration.ipynb"
              />

              <ProjectShowcaseCard
                title="Document Intelligence RAG"
                description="Create a sophisticated document analysis system that can extract insights, answer questions, and generate summaries from complex documents."
                imageUrl="/document-intelligence-rag.png"
                tags={["RAG", "Vector DB", "Document Processing", "Embeddings"]}
                difficulty="Intermediate"
              />

              <ProjectShowcaseCard
                title="Fine-tuned Medical Assistant"
                description="Fine-tune a specialized LLM for the healthcare domain that can provide accurate medical information while maintaining ethical boundaries."
                imageUrl="/medical-ai-assistant.png"
                tags={["LoRA", "Domain Adaptation", "Healthcare", "Ethics"]}
                difficulty="Advanced"
              />

              <ProjectShowcaseCard
                title="Code Generation Agent"
                description="Build an AI pair programmer that can generate, explain, and refactor code across multiple programming languages with proper documentation."
                imageUrl="/ai-code-weaver.png"
                tags={["Code Generation", "Agentic Systems", "Software Engineering"]}
                difficulty="Intermediate"
                demoUrl="https://github.com/microsoft/TaskWeaver"
              />

              <ProjectShowcaseCard
                title="Multimodal Product Analyzer"
                description="Develop a system that can analyze product images and descriptions to generate detailed specifications, comparisons, and recommendations."
                imageUrl="/multimodal-product-analysis.png"
                tags={["Multimodal", "Computer Vision", "E-commerce", "GPT-4V"]}
                difficulty="Advanced"
              />

              <ProjectShowcaseCard
                title="Conversational Search Engine"
                description="Create a natural language search interface that understands complex queries and provides conversational, contextually relevant responses."
                imageUrl="/conversational-search-engine.png"
                tags={["Search", "Conversational AI", "Query Understanding"]}
                difficulty="Intermediate"
                demoUrl="https://github.com/run-llama/llama_index/tree/main/llama-index-packs/llama-index-packs-qdrant-query-engine"
              />
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                * All projects include comprehensive code, documentation, and deployment instructions
              </p>
            </div>

            <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100 max-w-5xl mx-auto">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Lightbulb className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Portfolio-Ready Projects</h3>
                  <p className="text-slate-700">
                    Each project is designed to showcase a specific set of AI engineering skills that employers are
                    actively seeking. You'll complete these projects with guidance from our instructors and graduate
                    with a portfolio that demonstrates your capabilities to potential employers.
                  </p>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm">GitHub repository for each project</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm">Detailed documentation and explanations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm">Code reviews from industry experts</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm">Deployment tutorials for showcasing live demos</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Curriculum Section */}
        <section id="curriculum" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-pink-100 px-3 py-1 text-sm text-pink-500 dark:bg-pink-800/30 dark:text-pink-300">
                  Comprehensive Curriculum
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Complete AI Engineering Curriculum</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our 6-month program covers everything from Python fundamentals to advanced GenAI engineering
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-5xl mt-12">
              <DetailedCurriculum />
            </div>
          </div>
        </section>

        {/* Career ROI Section */}
        <section id="career-roi" className="w-full py-12 md:py-24 lg:py-32 bg-slate-50 dark:bg-slate-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-500 dark:bg-green-800/30 dark:text-green-300">
                  Career Impact
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Maximize Your Career ROI</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our course delivers exceptional return on investment with complete placement assistance
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-5xl mt-12 space-y-10">
              <SalaryComparison />

              <SuccessMetrics />

              <PlacementGuarantee />

              <div className="bg-white p-6 rounded-xl border border-purple-100 shadow-sm">
                <h3 className="text-xl font-bold mb-4 text-center">Success Stories: Career Transitions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="border border-slate-200 rounded-lg p-4">
                    <p className="font-medium">Python Developer → AI Engineer</p>
                    <p className="text-sm text-slate-600">Salary increase: 120%</p>
                    <p className="text-xs text-slate-500 mt-2">
                      "The course helped me pivot from backend development to AI engineering in just 2 months."
                    </p>
                  </div>
                  <div className="border border-slate-200 rounded-lg p-4">
                    <p className="font-medium">Data Analyst → NLP Specialist</p>
                    <p className="text-sm text-slate-600">Salary increase: 85%</p>
                    <p className="text-xs text-slate-500 mt-2">
                      "The NLP curriculum was exactly what I needed to specialize and increase my market value."
                    </p>
                  </div>
                  <div className="border border-slate-200 rounded-lg p-4">
                    <p className="font-medium">Fresh Graduate → LLM Engineer</p>
                    <p className="text-sm text-slate-600">Starting salary: 18 LPA</p>
                    <p className="text-xs text-slate-500 mt-2">
                      "This course helped me skip entry-level roles and go straight to specialized AI work."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-16 bg-gray-50">
          <PricingSection />
        </section>

        {/* CTA Section */}
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
                  <ConsistentButton size="lg" variant="outline" className="text-white border-white hover:bg-white/20">
                    Contact via WhatsApp
                  </ConsistentButton>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 md:py-12 bg-slate-900 text-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <Logo variant="light" />
              <p className="text-sm text-gray-400">
                Empowering working professionals to transition into high-demand AI engineering roles with comprehensive
                training.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Syllabus Form Modal */}
      {showSyllabusForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 py-3 px-6">
              <h3 className="text-xl font-bold text-white">
                {!syllabusOtpSent
                  ? "Get Course Details"
                  : !syllabusSuccess
                    ? "Verify Your Phone Number"
                    : "Download Syllabus"}
              </h3>
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
                      <button type="button" className="text-purple-600 hover:text-purple-800">
                        Resend OTP
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
                      <p>Please call us at +91 9152091676</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Verification Successful!</h4>
                  <p className="text-slate-600 mb-6">
                    Thank you, {syllabusFormData.name}! You can now download our detailed course syllabus.
                  </p>
                  <ConsistentButton onClick={downloadSyllabus} variant="gradient">
                    Download Syllabus
                  </ConsistentButton>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Chat Button */}
      <WhatsAppButton />

      {/* Add the enrollment drawer component */}
      <EnrollmentDrawer isOpen={isEnrollmentDrawerOpen} onClose={closeEnrollmentDrawer} mode="enroll" />
    </div>
  )
}
