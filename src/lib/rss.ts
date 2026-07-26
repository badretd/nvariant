const escape = (s: string) => s.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c]!);
export function rss(title: string, description: string, items: { title: string; description: string; date: string; url: string }[]) {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://n-variant.example";
  return `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${escape(title)}</title><link>${base}</link><description>${escape(description)}</description><language>ru</language>${items.map((i) => `<item><title>${escape(i.title)}</title><link>${base}${i.url}</link><guid>${base}${i.url}</guid><pubDate>${new Date(`${i.date}T12:00:00Z`).toUTCString()}</pubDate><description>${escape(i.description)}</description></item>`).join("")}</channel></rss>`;
}
