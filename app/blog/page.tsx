"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Logo from "@/components/logo"
import { getBlogPosts, getFeaturedPost, BlogPost } from "@/lib/api"
import { readingTime } from "@/lib/markdown"

// ── Constants ────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { value: "",             label: "All"          },
  { value: "news",         label: "AI News"      },
  { value: "tutorial",     label: "Tutorials"    },
  { value: "announcement", label: "Announcements"},
]

const CAT: Record<string, { bg: string; text: string; label: string }> = {
  news:         { bg: "#1d4ed8", text: "#fff",    label: "AI News"       },
  tutorial:     { bg: "#7c3aed", text: "#fff",    label: "Tutorial"      },
  announcement: { bg: "#059669", text: "#fff",    label: "Announcement"  },
}
function catStyle(cat: string) {
  return CAT[cat] ?? { bg: "#334155", text: "#fff", label: cat }
}

function fmt(iso: string | null) {
  if (!iso) return ""
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

// ── Placeholder image ─────────────────────────────────────────────────────────

function Placeholder({ category, className = "" }: { category: string; className?: string }) {
  const gradients: Record<string, string> = {
    news:         "from-blue-900/60 via-slate-900 to-slate-950",
    tutorial:     "from-purple-900/60 via-slate-900 to-slate-950",
    announcement: "from-emerald-900/60 via-slate-900 to-slate-950",
  }
  const icons: Record<string, string> = {
    news: "📰", tutorial: "🎓", announcement: "📢",
  }
  return (
    <div className={`bg-gradient-to-br ${gradients[category] ?? "from-slate-800 to-slate-950"} flex items-center justify-center ${className}`}>
      <span style={{ fontSize: 48, opacity: 0.35 }}>{icons[category] ?? "📝"}</span>
    </div>
  )
}

// ── Skeleton ──────────────────────────────────────────────────────────────────

function SkeletonCard({ tall = false }: { tall?: boolean }) {
  return (
    <div className="rounded-2xl overflow-hidden bg-slate-900 animate-pulse">
      <div className={`bg-slate-800 w-full ${tall ? "h-64" : "h-44"}`} />
      <div className="p-4 space-y-3">
        <div className="h-3 w-20 rounded bg-slate-800" />
        <div className="h-5 w-full rounded bg-slate-800" />
        <div className="h-5 w-3/4 rounded bg-slate-800" />
        <div className="h-3 w-full rounded bg-slate-800" />
        <div className="h-3 w-2/3 rounded bg-slate-800" />
      </div>
    </div>
  )
}

// ── Hero Post (featured, full-width) ─────────────────────────────────────────

function HeroPost({ post }: { post: BlogPost }) {
  const c = catStyle(post.category)
  const rt = readingTime(post.content)
  return (
    <Link href={`/blog/${post.slug}`} className="group block relative rounded-3xl overflow-hidden border border-white/[0.06] shadow-2xl mb-10" style={{ minHeight: 480 }}>
      {/* Full-bleed image */}
      {post.cover_image
        ? <img src={post.cover_image} alt={post.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        : <Placeholder category={post.category} className="absolute inset-0 w-full h-full" />
      }

      {/* Dark gradient overlay */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(to top, rgba(2,6,23,0.98) 0%, rgba(2,6,23,0.7) 45%, rgba(2,6,23,0.1) 100%)"
      }} />

      {/* Featured pill top-left */}
      <div className="absolute top-5 left-5">
        <span className="text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full text-white"
          style={{ background: "linear-gradient(90deg,#a855f7,#ec4899)" }}>★ Featured</span>
      </div>

      {/* Content bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-7 md:p-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-md text-white" style={{ background: c.bg }}>
            {c.label}
          </span>
          <span className="text-slate-400 text-xs">{rt} min read</span>
          <span className="text-slate-600 text-xs">·</span>
          <span className="text-slate-400 text-xs">{fmt(post.published_at)}</span>
        </div>
        <h2 className="text-2xl md:text-4xl font-black text-white leading-tight mb-3 max-w-3xl group-hover:text-purple-100 transition-colors" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.8)" }}>
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl line-clamp-2 mb-4">
            {post.excerpt}
          </p>
        )}
        <div className="flex items-center justify-between max-w-2xl">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#a855f7,#6366f1)" }}>
              {post.author.charAt(0)}
            </div>
            <span className="text-slate-300 text-sm font-medium">{post.author}</span>
          </div>
          <span className="text-purple-400 font-bold text-sm group-hover:translate-x-1 transition-transform inline-block">
            Read article →
          </span>
        </div>
      </div>
    </Link>
  )
}

// ── Medium Card (horizontal, for secondary row) ───────────────────────────────

function MediumCard({ post }: { post: BlogPost }) {
  const c  = catStyle(post.category)
  const rt = readingTime(post.content)
  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col rounded-2xl overflow-hidden border border-white/[0.06] bg-slate-900/60 hover:border-purple-500/35 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(168,85,247,0.12)]">
      {/* Image */}
      <div className="relative h-48 flex-shrink-0 overflow-hidden">
        {post.cover_image
          ? <img src={post.cover_image} alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          : <Placeholder category={post.category} className="w-full h-full" />
        }
        <div className="absolute top-3 left-3">
          <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md text-white" style={{ background: c.bg }}>
            {c.label}
          </span>
        </div>
      </div>
      {/* Text */}
      <div className="flex flex-col flex-1 p-4 gap-2.5">
        <h3 className="text-white font-bold text-base leading-snug line-clamp-2 group-hover:text-purple-100 transition-colors">
          {post.title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 flex-1">
          {post.excerpt || post.content.slice(0, 100)}
        </p>
        <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
          <span className="text-slate-500 text-xs">{post.author}</span>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span>{fmt(post.published_at)}</span>
            <span>·</span>
            <span>{rt} min</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

// ── Small Card (3-col grid) ───────────────────────────────────────────────────

function SmallCard({ post }: { post: BlogPost }) {
  const c  = catStyle(post.category)
  const rt = readingTime(post.content)
  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col rounded-xl overflow-hidden border border-white/[0.06] bg-slate-900/60 hover:border-purple-500/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(168,85,247,0.1)]">
      {/* Image */}
      <div className="relative h-36 flex-shrink-0 overflow-hidden">
        {post.cover_image
          ? <img src={post.cover_image} alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          : <Placeholder category={post.category} className="w-full h-full" />
        }
        <div className="absolute top-2.5 left-2.5">
          <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded text-white" style={{ background: c.bg }}>
            {c.label}
          </span>
        </div>
      </div>
      {/* Text */}
      <div className="flex flex-col flex-1 p-3.5 gap-2">
        <h3 className="text-white font-bold text-sm leading-snug line-clamp-2 group-hover:text-purple-100 transition-colors">
          {post.title}
        </h3>
        <p className="text-slate-600 text-xs leading-relaxed line-clamp-2 flex-1">
          {post.excerpt || post.content.slice(0, 80)}
        </p>
        <div className="flex items-center justify-between pt-2 border-t border-white/[0.05]">
          <span className="text-slate-600 text-[10px]">{post.author}</span>
          <span className="text-slate-700 text-[10px]">{rt} min read</span>
        </div>
      </div>
    </Link>
  )
}

// ── List Row (fallback for extra posts) ──────────────────────────────────────

function ListRow({ post }: { post: BlogPost }) {
  const c  = catStyle(post.category)
  const rt = readingTime(post.content)
  return (
    <Link href={`/blog/${post.slug}`} className="group flex gap-4 py-4 border-b border-white/[0.06] last:border-0 hover:opacity-80 transition-opacity">
      <div className="relative w-24 h-16 flex-shrink-0 rounded-lg overflow-hidden">
        {post.cover_image
          ? <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
          : <Placeholder category={post.category} className="w-full h-full" />
        }
      </div>
      <div className="flex flex-col justify-between flex-1 min-w-0">
        <div>
          <span className="text-[9px] font-black uppercase tracking-widest text-white px-1.5 py-0.5 rounded mr-2" style={{ background: c.bg }}>
            {c.label}
          </span>
          <p className="text-white font-semibold text-sm leading-snug line-clamp-2 mt-1 group-hover:text-purple-200 transition-colors">
            {post.title}
          </p>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-slate-600">
          <span>{post.author}</span><span>·</span><span>{fmt(post.published_at)}</span><span>·</span><span>{rt} min</span>
        </div>
      </div>
    </Link>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("")
  const [posts, setPosts]                   = useState<BlogPost[]>([])
  const [featured, setFeatured]             = useState<BlogPost | null>(null)
  const [total, setTotal]                   = useState(0)
  const [totalPages, setTotalPages]         = useState(1)
  const [page, setPage]                     = useState(1)
  const [loadingPosts, setLoadingPosts]     = useState(true)
  const [loadingFeatured, setLoadingFeatured] = useState(true)
  const [error, setError]                   = useState("")

  const PAGE_SIZE = 12

  useEffect(() => {
    getFeaturedPost().then(res => {
      if (res.data?.post) setFeatured(res.data.post)
      setLoadingFeatured(false)
    })
  }, [])

  useEffect(() => {
    setLoadingPosts(true)
    setError("")
    getBlogPosts({ category: activeCategory || undefined, page, page_size: PAGE_SIZE })
      .then(res => {
        if (res.error) setError(res.error)
        else if (res.data) {
          setPosts(res.data.posts)
          setTotal(res.data.total)
          setTotalPages(res.data.total_pages)
        }
        setLoadingPosts(false)
      })
  }, [activeCategory, page])

  const handleCategory = (cat: string) => { setActiveCategory(cat); setPage(1) }

  // Split posts into layout sections
  const secondary = posts.slice(0, 3)
  const grid      = posts.slice(3, 9)
  const extras    = posts.slice(9)

  const BORDER = "rgba(255,255,255,0.07)"

  return (
    <div style={{ background: "#020617", minHeight: "100vh", color: "#f9fafb" }}>

      {/* ── NAV ─────────────────────────────────────────────────────────────── */}
      <header style={{
        position: "sticky", top: 0, zIndex: 40,
        borderBottom: `1px solid ${BORDER}`,
        background: "rgba(2,6,23,0.94)",
        backdropFilter: "blur(16px)",
      }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
          <Link href="/" style={{ textDecoration: "none" }}><Logo size="sm" /></Link>

          {/* Category tabs — desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {CATEGORIES.map(cat => (
              <button
                key={cat.value}
                onClick={() => handleCategory(cat.value)}
                className="px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all"
                style={{
                  background: activeCategory === cat.value ? "rgba(168,85,247,0.2)" : "transparent",
                  color: activeCategory === cat.value ? "#c084fc" : "#64748b",
                }}
              >
                {cat.label}
              </button>
            ))}
          </nav>

          <Link href="/demo" className="text-sm font-bold px-4 py-2 rounded-lg text-white flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#a855f7,#ec4899)" }}>
            Free Session →
          </Link>
        </div>

        {/* Category tabs — mobile */}
        <div className="md:hidden flex gap-1 px-4 pb-3 overflow-x-auto">
          {CATEGORIES.map(cat => (
            <button
              key={cat.value}
              onClick={() => handleCategory(cat.value)}
              className="px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0 border transition-all"
              style={{
                background: activeCategory === cat.value ? "rgba(168,85,247,0.2)" : "transparent",
                borderColor: activeCategory === cat.value ? "rgba(168,85,247,0.5)" : "rgba(255,255,255,0.1)",
                color: activeCategory === cat.value ? "#c084fc" : "#64748b",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </header>

      {/* ── MASTHEAD ────────────────────────────────────────────────────────── */}
      <div className="border-b border-white/[0.06] py-8 text-center">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-1.5"
            style={{
              background: "linear-gradient(90deg,#f0abfc,#fff,#c7d2fe)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
            Rbyte.ai · Editorial
          </h1>
          <p className="text-slate-500 text-sm">AI engineering insights, tutorials & industry news</p>
        </div>
      </div>

      {/* ── CONTENT ─────────────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">{error}</div>
        )}

        {/* HERO / FEATURED */}
        {loadingFeatured
          ? <div className="rounded-3xl bg-slate-800 animate-pulse mb-10" style={{ height: 480 }} />
          : featured && <HeroPost post={featured} />
        }

        {/* SECONDARY ROW — 3 medium cards */}
        {loadingPosts ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
            {[0,1,2].map(i => <SkeletonCard key={i} tall />)}
          </div>
        ) : secondary.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {secondary.map(p => <MediumCard key={p.id} post={p} />)}
          </div>
        ) : null}

        {/* DIVIDER */}
        {!loadingPosts && grid.length > 0 && (
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-white/[0.06]" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-600">More articles</span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>
        )}

        {/* MAIN GRID — 3 col smaller cards */}
        {!loadingPosts && grid.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {grid.map(p => <SmallCard key={p.id} post={p} />)}
          </div>
        )}

        {/* EXTRA LIST — anything beyond 9 */}
        {!loadingPosts && extras.length > 0 && (
          <div className="rounded-2xl border border-white/[0.06] bg-slate-900/40 px-5 mb-10">
            {extras.map(p => <ListRow key={p.id} post={p} />)}
          </div>
        )}

        {/* EMPTY */}
        {!loadingPosts && posts.length === 0 && !error && (
          <div className="text-center py-28 text-slate-600">
            <div className="text-5xl mb-4">📭</div>
            <p className="text-base font-medium text-slate-500">No articles in this category yet.</p>
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && !loadingPosts && (
          <div className="flex justify-center items-center gap-2 mt-4">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="px-4 py-2 rounded-lg text-sm font-semibold border border-white/10 text-slate-400 hover:text-white hover:border-white/25 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
              ← Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pg => (
              <button key={pg} onClick={() => setPage(pg)}
                className="w-9 h-9 rounded-lg text-sm font-bold border transition-all"
                style={{
                  background: page === pg ? "rgba(168,85,247,0.25)" : "transparent",
                  borderColor: page === pg ? "rgba(168,85,247,0.6)" : "rgba(255,255,255,0.1)",
                  color: page === pg ? "#c084fc" : "#64748b",
                }}>
                {pg}
              </button>
            ))}
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="px-4 py-2 rounded-lg text-sm font-semibold border border-white/10 text-slate-400 hover:text-white hover:border-white/25 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
