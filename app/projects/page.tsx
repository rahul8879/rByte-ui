"use client"

import Link from "next/link"
import Logo from "@/components/logo"
import ProjectsSection from "@/components/projects-section"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { ConsistentButton } from "@/components/ui/consistent-button"

export default function ProjectsPage() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden w-full" style={{ background: "#020617" }}>

      {/* Minimal Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/60 bg-slate-950/90 backdrop-blur">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <Logo size="sm" variant="light" />
          </Link>
          <Link href="/#pricing">
            <ConsistentButton size="sm" variant="gradient">
              Enroll Now
            </ConsistentButton>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Page Hero */}
        <section className="w-full pt-14 pb-2 relative overflow-hidden" style={{ background: "#020617" }}>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(99,102,241,0.12), transparent 65%)" }}
          />
          <div className="container px-4 md:px-6 relative text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-800/70 border border-slate-700/50 px-4 py-1.5 text-sm text-slate-300 mb-4">
              <span className="w-2 h-2 rounded-full bg-indigo-400 inline-block" />
              10 projects · 4 tracks · All deployed live
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-3">
              What You'll{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #a855f7, #ec4899, #6366f1)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Build & Deploy
              </span>
            </h1>
            <p className="text-slate-400 text-base max-w-xl mx-auto">
              Every project is based on a real system running inside Indian and global companies today —
              not toy examples. You graduate with a GitHub portfolio that speaks for itself in interviews.
            </p>
          </div>
        </section>

        {/* Full Projects Section */}
        <ProjectsSection />

        {/* Bottom CTA */}
        <section
          className="w-full py-16 md:py-20 relative overflow-hidden"
          style={{ background: "#020617" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(168,85,247,0.1), transparent 65%)" }}
          />
          <div className="container px-4 md:px-6 relative text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-black text-white">
              Ready to build your AI portfolio?
            </h2>
            <p className="text-slate-400 text-base max-w-lg mx-auto">
              Join the Founder Batch — Starts May 5, 2026. Only 20 seats.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/#pricing">
                <ConsistentButton
                  size="lg"
                  variant="gradient"
                  className="btn-shimmer"
                  rightIcon={<ArrowRight className="ml-1 h-4 w-4" />}
                >
                  See Founder Pricing
                </ConsistentButton>
              </Link>
              <Link href="/demo">
                <ConsistentButton
                  size="lg"
                  variant="outline"
                  className="text-white border-white/30 hover:bg-white/10"
                >
                  Attend Free Live Session
                </ConsistentButton>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Minimal Footer */}
      <footer className="w-full py-6 border-t border-slate-800 bg-slate-950">
        <div className="container px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">© 2026 Rbyte.ai · All rights reserved</p>
          <div className="flex gap-4 text-xs text-slate-500">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms</Link>
            <Link href="/refund" className="hover:text-slate-300 transition-colors">Refund Policy</Link>
          </div>
        </div>
      </footer>

    </div>
  )
}
