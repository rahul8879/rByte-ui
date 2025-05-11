"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
  Calendar,
  Clock,
  Users,
  CheckCircle,
  ArrowRight,
  ChevronLeft,
  Share2,
  Download,
  Award,
  BookOpen,
  Loader2,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import Logo from "@/components/logo"
import masterclassData from "@/data/masterclasses.json"
import { sendOTP, verifyOTP, registerForMasterclass } from "@/utils/api"
import { ConsistentButton } from "@/components/ui/consistent-button"
import EnrollmentDrawer from "@/components/enrollment-drawer"

// Define types for our masterclass data
interface Instructor {
  name: string
  title: string
  bio: string
  image: string
}

interface Masterclass {
  id: string
  title: string
  shortDescription: string
  longDescription: string
  date: string
  time: string
  duration: string
  instructor: Instructor
  topics: string[]
  prerequisites: string[]
  benefits: string[]
  image: string
  category: string
  tags: string[]
  isFeatured: boolean
  maxAttendees: number
  registrationLink: string
}

export default function MasterclassDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [masterclass, setMasterclass] = useState<Masterclass | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  // Enrollment drawer state
  const [isEnrollmentDrawerOpen, setIsEnrollmentDrawerOpen] = useState(false)
  const [isRegistrationDrawerOpen, setIsRegistrationDrawerOpen] = useState(false)

  // Registration form state
  const [showRegistrationForm, setShowRegistrationForm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+91",
  })
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""))
  const [otpError, setOtpError] = useState<string | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [registrationSuccess, setRegistrationSuccess] = useState(false)

  useEffect(() => {
    // Find the masterclass with the matching ID
    const foundMasterclass = masterclassData.masterclasses.find((mc) => mc.id === id)

    if (foundMasterclass) {
      setMasterclass(foundMasterclass)
    } else {
      // Redirect to the masterclasses page if the ID is not found
      router.push("/masterclasses")
    }

    setIsLoading(false)
  }, [id, router])

  // Enrollment drawer functions
  const openEnrollmentDrawer = () => {
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

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!formData.name.trim() || !formData.phone.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter your name and phone number",
        variant: "destructive",
      })
      return
    }

    try {
      setIsSubmitting(true)

      // Send OTP
      await sendOTP(formData.phone, formData.countryCode)

      // Move to OTP verification step
      setOtpSent(true)

      toast({
        title: "OTP Sent",
        description: `A verification code has been sent to ${formData.countryCode} ${formData.phone}`,
      })
    } catch (error) {
      console.error("Error sending OTP:", error)
      toast({
        title: "Failed to send OTP",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value
    if (value.match(/^[0-9]$/) || value === "") {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)

      // Auto-focus next input if a digit was entered
      if (value !== "" && index < 5) {
        const nextInput = document.getElementById(`masterclass-otp-${index + 1}`)
        if (nextInput) {
          nextInput.focus()
        }
      }
      // Auto-focus previous input if current input is cleared
      else if (value === "" && index > 0) {
        const prevInput = document.getElementById(`masterclass-otp-${index - 1}`)
        if (prevInput) {
          prevInput.focus()
        }
      }
    }
  }

  const verifyOtp = async () => {
    try {
      setIsVerifying(true)

      // Call the API to verify OTP
      await verifyOTP(formData.phone, otp.join(""), formData.countryCode)

      // After OTP verification, register for masterclass
      await registerForMasterclass({
        name: formData.name,
        phone: formData.phone,
        country_code: formData.countryCode,
        email: formData.email,
        masterclass_id: id,
      })

      setOtpError(null)
      setRegistrationSuccess(true)

      toast({
        title: "Registration Successful!",
        description: "You have been registered for the masterclass.",
      })
    } catch (error) {
      console.error("Error verifying OTP:", error)
      setOtpError(error instanceof Error ? error.message : "Invalid OTP. Please try again.")
      toast({
        title: "Verification Failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      })
    } finally {
      setIsVerifying(false)
    }
  }

  const resendOtp = () => {
    // In a real implementation, this would trigger a new OTP to be sent
    setOtp(Array(6).fill(""))
    setOtpError(null)
    // Show a toast or message that OTP was resent
    toast({
      title: "OTP Resent",
      description: "A new verification code has been sent to your phone",
    })
  }

  const resetForm = () => {
    setShowRegistrationForm(false)
    setOtpSent(false)
    setOtp(Array(6).fill(""))
    setOtpError(null)
    setRegistrationSuccess(false)
    setFormData({
      name: "",
      email: "",
      phone: "",
      countryCode: "+91",
    })
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
          <p className="mt-4 text-lg font-medium">Loading masterclass details...</p>
        </div>
      </div>
    )
  }

  if (!masterclass) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Masterclass Not Found</h2>
          <p className="mt-2 text-gray-600">The masterclass you're looking for doesn't exist.</p>
          <Link href="/masterclasses">
            <Button className="mt-4">View All Masterclasses</Button>
          </Link>
        </div>
      </div>
    )
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
                href="/"
                className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-primary sm:block"
              >
                Home
              </Link>
              <Link
                href="/masterclasses"
                className="hidden text-sm font-medium text-purple-600 transition-colors hover:text-purple-800 sm:block"
              >
                Masterclasses
              </Link>
              <Link
                href="/#curriculum"
                className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-primary sm:block"
              >
                Curriculum
              </Link>
              <Link
                href="/#pricing"
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
        {/* Breadcrumb */}
        <div className="bg-gray-50 py-3 border-b">
          <div className="container px-4 md:px-6">
            <div className="flex items-center text-sm text-gray-600">
              <Link href="/" className="hover:text-purple-600">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/masterclasses" className="hover:text-purple-600">
                Masterclasses
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900 font-medium truncate">{masterclass.title}</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="w-full py-6 sm:py-8 md:py-12 bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col gap-6 md:flex-row md:gap-8">
              <div className="md:w-2/3">
                <Link
                  href="/masterclasses"
                  className="inline-flex items-center text-gray-200 hover:text-white mb-3 sm:mb-4 text-sm"
                >
                  <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  Back to All Masterclasses
                </Link>
                <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3">
                  <Badge className="bg-purple-500/20 text-purple-100 hover:bg-purple-500/30 border-purple-400/20 text-xs">
                    {masterclass.category}
                  </Badge>
                  <Badge className="bg-blue-500/20 text-blue-100 hover:bg-blue-500/30 border-blue-400/20 text-xs">
                    {masterclass.duration}
                  </Badge>
                  {masterclass.isFeatured && (
                    <Badge className="bg-amber-500/20 text-amber-100 hover:bg-amber-500/30 border-amber-400/20 text-xs">
                      Featured
                    </Badge>
                  )}
                </div>
                <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4">
                  {masterclass.title}
                </h1>
                <p className="text-gray-200 text-sm sm:text-base md:text-lg mb-4 sm:mb-6">
                  {masterclass.shortDescription}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6 text-sm">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-purple-300" />
                    <span>{masterclass.date}</span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-purple-300" />
                    <span>{masterclass.time}</span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Users className="h-4 w-4 sm:h-5 sm:w-5 text-purple-300" />
                    <span className="text-xs sm:text-sm">Limited to {masterclass.maxAttendees} attendees</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  {!registrationSuccess ? (
                    <ConsistentButton
                      size="sm"
                      className="bg-white text-purple-900 hover:bg-gray-100 text-xs sm:text-sm"
                      onClick={() => setShowRegistrationForm(true)}
                    >
                      Register Now
                    </ConsistentButton>
                  ) : (
                    <ConsistentButton size="sm" className="bg-green-600 hover:bg-green-700 text-xs sm:text-sm" disabled>
                      <CheckCircle className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      Registration Complete
                    </ConsistentButton>
                  )}
                  <ConsistentButton
                    size="sm"
                    variant="outline"
                    className="text-white border-white hover:bg-white/20 text-xs sm:text-sm"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href)
                      toast({
                        title: "Link Copied",
                        description: "Masterclass link copied to clipboard",
                      })
                    }}
                  >
                    <Share2 className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    Share
                  </ConsistentButton>
                </div>
              </div>

              <div className="md:w-1/3 mt-4 md:mt-0">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden border border-white/20">
                  <div className="relative h-40 sm:h-48">
                    <Image
                      src={masterclass.image || "/placeholder.svg"}
                      alt={masterclass.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-3 sm:p-5">
                    <h3 className="text-base sm:text-lg font-bold mb-2">Instructor</h3>
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <div className="relative h-10 w-10 sm:h-12 sm:w-12 rounded-full overflow-hidden">
                        <Image
                          src={masterclass.instructor.image || "/placeholder.svg"}
                          alt={masterclass.instructor.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-sm sm:text-base">{masterclass.instructor.name}</p>
                        <p className="text-xs sm:text-sm text-gray-300">{masterclass.instructor.title}</p>
                      </div>
                    </div>
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex items-start gap-2">
                        <Award className="h-4 w-4 sm:h-5 sm:w-5 text-purple-300 mt-0.5 flex-shrink-0" />
                        <p className="text-xs sm:text-sm">Certificate of participation</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-purple-300 mt-0.5 flex-shrink-0" />
                        <p className="text-xs sm:text-sm">Access to resources and code templates</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <Download className="h-4 w-4 sm:h-5 sm:w-5 text-purple-300 mt-0.5 flex-shrink-0" />
                        <p className="text-xs sm:text-sm">Downloadable materials</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Tabs */}
        <section className="w-full py-6 sm:py-8">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
              <div className="overflow-x-auto pb-2">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-4 sm:mb-8 min-w-[400px]">
                  <TabsTrigger value="overview" className="text-xs sm:text-sm">
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="topics" className="text-xs sm:text-sm">
                    Topics
                  </TabsTrigger>
                  <TabsTrigger value="instructor" className="text-xs sm:text-sm">
                    Instructor
                  </TabsTrigger>
                  <TabsTrigger value="prerequisites" className="text-xs sm:text-sm">
                    Prerequisites
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="overview" className="space-y-4 sm:space-y-6">
                <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none">
                  <h2 className="text-xl sm:text-2xl font-bold">About This Masterclass</h2>
                  <p className="text-sm sm:text-base">{masterclass.longDescription}</p>

                  <h3 className="text-lg sm:text-xl font-bold mt-4 sm:mt-6">What You'll Learn</h3>
                  <ul className="space-y-1 sm:space-y-2 mt-2 sm:mt-4">
                    {masterclass.topics.map((topic, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm sm:text-base">{topic}</span>
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-lg sm:text-xl font-bold mt-4 sm:mt-6">Benefits</h3>
                  <ul className="space-y-1 sm:space-y-2 mt-2 sm:mt-4">
                    {masterclass.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm sm:text-base">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value="topics" className="space-y-6">
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-bold">Masterclass Topics</h2>
                  <p>This masterclass will cover the following topics in detail:</p>

                  <div className="mt-6 space-y-6">
                    {masterclass.topics.map((topic, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg border">
                        <h3 className="text-lg font-medium flex items-center">
                          <span className="bg-purple-100 text-purple-800 w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                            {index + 1}
                          </span>
                          {topic}
                        </h3>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="instructor" className="space-y-6">
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-bold">About the Instructor</h2>

                  <div className="flex flex-col md:flex-row gap-6 mt-6">
                    <div className="md:w-1/3">
                      <div className="relative h-64 w-full rounded-lg overflow-hidden">
                        <Image
                          src={masterclass.instructor.image || "/placeholder.svg"}
                          alt={masterclass.instructor.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-xl font-bold">{masterclass.instructor.name}</h3>
                      <p className="text-gray-600 mb-4">{masterclass.instructor.title}</p>
                      <p>{masterclass.instructor.bio}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="prerequisites" className="space-y-6">
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-bold">Prerequisites</h2>
                  <p>To get the most out of this masterclass, you should have:</p>

                  <ul className="space-y-2 mt-4">
                    {masterclass.prerequisites.map((prerequisite, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{prerequisite}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-md mt-6">
                    <p className="text-blue-800">
                      <span className="font-bold">Note:</span> Don't worry if you don't meet all the prerequisites. The
                      masterclass is designed to be accessible to learners at different levels.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Related Masterclasses */}
        <section className="w-full py-12 bg-gray-50">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold mb-6">Related Masterclasses</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {masterclassData.masterclasses
                .filter((mc) => mc.id !== masterclass.id)
                .slice(0, 3)
                .map((relatedMasterclass) => (
                  <Link
                    key={relatedMasterclass.id}
                    href={`/masterclass/${relatedMasterclass.id}`}
                    className="group relative overflow-hidden rounded-lg border bg-white shadow-md transition-all hover:shadow-lg"
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={relatedMasterclass.image || "/placeholder.svg"}
                        alt={relatedMasterclass.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <div className="mb-2 flex items-center gap-2">
                        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                          {relatedMasterclass.category}
                        </Badge>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {relatedMasterclass.duration}
                        </Badge>
                      </div>
                      <h3 className="mb-2 text-xl font-bold leading-tight text-gray-900 group-hover:text-purple-600">
                        {relatedMasterclass.title}
                      </h3>
                      <p className="mb-4 text-sm text-gray-600 line-clamp-2">{relatedMasterclass.shortDescription}</p>
                      <div className="flex items-center text-gray-700">
                        <Calendar className="mr-2 h-4 w-4 text-purple-500" />
                        {relatedMasterclass.date}
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Want to go beyond masterclasses?</h2>
                <p className="mt-4 text-gray-100">
                  Join our comprehensive AI Engineering course and transform your career with in-demand skills
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <ConsistentButton
                    size="lg"
                    className="bg-white text-purple-600 hover:bg-gray-100"
                    rightIcon={<ArrowRight className="ml-2 h-4 w-4" />}
                    onClick={() => router.push("/")}
                  >
                    Explore Full Course
                  </ConsistentButton>
                  <ConsistentButton
                    size="lg"
                    variant="outline"
                    className="text-white border-white hover:bg-white/20"
                    onClick={openRegistrationDrawer}
                  >
                    Contact an Advisor
                  </ConsistentButton>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg max-w-md">
                  <h3 className="text-xl font-bold mb-2">Course Highlights</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-300 mr-2 mt-0.5 flex-shrink-0" />
                      <span>6-month comprehensive program</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-300 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Weekend classes for working professionals</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-300 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Hands-on projects with real-world applications</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-300 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Complete placement assistance</span>
                    </li>
                  </ul>
                  <div className="mt-4">
                    <ConsistentButton
                      size="sm"
                      className="w-full bg-white text-purple-600 hover:bg-gray-100"
                      onClick={() => router.push("/#curriculum")}
                    >
                      Learn More About Our Course
                    </ConsistentButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 bg-gray-900 text-gray-300">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Logo variant="light" />
              <p className="mt-2 text-sm">Empowering the next generation of AI engineers</p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
              <Link href="/" className="text-sm hover:text-white">
                Home
              </Link>
              <Link href="/masterclasses" className="text-sm hover:text-white">
                Masterclasses
              </Link>
              <Link href="/#curriculum" className="text-sm hover:text-white">
                Curriculum
              </Link>
              <Link href="/#pricing" className="text-sm hover:text-white">
                Pricing
              </Link>
              <Link href="#" className="text-sm hover:text-white">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-6 border-t border-gray-800 pt-6 text-center text-sm">
            <p>© {new Date().getFullYear()} RByte.ai. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Registration Modal */}
      {showRegistrationForm && !registrationSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-2 sm:py-3 px-4 sm:px-6">
              <h3 className="text-base sm:text-xl font-bold text-white">
                {!otpSent ? "Register for Masterclass" : "Verify Your Phone Number"}
              </h3>
            </div>

            <div className="p-4 sm:p-6">
              {!otpSent ? (
                <form onSubmit={handleSendOTP} className="space-y-3 sm:space-y-4">
                  <div className="space-y-1 sm:space-y-2">
                    <label htmlFor="name" className="text-xs sm:text-sm font-medium">
                      Full Name*
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      placeholder="Enter your full name"
                      required
                      className="text-sm"
                    />
                  </div>

                  <div className="space-y-1 sm:space-y-2">
                    <label htmlFor="email" className="text-xs sm:text-sm font-medium">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      placeholder="Enter your email address"
                      className="text-sm"
                    />
                  </div>

                  <div className="space-y-1 sm:space-y-2">
                    <label htmlFor="phone" className="text-xs sm:text-sm font-medium">
                      Phone Number*
                    </label>
                    <div className="flex gap-2">
                      <select
                        name="countryCode"
                        className="w-20 sm:w-24 rounded-md border border-input bg-background px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        value={formData.countryCode}
                        onChange={handleFormChange}
                      >
                        <option value="+91">+91 🇮🇳</option>
                        <option value="+1">+1 🇺🇸</option>
                        <option value="+44">+44 🇬🇧</option>
                        <option value="+61">+61 🇦🇺</option>
                        <option value="+65">+65 🇸🇬</option>
                        <option value="+971">+971 🇦🇪</option>
                      </select>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                        placeholder="Enter your phone number"
                        className="flex-1 text-sm"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 sm:gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowRegistrationForm(false)}
                      className="flex-1 text-xs sm:text-sm h-8 sm:h-10"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs sm:text-sm h-8 sm:h-10"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                          Sending OTP...
                        </>
                      ) : (
                        "Continue"
                      )}
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  <div className="text-center">
                    <p className="text-base sm:text-lg font-medium mb-1 sm:mb-2">Verify Your Phone Number</p>
                    <p className="text-xs sm:text-sm text-slate-600">
                      We've sent a 6-digit verification code to {formData.countryCode} {formData.phone}
                    </p>
                  </div>

                  <div className="flex justify-center gap-1 sm:gap-2 my-4 sm:my-6">
                    {Array(6)
                      .fill(0)
                      .map((_, index) => (
                        <Input
                          key={index}
                          id={`masterclass-otp-${index}`}
                          type="text"
                          maxLength={1}
                          className="w-8 sm:w-10 h-10 sm:h-12 text-center text-base sm:text-lg font-bold border-purple-200"
                          value={otp[index] || ""}
                          onChange={(e) => handleOtpChange(e, index)}
                          onKeyDown={(e) => {
                            // Handle backspace to move to previous input
                            if (e.key === "Backspace" && !otp[index] && index > 0) {
                              const prevInput = document.getElementById(`masterclass-otp-${index - 1}`)
                              if (prevInput) {
                                prevInput.focus()
                              }
                            }
                          }}
                        />
                      ))}
                  </div>

                  {otpError && (
                    <div className="text-center">
                      <p className="text-xs sm:text-sm text-red-500">{otpError}</p>
                    </div>
                  )}

                  <div className="flex flex-col gap-2 sm:gap-3">
                    <Button
                      onClick={verifyOtp}
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs sm:text-sm h-8 sm:h-10"
                      disabled={otp.join("").length !== 6 || isVerifying}
                    >
                      {isVerifying ? (
                        <>
                          <Loader2 className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        "Verify & Register"
                      )}
                    </Button>

                    <div className="flex justify-between text-xs sm:text-sm mt-1 sm:mt-2">
                      <button type="button" className="text-purple-600 hover:text-purple-800" onClick={resendOtp}>
                        Resend OTP
                      </button>
                      <button
                        type="button"
                        onClick={() => setOtpSent(false)}
                        className="text-slate-600 hover:text-slate-800"
                      >
                        Edit Phone Number
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Registration Success Modal */}
      {registrationSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-2 sm:py-3 px-4 sm:px-6">
              <h3 className="text-base sm:text-xl font-bold text-white">Registration Successful</h3>
            </div>

            <div className="p-4 sm:p-6 text-center">
              <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
              </div>
              <h4 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">You're Registered!</h4>
              <p className="text-slate-600 mb-4 sm:mb-6 text-xs sm:text-sm">
                Thank you, {formData.name}! You have successfully registered for the masterclass.
              </p>
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border mb-4 sm:mb-6">
                <h5 className="font-medium mb-1 sm:mb-2 text-sm sm:text-base">Masterclass Details</h5>
                <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                  <div className="flex items-center justify-center text-gray-700">
                    <Calendar className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 text-purple-500" />
                    {masterclass.date}
                  </div>
                  <div className="flex items-center justify-center text-gray-700">
                    <Clock className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 text-purple-500" />
                    {masterclass.time}
                  </div>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mb-3 sm:mb-4">
                We've sent the masterclass details to your phone. You'll also receive a reminder 24 hours before the
                event.
              </p>
              <Button
                onClick={resetForm}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs sm:text-sm h-8 sm:h-10"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Enrollment Drawer */}
      <EnrollmentDrawer isOpen={isEnrollmentDrawerOpen} onClose={closeEnrollmentDrawer} mode="enroll" />

      {/* Registration Drawer */}
      <EnrollmentDrawer isOpen={isRegistrationDrawerOpen} onClose={closeRegistrationDrawer} mode="register" />
    </div>
  )
}
