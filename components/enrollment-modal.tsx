"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Update the EnrollmentModalProps interface to include a mode prop
interface EnrollmentModalProps {
  isOpen: boolean
  onClose: () => void
  mode?: "enroll" | "register"
}

// Update the component function signature to use the mode prop with a default value
export default function EnrollmentModal({ isOpen, onClose, mode = "enroll" }: EnrollmentModalProps) {
  const [step, setStep] = useState<"form" | "otp" | "success">("form")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    currentRole: "",
    experience: "",
    programmingExperience: "",
    goals: "",
    heardFrom: "",
    preferredBatch: "",
  })

  // OTP related states
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""))
  const [otpError, setOtpError] = useState<string | null>(null)
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null))

  // Add this title variable to dynamically set the title based on mode
  const title = mode === "enroll" ? "Enroll in AI Engineering Course" : "Register Your Interest"
  const successTitle = mode === "enroll" ? "Enrollment Successful!" : "Registration Successful!"
  const buttonText = mode === "enroll" ? "Submit Enrollment" : "Continue"
  const successMessage =
    mode === "enroll"
      ? "We've received your enrollment request for the AI Engineering Course. Our team will contact you within 24 hours to confirm your spot and provide payment details."
      : "Thank you for registering your interest in our AI Engineering Course. We'll keep you updated about upcoming batches and send you additional course information."

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (mode === "register") {
      // For registration mode, move to OTP verification step
      setStep("otp")
      // Focus the first OTP input after a short delay to allow the UI to update
      setTimeout(() => {
        if (otpInputRefs.current && otpInputRefs.current[0]) {
          otpInputRefs.current[0].focus()
        }
      }, 100)
    } else {
      // For enrollment mode, directly move to success
      setStep("success")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value
    if (value.match(/^[0-9]$/) || value === "") {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)

      // Auto-focus next input if a digit was entered
      if (value !== "" && index < 5) {
        if (otpInputRefs.current && otpInputRefs.current[index + 1]) {
          otpInputRefs.current[index + 1]?.focus()
        }
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // Handle backspace to go to previous input
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      if (otpInputRefs.current && otpInputRefs.current[index - 1]) {
        otpInputRefs.current[index - 1]?.focus()
      }
    }
  }

  const verifyOtp = () => {
    // In a real implementation, this would verify the OTP with your backend
    const enteredOtp = otp.join("")

    // Mock verification - in a real app, you'd validate against the backend
    if (enteredOtp === "123456") {
      setStep("success")
      setOtpError(null)
    } else {
      setOtpError("Invalid OTP. Please try again.")
    }
  }

  const resendOtp = () => {
    // In a real implementation, this would trigger a new OTP to be sent
    setOtp(Array(6).fill(""))
    setOtpError(null)
    // Show a toast or message that OTP was resent
    alert("New OTP sent!")
  }

  // Fixed ref callback function
  const setOtpInputRef = (index: number) => (el: HTMLInputElement | null) => {
    otpInputRefs.current[index] = el
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 py-3 px-6">
          <h3 className="text-xl font-bold text-white">
            {step === "form" ? title : step === "otp" ? "Verify Your Phone Number" : successTitle}
          </h3>
        </div>

        <div className="p-6">
          {step === "form" ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name*</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address*</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number*</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                {mode === "enroll" && (
                  <div className="space-y-2">
                    <Label htmlFor="currentRole">Current Role*</Label>
                    <Input
                      id="currentRole"
                      name="currentRole"
                      placeholder="E.g., Software Developer, Data Analyst"
                      value={formData.currentRole}
                      onChange={handleChange}
                      required
                    />
                  </div>
                )}
              </div>

              {mode === "enroll" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Professional Experience*</Label>
                    <Select
                      name="experience"
                      onValueChange={(value) => handleSelectChange("experience", value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select years of experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-1">0-1 years</SelectItem>
                        <SelectItem value="1-3">1-3 years</SelectItem>
                        <SelectItem value="3-5">3-5 years</SelectItem>
                        <SelectItem value="5-10">5-10 years</SelectItem>
                        <SelectItem value="10+">10+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Programming Experience*</Label>
                    <RadioGroup
                      defaultValue={formData.programmingExperience}
                      onValueChange={(value) => handleRadioChange("programmingExperience", value)}
                      className="flex flex-col space-y-1"
                      required
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="beginner" id="beginner" />
                        <Label htmlFor="beginner" className="font-normal">
                          Beginner (little to no programming experience)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="intermediate" id="intermediate" />
                        <Label htmlFor="intermediate" className="font-normal">
                          Intermediate (comfortable with basic programming)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="advanced" id="advanced" />
                        <Label htmlFor="advanced" className="font-normal">
                          Advanced (proficient in one or more languages)
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="goals">What are your goals for taking this AI Engineering course?*</Label>
                    <Textarea
                      id="goals"
                      name="goals"
                      placeholder="E.g., Career transition, skill enhancement, specific project goals"
                      value={formData.goals}
                      onChange={handleChange}
                      className="min-h-[80px]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="heardFrom">How did you hear about us?</Label>
                      <Select name="heardFrom" onValueChange={(value) => handleSelectChange("heardFrom", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="social">Social Media</SelectItem>
                          <SelectItem value="search">Search Engine</SelectItem>
                          <SelectItem value="friend">Friend or Colleague</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="preferredBatch">Preferred Batch*</Label>
                      <Select
                        name="preferredBatch"
                        onValueChange={(value) => handleSelectChange("preferredBatch", value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select preferred batch" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="june-morning">June Batch - Morning (9AM-12PM)</SelectItem>
                          <SelectItem value="june-evening">June Batch - Evening (6PM-9PM)</SelectItem>
                          <SelectItem value="july-morning">July Batch - Morning (9AM-12PM)</SelectItem>
                          <SelectItem value="july-evening">July Batch - Evening (6PM-9PM)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </>
              )}

              {mode === "register" && (
                <div className="space-y-2">
                  <Label htmlFor="heardFrom">How did you hear about us?</Label>
                  <Select name="heardFrom" onValueChange={(value) => handleSelectChange("heardFrom", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="social">Social Media</SelectItem>
                      <SelectItem value="search">Search Engine</SelectItem>
                      <SelectItem value="friend">Friend or Colleague</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500">
                  {buttonText}
                </Button>
              </div>
            </form>
          ) : step === "otp" ? (
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-lg font-medium mb-2">Verify Your Phone Number</p>
                <p className="text-sm text-slate-600">We've sent a 6-digit verification code to {formData.phone}</p>
              </div>

              <div className="flex justify-center gap-2 my-6">
                {Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <Input
                      key={index}
                      type="text"
                      maxLength={1}
                      className="w-12 h-12 text-center text-lg font-bold border-purple-200"
                      value={otp[index] || ""}
                      onChange={(e) => handleOtpChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      ref={setOtpInputRef(index)}
                    />
                  ))}
              </div>

              {otpError && (
                <div className="text-center">
                  <p className="text-sm text-red-500">{otpError}</p>
                </div>
              )}

              <div className="flex flex-col gap-3">
                <Button
                  onClick={verifyOtp}
                  className="bg-gradient-to-r from-purple-500 to-pink-500"
                  disabled={otp.join("").length !== 6}
                >
                  Verify & Submit
                </Button>

                <div className="flex justify-between text-sm mt-2">
                  <button type="button" onClick={resendOtp} className="text-purple-600 hover:text-purple-800">
                    Resend OTP
                  </button>
                  <button type="button" onClick={() => setStep("form")} className="text-slate-600 hover:text-slate-800">
                    Edit Phone Number
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-xl font-bold mb-2">Thank You!</h4>
              <p className="text-slate-600 mb-6">{successMessage}</p>
              <Button onClick={onClose} className="bg-gradient-to-r from-purple-500 to-pink-500">
                Close
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
