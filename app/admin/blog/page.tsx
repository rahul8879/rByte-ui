"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { adminGetAllPosts, adminDeletePost, adminTogglePublish, BlogPost } from "@/lib/api"

// ── Constants ────────────────────────────────────────────────────────────────

const CATEGORY_LABELS: Record<string, string> = {
  news:         "AI News",
  tutorial:     "Tutorial",
  announcement: "Announcement",
}
const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  news:         { bg: "rgba(59,130,246,0.15)",  text: "#60a5fa" },
  tutorial:     { bg: "rgba(168,85,247,0.15)",  text: "#c084fc" },
  announcement: { bg: "rgba(16,185,129,0.15)",  text: "#34d399" },
}

function formatDate(iso: string | null) {
  if (!iso) return "—"
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
}

// ── Confirm Dialog ────────────────────────────────────────────────────────────

function ConfirmDialog({
  message, onConfirm, onCancel,
}: { message: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}>
      <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
        <p className="text-white font-semibold mb-1">Are you sure?</p>
        <p className="text-slate-400 text-sm mb-6">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2 rounded-lg border border-white/10 text-slate-400 text-sm hover:border-white/20 hover:text-white transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2 rounded-lg text-sm font-bold text-white transition-all"
            style={{ background: "linear-gradient(135deg, #ef4444, #b91c1c)" }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Stats Bar ─────────────────────────────────────────────────────────────────

function StatsBar({ posts }: { posts: BlogPost[] }) {
  const published = posts.filter(p => p.status === "published").length
  const drafts    = posts.filter(p => p.status === "draft").length
  const featured  = posts.filter(p => p.featured).length
  const totalViews = posts.reduce((s, p) => s + p.views, 0)

  const stats = [
    { label: "Published", value: published, color: "#34d399" },
    { label: "Drafts",    value: drafts,    color: "#f59e0b" },
    { label: "Featured",  value: featured,  color: "#c084fc" },
    { label: "Total Views", value: totalViews.toLocaleString(), color: "#60a5fa" },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map(s => (
        <div key={s.label} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 text-center">
          <p className="text-2xl font-black mb-0.5" style={{ color: s.color }}>{s.value}</p>
          <p className="text-slate-500 text-xs font-medium">{s.label}</p>
        </div>
      ))}
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function AdminBlogPage() {
  const [posts, setPosts]         = useState<BlogPost[]>([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState("")
  const [actionLoading, setActionLoading] = useState<number | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<BlogPost | null>(null)
  const [toast, setToast]         = useState("")

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(""), 3000)
  }

  const loadPosts = () => {
    setLoading(true)
    adminGetAllPosts().then(res => {
      if (res.error) setError(res.error)
      else if (res.data) setPosts(res.data.posts)
      setLoading(false)
    })
  }

  useEffect(() => { loadPosts() }, [])

  const handleTogglePublish = async (post: BlogPost) => {
    setActionLoading(post.id)
    const res = await adminTogglePublish(post.id)
    setActionLoading(null)
    if (res.error) { showToast(`Error: ${res.error}`); return }
    showToast(`"${post.title}" is now ${res.data?.status === "published" ? "published" : "draft"}.`)
    loadPosts()
  }

  const handleDelete = async (post: BlogPost) => {
    setDeleteConfirm(null)
    setActionLoading(post.id)
    const res = await adminDeletePost(post.id)
    setActionLoading(null)
    if (res.error) { showToast(`Error: ${res.error}`); return }
    showToast(`"${post.title}" deleted.`)
    setPosts(p => p.filter(x => x.id !== post.id))
  }

  const BORDER = "rgba(255,255,255,0.08)"

  return (
    <div style={{ background: "#020617", minHeight: "100vh", color: "#f9fafb", fontFamily: "inherit" }}>

      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 px-4 py-3 rounded-xl border border-white/10 bg-slate-800 text-sm text-white shadow-xl animate-in slide-in-from-top-2">
          {toast}
        </div>
      )}

      {/* Delete confirm */}
      {deleteConfirm && (
        <ConfirmDialog
          message={`This will permanently delete "${deleteConfirm.title}". This cannot be undone.`}
          onConfirm={() => handleDelete(deleteConfirm)}
          onCancel={() => setDeleteConfirm(null)}
        />
      )}

      {/* HEADER */}
      <header style={{ borderBottom: `1px solid ${BORDER}`, background: "rgba(2,6,23,0.98)", backdropFilter: "blur(14px)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-slate-400 hover:text-white text-sm transition-colors">← Site</Link>
            <span className="text-slate-700">/</span>
            <span className="text-white font-bold text-sm">Blog Admin</span>
          </div>
          <Link
            href="/admin/blog/new"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-white transition-all hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)", boxShadow: "0 2px 12px rgba(168,85,247,0.35)" }}
          >
            + New Post
          </Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-black text-white mb-1">Blog Posts</h1>
          <p className="text-slate-500 text-sm">Manage your blog content, publish posts and track engagement.</p>
        </div>

        {/* STATS */}
        {!loading && posts.length > 0 && <StatsBar posts={posts} />}

        {/* ERROR */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">{error}</div>
        )}

        {/* LOADING SKELETON */}
        {loading ? (
          <div className="animate-pulse space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-16 rounded-xl bg-slate-800/50" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-24 text-slate-600">
            <div className="text-5xl mb-4">📝</div>
            <p className="text-lg font-medium text-slate-400 mb-2">No posts yet</p>
            <p className="text-sm mb-8">Create your first blog post to get started.</p>
            <Link href="/admin/blog/new"
              className="inline-block px-6 py-2.5 rounded-lg text-white text-sm font-bold"
              style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)" }}>
              Create First Post
            </Link>
          </div>
        ) : (
          /* TABLE */
          <div className="rounded-2xl border border-white/[0.07] overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-[1fr_120px_100px_110px_90px_160px] gap-0 px-5 py-3 border-b border-white/[0.07] bg-white/[0.02]">
              {["Title", "Category", "Status", "Date", "Views", "Actions"].map(h => (
                <div key={h} className="text-xs font-bold uppercase tracking-wider text-slate-500">{h}</div>
              ))}
            </div>

            {/* Rows */}
            {posts.map((post, idx) => {
              const cat   = CATEGORY_COLORS[post.category] ?? { bg: "rgba(165,180,252,0.15)", text: "#a5b4fc" }
              const catLbl = CATEGORY_LABELS[post.category] ?? post.category
              const isLoading = actionLoading === post.id

              return (
                <div
                  key={post.id}
                  className={`grid grid-cols-[1fr_120px_100px_110px_90px_160px] gap-0 px-5 py-4 items-center transition-colors hover:bg-white/[0.015] ${idx < posts.length - 1 ? "border-b border-white/[0.05]" : ""}`}
                >
                  {/* Title */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      {post.featured && <span className="text-amber-400 text-xs">★</span>}
                      <p className="text-white text-sm font-semibold truncate">{post.title}</p>
                    </div>
                    <p className="text-slate-600 text-xs truncate">/{post.slug}</p>
                  </div>

                  {/* Category */}
                  <div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: cat.bg, color: cat.text }}>
                      {catLbl}
                    </span>
                  </div>

                  {/* Status */}
                  <div>
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{
                        background: post.status === "published" ? "rgba(34,197,94,0.15)" : "rgba(245,158,11,0.15)",
                        color:      post.status === "published" ? "#4ade80" : "#fbbf24",
                      }}
                    >
                      {post.status}
                    </span>
                  </div>

                  {/* Date */}
                  <div className="text-slate-500 text-xs">{formatDate(post.published_at ?? post.created_at)}</div>

                  {/* Views */}
                  <div className="text-slate-400 text-sm">{post.views.toLocaleString()}</div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5">
                    {/* View */}
                    <a
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/10 transition-all text-xs"
                      title="View post"
                    >
                      ↗
                    </a>

                    {/* Edit */}
                    <Link
                      href={`/admin/blog/edit/${post.id}`}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-purple-400 hover:bg-purple-500/10 transition-all text-xs"
                      title="Edit"
                    >
                      ✏️
                    </Link>

                    {/* Toggle publish */}
                    <button
                      onClick={() => handleTogglePublish(post)}
                      disabled={isLoading}
                      title={post.status === "published" ? "Unpublish" : "Publish"}
                      className="p-1.5 rounded-lg text-slate-500 transition-all text-xs disabled:opacity-40"
                      style={{ color: post.status === "published" ? "#f59e0b" : "#4ade80" }}
                    >
                      {isLoading ? "…" : post.status === "published" ? "⏸" : "▶"}
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => setDeleteConfirm(post)}
                      disabled={isLoading}
                      className="p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all text-xs disabled:opacity-40"
                      title="Delete"
                    >
                      🗑
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
