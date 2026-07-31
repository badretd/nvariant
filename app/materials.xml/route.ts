import { publicMaterials } from "@/content/registry"; import { rss } from "@/lib/rss";
export const dynamic = "force-static";
export function GET() { return new Response(rss("Материалы — N-вариант", "Новые материалы цифрового журнала.", publicMaterials.map((m) => ({ title: m.title, description: m.description, date: m.publishedAt, url: `/materials/${m.slug}` }))), { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } }); }
