import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ToastContainer } from "@/components/ui/toast"
import { Inter } from "next/font/google"
import PerformanceOptimizer from "@/components/performance-optimizer"

const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Optimize font loading
})

export const metadata: Metadata = {
  title: "RByte.ai - Data Science, GenAI & Agentic AI Courses | MLOps Training",
  description:
    "Become job-ready in 2026 with focused AI tracks: Data Science (ML/DL), GenAI + Agentic AI, Full Stack AI from basics to advanced, and MLOps. Live weekend cohorts and real-world projects.",
  keywords:
    "data science course, machine learning course, deep learning training, genai course, agentic ai course, llm course, mlops training, ai engineering, live weekend program, ai projects, ai career transition",
  generator: "Next.js",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  openGraph: {
    title: "RByte.ai - Data Science, GenAI & Agentic AI Courses | MLOps Training",
    description:
      "Focused AI tracks for 2026: Data Science (ML/DL), GenAI + Agentic AI, Full Stack AI, and MLOps with live cohorts and real projects.",
    url: "https://rbyte.ai",
    siteName: "RByte.ai",
    images: [
      {
        url: "/rbyte-ai-hero.png",
        width: 1200,
        height: 630,
        alt: "RByte.ai AI Engineering Program",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RByte.ai - Data Science, GenAI & Agentic AI Courses | MLOps Training",
    description:
      "Focused AI tracks for 2026: Data Science (ML/DL), GenAI + Agentic AI, Full Stack AI, and MLOps with live cohorts and real projects.",
    images: ["/rbyte-ai-hero.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preload critical assets */}
        <link rel="preload" href="/rbyte-ai-hero.png" as="image" />
        <link rel="preload" href="/neural-network-purple-blue.png" as="image" />

        {/* Add preconnect for external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        <PerformanceOptimizer>
          {children}
          <ToastContainer />
        </PerformanceOptimizer>
      </body>
    </html>
  )
}
