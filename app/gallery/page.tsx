import type { Metadata } from "next"; import { GalleryBrowser } from "@/components/gallery-browser";
export const metadata: Metadata = { title: "Галерея", description: "Полный визуальный индекс N-вариант.", alternates: { canonical: "/gallery" } };
export default function GalleryPage() { return <main id="main" className="page-shell wide"><header className="page-title"><span className="eyebrow">Все публичные файлы</span><h1>Галерея</h1><p>Обложки, изображения, иллюстрации и видео со связями с публикациями.</p></header><GalleryBrowser /></main>; }
