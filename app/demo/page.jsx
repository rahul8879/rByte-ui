"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Logo from "@/components/logo"
import { sendOtp, verifyOtp, registerDemoLead } from "@/lib/api"

// ─── Helpers ────────────────────────────────────────────────────────────────

function getSessionDate() {
  const d = new Date()
  d.setDate(d.getDate() + 5)
  d.setHours(19, 0, 0, 0)
  return d
}

function getTimeLeft(target) {
  const diff = target.getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000)  / 60000),
    seconds: Math.floor((diff % 60000)    / 1000),
  }
}

function pad(n) { return String(n).padStart(2, "0") }

// ─── Binary background ───────────────────────────────────────────────────────

const BINARY_STRINGS = [
  "01101100 11010011", "10110010 01001101", "00110101 10101100",
  "11001010 01110011", "01011010 11000110", "10100101 00111010",
  "01001101 11010110", "11010010 00101011", "00101011 10110100",
  "10011010 01011010", "01100101 11001010", "10010011 01101001",
]

function BinaryBg() {
  const items = [
    { top: "8%",  left: "2%",  opacity: 0.07, rotate: -15, scale: 0.9 },
    { top: "18%", left: "88%", opacity: 0.06, rotate: 12,  scale: 0.8 },
    { top: "32%", left: "5%",  opacity: 0.05, rotate: -8,  scale: 1.0 },
    { top: "45%", left: "92%", opacity: 0.07, rotate: 20,  scale: 0.7 },
    { top: "60%", left: "3%",  opacity: 0.06, rotate: -20, scale: 0.9 },
    { top: "72%", left: "85%", opacity: 0.05, rotate: 10,  scale: 1.1 },
    { top: "85%", left: "10%", opacity: 0.07, rotate: -12, scale: 0.8 },
    { top: "90%", left: "78%", opacity: 0.06, rotate: 15,  scale: 0.9 },
  ]
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
      {items.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: s.top,
            left: s.left,
            opacity: s.opacity,
            transform: `rotate(${s.rotate}deg) scale(${s.scale})`,
            fontFamily: "monospace",
            fontSize: "11px",
            color: "rgba(168,85,247,0.9)",
            letterSpacing: "0.1em",
            lineHeight: 1.8,
            whiteSpace: "pre",
            userSelect: "none",
          }}
        >
          {BINARY_STRINGS.slice(i % 4, i % 4 + 4).join("\n")}
        </div>
      ))}
    </div>
  )
}

// ─── Countdown Timer ─────────────────────────────────────────────────────────

function CountdownBlock({ value, label }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <div style={{
        background: "rgba(168,85,247,0.15)",
        border: "1px solid rgba(168,85,247,0.35)",
        borderRadius: 8,
        width: 56,
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 22,
        fontWeight: 800,
        color: "#c084fc",
        fontVariantNumeric: "tabular-nums",
        letterSpacing: "0.02em",
      }}>
        {pad(value)}
      </div>
      <span style={{ fontSize: 10, color: "#9ca3af", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em" }}>
        {label}
      </span>
    </div>
  )
}

// ─── Seat Progress Bar ────────────────────────────────────────────────────────

function SeatBar({ seats }) {
  const pct = Math.max(0, Math.min(100, ((seats - 18) / 12) * 100))
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 12, color: "#9ca3af" }}>
        <span>Seats remaining</span>
        <span style={{ color: pct < 40 ? "#ef4444" : "#c084fc", fontWeight: 700 }}>{seats} / 30</span>
      </div>
      <div style={{ height: 8, borderRadius: 99, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
        <div style={{
          height: "100%",
          width: `${pct}%`,
          borderRadius: 99,
          background: pct < 40
            ? "linear-gradient(90deg, #ef4444, #ec4899)"
            : "linear-gradient(90deg, #a855f7, #ec4899)",
          transition: "width 1s ease",
        }} />
      </div>
    </div>
  )
}

// ─── Lead Form (3-phase: form → otp → success) ───────────────────────────────

const ROLES = [
  "Software Developer / Engineer",
  "Data Analyst / BI Developer",
  "QA / Test Engineer",
  "DevOps / SRE / Cloud Engineer",
  "Product Manager",
  "IT / System Administrator",
  "Fresh Graduate / Student",
  "Other",
]

const COUNTRY_CODES = [
  { code: "+91", flag: "🇮🇳", label: "+91" },
  { code: "+1",  flag: "🇺🇸", label: "+1"  },
  { code: "+44", flag: "🇬🇧", label: "+44" },
  { code: "+61", flag: "🇦🇺", label: "+61" },
  { code: "+65", flag: "🇸🇬", label: "+65" },
  { code: "+971",flag: "🇦🇪", label: "+971"},
]

