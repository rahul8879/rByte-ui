"use client"

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useId,
} from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle, Loader2 } from "lucide-react"
import { Drawer } from "@/components/ui/drawer"
import { sendOtp, verifyOtp, registerLead, enrollStudent } from "@/lib/api"
import { toast } from "@/hooks/use-toast"

interface EnrollmentDrawerProps {
  isOpen: boolean
  onClose: () => void
  mode?: "enroll" | "register"
}

export default function EnrollmentDrawer({
  isOpen,
  onClose,
  mode = "enroll",
}: EnrollmentDrawerProps) {
  /* ─────────────────────────  state ───────────────────────── */
  const [step, setStep] = useState<"form" | "otp" | "success">("form")
  const [isLoading, setIsLoading] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+91",
    currentRole: "",
    experience: "",
    programmingExperience: "",
    goals: "",
    heardFrom: "",
    preferredBatch: "",
  })

  /* OTP */
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""))
  const [otpError, setOtpError] = useState<string | null>(null)
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null))
  const [resendCooldown, setResendCooldown] = useState(0)

  /* Tick down resend cooldown every second */
  useEffect(() => {
    if (resendCooldown <= 0) return
    const t = setTimeout(() => setResendCooldown((c) => c - 1), 1000)
    return () => clearTimeout(t)
  }, [resendCooldown])

  /* ─────────────────────── derived labels ─────────────────── */
  const title          = mode === "enroll" ? "Enroll in AI Engineering Course" : "Register Your Interest"
  const successTitle   = mode === "enroll" ? "Enrollment Successful!"          : "Registration Successful!"
  const buttonText     = mode === "enroll" ? "Submit Enrollment"               : "Continue"
  const successMessage =
    mode === "enroll"
      ? "We've received your enrollment request for the AI Engineering Course. Our team will contact you within 24 hours to confirm your spot and provide payment details."
      : "Thank you for registering your interest in our AI Engineering Course. We'll keep you updated about upcoming batches and send you additional course information."

  /* ─────────────────────── helpers ─────────────────────────── */
  const resetDrawer = useCallback(() => {
    setStep("form")
    setOtp(Array(6).fill(""))
    setOtpError(null)
  }, [])

  const handleClose = () => {
    onClose()
    resetDrawer()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (name: string, value: string) =>
    setFormData(prev => ({ ...prev, [name]: value }))

  const handleSelectChange = (name: string, value: string) =>
    setFormData(prev => ({ ...prev, [name]: value }))

  /* ─────────────────────── submit form (send OTP) ─────────── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.phone) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    const otpRes = await sendOtp({ phone: formData.phone, country_code: formData.countryCode })
    setIsLoading(false)

    if (otpRes.error) {
      toast({
        title: "Failed to send OTP",
        description: otpRes.error,
        variant: "destructive",
      })
      return
    }

    toast({
      title: "OTP Sent",
      description: `A verification code has been sent to ${formData.countryCode} ${formData.phone}`,
    })
    setResendCooldown(10)
    setStep("otp")
    setTimeout(() => otpInputRefs.current[0]?.focus(), 100)
  }

  /* ─────────────────────── OTP field logic ─────────────────── */
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const val = e.target.value
    if (!/^[0-9]?$/.test(val)) return

    const next = [...otp]
    next[idx] = val
    setOtp(next)

    if (val && idx < 5) otpInputRefs.current[idx + 1]?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      otpInputRefs.current[idx - 1]?.focus()
    }
  }

  const resendOtp = async () => {
    setOtp(Array(6).fill(""))
    setOtpError(null)
    const res = await sendOtp({ phone: formData.phone, country_code: formData.countryCode })
    if (res.error) {
      toast({ title: "Failed to resend OTP", description: res.error, variant: "destructive" })
    } else {
      setResendCooldown(10)
      toast({ title: "OTP Resent", description: "A new code has been sent." })
    }
  }

  /* ─────────────────────── verify OTP & submit data ────────── */
  const handleVerifyOtp = async () => {
    setIsVerifying(true)

    const verifyRes = await verifyOtp({
      phone: formData.phone,
      country_code: formData.countryCode,
      otp: otp.join(""),
    })

    if (verifyRes.error) {
      setOtpError(verifyRes.error)
      toast({ title: "Verification failed", description: verifyRes.error, variant: "destructive" })
      setIsVerifying(false)
      return
    }

    let submitRes
    if (mode === "enroll") {
      submitRes = await enrollStudent({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        country_code: formData.countryCode,
        current_role: formData.currentRole,
        experience: formData.experience,
        programming_experience: formData.programmingExperience,
        goals: formData.goals,
        heard_from: formData.heardFrom,
        preferred_batch: formData.preferredBatch,
      })
    } else {
      submitRes = await registerLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        country_code: formData.countryCode,
        heard_from: formData.heardFrom,
      })
    }

    setIsVerifying(false)

    if (submitRes.error) {
      setOtpError(submitRes.error)
      toast({ title: "Submission failed", description: submitRes.error, variant: "destructive" })
      return
    }

    setStep("success")
    toast({
      title: "Success!",
      description: mode === "enroll" ? "Enrollment submitted." : "Registration submitted.",
    })
  }

  /* ─────────────────────── render ───────────────────────────── */
  const id = useId() // unique prefix for radio IDs if you ever mount two drawers

  return (
    <Drawer open={isOpen} onClose={handleClose} side="right">
      <div className="flex h-full flex-col">
        {/* ───────── header ──────── */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 py-3 px-6">
          <h3 className="text-xl font-bold text-white">
            {step === "form"  ? title
            : step === "otp"   ? "Verify Your Phone Number"
                               : successTitle}
          </h3>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {/* ───────────── STEP 1 – FORM ───────────── */}
          {step === "form" && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                  <div className="flex gap-2">
                    <select
                      className="w-24 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={formData.countryCode}
                      onChange={e => handleSelectChange("countryCode", e.target.value)}
                    >
                      <option value="+91">+91 🇮🇳</option>
                      <option value="+1">+1 🇺🇸</option>
                      <option value="+44">+44 🇬🇧</option>
                      <option value="+61">+61 🇦🇺</option>
                      <option value="+65">+65 🇸🇬</option>
                      <option value="+971">+971 🇦🇪</option>
                      <option value="+81">+81 🇯🇵</option>
                      <option value="+49">+49 🇩🇪</option>
                    </select>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="flex-1"
                      required
                    />
                  </div>
                </div>

                {mode === "enroll" && (
                  <div className="space-y-2">
                    <Label htmlFor="currentRole">Current Role*</Label>
                    <Input
                      id="currentRole"
                      name="currentRole"
                      placeholder="E.g., Software Developer"
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
                    <select
                      name="experience"
                      id="experience"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={formData.experience}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>
                        Select years of experience
                      </option>
                      <option value="0-1">0‑1 years</option>
                      <option value="1-3">1‑3 years</option>
                      <option value="3-5">3‑5 years</option>
                      <option value="5-10">5‑10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label>Programming Experience*</Label>
                    {(["beginner","intermediate","advanced"] as const).map(val => (
                      <div className="flex items-center space-x-2" key={val}>
                        <input
                          type="radio"
                          id={`${val}-${id}`}
                          name="programmingExperience"
                          value={val}
                          checked={formData.programmingExperience === val}
                          onChange={() => handleRadioChange("programmingExperience", val)}
                          className="h-4 w-4 border-gray-300 text-purple-600 focus:ring-purple-500"
                          required
                        />
                        <Label htmlFor={`${val}-${id}`} className="font-normal capitalize">
                          {val === "beginner"
                            ? "Beginner (little to no programming)"
                            : val === "intermediate"
                            ? "Intermediate (comfortable with basics)"
                            : "Advanced (proficient in ≥1 language)"}
                        </Label>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="goals">What are your goals for taking this course?*</Label>
                    <textarea
                      id="goals"
                      name="goals"
                      value={formData.goals}
                      onChange={handleChange}
                      className="min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="heardFrom">How did you hear about us?</Label>
                      <select
                        name="heardFrom"
                        id="heardFrom"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        value={formData.heardFrom}
                        onChange={handleChange}
                      >
                        <option value="" disabled>
                          Select an option
                        </option>
                        <option value="social">Social Media</option>
                        <option value="search">Search Engine</option>
                        <option value="friend">Friend / Colleague</option>
                        <option value="email">Email</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="preferredBatch">Preferred Batch*</Label>
                      <select
                        name="preferredBatch"
                        id="preferredBatch"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        value={formData.preferredBatch}
                        onChange={handleChange}
                        required
                      >
                        <option value="" disabled>
                          Select preferred batch
                        </option>
                        <option value="june-morning">June – Morning (9 AM – 12 PM)</option>
                        <option value="june-evening">June – Evening (6 PM – 9 PM)</option>
                        <option value="july-morning">July – Morning (9 AM – 12 PM)</option>
                        <option value="july-evening">July – Evening (6 PM – 9 PM)</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {mode === "register" && (
                <div className="space-y-2">
                  <Label htmlFor="heardFrom">How did you hear about us?</Label>
                  <select
                    name="heardFrom"
                    id="heardFrom"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={formData.heardFrom}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option value="social">Social Media</option>
                    <option value="search">Search Engine</option>
                    <option value="friend">Friend / Colleague</option>
                    <option value="email">Email</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <Button variant="outline" onClick={handleClose} className="flex-1">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending OTP…
                    </>
                  ) : (
                    buttonText
                  )}
                </Button>
              </div>
            </form>
          )}

          {/* ───────────── STEP 2 – OTP ───────────── */}
          {step === "otp" && (
            <div className="space-y-4">
              <div className="text-center">
                <p className="mb-2 text-lg font-medium">Verify Your Phone Number</p>
                <p className="text-sm text-slate-600">
                  We’ve sent a 6‑digit code to {formData.countryCode} {formData.phone}
                </p>
              </div>

              <div className="my-6 flex justify-center gap-2">
                {otp.map((digit, i) => (
                  <Input
                    key={i}
                    type="text"
                    maxLength={1}
                    className="h-12 w-10 border-purple-200 text-center text-lg font-bold"
                    value={digit}
                    onChange={e => handleOtpChange(e, i)}
                    onKeyDown={e => handleKeyDown(e, i)}
                    ref={el => { otpInputRefs.current[i] = el }}
                  />
                ))}
              </div>

              {otpError && (
                <p className="text-center text-sm text-red-500">{otpError}</p>
              )}

              <div className="flex flex-col gap-3">
                <Button
                  onClick={handleVerifyOtp}
                  className="bg-gradient-to-r from-purple-500 to-pink-500"
                  disabled={otp.join("").length !== 6 || isVerifying}
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying…
                    </>
                  ) : (
                    "Verify & Submit"
                  )}
                </Button>

                <div className="mt-2 flex justify-between text-sm">
                  <button
                    type="button"
                    onClick={resendOtp}
                    disabled={resendCooldown > 0}
                    className={resendCooldown > 0 ? "text-slate-400 cursor-not-allowed" : "text-purple-600 hover:text-purple-800"}
                  >
                    {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend OTP"}
                  </button>
                  <button type="button" onClick={() => setStep("form")} className="text-slate-600 hover:text-slate-800">
                    Edit phone number
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ───────────── STEP 3 – SUCCESS ───────────── */}
          {step === "success" && (
            <div className="py-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="mb-2 text-xl font-bold">Thank You!</h4>
              <p className="mb-6 text-slate-600">{successMessage}</p>
              <Button onClick={handleClose} className="bg-gradient-to-r from-purple-500 to-pink-500">
                Close
              </Button>
            </div>
          )}
        </div>
      </div>
    </Drawer>
  )
}
