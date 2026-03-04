"use client"

import { useState } from "react"
import Image from "next/image"

// ─── Types ────────────────────────────────────────────────────────────────────

interface WaMessage {
  from: "learner" | "rbyte"
  text: string
  time: string
  read?: boolean
}

interface WaConversation {
  id: string
  name: string
  role: string          // e.g. "Data Analyst → AI Engineer"
  avatar: string        // emoji fallback
  color: string         // avatar bg color
  messages: WaMessage[]
  /** Optional: path to an actual WhatsApp screenshot image */
  screenshotSrc?: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const CONVERSATIONS: WaConversation[] = [
  {
    id: "priya",
    name: "Priya S.",
    role: "Data Analyst → AI Engineer",
    avatar: "👩🏽‍💻",
    color: "bg-purple-100",
    messages: [
      {
        from: "learner",
        text: "Rahul bhai, got my offer letter today! ₹22 LPA at a fintech startup in Pune 🎉",
        time: "11:42 AM",
      },
      {
        from: "rbyte",
        text: "Congratulations Priya! Which role?",
        time: "11:44 AM",
        read: true,
      },
      {
        from: "learner",
        text: "ML Engineer. They specifically asked about my fraud detection project from the course. The SHAP explainability part really impressed them 🙌",
        time: "11:45 AM",
      },
      {
        from: "learner",
        text: "Before Rbyte I was stuck at ₹8 LPA doing dashboards. Thank you for this 🙏",
        time: "11:46 AM",
      },
    ],
  },
  {
    id: "arjun",
    name: "Arjun M.",
    role: "Software Dev → GenAI Engineer",
    avatar: "👨🏾‍💻",
    color: "bg-blue-100",
    messages: [
      {
        from: "learner",
        text: "Sir, my LangGraph agent project literally blew the interviewers away. They said it looked like production code from their own team 😭",
        time: "3:12 PM",
      },
      {
        from: "rbyte",
        text: "That's exactly what we aim for! How was the interview?",
        time: "3:14 PM",
        read: true,
      },
      {
        from: "learner",
        text: "Got through all 3 rounds. Joining Razorpay's AI Platform team next month. CTC: ₹28 LPA 🔥",
        time: "3:15 PM",
      },
      {
        from: "learner",
        text: "Best investment I've made in my career. 100% worth it",
        time: "3:16 PM",
      },
    ],
  },
  {
    id: "neha",
    name: "Neha K.",
    role: "MBA → Product AI Manager",
    avatar: "👩🏻‍💼",
    color: "bg-emerald-100",
    messages: [
      {
        from: "learner",
        text: "Finished the MLOps track last week. Deployed my first real pipeline on AWS SageMaker! Never thought I could do this 6 months ago",
        time: "9:23 AM",
      },
      {
        from: "learner",
        text: "The live weekend sessions were perfect — I could keep my job while learning. No other program offered that flexibility",
        time: "9:24 AM",
      },
      {
        from: "rbyte",
        text: "Amazing progress Neha! What's next?",
        time: "9:26 AM",
        read: true,
      },
      {
        from: "learner",
        text: "Got promoted internally to AI Product Manager. My team now reports to me on AI infra 😄",
        time: "9:28 AM",
      },
    ],
  },
  {
    id: "rohan",
    name: "Rohan P.",
    role: "Fresher → Data Scientist",
    avatar: "👨🏽‍🎓",
    color: "bg-amber-100",
    messages: [
      {
        from: "learner",
        text: "Bhaiya, I was a fresher with no experience. Your course gave me a portfolio that actually competed with people who had 2-3 years exp",
        time: "7:05 PM",
      },
      {
        from: "learner",
        text: "Got 4 interview calls just from LinkedIn after pushing my projects. Accepted one at a Series B startup — ₹12 LPA as a fresher!",
        time: "7:06 PM",
      },
      {
        from: "rbyte",
        text: "That's the power of real projects 💪 Congrats Rohan!",
        time: "7:08 PM",
        read: true,
      },
      {
        from: "learner",
        text: "The mentor code reviews were the best part. Fixed so many bad habits before they became permanent 🙏",
        time: "7:09 PM",
      },
    ],
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function WaAvatar({ conversation }: { conversation: WaConversation }) {
  return (
    <div
      className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-xl ${conversation.color}`}
    >
      {conversation.avatar}
    </div>
  )
}

function MessageBubble({ msg }: { msg: WaMessage }) {
  // "rbyte" = Rahul's side → right, green, double tick
  // "learner" = learner's message → left, white, no tick
  const isMe = msg.from === "rbyte"

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`relative max-w-[78%] rounded-2xl px-3 py-2 text-sm shadow-sm ${
          isMe
            ? "rounded-tr-sm bg-[#DCF8C6] text-slate-800"
            : "rounded-tl-sm bg-white text-slate-800"
        }`}
      >
        <p className="leading-snug">{msg.text}</p>
        <div
          className={`mt-1 flex items-center gap-1 ${isMe ? "justify-end" : "justify-start"}`}
        >
          <span className="text-[10px] text-slate-400">{msg.time}</span>
          {isMe && msg.read && (
            <span className="text-[10px] text-blue-400">✓✓</span>
          )}
        </div>
      </div>
    </div>
  )
}

function WaPhoneFrame({ conversation }: { conversation: WaConversation }) {
  // If there's a real screenshot, show it inside the phone frame
  if (conversation.screenshotSrc) {
    return (
      <div className="relative mx-auto w-[260px] overflow-hidden rounded-[28px] border-[6px] border-slate-800 shadow-2xl">
        <Image
          src={conversation.screenshotSrc}
          alt={`${conversation.name} WhatsApp feedback`}
          width={260}
          height={480}
          className="w-full object-cover"
        />
      </div>
    )
  }

  // Otherwise render a realistic WhatsApp chat UI
  return (
    <div className="relative mx-auto w-[260px] overflow-hidden rounded-[28px] border-[6px] border-slate-800 shadow-2xl">
      {/* Status bar */}
      <div className="flex items-center justify-between bg-[#075E54] px-3 py-1 text-[9px] text-white">
        <span>9:41</span>
        <div className="flex items-center gap-1">
          <span>▲▲</span>
          <span>WiFi</span>
          <span>🔋</span>
        </div>
      </div>

      {/* WhatsApp header */}
      <div className="flex items-center gap-2 bg-[#075E54] px-3 pb-2">
        <span className="text-white text-lg">←</span>
        <WaAvatar conversation={conversation} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white truncate">{conversation.name}</p>
          <p className="text-[10px] text-green-300">online</p>
        </div>
        <div className="flex gap-2 text-white text-sm">
          <span>📹</span>
          <span>📞</span>
          <span>⋮</span>
        </div>
      </div>

      {/* Chat body */}
      <div
        className="flex flex-col gap-2 bg-[#ECE5DD] px-3 py-3"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3C/svg%3E\")",
          minHeight: "300px",
        }}
      >
        {/* Date chip */}
        <div className="flex justify-center">
          <span className="rounded-full bg-white/70 px-3 py-0.5 text-[10px] text-slate-500 shadow-sm">
            Today
          </span>
        </div>
        {conversation.messages.map((msg, i) => (
          <MessageBubble key={i} msg={msg} />
        ))}
      </div>

      {/* Input bar */}
      <div className="flex items-center gap-2 bg-[#F0F0F0] px-2 py-2">
        <div className="flex flex-1 items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[10px] text-slate-400 shadow-sm">
          <span>😊</span>
          <span className="flex-1">Type a message</span>
          <span>📎</span>
        </div>
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white text-sm shadow">
          🎤
        </div>
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function WhatsAppTestimonials() {
  const [active, setActive] = useState(0)

  return (
    <section className="w-full py-12 md:py-24 bg-white">
      <div className="container px-4 md:px-6">

        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 rounded-lg bg-green-50 border border-green-200 px-3 py-1 text-sm text-green-700 font-medium">
            {/* WhatsApp icon */}
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-green-500" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Direct from WhatsApp
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            What Our Learners Are Saying
          </h2>
          <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
            Real messages from real students — unedited, directly from WhatsApp conversations.
          </p>
        </div>

        {/* Layout: selector + phone */}
        <div className="flex flex-col lg:flex-row items-start gap-10 max-w-5xl mx-auto">

          {/* Left: name cards */}
          <div className="flex flex-row flex-wrap lg:flex-col gap-3 lg:w-72 w-full lg:flex-shrink-0">
            {CONVERSATIONS.map((conv, i) => (
              <button
                key={conv.id}
                type="button"
                onClick={() => setActive(i)}
                className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-all ${
                  active === i
                    ? "border-green-500 bg-green-50 shadow-sm"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                }`}
              >
                <div
                  className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-xl ${conv.color}`}
                >
                  {conv.avatar}
                </div>
                <div className="min-w-0">
                  <p className={`text-sm font-semibold truncate ${active === i ? "text-green-700" : "text-slate-800"}`}>
                    {conv.name}
                  </p>
                  <p className="text-xs text-slate-500 truncate">{conv.role}</p>
                </div>
                {active === i && (
                  <div className="ml-auto h-2 w-2 flex-shrink-0 rounded-full bg-green-500" />
                )}
              </button>
            ))}

            {/* Upload your screenshots note */}
            <div className="hidden lg:flex flex-col gap-1 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-center mt-2">
              <p className="text-xs font-medium text-slate-600">Have your own screenshots?</p>
              <p className="text-xs text-slate-400">Add them to <code className="bg-slate-100 px-1 rounded">/public/testimonials/</code> to display real images</p>
            </div>
          </div>

          {/* Right: phone mockup */}
          <div className="flex-1 flex justify-center">
            <WaPhoneFrame conversation={CONVERSATIONS[active]} />
          </div>
        </div>

        {/* Bottom stats */}
        <div className="mt-14 flex flex-wrap justify-center gap-8 text-center">
          {[
            { value: "200+", label: "Learners placed" },
            { value: "₹22 LPA", label: "Avg. salary after course" },
            { value: "4.9★", label: "Learner rating" },
            { value: "94%", label: "Placement rate" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-3xl font-bold text-slate-900">{stat.value}</span>
              <span className="text-sm text-muted-foreground mt-0.5">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
