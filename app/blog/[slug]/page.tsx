import type { Metadata } from "next"
import { getBlogPost } from "@/lib/api"
import BlogPostClient from "@/components/blog-post-client"

interface Props {
  params: { slug: string }
}

// ── Dynamic OG / Twitter metadata ────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const res  = await getBlogPost(params.slug)
  const post = res.data?.post

  if (!post) {
    return {
      title: "Article Not Found | Rbyte.ai",
      description: "The article you are looking for could not be found.",
    }
  }

  // Strip markdown characters for clean description
  const description = (post.excerpt || post.content.replace(/[#*`>_~\[\]()]/g, "").slice(0, 160)).trim()

  const images = post.cover_image
    ? [{ url: post.cover_image, width: 1200, height: 630, alt: post.title }]
    : []

  return {
    title: `${post.title} | Rbyte.ai`,
    description,
    openGraph: {
      title: post.title,
      description,
      siteName: "Rbyte.ai",
      type: "article",
      publishedTime: post.published_at ?? undefined,
      authors: [post.author],
      images,
    },
    twitter: {
      card: post.cover_image ? "summary_large_image" : "summary",
      title: post.title,
      description,
      images: post.cover_image ? [post.cover_image] : [],
    },
  }
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function BlogPostPage({ params }: Props) {
  return <BlogPostClient slug={params.slug} />
}
