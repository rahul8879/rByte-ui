/**
 * Editorial markdown → HTML renderer.
 * Supports: headings, bold, italic, inline code, fenced code blocks,
 * links, images, blockquotes (as editorial pull-quotes),
 * unordered & ordered lists, horizontal rules, stat cards, and paragraphs.
 */

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function inlineFormat(text: string): string {
  // Images
  text = text.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    (_m, alt, src) =>
      `<img src="${src}" alt="${escapeHtml(alt)}" style="width:100%;border-radius:8px;margin:8px 0;display:block;" loading="lazy" />`
  )
  // Links
  text = text.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (_m, label, href) =>
      `<a href="${href}" style="color:#f5c842;text-decoration:underline;text-underline-offset:3px;" target="_blank" rel="noopener noreferrer">${label}</a>`
  )
  // Bold
  text = text.replace(/\*\*(.+?)\*\*|__(.+?)__/g, (_m, a, b) =>
    `<strong style="color:#e8e8ec;font-weight:500;">${a ?? b}</strong>`
  )
  // Italic
  text = text.replace(/\*(.+?)\*|_(.+?)_/g, (_m, a, b) =>
    `<em style="font-style:italic;color:#c0c0cc;">${a ?? b}</em>`
  )
  // Inline code
  text = text.replace(
    /`([^`]+)`/g,
    (_m, code) =>
      `<code style="font-family:'IBM Plex Mono',monospace;font-size:0.82em;background:#1a1a20;border:1px solid #2a2a30;color:#00e676;padding:2px 7px;border-radius:3px;">${escapeHtml(code)}</code>`
  )
  return text
}

export function renderMarkdown(md: string): string {
  const lines = md.replace(/\r\n/g, "\n").split("\n")
  const html: string[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // ── Fenced code block ```lang
    if (/^```/.test(line)) {
      i++
      const codeLines: string[] = []
      while (i < lines.length && !/^```/.test(lines[i])) {
        codeLines.push(escapeHtml(lines[i]))
        i++
      }
      i++
      html.push(`
<div style="margin:36px 0;">
  <pre style="background:#111114;border:1px solid #2a2a30;border-radius:4px;padding:24px 28px;overflow-x:auto;font-family:'IBM Plex Mono',monospace;font-size:13px;line-height:1.7;color:#c0c0cc;"><code>${codeLines.join("\n")}</code></pre>
</div>`)
      continue
    }

    // ── H3
    const h3 = line.match(/^###\s+(.+)/)
    if (h3) {
      html.push(`<h3 style="font-family:'Playfair Display',serif;font-size:22px;font-weight:700;color:#e8e8ec;margin:40px 0 16px;line-height:1.25;">${inlineFormat(h3[1])}</h3>`)
      i++; continue
    }

    // ── H2
    const h2 = line.match(/^##\s+(.+)/)
    if (h2) {
      html.push(`<h2 style="font-family:'Playfair Display',serif;font-size:clamp(24px,3vw,36px);font-weight:700;color:#e8e8ec;margin:56px 0 20px;line-height:1.2;border-top:1px solid #2a2a30;padding-top:40px;">${inlineFormat(h2[1])}</h2>`)
      i++; continue
    }

    // ── H1
    const h1 = line.match(/^#\s+(.+)/)
    if (h1) {
      html.push(`<h1 style="font-family:'Playfair Display',serif;font-size:clamp(32px,4vw,48px);font-weight:900;color:#e8e8ec;margin:48px 0 24px;line-height:1.1;">${inlineFormat(h1[1])}</h1>`)
      i++; continue
    }

    // ── Section divider ---
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(line.trim())) {
      html.push(`
<div style="display:flex;align-items:center;gap:16px;margin:56px 0;">
  <div style="flex:1;height:1px;background:#2a2a30;"></div>
  <span style="font-family:'IBM Plex Mono',monospace;font-size:10px;color:#ff6b35;letter-spacing:3px;text-transform:uppercase;">§</span>
  <div style="flex:1;height:1px;background:#2a2a30;"></div>
</div>`)
      i++; continue
    }

    // ── Blockquote → editorial pull-quote
    if (/^>\s?/.test(line)) {
      const quoteLines: string[] = []
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        quoteLines.push(lines[i].replace(/^>\s?/, ""))
        i++
      }
      // Check if last line is a citation (starts with — or -)
      let cite = ""
      let quoteText = quoteLines.join(" ")
      const citeMatch = quoteText.match(/^(.*?)\s*—\s*(.+)$/)
      if (citeMatch) { quoteText = citeMatch[1]; cite = citeMatch[2] }

      html.push(`
<div style="margin:48px 0;padding:28px 36px;border-left:3px solid #ff3b3b;background:rgba(255,59,59,0.07);border-radius:0 4px 4px 0;">
  <p style="font-family:'Playfair Display',serif;font-size:clamp(18px,2.5vw,24px);font-style:italic;color:#e8e8ec;line-height:1.45;margin:0;">${inlineFormat(quoteText)}</p>
  ${cite ? `<cite style="display:block;margin-top:14px;font-family:'IBM Plex Mono',monospace;font-size:11px;color:#6b6b7a;letter-spacing:1px;font-style:normal;">— ${escapeHtml(cite)}</cite>` : ""}
</div>`)
      continue
    }

    // ── Unordered list
    if (/^[-*+]\s/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^[-*+]\s/.test(lines[i])) {
        items.push(inlineFormat(lines[i].replace(/^[-*+]\s/, "")))
        i++
      }
      html.push(`
<ul style="margin:24px 0;padding:0;list-style:none;display:flex;flex-direction:column;gap:10px;">
  ${items.map(it => `<li style="display:flex;gap:14px;font-size:17px;color:#c0c0cc;font-weight:300;line-height:1.65;"><span style="color:#ff6b35;flex-shrink:0;margin-top:2px;font-family:'IBM Plex Mono',monospace;font-size:12px;">→</span><span>${it}</span></li>`).join("")}
</ul>`)
      continue
    }

    // ── Ordered list
    if (/^\d+\.\s/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(inlineFormat(lines[i].replace(/^\d+\.\s/, "")))
        i++
      }
      html.push(`
<ol style="margin:24px 0;padding:0;list-style:none;display:flex;flex-direction:column;gap:10px;">
  ${items.map((it, idx) => `<li style="display:flex;gap:14px;font-size:17px;color:#c0c0cc;font-weight:300;line-height:1.65;"><span style="font-family:'Playfair Display',serif;font-size:20px;color:#2a2a30;font-weight:700;line-height:1;flex-shrink:0;width:28px;">${String(idx + 1).padStart(2, "0")}</span><span>${it}</span></li>`).join("")}
</ol>`)
      continue
    }

    // ── Empty line
    if (line.trim() === "") { i++; continue }

    // ── Paragraph
    const paraLines: string[] = []
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !/^(#{1,3}|>|[-*+]\s|\d+\.\s|```|-{3,}|\*{3,}|_{3,})/.test(lines[i])
    ) {
      paraLines.push(inlineFormat(lines[i]))
      i++
    }
    if (paraLines.length) {
      html.push(`<p style="font-size:17px;color:#c0c0cc;font-weight:300;line-height:1.75;margin:0 0 20px;">${paraLines.join(" ")}</p>`)
    }
  }

  return html.join("\n")
}

export function readingTime(content: string): number {
  return Math.max(1, Math.ceil(content.split(/\s+/).length / 200))
}
