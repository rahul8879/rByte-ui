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
const EMAIL    = "info@rbyteai.com"
const WA       = "https://wa.me/919893989103"

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
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" })
  const [sent, setSent] = useState(false)

  const change = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  /* Build mailto: link — works for all users, especially US */
  const buildMailto = () => {
    const subject = encodeURIComponent(`AI Project Enquiry — ${form.service || "General"}`)
    const body = encodeURIComponent(
      `Hi Dipanjali,\n\nI'm interested in working with Rbyte.ai.\n\nName: ${form.name}\nEmail: ${form.email}\nService: ${form.service || "Not specified"}\n\nProject details:\n${form.message || "Will discuss on call"}\n\nLooking forward to hearing from you!`
    )
    return `mailto:${EMAIL}?subject=${subject}&body=${body}`
  }

  const submit = (e) => {
    e.preventDefault()
    window.location.href = buildMailto()
    setSent(true)
  }

  return (
    <section style={{ padding: "80px 0", borderTop: "1px solid rgba(255,255,255,0.07)", background: "linear-gradient(160deg,rgba(168,85,247,0.07) 0%,rgba(2,6,23,0) 55%)" }}>
      <style>{`
        .slf-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
        .slf-full  { grid-column:1 / -1; }
        .slf-input:focus { border-color:rgba(168,85,247,0.6) !important; }
        .slf-input::placeholder { color:#4b5563; }
        .slf-primary-cta { transition:opacity 0.2s, transform 0.15s; display:inline-flex; align-items:center; justify-content:center; gap:8px; padding:16px 36px; border-radius:12px; font-weight:900; font-size:17px; text-decoration:none; color:#fff; box-shadow:0 8px 36px rgba(168,85,247,0.45); }
        .slf-primary-cta:hover { opacity:0.9; transform:translateY(-2px); }
        .slf-submit-btn { transition:opacity 0.2s, transform 0.15s; }
        .slf-submit-btn:hover { opacity:0.88; transform:translateY(-1px); }
        @media (max-width:640px) {
          .slf-grid { grid-template-columns:1fr !important; }
          .slf-full  { grid-column:1 !important; }
          .slf-actions { flex-direction:column !important; }
          .slf-actions a, .slf-actions button { width:100%; justify-content:center; text-align:center; }
          .slf-primary-cta { width:100%; padding:15px 20px !important; font-size:16px !important; }
        }
      `}</style>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 20px" }}>

        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <span style={{ display: "inline-block", padding: "5px 16px", borderRadius: 99, marginBottom: 16, background: "rgba(168,85,247,0.12)", border: "1px solid rgba(168,85,247,0.3)", fontSize: 12, fontWeight: 700, color: "#c084fc", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Get Started
          </span>
          <h2 style={{ fontSize: "clamp(22px,4vw,36px)", fontWeight: 900, margin: "0 0 12px", letterSpacing: "-0.025em" }}>
            Ready to add AI to your business?
          </h2>
          <p style={{ fontSize: 15, color: "#6b7280", maxWidth: 420, margin: "0 auto" }}>
            First call is free. 30 minutes. No pitch, just honest answers.
          </p>
        </div>

        {/* ── PRIMARY CTA — Calendly ── */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <a
            href={CALENDLY}
            target="_blank" rel="noopener noreferrer"
            className="slf-primary-cta"
            style={{ background: "linear-gradient(135deg,#a855f7,#ec4899,#6366f1)" }}
          >
            📅 Book a Free Discovery Call →
          </a>
          <p style={{ fontSize: 13, color: "#4b5563", marginTop: 12 }}>
            ✓ Free · ✓ 30 min · ✓ No commitment · ✓ With Dipanjali directly
          </p>
        </div>

        {/* ── Divider ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 36 }}>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
          <span style={{ fontSize: 13, color: "#4b5563", whiteSpace: "nowrap" }}>— or send your project details by email —</span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
        </div>

        {/* ── Email form ── */}
        {!sent ? (
          <form onSubmit={submit}
            style={{ borderRadius: 20, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.08)", padding: "28px 28px 24px" }}>
            <div className="slf-grid">

              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                <label style={{ fontSize: 13, fontWeight: 700, color: "#9ca3af" }}>Your Name *</label>
                <input className="slf-input" name="name" required value={form.name} onChange={change}
                  placeholder="e.g. Sarah Johnson" style={inputStyle} />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                <label style={{ fontSize: 13, fontWeight: 700, color: "#9ca3af" }}>Your Email *</label>
                <input className="slf-input" name="email" type="email" required value={form.email} onChange={change}
                  placeholder="sarah@yourcompany.com" style={inputStyle} />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                <label style={{ fontSize: 13, fontWeight: 700, color: "#9ca3af" }}>Service you need</label>
                <select className="slf-input" name="service" value={form.service} onChange={change}
                  style={{ ...inputStyle, cursor: "pointer" }}>
                  <option value="">Select a service…</option>
                  {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                <label style={{ fontSize: 13, fontWeight: 700, color: "#9ca3af" }}>Company / Team size</label>
                <select className="slf-input" name="size" onChange={change}
                  style={{ ...inputStyle, cursor: "pointer" }}>
                  <option value="">Select…</option>
                  <option>Solo / Freelancer</option>
                  <option>2–10 people</option>
                  <option>11–50 people</option>
                  <option>51–200 people</option>
                  <option>200+ people</option>
                </select>
              </div>

              <div className="slf-full" style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                <label style={{ fontSize: 13, fontWeight: 700, color: "#9ca3af" }}>Briefly describe what you want to build</label>
                <textarea className="slf-input" name="message" rows={4} value={form.message} onChange={change}
                  placeholder="e.g. We run a dental clinic and want an AI assistant to answer patient FAQs and book appointments via our website…"
                  style={{ ...inputStyle, resize: "vertical" }} />
              </div>

              <div className="slf-full slf-actions"
                style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", paddingTop: 6 }}>
                <button type="submit" className="slf-submit-btn"
                  style={{ padding: "13px 28px", borderRadius: 10, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)", color: "#f9fafb", fontWeight: 800, fontSize: 15, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}>
                  ✉️ Send Details by Email →
                </button>
                <span style={{ fontSize: 13, color: "#4b5563" }}>
                  Prefer WhatsApp?{" "}
                  <a href={`${WA}?text=${encodeURIComponent("Hi Dipanjali! I'm interested in AI services for my business.")}`}
                    target="_blank" rel="noopener noreferrer"
                    style={{ color: "#6b7280", textDecoration: "underline" }}>
                    Chat here →
                  </a>
                </span>
                <span style={{ fontSize: 12, color: "#374151", marginLeft: "auto" }}>
                  🔒 We never share your details
                </span>
              </div>

            </div>
          </form>
        ) : (
          <div style={{ textAlign: "center", padding: "48px 24px", borderRadius: 20, background: "rgba(34,197,94,0.04)", border: "1px solid rgba(34,197,94,0.25)" }}>
            <div style={{ fontSize: 48, marginBottom: 14 }}>📬</div>
            <h3 style={{ fontSize: 24, fontWeight: 900, margin: "0 0 10px" }}>Email client opened!</h3>
            <p style={{ fontSize: 15, color: "#6b7280", maxWidth: 400, margin: "0 auto 24px" }}>
              Hit <strong style={{ color: "#f9fafb" }}>Send</strong> in your email app and Dipanjali will reply within 24 hours.
              Want a faster answer?
            </p>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px", borderRadius: 10, background: "linear-gradient(135deg,#a855f7,#6366f1)", color: "#fff", fontWeight: 800, fontSize: 15, textDecoration: "none" }}>
              📅 Book a Discovery Call Instead
            </a>
          </div>
        )}

        {/* Trust strip */}
        <div style={{ display: "flex", justifyContent: "center", gap: 28, marginTop: 24, flexWrap: "wrap" }}>
          {["✅ No commitment required", "⚡ Reply within 24 hours", "🌍 We work globally"].map(t => (
            <span key={t} style={{ fontSize: 13, color: "#4b5563" }}>{t}</span>
          ))}
        </div>

      </div>
    </section>
  )
}
