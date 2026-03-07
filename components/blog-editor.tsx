"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  adminCreatePost,
  adminUpdatePost,
  CreatePostPayload,
  BlogPost,
} from "@/lib/api"
import { renderMarkdown } from "@/lib/markdown"

// ── Types ────────────────────────────────────────────────────────────────────

export interface BlogEditorProps {
  /** If provided, editor is in edit mode */
  post?: BlogPost
}

// ── Toolbar buttons ───────────────────────────────────────────────────────────

const TOOLBAR = [
  { label: "H1",   insert: (s: string) => `# ${s || "Heading 1"}\n` },
  { label: "H2",   insert: (s: string) => `## ${s || "Heading 2"}\n` },
  { label: "B",    insert: (s: string) => `**${s || "bold text"}**`,  style: "font-bold" },
  { label: "I",    insert: (s: string) => `*${s || "italic text"}*`,  style: "italic" },
  { label: "</>",  insert: (s: string) => `\`${s || "code"}\`` },
  { label: "[ ]",  insert: (s: string) => `\`\`\`\n${s || "// code block"}\n\`\`\`` },
  { label: "🔗",   insert: (s: string) => `[${s || "link text"}](https://)` },
  { label: "🖼",   insert: (s: string) => `![${s || "alt text"}](https://)` },
  { label: "❝",   insert: (s: string) => `> ${s || "blockquote"}\n` },
  { label: "—",   insert: (_s: string) => `\n---\n` },
]

// ── Editor ────────────────────────────────────────────────────────────────────

