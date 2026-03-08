import type { Metadata } from "next"

// ── Static metadata for the blog section ─────────────────────────────────────
// Article pages override this with dynamic generateMetadata in [slug]/page.tsx

export const metadata: Metadata = {
  title: "Blog | Rbyte.ai – AI Engineering for IT Professionals",
  description: "AI engineering insights, tutorials, and industry news for Indian IT professionals ready to level up.",
  openGraph: {
    title: "Rbyte.ai Editorial – AI Engineering Blog",
    description: "AI engineering insights, tutorials, and industry news for Indian IT professionals ready to level up.",
    siteName: "Rbyte.ai",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Rbyte.ai Editorial – AI Engineering Blog",
    description: "AI engineering insights, tutorials, and industry news for Indian IT professionals ready to level up.",
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
