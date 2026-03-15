"use client"

import { useState } from "react"

const SERVICES = [
  "AI Consulting & Strategy",
  "Custom AI Application Development",
  "System Integration / Workflow Automation",
  "AI Training & Team Upskilling",
  "Other — Let's chat",
]

const CALENDLY = "https://calendly.com/rbyteai-info/rbyte-ai-ai-usecase-discussion"
const WA_NUMBER = "919893989103"

const inputStyle = {
  padding: "12px 16px",
  borderRadius: 8,
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.12)",
  color: "#f9fafb",
  fontSize: 15,
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
  fontFamily: "inherit",
  transition: "border-color 0.2s",
}

export default function ServiceLeadForm() {
  const [form, setForm] = useState({ name: "", contact: "", service: "", message: "" })
  const [sent, setSent] = useState(false)

  const change = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    const text = encodeURIComponent(
      `Hi Rbyte.ai! 👋\n\nI'm interested in your AI Services.\n\n*Name:* ${form.name}\n*Service needed:* ${form.service || "Not specified"}\n*Contact / Email:* ${form.contact}\n\n*Project details:*\n${form.message || "Will share on call"}`
    )
    window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, "_blank")
    setSent(true)
  }

  return (
    <section style={{ padding: "80px 0", borderTop: "1px solid rgba(255,255,255,0.07)", background: "linear-gradient(160deg,rgba(168,85,247,0.07) 0%,rgba(2,6,23,0) 55%)" }}>
      <style>{`
        .slf-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
        .slf-full  { grid-column:1 / -1; }
        .slf-input:focus { border-color:rgba(168,85,247,0.6) !important; }
        .slf-input::placeholder { color:#4b5563; }
        .slf-btn-primary { transition:opacity 0.2s, transform 0.15s; }
        .slf-btn-primary:hover { opacity:0.88; transform:translateY(-1px); }
        .slf-btn-secondary { transition:border-color 0.2s, color 0.2s; }
        .slf-btn-secondary:hover { border-color:rgba(168,85,247,0.5) !important; color:#c084fc !important; }
        @media (max-width:640px) {
          .slf-grid { grid-template-columns:1fr !important; }
          .slf-full  { grid-column:1 !important; }
          .slf-actions { flex-direction:column !important; }
          .slf-actions a, .slf-actions button { width:100%; justify-content:center; text-align:center; }
          .slf-privacy { display:none !important; }
        }
      `}</style>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 20px" }}>

        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <span style={{ display: "inline-block", padding: "5px 16px", borderRadius: 99, marginBottom: 16, background: "rgba(168,85,247,0.12)", border: "1px solid rgba(168,85,247,0.3)", fontSize: 12, fontWeight: 700, color: "#c084fc", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Quick Enquiry
          </span>
          <h2 style={{ fontSize: "clamp(22px,4vw,36px)", fontWeight: 900, margin: "0 0 12px", letterSpacing: "-0.025em" }}>
            Tell us about your project
          </h2>
          <p style={{ fontSize: 15, color: "#6b7280", maxWidth: 460, margin: "0 auto" }}>
            Fill in 4 fields. We reply on WhatsApp within a few hours — no sales pitch, just answers.
          </p>
        </div>

        {/* ── Form / Success ── */}
        {!sent ? (
          <form onSubmit={submit}
            style={{ borderRadius: 20, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.08)", padding: "32px 32px 28px" }}>
            <div className="slf-grid">

              {/* Name */}
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                <label style={{ fontSize: 13, fontWeight: 700, color: "#9ca3af" }}>Your Name *</label>
                <input
                  className="slf-input"
                  name="name" required value={form.name} onChange={change}
                  placeholder="e.g. Priya Mehta"
                  style={inputStyle}
                />
              </div>

              {/* Contact */}
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                <label style={{ fontSize: 13, fontWeight: 700, color: "#9ca3af" }}>WhatsApp / Email *</label>
                <input
                  className="slf-input"
                  name="contact" required value={form.contact} onChange={change}
                  placeholder="+1 555-xxx or you@company.com"
                  style={inputStyle}
                />
              </div>

              {/* Service dropdown */}
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                <label style={{ fontSize: 13, fontWeight: 700, color: "#9ca3af" }}>Service you need</label>
                <select
                  className="slf-input"
                  name="service" value={form.service} onChange={change}
                  style={{ ...inputStyle, cursor: "pointer" }}
                >
                  <option value="">Select a service…</option>
                  {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Org size — social proof / segmentation */}
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                <label style={{ fontSize: 13, fontWeight: 700, color: "#9ca3af" }}>Company / Team size</label>
                <select
                  className="slf-input"
                  name="size" onChange={(e) => setForm(p => ({ ...p, size: e.target.value }))}
                  style={{ ...inputStyle, cursor: "pointer" }}
                >
                  <option value="">Select…</option>
                  <option>Solo / Freelancer</option>
                  <option>2–10 people</option>
                  <option>11–50 people</option>
                  <option>51–200 people</option>
                  <option>200+ people</option>
                </select>
              </div>

              {/* Message — full width */}
              <div className="slf-full" style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                <label style={{ fontSize: 13, fontWeight: 700, color: "#9ca3af" }}>Briefly describe what you want to build</label>
                <textarea
                  className="slf-input"
                  name="message" rows={4} value={form.message} onChange={change}
                  placeholder="e.g. We run a dental clinic and want an AI assistant to answer patient FAQs and book appointments via our website…"
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </div>

              {/* CTA row */}
              <div className="slf-full slf-actions"
                style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", paddingTop: 8 }}>
                <button
                  type="submit"
                  className="slf-btn-primary"
                  style={{ padding: "13px 28px", borderRadius: 10, background: "linear-gradient(135deg,#a855f7,#ec4899,#6366f1)", color: "#fff", fontWeight: 800, fontSize: 15, border: "none", cursor: "pointer", boxShadow: "0 4px 20px rgba(168,85,247,0.35)", display: "inline-flex", alignItems: "center", gap: 8 }}
                >
                  💬 Send Enquiry on WhatsApp →
                </button>
                <a
                  href={CALENDLY} target="_blank" rel="noopener noreferrer"
                  className="slf-btn-secondary"
                  style={{ padding: "13px 24px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.15)", color: "#d1d5db", fontWeight: 700, fontSize: 14, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}
                >
                  📅 Book a Call Instead
                </a>
                <span className="slf-privacy" style={{ fontSize: 12, color: "#4b5563", marginLeft: "auto" }}>
                  🔒 We never share your details
                </span>
              </div>

            </div>
          </form>
        ) : (
          /* Success */
          <div style={{ textAlign: "center", padding: "56px 24px", borderRadius: 20, background: "rgba(34,197,94,0.04)", border: "1px solid rgba(34,197,94,0.25)" }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>🎉</div>
            <h3 style={{ fontSize: 26, fontWeight: 900, margin: "0 0 10px" }}>WhatsApp opened!</h3>
            <p style={{ fontSize: 15, color: "#6b7280", maxWidth: 400, margin: "0 auto 28px" }}>
              Just hit <strong style={{ color: "#4ade80" }}>Send</strong> in WhatsApp and we'll reply within a few hours.
              Prefer a scheduled video call?
            </p>
            <a
              href={CALENDLY} target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px", borderRadius: 10, background: "linear-gradient(135deg,#a855f7,#6366f1)", color: "#fff", fontWeight: 800, fontSize: 15, textDecoration: "none" }}
            >
              📅 Book a Discovery Call
            </a>
          </div>
        )}

        {/* ── Trust micro-copy ── */}
        <div style={{ display: "flex", justifyContent: "center", gap: 28, marginTop: 28, flexWrap: "wrap" }}>
          {["✅ No commitment required", "⚡ Reply within a few hours", "🌍 We work globally"].map(t => (
            <span key={t} style={{ fontSize: 13, color: "#6b7280" }}>{t}</span>
          ))}
        </div>

      </div>
    </section>
  )
}
