import type { Metadata } from "next"; import { PeopleBrowser } from "@/components/people-browser";
export const metadata: Metadata = { title: "Люди", description: "Авторы, участники и герои N-вариант.", alternates: { canonical: "/people" } };
export default function PeoplePage() { return <main id="main" className="page-shell"><header className="page-title"><span className="eyebrow">Указатель</span><h1>Люди</h1><p>Авторы, исследователи, фотографы и герои материалов.</p></header><PeopleBrowser /></main>; }