// Shared styles
const inputBase = (hasError) => ({
  width: "100%",
  padding: "10px 14px",
  borderRadius: 8,
  border: `1px solid ${hasError ? "#ef4444" : "rgba(255,255,255,0.12)"}`,
  background: "rgba(255,255,255,0.05)",
  color: "#f9fafb",
  fontSize: 14,
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
})
const labelSt = { display: "block", fontSize: 13, fontWeight: 600, color: "#d1d5db", marginBottom: 5 }
const errorSt = { fontSize: 11, color: "#f87171", marginTop: 3 }
const Spinner = () => (
  <span style={{ display: "inline-block", width: 15, height: 15, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
)

function LeadForm({ seats }) {
  // ── phase: "form" | "otp" | "success"
  const [phase, setPhase]           = useState("form")
  const [form, setForm]             = useState({ name: "", email: "", phone: "", countryCode: "+91", role: "" })
  const [otpDigits, setOtpDigits]   = useState(["","","","","",""])
  const [errors, setErrors]         = useState({})
  const [loading, setLoading]       = useState(false)
  const [apiError, setApiError]     = useState("")
  const [resendCooldown, setResendCooldown] = useState(0)

  // Countdown for resend button
  useEffect(() => {
    if (resendCooldown <= 0) return
    const t = setTimeout(() => setResendCooldown(c => c - 1), 1000)
    return () => clearTimeout(t)
  }, [resendCooldown])

  // ── Validation
  const validateForm = () => {
    const e = {}
    if (!form.name.trim()) e.name = "Name is required"
    if (!form.phone.trim()) e.phone = "WhatsApp number is required"
    else if (!/^\d{7,15}$/.test(form.phone.replace(/[\s\-]/g, ""))) e.phone = "Enter a valid number (digits only)"
    if (!form.role) e.role = "Please select your role"
    return e
  }

  // ── Step 1: send OTP
  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setApiError("")
    const errs = validateForm()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setLoading(true)
    const res = await sendOtp({ phone: form.phone.replace(/[\s\-]/g, ""), country_code: form.countryCode })
    setLoading(false)

    if (res.error) { setApiError(res.error); return }

    setPhase("otp")
    setResendCooldown(30)
  }

  // ── OTP digit handling
  const handleOtpDigit = (val, idx) => {
    if (!/^[0-9]?$/.test(val)) return
    const next = [...otpDigits]
    next[idx] = val
    setOtpDigits(next)
    if (val && idx < 5) document.getElementById(`demo-otp-${idx + 1}`)?.focus()
  }
  const handleOtpKey = (e, idx) => {
    if (e.key === "Backspace" && !otpDigits[idx] && idx > 0)
      document.getElementById(`demo-otp-${idx - 1}`)?.focus()
  }

  // ── Step 2: verify OTP + register
  const handleVerify = async () => {
    const otpStr = otpDigits.join("")
    if (otpStr.length !== 6) return
    setLoading(true)
    setApiError("")

    const verifyRes = await verifyOtp({
      phone: form.phone.replace(/[\s\-]/g, ""),
      country_code: form.countryCode,
      otp: otpStr,
    })
    if (verifyRes.error) {
      setApiError(verifyRes.error)
      setLoading(false)
      return
    }

    // OTP verified → register
    const regRes = await registerDemoLead({
      name: form.name,
      email: form.email || undefined,
      phone: form.phone.replace(/[\s\-]/g, ""),
      country_code: form.countryCode,
      role: form.role,
    })
    setLoading(false)

    if (regRes.error) { setApiError(regRes.error); return }

    setPhase("success")
  }

  // ── Resend OTP
  const handleResend = async () => {
    if (resendCooldown > 0) return
    setApiError("")
    const res = await sendOtp({ phone: form.phone.replace(/[\s\-]/g, ""), country_code: form.countryCode })
    if (res.error) { setApiError(res.error); return }
    setOtpDigits(["","","","","",""])
    setResendCooldown(30)
  }

  // ── CTA button shared style
  const ctaBtn = (disabled) => ({
    width: "100%", padding: "14px 20px", borderRadius: 8, border: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    background: disabled ? "rgba(168,85,247,0.35)" : "linear-gradient(135deg, #a855f7, #ec4899, #6366f1)",
    color: "#fff", fontWeight: 800, fontSize: 15,
    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
    boxShadow: disabled ? "none" : "0 4px 24px rgba(168,85,247,0.4)",
    transition: "all 0.2s", position: "relative", overflow: "hidden",
  })

  // ── PHASE: success ────────────────────────────────────────────────────────
  if (phase === "success") {
    return (
      <div style={{ textAlign: "center", padding: "20px 0" }}>
        {/* Check circle */}
        <div style={{
          width: 64, height: 64, borderRadius: "50%",
          background: "rgba(34,197,94,0.15)", border: "2px solid #22c55e",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 28, margin: "0 auto 16px",
        }}>✓</div>

        <h3 style={{ fontSize: 20, fontWeight: 800, color: "#f9fafb", margin: "0 0 8px" }}>
          You're In, {form.name.split(" ")[0]}! 🎉
        </h3>
        <p style={{ fontSize: 13, color: "#9ca3af", marginBottom: 6, lineHeight: 1.6 }}>
          Seat confirmed. We've sent session details to your WhatsApp.
        </p>
        <p style={{ fontSize: 13, color: "#c084fc", marginBottom: 24, fontWeight: 600 }}>
          Join the community below to get the Zoom link + prep material.
        </p>

        {/* WhatsApp community CTA */}
        <a
          href="https://chat.whatsapp.com/REPLACE_WITH_YOUR_COMMUNITY_INVITE_LINK"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            padding: "14px 20px", borderRadius: 10,
            background: "linear-gradient(135deg, #16a34a, #15803d)",
            color: "#fff", fontWeight: 800, fontSize: 15,
            textDecoration: "none",
            boxShadow: "0 4px 20px rgba(22,163,74,0.4)",
            marginBottom: 12,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Join the WhatsApp Community →
        </a>

        <p style={{ fontSize: 11, color: "#4b5563", lineHeight: 1.5 }}>
          We'll send the Zoom link + prep code to your WhatsApp before the session.
        </p>
      </div>
    )
  }

  // ── PHASE: otp ────────────────────────────────────────────────────────────
  if (phase === "otp") {
    const filled = otpDigits.join("").length === 6
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Back + header */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <button
            onClick={() => { setPhase("form"); setApiError(""); setOtpDigits(["","","","","",""]) }}
            style={{ background: "none", border: "none", color: "#9ca3af", cursor: "pointer", fontSize: 20, lineHeight: 1, padding: 0 }}
          >←</button>
          <div>
            <p style={{ fontSize: 14, fontWeight: 700, color: "#f9fafb", margin: 0 }}>Verify your WhatsApp number</p>
            <p style={{ fontSize: 12, color: "#6b7280", margin: 0 }}>
              OTP sent to {form.countryCode} {form.phone}
            </p>
          </div>
        </div>

        {/* Step indicator */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
          <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(168,85,247,0.25)", border: "1px solid #a855f7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#c084fc", fontWeight: 700 }}>✓</div>
          <div style={{ flex: 1, height: 1, background: "rgba(168,85,247,0.4)" }} />
          <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(168,85,247,0.6)", border: "1px solid #a855f7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#fff", fontWeight: 700 }}>2</div>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
          <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#4b5563", fontWeight: 700 }}>3</div>
        </div>

        {/* OTP boxes */}
        <div>
          <label style={labelSt}>Enter 6-digit OTP</label>
          <div style={{ display: "flex", gap: 8, justifyContent: "space-between" }}>
            {otpDigits.map((d, i) => (
              <input
                key={i}
                id={`demo-otp-${i}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={d}
                onChange={e => handleOtpDigit(e.target.value, i)}
                onKeyDown={e => handleOtpKey(e, i)}
                style={{
                  width: 44, height: 52, textAlign: "center",
                  fontSize: 22, fontWeight: 800,
                  borderRadius: 8,
                  border: `1.5px solid ${d ? "rgba(168,85,247,0.7)" : "rgba(255,255,255,0.12)"}`,
                  background: d ? "rgba(168,85,247,0.12)" : "rgba(255,255,255,0.04)",
                  color: "#f9fafb", outline: "none",
                  transition: "border-color 0.15s, background 0.15s",
                }}
              />
            ))}
          </div>
        </div>

        {apiError && (
          <div style={{ padding: "10px 14px", borderRadius: 8, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", fontSize: 13, color: "#f87171" }}>
            {apiError}
          </div>
        )}

        {/* Verify button */}
        <button
          type="button"
          onClick={handleVerify}
          disabled={!filled || loading}
          className="demo-cta-btn"
          style={ctaBtn(!filled || loading)}
        >
          {loading ? <><Spinner /> Verifying…</> : "Verify & Confirm Seat →"}
        </button>

        {/* Resend */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12 }}>
          <button
            type="button"
            onClick={handleResend}
            disabled={resendCooldown > 0}
            style={{ background: "none", border: "none", cursor: resendCooldown > 0 ? "default" : "pointer", color: resendCooldown > 0 ? "#4b5563" : "#a855f7", fontSize: 12, padding: 0 }}
          >
            {resendCooldown > 0 ? `Resend OTP in ${resendCooldown}s` : "Resend OTP"}
          </button>
          <button
            type="button"
            onClick={() => { setPhase("form"); setOtpDigits(["","","","","",""]); setApiError("") }}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", fontSize: 12, padding: 0 }}
          >
            Edit number
          </button>
        </div>
      </div>
    )
  }

  // ── PHASE: form ───────────────────────────────────────────────────────────
  return (
    <form onSubmit={handleFormSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Step indicator */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
        <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(168,85,247,0.6)", border: "1px solid #a855f7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#fff", fontWeight: 700 }}>1</div>
        <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
        <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#4b5563", fontWeight: 700 }}>2</div>
        <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
        <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#4b5563", fontWeight: 700 }}>3</div>
      </div>

      {/* Name */}
      <div>
        <label style={labelSt}>Full Name *</label>
        <input
          type="text" placeholder="e.g. Rahul Sharma"
          value={form.name}
          onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setErrors(er => ({ ...er, name: "" })) }}
          style={inputBase(errors.name)}
        />
        {errors.name && <p style={errorSt}>{errors.name}</p>}
      </div>

      {/* Email (optional) */}
      <div>
        <label style={labelSt}>Work Email <span style={{ color: "#4b5563", fontWeight: 400 }}>(optional)</span></label>
        <input
          type="email" placeholder="you@company.com"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          style={inputBase(false)}
        />
      </div>

      {/* Phone with country code */}
      <div>
        <label style={labelSt}>WhatsApp Number * <span style={{ color: "#6b7280", fontWeight: 400, fontSize: 11 }}>— OTP will be sent here</span></label>
        <div style={{ display: "flex", gap: 8 }}>
          <select
            value={form.countryCode}
            onChange={e => setForm(f => ({ ...f, countryCode: e.target.value }))}
            style={{
              width: 80, padding: "10px 8px", borderRadius: 8, flexShrink: 0,
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.05)",
              color: "#f9fafb", fontSize: 13, outline: "none", cursor: "pointer",
            }}
          >
            {COUNTRY_CODES.map(c => (
              <option key={c.code} value={c.code} style={{ background: "#0f0c1a" }}>{c.flag} {c.label}</option>
            ))}
          </select>
          <input
            type="tel" placeholder="98765 43210"
            value={form.phone}
            onChange={e => { setForm(f => ({ ...f, phone: e.target.value })); setErrors(er => ({ ...er, phone: "" })) }}
            style={{ ...inputBase(errors.phone), flex: 1 }}
          />
        </div>
        {errors.phone && <p style={errorSt}>{errors.phone}</p>}
      </div>

      {/* Role */}
      <div>
        <label style={labelSt}>Current Role *</label>
        <select
          value={form.role}
          onChange={e => { setForm(f => ({ ...f, role: e.target.value })); setErrors(er => ({ ...er, role: "" })) }}
          style={{
            ...inputBase(errors.role), cursor: "pointer",
            appearance: "none",
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")",
            backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center", backgroundSize: 18, paddingRight: 36,
          }}
        >
          <option value="" style={{ background: "#0f0c1a" }}>Select your role</option>
          {ROLES.map(r => <option key={r} value={r} style={{ background: "#0f0c1a" }}>{r}</option>)}
        </select>
        {errors.role && <p style={errorSt}>{errors.role}</p>}
      </div>

      {apiError && (
        <div style={{ padding: "10px 14px", borderRadius: 8, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", fontSize: 13, color: "#f87171" }}>
          {apiError}
        </div>
      )}

      <button type="submit" disabled={loading} className="demo-cta-btn" style={ctaBtn(loading)}>
        {loading ? <><Spinner /> Sending OTP…</> : "Get OTP & Book Seat →"}
      </button>

      <p style={{ textAlign: "center", fontSize: 11, color: "#6b7280" }}>
        OTP sent to your WhatsApp. Session details delivered after verification.
      </p>
    </form>
  )
}

// ─── Accordion ────────────────────────────────────────────────────────────────

function Accordion({ items }) {
  const [open, setOpen] = useState(null)
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={i} style={{
            border: `1px solid ${isOpen ? "rgba(168,85,247,0.45)" : "rgba(255,255,255,0.08)"}`,
            borderRadius: 10,
            overflow: "hidden",
            transition: "border-color 0.2s",
          }}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              style={{
                width: "100%", textAlign: "left", padding: "16px 20px",
                background: isOpen ? "rgba(168,85,247,0.07)" : "rgba(255,255,255,0.02)",
                border: "none", cursor: "pointer", color: "#f9fafb",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                gap: 12, transition: "background 0.2s",
              }}
            >
              <span style={{ fontWeight: 700, fontSize: 15 }}>{item.q}</span>
              <span style={{ fontSize: 18, color: "#c084fc", flexShrink: 0, transform: isOpen ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
            </button>
            {isOpen && (
              <div style={{ padding: "0 20px 16px", fontSize: 14, color: "#9ca3af", lineHeight: 1.7, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                {item.a}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATS = [
  { value: "83%",    label: "IT jobs will be impacted by AI by 2027", icon: "🤖" },
  { value: "₹28L",  label: "Average AI Engineer salary in India",     icon: "💰" },
  { value: "3%",    label: "Developers who can actually build AI apps", icon: "⚡" },
  { value: "18 mo", label: "Window to upskill before the market shifts", icon: "⏳" },
]

const MODULES = [
  {
    num: "01",
    title: "How Modern AI Systems Actually Work",
    subtitle: "Min 0 – 25 · Concepts + Live Demo",
    color: "#3b82f6",
    topics: [
      "The AI stack explained visually: LLMs → Embeddings → Vector DBs → Agents — no jargon",
      "Why ChatGPT alone can't run your business — and what RAG + Agentic AI adds",
      "Live side-by-side: a 'dumb' LLM vs. a RAG-powered AI that knows your company data",
      "The 3 layers every production AI product is built on — you'll build all 3 today",
    ],
  },
  {
    num: "02",
    title: "Build a Production-Ready AI Assistant — Live",
    subtitle: "Min 25 – 68 · Hands-On Build",
    color: "#a855f7",
    topics: [
      "Load real business data (PDF / website / FAQ) — no toy datasets",
      "Create semantic embeddings and store in a vector DB — explained step by step",
      "Wire a LangChain retrieval-augmented pipeline: query → search → generate",
      "The AI answers questions from your own data in real-time — you'll see it live on screen",
    ],
  },
  {
    num: "03",
    title: "Ship It Live + The Full AI Product Stack",
    subtitle: "Min 68 – 90 · Deploy + Roadmap",
    color: "#10b981",
    topics: [
      "Wrap the AI in a FastAPI backend — production-grade API in minutes",
      "Deploy to cloud: your app gets a real public URL you can share right now",
      "Full-stack AI product diagram: data pipeline → model → API → UI — how it all connects",
      "What you need to learn next to build this independently — and the 8-week roadmap that gets you there",
    ],
  },
]

const WHO_CARDS = [
  {
    icon: "💻",
    title: "Software Developer",
    tags: ["Python", "APIs", "Career switch"],
    pain: "Worried about becoming obsolete as AI rewrites code",
    gain: "Learn to build the AI tools your team uses daily",
  },
  {
    icon: "📊",
    title: "Data Analyst",
    tags: ["SQL", "Excel", "Dashboards"],
    pain: "Stuck in reporting loops with no path to engineering",
    gain: "Upgrade to ML + LLM pipelines and double your value",
  },
  {
    icon: "🧪",
    title: "QA Engineer",
    tags: ["Testing", "Automation", "QA"],
    pain: "Manual test cycles shrinking as AI takes over QA",
    gain: "Pivot to AI testing and agentic automation roles",
  },
  {
    icon: "🎓",
    title: "Fresh Graduate",
    tags: ["No experience", "Job market", "Portfolio"],
    pain: "Generic CS degree but no AI portfolio to show recruiters",
    gain: "Build 3 production AI projects in 8 weeks and stand out",
  },
]

const FAQS = [
  {
    q: "Is this session really free?",
    a: "Yes, 100% free. No credit card, no catch. We run this live demo to show you what the full 8-week programme looks like and give you hands-on value in 90 minutes. If you love it, you can apply for the full cohort.",
  },
  {
    q: "What is covered in the free demo session?",
    a: "The session has 3 phases. First (0–25 min): we explain how modern AI systems actually work — LLMs, embeddings, vector databases, and agentic pipelines — visually and in plain English. Second (25–68 min): you watch us build a production-ready AI assistant live that reads real business data and answers questions from it using RAG. Third (68–90 min): we deploy it to the cloud (real public URL), walk through the full AI product stack, and show you the roadmap to build this yourself. No prior AI knowledge needed.",
  },
  {
    q: "Do I need any prior experience with AI or ML?",
    a: "No. You need basic Python familiarity (if-else, loops, functions). The session is designed for working developers and analysts who are new to AI. Our curriculum starts from zero AI knowledge.",
  },
  {
    q: "How is this different from a YouTube tutorial?",
    a: "It's live, not pre-recorded. You'll code alongside the instructor, ask questions in real time, get your code reviewed, and finish with a deployed project. 94% of attendees say they learned more in 90 minutes than in 20 hours of YouTube videos.",
  },
  {
    q: "What happens after the session?",
    a: "You'll get the session recording, the full source code, and a PDF summary of the AI stack we covered. If you want to join the paid cohort, you'll get the current Founder Batch price (₹14,999–₹29,999 depending on track) — valid for 48 hours after the session. Every paid track includes a 7-day no-questions-asked refund. No pressure — the decision is entirely yours.",
  },
]

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function DemoPage() {
  const sessionDate = useRef(getSessionDate())
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(sessionDate.current))
  const [seats, setSeats] = useState(30)
  const [openModule, setOpenModule] = useState(0)

  // Countdown tick
  useEffect(() => {
    const t = setInterval(() => setTimeLeft(getTimeLeft(sessionDate.current)), 1000)
    return () => clearInterval(t)
  }, [])

  // Seat counter tick — decrease every 60 seconds
  useEffect(() => {
    const t = setInterval(() => {
      setSeats(s => (s > 18 ? s - 1 : 18))
    }, 60000)
    return () => clearInterval(t)
  }, [])

  const formattedDate = sessionDate.current.toLocaleDateString("en-IN", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  })

  // ── Keyframes + theme CSS ────────────────────────────────────────────────
  const css = `
    @keyframes spin { to { transform: rotate(360deg) } }
    @keyframes fadeUp { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:none } }
    @keyframes shimmer {
      0%   { transform: translateX(-100%) }
      100% { transform: translateX(200%) }
    }
    @keyframes aurora-move {
      0%   { transform: translate(0,0) scale(1) }
      50%  { transform: translate(4%,3%) scale(1.06) }
      100% { transform: translate(-2%,5%) scale(0.97) }
    }
    .demo-shimmer-btn {
      position: relative;
      overflow: hidden;
    }
    .demo-shimmer-btn::after {
      content: "";
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background: linear-gradient(120deg, transparent, rgba(255,255,255,0.22), transparent);
      transform: translateX(-100%);
      animation: shimmer 2.4s linear infinite;
      pointer-events: none;
    }
    .demo-cta-btn::after {
      content: "";
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background: linear-gradient(120deg, transparent, rgba(255,255,255,0.18), transparent);
      transform: translateX(-100%);
      animation: shimmer 2.4s linear infinite;
      pointer-events: none;
    }
    .demo-aurora {
      position: absolute;
      filter: blur(50px);
      mix-blend-mode: screen;
      opacity: 0.6;
      pointer-events: none;
      will-change: transform, opacity;
      animation: aurora-move 18s ease-in-out infinite alternate;
    }
    .demo-aurora--1 { width: 55vw; height: 55vw; left: -15vw; top: -15vh; background: radial-gradient(closest-side, rgba(168,85,247,0.5), transparent 60%); }
    .demo-aurora--2 { width: 45vw; height: 45vw; right: -10vw; top: 5vh; background: radial-gradient(closest-side, rgba(99,102,241,0.45), transparent 60%); animation-duration: 22s; }
    .demo-aurora--3 { width: 38vw; height: 38vw; left: 18vw; bottom: -10vh; background: radial-gradient(closest-side, rgba(236,72,153,0.4), transparent 60%); animation-duration: 26s; }
    .demo-ai-grid {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px);
      background-size: 48px 48px;
      opacity: 0.2;
      pointer-events: none;
    }
    @media (max-width: 768px) {
      .demo-hero-grid { grid-template-columns: 1fr !important; }
      .demo-sticky-form { position: static !important; }
      .demo-stat-grid  { grid-template-columns: 1fr 1fr !important; }
      .demo-who-grid   { grid-template-columns: 1fr 1fr !important; }
      .demo-mobile-cta { display: block !important; }
    }
    @media (max-width: 480px) {
      .demo-stat-grid  { grid-template-columns: 1fr !important; }
      .demo-who-grid   { grid-template-columns: 1fr !important; }
    }
    input::placeholder, textarea::placeholder { color: #4b5563 }
    input:focus, select:focus { border-color: rgba(168,85,247,0.65) !important; box-shadow: 0 0 0 3px rgba(168,85,247,0.14) }
    select option { background: #0f0c1a; color: #f9fafb }
  `

  // Site-matching slate-950 palette
  const PAGE_BG = "#020617"
  const CARD_BG = "rgba(255,255,255,0.04)"
  const BORDER  = "rgba(255,255,255,0.08)"

  return (
    <div style={{ background: PAGE_BG, minHeight: "100vh", color: "#f9fafb", fontFamily: "inherit" }}>
      <style>{css}</style>

      {/* ── NAV ─────────────────────────────────────────────────────────────── */}
      <header style={{
        position: "sticky", top: 0, zIndex: 40,
        borderBottom: `1px solid ${BORDER}`,
        background: "rgba(2,6,23,0.92)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <Logo size="sm" />
          </Link>
          <nav style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Link href="/#curriculum" style={{ fontSize: 14, color: "#9ca3af", textDecoration: "none", display: "none" }} className="sm:inline">
              Curriculum
            </Link>
            <Link href="/#pricing" style={{ fontSize: 14, color: "#9ca3af", textDecoration: "none", display: "none" }} className="sm:inline">
              Pricing
            </Link>
            {/* Free Session pill — green, matching main site masterclass pill */}
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "4px 12px", borderRadius: 99,
              background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)",
              fontSize: 13, fontWeight: 600, color: "#86efac",
            }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px #22c55e", display: "inline-block" }} />
              Free Session
            </span>
            <a
              href="#demo-form"
              className="demo-shimmer-btn"
              style={{
                padding: "8px 18px", borderRadius: 8,
                background: "linear-gradient(135deg, #a855f7, #ec4899, #6366f1)",
                color: "#fff", fontWeight: 700, fontSize: 14,
                textDecoration: "none", whiteSpace: "nowrap",
                boxShadow: "0 2px 12px rgba(168,85,247,0.35)",
              }}
            >
              Book Free Seat
            </a>
          </nav>
        </div>
      </header>

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section style={{ position: "relative", padding: "72px 0 80px", overflow: "hidden" }}>
        {/* AI grid overlay — matches main site .ai-grid */}
        <div className="demo-ai-grid" />

        {/* Aurora blobs — matches main site .ai-aurora style */}
        <div className="demo-aurora demo-aurora--1" />
        <div className="demo-aurora demo-aurora--2" />
        <div className="demo-aurora demo-aurora--3" />

        {/* Binary decoration */}
        <BinaryBg />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", position: "relative", zIndex: 1 }}>
          <div
            className="demo-hero-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: 48, alignItems: "start" }}
          >
            {/* LEFT */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {/* Pill */}
              <div style={{
                alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: 8,
                padding: "6px 16px", borderRadius: 99,
                border: "1px solid rgba(168,85,247,0.35)",
                background: "rgba(168,85,247,0.1)",
                fontSize: 13, fontWeight: 600, color: "#c084fc",
              }}>
                🔴 Live · 90-min Free Demo — {formattedDate}
              </div>

              {/* Headline — uses text-gradient-ai colours (#f0abfc → #fff → #c7d2fe) */}
              <h1 style={{
                fontSize: "clamp(32px, 5vw, 52px)",
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                margin: 0,
              }}>
                <span style={{
                  background: "linear-gradient(90deg, #f0abfc, #ffffff, #c7d2fe)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  Build a Working AI App
                </span>
                <br />
                <span style={{ color: "#f9fafb" }}>in 90 Minutes — Live</span>
              </h1>

              {/* Subline */}
              <p style={{ fontSize: 18, color: "#9ca3af", lineHeight: 1.65, margin: 0, maxWidth: 540 }}>
                Every Saturday & Sunday — live, free, 90 minutes. You'll understand how AI systems work,
                build a{" "}
                <span style={{ color: "#c084fc", fontWeight: 600 }}>production-ready AI assistant on your own data</span>
                {" "}and deploy it with a real public URL — all in one session.
              </p>

              {/* Trust chips */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 16px" }}>
                {[
                  { icon: "👨‍💻", text: "200+ developers placed" },
                  { icon: "⭐", text: "4.9/5 session rating" },
                  { icon: "🚀", text: "No setup needed" },
                  { icon: "🎯", text: "100% hands-on" },
                ].map(({ icon, text }) => (
                  <span key={text} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#d1d5db" }}>
                    <span>{icon}</span>{text}
                  </span>
                ))}
              </div>

              {/* Countdown */}
              <div>
                <p style={{ fontSize: 11, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, marginBottom: 10 }}>
                  Session starts in
                </p>
                <div style={{ display: "flex", gap: 10 }}>
                  {[
                    { value: timeLeft.days,    label: "Days"  },
                    { value: timeLeft.hours,   label: "Hours" },
                    { value: timeLeft.minutes, label: "Mins"  },
                    { value: timeLeft.seconds, label: "Secs"  },
                  ].map(u => <CountdownBlock key={u.label} {...u} />)}
                </div>
              </div>

              {/* Seat bar */}
              <div style={{
                padding: "16px 20px", borderRadius: 10,
                border: "1px solid rgba(168,85,247,0.2)",
                background: "rgba(168,85,247,0.05)",
              }}>
                <SeatBar seats={seats} />
                {seats <= 22 && (
                  <p style={{ marginTop: 8, fontSize: 12, color: "#f87171", fontWeight: 600 }}>
                    ⚠️ Only {seats} seats left — don't miss out!
                  </p>
                )}
              </div>

              {/* Mobile CTA — hidden on desktop, shown via media query */}
              <a
                href="#demo-form"
                className="demo-mobile-cta demo-shimmer-btn"
                style={{
                  display: "none",
                  padding: "14px 24px",
                  borderRadius: 10,
                  background: "linear-gradient(135deg, #a855f7, #ec4899, #6366f1)",
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: 16,
                  textDecoration: "none",
                  textAlign: "center",
                  boxShadow: "0 4px 24px rgba(168,85,247,0.4)",
                }}
              >
                Book My Free Seat →
              </a>
            </div>

            {/* RIGHT — sticky form */}
            <div
              id="demo-form"
              className="demo-sticky-form"
              style={{
                position: "sticky",
                top: 80,
                background: "rgba(15,12,26,0.95)",
                border: "1px solid rgba(168,85,247,0.22)",
                borderRadius: 16,
                padding: 28,
                boxShadow: "0 8px 48px rgba(168,85,247,0.12), 0 2px 8px rgba(0,0,0,0.6)",
              }}
            >
              <div style={{ marginBottom: 20 }}>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: "#f9fafb", margin: "0 0 6px" }}>
                  Reserve Your Free Seat
                </h2>
                <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>
                  {seats} spots left · {formattedDate} · 7:00 PM IST
                </p>
              </div>
              <LeadForm seats={seats} />
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ───────────────────────────────────────────────────────── */}
      <section style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, padding: "40px 0", background: "rgba(168,85,247,0.03)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
          <div
            className="demo-stat-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}
          >
            {STATS.map((s, i) => (
              <div key={i} style={{
                textAlign: "center", padding: "20px 16px",
                borderRadius: 10, background: CARD_BG,
                border: `1px solid ${BORDER}`,
              }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
                <div style={{ fontSize: 32, fontWeight: 900, color: "#34d399", letterSpacing: "-0.02em", marginBottom: 6 }}>
                  {s.value}
                </div>
                <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.5 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CURRICULUM ──────────────────────────────────────────────────────── */}
      <section style={{ padding: "80px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{
              display: "inline-block", padding: "4px 14px", borderRadius: 99, marginBottom: 12,
              background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.3)",
              fontSize: 12, fontWeight: 700, color: "#c084fc", textTransform: "uppercase", letterSpacing: "0.1em",
            }}>
              Session Agenda · 90 Minutes
            </span>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 900, margin: "0 0 12px", letterSpacing: "-0.02em" }}>
              What You'll Build in This 90-Min Live Session
            </h2>
            <p style={{ fontSize: 16, color: "#6b7280", maxWidth: 600, margin: "0 auto" }}>
              Zero AI experience? No problem — we start with concepts. Know some Python? You'll be building.
              Either way, you leave with a deployed AI product and a clear understanding of how production AI systems work.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {MODULES.map((mod, i) => {
              const open = openModule === i
              return (
                <div key={i} style={{
                  borderRadius: 12, overflow: "hidden",
                  border: `1px solid ${open ? mod.color + "55" : BORDER}`,
                  transition: "border-color 0.2s",
                }}>
                  <button
                    onClick={() => setOpenModule(open ? null : i)}
                    style={{
                      width: "100%", textAlign: "left", cursor: "pointer",
                      padding: "20px 24px",
                      background: open ? `linear-gradient(135deg, ${mod.color}14, transparent)` : CARD_BG,
                      border: "none", color: "#f9fafb",
                      display: "flex", alignItems: "center", gap: 16,
                      transition: "background 0.2s",
                    }}
                  >
                    <span style={{
                      flexShrink: 0, width: 42, height: 42, borderRadius: 10,
                      background: mod.color + "22", border: `1px solid ${mod.color}44`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 13, fontWeight: 900, color: mod.color,
                    }}>
                      {mod.num}
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 16 }}>{mod.title}</div>
                      <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>{mod.subtitle}</div>
                    </div>
                    <span style={{ color: mod.color, fontSize: 20, transform: open ? "rotate(90deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }}>›</span>
                  </button>
                  {open && (
                    <div style={{ padding: "0 24px 20px", paddingLeft: 82, background: `${mod.color}06`, borderTop: `1px solid ${BORDER}` }}>
                      <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10, paddingTop: 16 }}>
                        {mod.topics.map((t, j) => (
                          <li key={j} style={{ display: "flex", gap: 10, fontSize: 14, color: "#d1d5db", lineHeight: 1.5 }}>
                            <span style={{ color: mod.color, flexShrink: 0, fontWeight: 700 }}>→</span>
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── WHO IS THIS FOR ──────────────────────────────────────────────────── */}
      <section style={{ padding: "80px 0", background: "rgba(255,255,255,0.015)", borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{
              display: "inline-block", padding: "4px 14px", borderRadius: 99, marginBottom: 12,
              background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.3)",
              fontSize: 12, fontWeight: 700, color: "#a5b4fc", textTransform: "uppercase", letterSpacing: "0.1em",
            }}>
              Who is this for?
            </span>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 900, margin: "0 0 12px", letterSpacing: "-0.02em" }}>
              This Session is Built for You
            </h2>
            <p style={{ fontSize: 16, color: "#6b7280", maxWidth: 480, margin: "0 auto" }}>
              If you're in any of these roles, this session will directly change your career trajectory.
            </p>
          </div>

          <div
            className="demo-who-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}
          >
            {WHO_CARDS.map((c, i) => (
              <div key={i} style={{
                padding: 24, borderRadius: 12,
                background: CARD_BG, border: `1px solid ${BORDER}`,
                display: "flex", flexDirection: "column", gap: 14,
                transition: "border-color 0.2s, transform 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(168,85,247,0.45)"; e.currentTarget.style.transform = "translateY(-3px)" }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.transform = "none" }}
              >
                <div style={{ fontSize: 36 }}>{c.icon}</div>
                <div style={{ fontWeight: 800, fontSize: 16 }}>{c.title}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {c.tags.map(t => (
                    <span key={t} style={{
                      padding: "2px 10px", borderRadius: 99, fontSize: 11,
                      background: "rgba(168,85,247,0.1)", color: "#c084fc",
                      border: "1px solid rgba(168,85,247,0.25)", fontWeight: 600,
                    }}>{t}</span>
                  ))}
                </div>
                <div>
                  <p style={{ fontSize: 12, color: "#ef4444", margin: "0 0 6px", display: "flex", gap: 6 }}>
                    <span>😰</span> {c.pain}
                  </p>
                  <p style={{ fontSize: 12, color: "#4ade80", margin: 0, display: "flex", gap: 6 }}>
                    <span>🚀</span> {c.gain}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────────── */}
      <section style={{ padding: "80px 0", borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 20px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 900, margin: "0 0 10px", letterSpacing: "-0.02em" }}>
              Frequently Asked Questions
            </h2>
            <p style={{ fontSize: 15, color: "#6b7280", margin: 0 }}>Everything you need to know before joining.</p>
          </div>
          <Accordion items={FAQS} />
        </div>
      </section>

      {/* ── BOTTOM CTA ──────────────────────────────────────────────────────── */}
      <section style={{
        padding: "80px 20px",
        textAlign: "center",
        borderTop: `1px solid ${BORDER}`,
        background: "linear-gradient(135deg, rgba(168,85,247,0.06) 0%, rgba(2,6,23,0) 60%)",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Aurora glow */}
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          width: 600, height: 300, zIndex: 0,
          background: "radial-gradient(closest-side, rgba(168,85,247,0.1), transparent 70%)",
          filter: "blur(40px)", pointerEvents: "none",
        }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{ fontSize: 12, color: "#c084fc", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 16 }}>
            🔴 Live Session · {formattedDate}
          </p>
          <h2 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, margin: "0 0 16px", letterSpacing: "-0.02em" }}>
            Don't Miss Your Free Seat
          </h2>
          <p style={{ fontSize: 17, color: "#9ca3af", marginBottom: 32, maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
            {seats} seats left. Live sessions don't repeat — grab yours before it's gone.
          </p>
          <a
            href="#demo-form"
            className="demo-shimmer-btn"
            style={{
              display: "inline-block",
              padding: "16px 36px",
              borderRadius: 10,
              background: "linear-gradient(135deg, #a855f7, #ec4899, #6366f1)",
              color: "#fff",
              fontWeight: 800,
              fontSize: 17,
              textDecoration: "none",
              boxShadow: "0 6px 30px rgba(168,85,247,0.45)",
            }}
          >
            Book My Free Seat →
          </a>

          {/* Scroll to top */}
          <div style={{ marginTop: 48 }}>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              style={{
                background: "none", border: `1px solid ${BORDER}`,
                color: "#4b5563", borderRadius: 8, padding: "8px 16px",
                cursor: "pointer", fontSize: 13, display: "inline-flex", alignItems: "center", gap: 6,
              }}
            >
              ↑ Back to top
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer style={{ borderTop: `1px solid ${BORDER}`, padding: "56px 0 32px", background: "#010812" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40 }}>
            {/* Brand */}
            <div>
              <Logo variant="light" />
              <p style={{ fontSize: 13, color: "#4b5563", marginTop: 14, lineHeight: 1.6, maxWidth: 240 }}>
                Empowering working professionals to transition into high-demand AI engineering roles with live cohorts, 1-on-1 mentorship, and placement support.
              </p>
            </div>

            {/* Programs */}
            <div>
              <h4 style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>
                Programs
              </h4>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {["Data Science (ML + DL)", "GenAI + Agentic AI", "Full Stack AI", "MLOps + LLMOps"].map(p => (
                  <li key={p}><a href="/#pricing" style={{ fontSize: 13, color: "#6b7280", textDecoration: "none" }}>{p}</a></li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>
                Company
              </h4>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { label: "About Us",        href: "/#features"   },
                  { label: "Free Masterclass", href: "/masterclass" },
                  { label: "Curriculum",       href: "/#curriculum" },
                  { label: "Placement Record", href: "/#career-roi" },
                ].map(({ label, href }) => (
                  <li key={label}><a href={href} style={{ fontSize: 13, color: "#6b7280", textDecoration: "none" }}>{label}</a></li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>
                Contact
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <a href="tel:+919893989103" style={{ fontSize: 13, color: "#6b7280", textDecoration: "none" }}>📞 +91 98939 89103</a>
                <a href="mailto:hello@rbyte.ai" style={{ fontSize: 13, color: "#6b7280", textDecoration: "none" }}>✉️ hello@rbyte.ai</a>
                <span style={{ fontSize: 13, color: "#6b7280" }}>📍 Mumbai, India</span>
                <a
                  href="https://wa.me/919893989103?text=Hi%2C+I+want+to+know+more+about+the+free+demo+session"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    marginTop: 8, padding: "8px 14px", borderRadius: 8,
                    background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)",
                    fontSize: 13, color: "#4ade80", textDecoration: "none", fontWeight: 600,
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div style={{
            marginTop: 48, paddingTop: 24, borderTop: `1px solid ${BORDER}`,
            display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 16,
          }}>
            <p style={{ fontSize: 12, color: "#374151", margin: 0 }}>© 2026 Rbyte.ai. All rights reserved.</p>
            <div style={{ display: "flex", gap: 20 }}>
              {[
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms",          href: "/terms"   },
                { label: "Refund Policy",  href: "/refund"  },
              ].map(({ label, href }) => (
                <a key={label} href={href} style={{ fontSize: 12, color: "#374151", textDecoration: "none" }}>{label}</a>
              ))}
            </div>
            <p style={{ fontSize: 12, color: "#374151", margin: 0 }}>Made with ❤️ for India's AI Engineers</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
