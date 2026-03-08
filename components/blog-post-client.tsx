"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { getBlogPost, getBlogPosts, BlogPost } from "@/lib/api"
import { renderMarkdown, readingTime } from "@/lib/markdown"

// ── Fonts injected via <style> so no next/font needed ──────────────────────
const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=IBM+Plex+Mono:wght@400;600&family=DM+Sans:wght@300;400;500&display=swap');`

// ── Helpers ──────────────────────────────────────────────────────────────────

const CAT: Record<string, { color: string; label: string }> = {
  news:         { color: "#3b82f6", label: "AI News"      },
  tutorial:     { color: "#a855f7", label: "Tutorial"     },
  announcement: { color: "#10b981", label: "Announcement" },
}
function cat(c: string) { return CAT[c] ?? { color: "#64748b", label: c } }

function fmtLong(iso: string | null) {
  if (!iso) return ""
  return new Date(iso).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })
}
function fmtShort(iso: string | null) {
  if (!iso) return ""
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

// ── Share ─────────────────────────────────────────────────────────────────────

function ShareRow({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false)
  const url = typeof window !== "undefined" ? `${window.location.origin}/blog/${slug}` : `/blog/${slug}`
  const copy = async () => { try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000) } catch {} }

  const btnStyle: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", gap: 8,
    padding: "8px 16px", borderRadius: 3,
    border: "1px solid #2a2a30", background: "#111114",
    color: "#6b6b7a", fontSize: 12, cursor: "pointer",
    fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.5px",
    textDecoration: "none", transition: "all 0.15s",
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#6b6b7a", letterSpacing: "2px", textTransform: "uppercase", alignSelf: "center" }}>Share</span>
      <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" style={btnStyle}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        X / Twitter
      </a>
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" style={btnStyle}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        LinkedIn
      </a>
      <button onClick={copy} style={btnStyle}>
        {copied
          ? <><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>Copied!</>
          : <><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>Copy Link</>
        }
      </button>
    </div>
  )
}

// ── Related Card ──────────────────────────────────────────────────────────────

function RelatedCard({ post }: { post: BlogPost }) {
  const c = cat(post.category)
  return (
    <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "block" }}>
      <div style={{
        display: "flex", gap: 14, paddingBottom: 20, marginBottom: 20,
        borderBottom: "1px solid #2a2a30",
      }}>
        <div style={{ width: 72, height: 52, flexShrink: 0, borderRadius: 3, overflow: "hidden", background: "#111114" }}>
          {post.cover_image
            ? <img src={post.cover_image} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>
                {post.category === "news" ? "📰" : post.category === "tutorial" ? "🎓" : "📢"}
              </div>
          }
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: c.color, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 5 }}>
            {c.label}
          </div>
          <p style={{ color: "#c0c0cc", fontSize: 13, fontWeight: 400, lineHeight: 1.45, margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {post.title}
          </p>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "#6b6b7a", marginTop: 5 }}>
            {fmtShort(post.published_at)}
          </div>
        </div>
      </div>
    </Link>
  )
}

// ── Client Component ──────────────────────────────────────────────────────────