export default function BlogEditor({ post }: BlogEditorProps) {
  const router  = useRouter()
  const isEdit  = !!post

  // Form fields
  const [title,    setTitle]    = useState(post?.title    ?? "")
  const [excerpt,  setExcerpt]  = useState(post?.excerpt  ?? "")
  const [content,  setContent]  = useState(post?.content  ?? "")
  const [category, setCategory] = useState(post?.category ?? "news")
  const [author,   setAuthor]   = useState(post?.author   ?? "Rbyte.ai Team")
  const [tags,     setTags]     = useState<string[]>(post?.tags ?? [])
  const [tagInput, setTagInput] = useState("")
  const [coverImg, setCoverImg] = useState(post?.cover_image ?? "")
  const [featured, setFeatured] = useState(post?.featured ?? false)

  // UI state
  const [tab,       setTab]       = useState<"write" | "preview">("write")
  const [saving,    setSaving]    = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [error,     setError]     = useState("")
  const [toast,     setToast]     = useState("")

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(""), 3000)
  }

  // ── Toolbar action ──────────────────────────────────────────────────────────
  const applyToolbar = (insertFn: (s: string) => string) => {
    const ta = textareaRef.current
    if (!ta) return
    const start  = ta.selectionStart
    const end    = ta.selectionEnd
    const sel    = content.slice(start, end)
    const insert = insertFn(sel)
    const next   = content.slice(0, start) + insert + content.slice(end)
    setContent(next)
    // restore cursor after insert
    requestAnimationFrame(() => {
      ta.focus()
      const cur = start + insert.length
      ta.setSelectionRange(cur, cur)
    })
  }

  // ── Tag handling ─────────────────────────────────────────────────────────────
  const addTag = () => {
    const t = tagInput.trim().toLowerCase().replace(/\s+/g, "-")
    if (t && !tags.includes(t)) setTags(prev => [...prev, t])
    setTagInput("")
  }
  const removeTag = (tag: string) => setTags(prev => prev.filter(t => t !== tag))

  // ── Save / Publish ──────────────────────────────────────────────────────────
  const buildPayload = (status: "draft" | "published"): CreatePostPayload => ({
    title:       title.trim(),
    content,
    excerpt:     excerpt.trim() || undefined,
    cover_image: coverImg.trim() || undefined,
    category,
    author:      author.trim() || "Rbyte.ai Team",
    tags:        tags.length ? tags : undefined,
    status,
    featured,
  })

  const save = async (status: "draft" | "published") => {
    setError("")
    if (!title.trim()) { setError("Title is required."); return }
    if (!content.trim()) { setError("Content cannot be empty."); return }

    if (status === "draft") setSaving(true)
    else setPublishing(true)

    const payload = buildPayload(status)
    const res = isEdit
      ? await adminUpdatePost(post!.id, payload)
      : await adminCreatePost(payload)

    setSaving(false)
    setPublishing(false)

    if (res.error) { setError(res.error); return }
    showToast(status === "published" ? "Post published!" : "Draft saved!")
    setTimeout(() => router.push("/admin/blog"), 1200)
  }

  const BORDER = "rgba(255,255,255,0.08)"
  const inputCls = "w-full bg-slate-900/60 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/20 transition-all"

  return (
    <div style={{ background: "#020617", minHeight: "100vh", color: "#f9fafb", fontFamily: "inherit" }}>

      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 px-4 py-3 rounded-xl border border-green-500/30 bg-slate-800 text-sm text-green-300 shadow-xl">
          ✓ {toast}
        </div>
      )}

      {/* HEADER */}
      <header style={{ borderBottom: `1px solid ${BORDER}`, background: "rgba(2,6,23,0.98)", backdropFilter: "blur(14px)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Link href="/admin/blog" className="text-slate-400 hover:text-white text-sm transition-colors flex-shrink-0">
              ← Posts
            </Link>
            <span className="text-slate-700">/</span>
            <span className="text-white font-bold text-sm truncate">
              {isEdit ? "Edit Post" : "New Post"}
            </span>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => save("draft")}
              disabled={saving || publishing}
              className="px-4 py-2 rounded-lg border border-white/10 text-slate-400 text-sm font-semibold hover:border-white/20 hover:text-white disabled:opacity-40 transition-all"
            >
              {saving ? "Saving…" : "Save Draft"}
            </button>
            <button
              onClick={() => save("published")}
              disabled={saving || publishing}
              className="px-4 py-2 rounded-lg text-white text-sm font-bold disabled:opacity-40 transition-all hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)", boxShadow: "0 2px 12px rgba(168,85,247,0.35)" }}
            >
              {publishing ? "Publishing…" : "Publish →"}
            </button>
          </div>
        </div>
      </header>

      {/* BODY */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {error && (
          <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">{error}</div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">

          {/* ── LEFT: editor ─────────────────────────────────────────────── */}
          <div className="flex flex-col gap-5">

            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Title *</label>
              <input
                type="text"
                placeholder="Your post title…"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className={inputCls}
                style={{ fontSize: 16, fontWeight: 700 }}
              />
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Excerpt</label>
              <textarea
                rows={2}
                placeholder="Short summary shown in card previews…"
                value={excerpt}
                onChange={e => setExcerpt(e.target.value)}
                className={inputCls}
                style={{ resize: "vertical" }}
              />
            </div>

            {/* Write / Preview tabs */}
            <div className="rounded-2xl border border-white/[0.07] overflow-hidden">
              {/* Tab bar + toolbar */}
              <div className="flex items-center border-b border-white/[0.07] bg-white/[0.02]">
                {/* Tabs */}
                <div className="flex">
                  {(["write", "preview"] as const).map(t => (
                    <button
                      key={t}
                      onClick={() => setTab(t)}
                      className="px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2"
                      style={{
                        color: tab === t ? "#c084fc" : "#475569",
                        borderBottomColor: tab === t ? "#a855f7" : "transparent",
                        background: "transparent",
                        border: "none",
                        borderBottom: tab === t ? "2px solid #a855f7" : "2px solid transparent",
                        cursor: "pointer",
                      }}
                    >
                      {t === "write" ? "✍️ Write" : "👁 Preview"}
                    </button>
                  ))}
                </div>

                {/* Toolbar — only in write mode */}
                {tab === "write" && (
                  <div className="flex-1 flex items-center gap-0.5 px-2 overflow-x-auto">
                    {TOOLBAR.map(({ label, insert, style }) => (
                      <button
                        key={label}
                        onClick={() => applyToolbar(insert)}
                        title={label}
                        className={`px-2 py-1 rounded text-slate-400 hover:text-white hover:bg-white/10 text-xs transition-all flex-shrink-0 ${style ?? ""}`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Content area */}
              {tab === "write" ? (
                <textarea
                  ref={textareaRef}
                  rows={28}
                  placeholder="Write your post in Markdown…

# My Great Post

Start with a heading, then write your content.

## Section 1
Some paragraph text here with **bold** and *italic* formatting.

## Section 2
- List item one
- List item two

> A blockquote for important notes

```python
# Code block
print('Hello, AI world!')
```"
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  className="w-full bg-transparent text-slate-300 text-sm font-mono leading-relaxed p-4 outline-none placeholder-slate-700"
                  style={{ resize: "vertical", minHeight: 480 }}
                />
              ) : (
                <div
                  className="p-6 min-h-[480px] text-sm"
                  dangerouslySetInnerHTML={{
                    __html: content
                      ? renderMarkdown(content)
                      : '<p class="text-slate-600 italic">Nothing to preview yet — switch to Write and add some content.</p>',
                  }}
                />
              )}
            </div>
          </div>

          {/* ── RIGHT: sidebar ────────────────────────────────────────────── */}
          <div className="flex flex-col gap-4">

            {/* Category */}
            <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Category</h3>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className={inputCls}
                style={{ cursor: "pointer" }}
              >
                <option value="news">AI News</option>
                <option value="tutorial">Tutorial</option>
                <option value="announcement">Announcement</option>
              </select>
            </div>

            {/* Author */}
            <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Author</h3>
              <input
                type="text"
                value={author}
                onChange={e => setAuthor(e.target.value)}
                className={inputCls}
                placeholder="Author name"
              />
            </div>

            {/* Tags */}
            <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Tags</h3>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addTag() } }}
                  placeholder="Add tag + Enter"
                  className={`${inputCls} flex-1`}
                />
                <button
                  onClick={addTag}
                  className="px-3 py-2 rounded-lg border border-white/10 text-slate-400 text-sm hover:border-purple-500/40 hover:text-purple-400 transition-all"
                >
                  +
                </button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {tags.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/25">
                      #{tag}
                      <button onClick={() => removeTag(tag)} className="ml-0.5 text-purple-400 hover:text-red-400 transition-colors leading-none">×</button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Cover image */}
            <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Cover Image URL</h3>
              <input
                type="url"
                value={coverImg}
                onChange={e => setCoverImg(e.target.value)}
                className={inputCls}
                placeholder="https://..."
              />
              {coverImg && (
                <div className="mt-3 rounded-lg overflow-hidden border border-white/10 h-28">
                  <img
                    src={coverImg}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                    onError={e => { (e.target as HTMLImageElement).style.display = "none" }}
                  />
                </div>
              )}
            </div>

            {/* Featured */}
            <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <div
                  onClick={() => setFeatured(f => !f)}
                  className="w-10 h-6 rounded-full transition-colors relative"
                  style={{ background: featured ? "#a855f7" : "rgba(255,255,255,0.1)" }}
                >
                  <div
                    className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform"
                    style={{ transform: featured ? "translateX(1.25rem)" : "translateX(0.125rem)" }}
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Featured Post</p>
                  <p className="text-xs text-slate-500">Shows in the hero section</p>
                </div>
              </label>
            </div>

            {/* Tips */}
            <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 text-xs text-slate-600 space-y-1.5">
              <p className="font-bold text-slate-500 mb-2">Markdown Tips</p>
              <p><code className="text-slate-400"># H1</code> · <code className="text-slate-400">## H2</code> · <code className="text-slate-400">### H3</code></p>
              <p><code className="text-slate-400">**bold**</code> · <code className="text-slate-400">*italic*</code></p>
              <p><code className="text-slate-400">`inline code`</code></p>
              <p><code className="text-slate-400">```lang … ```</code> for blocks</p>
              <p><code className="text-slate-400">&gt; blockquote</code></p>
              <p><code className="text-slate-400">- item</code> · <code className="text-slate-400">1. item</code></p>
              <p><code className="text-slate-400">[text](url)</code> · <code className="text-slate-400">![alt](url)</code></p>
              <p><code className="text-slate-400">---</code> for horizontal rule</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
