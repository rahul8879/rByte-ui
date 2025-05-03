"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, Users, ArrowRight, Loader2 } from "lucide-react"
import { sendOTP, verifyOTP, registerForMasterclass } from "@/utils/api"
import { toast } from "@/hooks/use-toast"

// Define types for the masterclass data
interface MasterclassData {
  title: string
  description: string
  date: string
  time: string
  maxAttendees: number
  topics: string[]
}

interface FreeMasterclassBannerProps {
  masterclassData?: MasterclassData
  isLoading?: boolean
  onRegister?: () => void
}

// Mock data that would come from an API
const defaultMasterclassData: MasterclassData = {
  title: "Building Production-Ready RAG Systems with LangChain",
  description:
    "Join our free 2-hour masterclass to learn how to build sophisticated retrieval-augmented generation systems that can handle enterprise-scale document processing.",
  date: "June 17, 2025",
  time: "7:00 PM - 9:00 PM IST",
  maxAttendees: 100,
  topics: [
    "Vector database setup and optimization for RAG",
    "Advanced chunking strategies for better retrieval",
    "Implementing hybrid search with sparse and dense embeddings",
    "Evaluating and improving RAG system performance",
    "Deploying RAG systems to production",
  ],
}

export default function FreeMasterclassBanner({
  masterclassData = defaultMasterclassData,
  isLoading: initialIsLoading = false,
  onRegister,
}: FreeMasterclassBannerProps) {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [countryCode, setCountryCode] = useState("+91")
  const [submitted, setSubmitted] = useState(false)
  const [data, setData] = useState<MasterclassData | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""))
  const [otpError, setOtpError] = useState<string | null>(null)
  const firstOtpInputRef = useRef<HTMLInputElement>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isLoading, setIsLoading] = useState(initialIsLoading)

  // Update the handleRegister function to open the enrollment modal in register mode
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!showForm) {
      setShowForm(true)
      return
    }

    // Validate form
    if (!name.trim() || !phone.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter your name and phone number",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)

      // Send OTP
      await sendOTP(phone, countryCode)

      // Move to OTP verification step
      setOtpSent(true)

      // Focus the first OTP input after a short delay
      setTimeout(() => {
        if (firstOtpInputRef.current) {
          firstOtpInputRef.current.focus()
        }
      }, 100)

      toast({
        title: "OTP Sent",
        description: `A verification code has been sent to ${countryCode} ${phone}`,
      })
    } catch (error) {
      console.error("Error sending OTP:", error)
      toast({
        title: "Failed to send OTP",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
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
      await verifyOTP(phone, otp.join(""), countryCode)

      // After OTP verification, register for masterclass
      await registerForMasterclass({
        name,
        phone,
        country_code: countryCode,
        email,
      })

      setOtpError(null)
      setSubmitted(true)

      toast({
        title: "Registration Successful!",
        description: "You have been registered for the masterclass.",
      })

      // If onRegister prop is provided, call it after successful verification
      if (onRegister) {
        setTimeout(() => {
          onRegister()
        }, 1500) // Short delay to show success message before opening the drawer
      }
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
    // alert("New OTP sent! (Mock: Use 123456)")
    toast({
      title: "OTP Resent",
      description: "A new OTP has been sent to your phone number.",
    })
  }

  // Simulate fetching data from an API
  useEffect(() => {
    // In a real app, this would be an API call
    // Example:
    // const fetchMasterclassData = async () => {
    //   try {
    //     const response = await fetch('/api/masterclass');
    //     const data = await response.json();
    //     setData(data);
    //   } catch (error) {
    //     console.error('Error fetching masterclass data:', error);
    //   }
    // };
    // fetchMasterclassData();

    // For now, just use the provided or default data
    setData(masterclassData)
  }, [masterclassData])

  // Remove or comment out the old handleSubmit function
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   // In a real implementation, this would send the email to your backend
  //   setSubmitted(true)
  // }

  if (initialIsLoading) {
    return (
      <div className="rounded-xl overflow-hidden border border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50 p-8">
        <div className="animate-pulse flex flex-col space-y-4">
          <div className="h-4 bg-purple-200 rounded w-1/4"></div>
          <div className="h-6 bg-purple-200 rounded w-3/4"></div>
          <div className="h-4 bg-purple-200 rounded w-full"></div>
          <div className="h-4 bg-purple-200 rounded w-5/6"></div>
          <div className="grid grid-cols-3 gap-4">
            <div className="h-4 bg-purple-200 rounded"></div>
            <div className="h-4 bg-purple-200 rounded"></div>
            <div className="h-4 bg-purple-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="rounded-xl overflow-hidden border border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50">
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm text-purple-600 mb-4">
              Free Masterclass
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">"{data.title}"</h3>
            <p className="text-slate-600 mb-6">{data.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-500" />
                <span>{data.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-purple-500" />
                <span>{data.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-500" />
                <span>Limited to {data.maxAttendees} attendees</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-purple-100 mb-4">
              <h4 className="font-bold mb-2">What You'll Learn:</h4>
              <ul className="space-y-1 text-sm">
                {data.topics.map((topic, index) => (
                  <li key={index}>• {topic}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="md:w-1/3 bg-white p-6 rounded-xl border border-purple-100 shadow-sm flex flex-col justify-center">
            {!submitted ? (
              <>
                {!otpSent ? (
                  <form onSubmit={handleRegister} className="space-y-4">
                    <h4 className="font-bold text-center">Reserve Your Spot Now</h4>
                    <p className="text-sm text-center text-slate-600 mb-4">
                      Enter your details to register for this free masterclass
                    </p>

                    {!showForm ? (
                      <Button
                        type="button"
                        onClick={handleRegister}
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending OTP...
                          </>
                        ) : (
                          <>
                            Register Now
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    ) : (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label htmlFor="masterclass-name" className="text-sm font-medium">
                            Full Name*
                          </label>
                          <Input
                            id="masterclass-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your full name"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="masterclass-phone" className="text-sm font-medium">
                            Phone Number*
                          </label>
                          <div className="flex gap-2">
                            <select
                              className="w-24 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                              value={countryCode}
                              onChange={(e) => setCountryCode(e.target.value)}
                            >
                              <option value="+91">+91 🇮🇳</option>
                              <option value="+1">+1 🇺🇸</option>
                              <option value="+44">+44 🇬🇧</option>
                              <option value="+61">+61 🇦🇺</option>
                              <option value="+65">+65 🇸🇬</option>
                              <option value="+971">+971 🇦🇪</option>
                            </select>
                            <Input
                              id="masterclass-phone"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="Enter your phone number"
                              className="flex-1"
                              required
                            />
                          </div>
                        </div>

                        <Button
                          type="button"
                          onClick={handleRegister}
                          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Sending OTP...
                            </>
                          ) : (
                            <>
                              Send OTP
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </Button>
                      </div>
                    )}
                    <p className="text-xs text-center text-slate-500">
                      By registering, you'll also receive updates about our AI Engineering course from RByte.ai
                    </p>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <h4 className="font-bold text-center">Verify Your Phone</h4>
                    <p className="text-sm text-center text-slate-600">We've sent a 6-digit OTP to {phone}</p>
                    <div className="flex justify-center gap-2">
                      {Array(6)
                        .fill(0)
                        .map((_, index) => (
                          <Input
                            key={index}
                            id={`masterclass-otp-${index}`}
                            type="text"
                            maxLength={1}
                            className="w-10 h-10 text-center border-purple-200"
                            value={otp[index] || ""}
                            onChange={(e) => handleOtpChange(e, index)}
                            ref={index === 0 ? firstOtpInputRef : null}
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
                    {otpError && <p className="text-xs text-center text-red-500">{otpError}</p>}
                    <Button
                      onClick={verifyOtp}
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                      disabled={otp.join("").length !== 6 || isVerifying}
                    >
                      {isVerifying ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        <>Verify OTP</>
                      )}
                    </Button>
                    <div className="flex justify-between text-xs">
                      <button
                        type="button"
                        onClick={resendOtp}
                        className="text-purple-600 hover:text-purple-800"
                        disabled={isVerifying}
                      >
                        Resend OTP
                      </button>
                      <button
                        type="button"
                        onClick={() => setOtpSent(false)}
                        className="text-slate-600 hover:text-slate-800"
                        disabled={isVerifying}
                      >
                        Change Number
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="font-bold mb-2">Registration Successful!</h4>
                <p className="text-sm text-slate-600 mb-2">Thank you, {name}!</p>
                <p className="text-sm text-slate-600 mb-4">
                  We've sent the masterclass details to {countryCode} {phone}
                </p>
                <p className="text-xs text-slate-500">Don't forget to mark your calendar for {data.date}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