export default function BlogPostClient({ slug }: { slug: string }) {
  const [post,    setPost]    = useState<BlogPost | null>(null)
  const [related, setRelated] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState("")

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    getBlogPost(slug).then(async res => {
      if (res.error || !res.data?.post) { setError(res.error || "Not found"); setLoading(false); return }
      const p = res.data.post
      setPost(p)
      const rel = await getBlogPosts({ category: p.category, page: 1, page_size: 5 })
      if (rel.data?.posts) setRelated(rel.data.posts.filter(r => r.slug !== p.slug).slice(0, 4))
      setLoading(false)
    })
  }, [slug])

  // ── Loading skeleton ───────────────────────────────────────────────────────
  if (loading) return (
    <div style={{ background: "#0a0a0b", minHeight: "100vh" }}>
      <style>{FONT_IMPORT}</style>
      <div style={{ width: "100%", height: 480, background: "#111114", animation: "pulse 1.5s ease infinite" }} />
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}`}</style>
    </div>
  )

  // ── Error ──────────────────────────────────────────────────────────────────
  if (error || !post) return (
    <div style={{ background: "#0a0a0b", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
      <style>{FONT_IMPORT}</style>
      <div style={{ fontSize: 48 }}>📭</div>
      <h1 style={{ fontFamily: "'Playfair Display', serif", color: "#e8e8ec", fontSize: 28 }}>Article not found</h1>
      <Link href="/blog" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#f5c842", fontSize: 13, letterSpacing: 1 }}>← Back to Blog</Link>
    </div>
  )

  const c   = cat(post.category)
  const rt  = readingTime(post.content)
  const html = renderMarkdown(post.content)

  return (
    <div style={{ background: "#0a0a0b", minHeight: "100vh", color: "#e8e8ec", fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
      <style>{`
        ${FONT_IMPORT}
        /* Noise texture */
        body::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 9999;
          opacity: 0.45;
        }
        * { box-sizing: border-box; }
        a { cursor: pointer; }
        .article-img { transition: transform 0.5s ease; }
        .article-img:hover { transform: scale(1.01); }
        /* ── Mobile layout ── */
        @media (max-width: 900px) {
          .article-body-grid {
            grid-template-columns: 1fr !important;
          }
          .article-body-aside {
            position: static !important;
            height: auto !important;
            border-right: none !important;
            border-top: 1px solid #1a1a20 !important;
            padding: 40px 20px !important;
          }
          .article-body-main {
            padding: 40px 20px 48px !important;
            border-right: none !important;
          }
          .article-cover-title {
            padding: 0 20px 28px !important;
          }
          .article-cover-hero {
            height: clamp(220px, 50vw, 400px) !important;
          }
          .article-byline { padding: 14px 20px !important; }
          .article-excerpt { padding: 20px 20px !important; }
          .article-header { padding: 0 20px !important; }
          .article-nav-label { display: none !important; }
        }
        @media (max-width: 480px) {
          .article-byline-stats { flex-direction: column !important; gap: 4px !important; align-items: flex-start !important; }
          .article-byline-sep { display: none !important; }
          .article-cover-h1 { font-size: clamp(26px, 8vw, 44px) !important; }
          .article-nocov-h1 { font-size: clamp(28px, 9vw, 60px) !important; }
          .article-nocov-block { padding: 48px 20px 36px !important; }
          .article-footer { flex-direction: column !important; gap: 8px !important; }
        }
      `}</style>

      {/* ── NAV ─────────────────────────────────────────────────────────────── */}
      <header style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(10,10,11,0.95)", backdropFilter: "blur(16px)",
        borderBottom: "1px solid #1a1a20",
        padding: "0 5vw", height: 60,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href="/blog" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: "#6b6b7a", textDecoration: "none", letterSpacing: "1px" }}>
            ← BLOG
          </Link>
          <span style={{ color: "#2a2a30" }}>/</span>
          <span style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: "2px",
            textTransform: "uppercase", padding: "3px 10px", borderRadius: 2,
            background: c.color + "22", color: c.color, border: `1px solid ${c.color}44`,
          }}>
            {c.label}
          </span>
        </div>
        <Link href="/demo" style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: "2px",
          textTransform: "uppercase", padding: "9px 20px", borderRadius: 2,
          background: "#f5c842", color: "#0a0a0b", fontWeight: 600, textDecoration: "none",
        }}>
          Free Session →
        </Link>
      </header>

      {/* ── HERO COVER ──────────────────────────────────────────────────────── */}
      {post.cover_image ? (
        <div className="article-cover-hero" style={{ position: "relative", width: "100%", height: "clamp(340px,55vh,560px)", overflow: "hidden" }}>
          <img
            src={post.cover_image}
            alt={post.title}
            className="article-img"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(10,10,11,0) 0%, rgba(10,10,11,0.5) 50%, rgba(10,10,11,0.97) 100%)",
          }} />
          <div className="article-cover-title" style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            padding: "0 5vw 40px",
            maxWidth: 900,
          }}>
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: c.color,
              letterSpacing: "3px", textTransform: "uppercase", marginBottom: 16,
              display: "flex", alignItems: "center", gap: 10,
            }}>
              <span style={{ width: 24, height: 1, background: c.color, display: "inline-block" }} />
              {c.label}
              {post.featured && <span style={{ marginLeft: 8, color: "#f5c842" }}>★ FEATURED</span>}
            </div>
            <h1 className="article-cover-h1" style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(32px,5vw,64px)",
              fontWeight: 900,
              lineHeight: 1.08,
              color: "#e8e8ec",
              textShadow: "0 2px 24px rgba(0,0,0,0.9)",
              maxWidth: 760,
              margin: 0,
            }}>
              {post.title}
            </h1>
          </div>
        </div>
      ) : (
        <div className="article-nocov-block" style={{
          padding: "80px 5vw 60px",
          borderBottom: "1px solid #1a1a20",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: -200, right: -200, width: 500, height: 500,
            background: `radial-gradient(circle, ${c.color}10 0%, transparent 70%)`,
            pointerEvents: "none",
          }} />
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: c.color,
            letterSpacing: "3px", textTransform: "uppercase", marginBottom: 20,
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <span style={{ width: 24, height: 1, background: c.color, display: "inline-block" }} />
            {c.label}
            {post.featured && <span style={{ marginLeft: 8, color: "#f5c842" }}>★ FEATURED</span>}
          </div>
          <h1 className="article-nocov-h1" style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(36px,6vw,72px)",
            fontWeight: 900, lineHeight: 1.06,
            color: "#e8e8ec", maxWidth: 760, marginBottom: 24,
          }}>
            {post.title}
          </h1>
          {post.excerpt && (
            <p style={{ fontSize: 19, color: "#6b6b7a", maxWidth: 640, fontWeight: 300, lineHeight: 1.6 }}>
              {post.excerpt}
            </p>
          )}
        </div>
      )}

      {/* ── BYLINE BAR ──────────────────────────────────────────────────────── */}
      <div className="article-byline" style={{
        borderBottom: "1px solid #1a1a20",
        padding: "18px 5vw",
        display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16,
        background: "#0a0a0b",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 38, height: 38, borderRadius: "50%", flexShrink: 0,
            background: "linear-gradient(135deg, #a855f7, #6366f1)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 700, color: "#fff",
          }}>
            {post.author.charAt(0).toUpperCase()}
          </div>
          <div>
            <div style={{ color: "#e8e8ec", fontSize: 14, fontWeight: 500 }}>{post.author}</div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "#6b6b7a", letterSpacing: "0.5px" }}>
              {fmtLong(post.published_at)}
            </div>
          </div>
        </div>
        <div className="article-byline-stats" style={{ display: "flex", alignItems: "center", gap: 20, fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#6b6b7a", letterSpacing: "1px" }}>
          <span>{rt} MIN READ</span>
          <span className="article-byline-sep" style={{ color: "#2a2a30" }}>|</span>
          <span>{post.views.toLocaleString()} VIEWS</span>
        </div>
      </div>

      {/* ── EXCERPT ──────────────────────────────────────────────────────────── */}
      {post.cover_image && post.excerpt && (
        <div className="article-excerpt" style={{ borderBottom: "1px solid #1a1a20", padding: "28px 5vw", maxWidth: 800 }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(17px,2vw,21px)", fontStyle: "italic", color: "#6b6b7a", lineHeight: 1.6, margin: 0 }}>
            {post.excerpt}
          </p>
        </div>
      )}

      {/* ── BODY: article + sidebar ─────────────────────────────────────────── */}
      <div className="article-body-grid" style={{ display: "grid", gridTemplateColumns: "1fr min(320px, 28vw)", gap: 0, maxWidth: 1300, margin: "0 auto" }}>

        {/* ── ARTICLE ───────────────────────────────────────────────────────── */}
        <main className="article-body-main" style={{ padding: "64px 5vw 80px", borderRight: "1px solid #1a1a20", minWidth: 0 }}>
          <div style={{ maxWidth: 680 }}>
            <div dangerouslySetInnerHTML={{ __html: html }} />

            {post.tags && post.tags.length > 0 && (
              <div style={{ marginTop: 56, paddingTop: 32, borderTop: "1px solid #1a1a20", display: "flex", flexWrap: "wrap", gap: 8 }}>
                {post.tags.map(tag => (
                  <span key={tag} style={{
                    fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: "1.5px",
                    textTransform: "uppercase", padding: "4px 12px", borderRadius: 2,
                    border: "1px solid #2a2a30", color: "#6b6b7a", background: "#111114",
                  }}>
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div style={{ marginTop: 40, paddingTop: 32, borderTop: "1px solid #1a1a20" }}>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "#6b6b7a", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 16 }}>
                Share this article
              </div>
              <ShareRow title={post.title} slug={post.slug} />
            </div>

            <div style={{ marginTop: 48 }}>
              <Link href="/blog" style={{
                fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: "#6b6b7a",
                letterSpacing: "1.5px", textDecoration: "none",
              }}>
                ← BACK TO BLOG
              </Link>
            </div>
          </div>
        </main>

        {/* ── SIDEBAR ───────────────────────────────────────────────────────── */}
        <aside className="article-body-aside" style={{ padding: "48px 32px", position: "sticky", top: 60, height: "fit-content" }}>

          <div style={{ marginBottom: 40 }}>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "#ff6b35", letterSpacing: "3px", textTransform: "uppercase", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 20, height: 1, background: "#ff6b35", display: "inline-block" }} />
              Article Info
            </div>
            {[
              { label: "Category",  value: c.label,                   color: c.color },
              { label: "Published", value: fmtShort(post.published_at), color: "#e8e8ec" },
              { label: "Read time", value: `${rt} min`,               color: "#e8e8ec" },
              { label: "Views",     value: post.views.toLocaleString(), color: "#e8e8ec" },
            ].map(({ label, value, color }) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "11px 0", borderBottom: "1px solid #1a1a20" }}>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "#6b6b7a", letterSpacing: "1px", textTransform: "uppercase" }}>{label}</span>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color, fontWeight: 600 }}>{value}</span>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 40 }}>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "#ff6b35", letterSpacing: "3px", textTransform: "uppercase", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 20, height: 1, background: "#ff6b35", display: "inline-block" }} />
              Share
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`/blog/${post.slug}`)}`, label: "X / Twitter" },
                { href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`/blog/${post.slug}`)}`, label: "LinkedIn" },
              ].map(({ href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{
                  fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: "1px",
                  color: "#6b6b7a", padding: "9px 14px", border: "1px solid #2a2a30",
                  background: "#111114", borderRadius: 2, textDecoration: "none",
                  display: "block", transition: "all 0.15s",
                }}>
                  → {label}
                </a>
              ))}
            </div>
          </div>

          {related.length > 0 && (
            <div style={{ marginBottom: 40 }}>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "#ff6b35", letterSpacing: "3px", textTransform: "uppercase", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 20, height: 1, background: "#ff6b35", display: "inline-block" }} />
                Related
              </div>
              {related.map(r => <RelatedCard key={r.id} post={r} />)}
            </div>
          )}

          <div style={{
            padding: "24px", border: "1px solid rgba(245,200,66,0.25)",
            background: "rgba(245,200,66,0.04)", borderRadius: 4,
            position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: -60, right: -60, width: 160, height: 160,
              background: "radial-gradient(circle, rgba(245,200,66,0.08) 0%, transparent 70%)",
              pointerEvents: "none",
            }} />
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "#f5c842", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 12 }}>
              Free Live Session
            </div>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 700, lineHeight: 1.4, color: "#e8e8ec", marginBottom: 16 }}>
              Build a working AI app in 90 minutes — live, hands-on, free.
            </p>
            <Link href="/demo" style={{
              display: "block", textAlign: "center", padding: "12px 20px",
              background: "#f5c842", color: "#0a0a0b", borderRadius: 2,
              fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, fontWeight: 600,
              letterSpacing: "2px", textTransform: "uppercase", textDecoration: "none",
            }}>
              BOOK FREE SEAT →
            </Link>
          </div>
        </aside>
      </div>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer className="article-footer" style={{ borderTop: "1px solid #1a1a20", padding: "32px 5vw", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 14, color: "#e8e8ec", fontWeight: 600 }}>
          R<span style={{ color: "#f5c842" }}>Byte</span>.ai
        </div>
        <Link href="/blog" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#6b6b7a", letterSpacing: "1px", textDecoration: "none" }}>
          ← All Articles
        </Link>
        <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#6b6b7a" }}>
          AI/ML Education for Indian IT Professionals
        </p>
      </footer>
    </div>
  )
}
