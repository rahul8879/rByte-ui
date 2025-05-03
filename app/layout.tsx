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
  title: "RByte.ai - AI Engineering Training & Product Development",
  description:
    "Premier AI Engineering training program for working professionals. Learn to build cutting-edge AI products and transform your career in just 6 months.",
  keywords:
    "AI engineering, machine learning training, AI product development, career transition, weekend program, working professionals",
  generator: "Next.js",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  openGraph: {
    title: "RByte.ai - AI Engineering Training & Product Development",
    description: "Transform your career with our comprehensive AI Engineering program for working professionals",
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
    title: "RByte.ai - AI Engineering Training & Product Development",
    description: "Transform your career with our comprehensive AI Engineering program for working professionals",
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
