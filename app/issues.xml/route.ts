import { issues } from "@/content/registry"; import { rss } from "@/lib/rss";
export const dynamic = "force-static";
export function GET() { return new Response(rss("Выпуски — N-вариант", "Новые выпуски цифрового журнала.", issues.map((i) => ({ title: `№${i.number} ${i.title}`, description: i.description, date: i.publishedAt, url: `/issues/${i.slug}` }))), { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } }); }
