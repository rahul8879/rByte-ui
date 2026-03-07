"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { adminGetAllPosts, BlogPost } from "@/lib/api"
import BlogEditor from "@/components/blog-editor"

export default function EditPostPage() {
  const params = useParams()
  const id     = Number(params?.id)

  const [post,    setPost]    = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState("")

  useEffect(() => {
    if (!id) return
    adminGetAllPosts().then(res => {
      if (res.error) { setError(res.error); setLoading(false); return }
      const found = res.data?.posts.find(p => p.id === id) ?? null
      if (!found) setError("Post not found.")
      setPost(found)
      setLoading(false)
    })
  }, [id])

  const BORDER = "rgba(255,255,255,0.08)"

  if (loading) {
    return (
      <div style={{ background: "#020617", minHeight: "100vh" }}>
        <header style={{ borderBottom: `1px solid ${BORDER}`, background: "rgba(2,6,23,0.98)", padding: "0 24px", height: 64, display: "flex", alignItems: "center" }}>
          <span className="text-white font-bold text-sm">Edit Post</span>
        </header>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 animate-pulse space-y-4">
          <div className="h-10 rounded-xl bg-slate-800 w-1/2" />
          <div className="h-6 rounded bg-slate-800 w-full" />
          <div className="h-80 rounded-xl bg-slate-800" />
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div style={{ background: "#020617", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <header style={{ borderBottom: `1px solid ${BORDER}`, background: "rgba(2,6,23,0.98)", padding: "0 24px", height: 64, display: "flex", alignItems: "center" }}>
          <Link href="/admin/blog" className="text-slate-400 hover:text-white text-sm transition-colors">← Posts</Link>
        </header>
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
          <div className="text-5xl mb-4">❌</div>
          <p className="text-lg font-bold text-white mb-2">Post not found</p>
          <p className="text-slate-500 text-sm mb-6">{error}</p>
          <Link href="/admin/blog" className="text-purple-400 underline underline-offset-2 hover:text-purple-300 text-sm">
            ← Back to posts
          </Link>
        </div>
      </div>
    )
  }

  return <BlogEditor post={post} />
}
