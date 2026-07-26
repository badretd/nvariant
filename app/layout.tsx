import type { Metadata } from "next";
import { Header, HashHighlight } from "@/components/ui";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://n-variant.example"),
  title: { default: "N-вариант — цифровой журнал", template: "%s — N-вариант" },
  description: "Русскоязычный цифровой журнал о людях, идеях, технологиях и культуре.",
  alternates: { canonical: "/" },
  openGraph: { siteName: "N-вариант", locale: "ru_RU", type: "website", title: "N-вариант", description: "Цифровой журнал о точках сборки повседневности." },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru" suppressHydrationWarning><body><a className="skip-link" href="#main">К содержанию</a><Header /><HashHighlight />{children}<footer><LinkFooter /></footer></body></html>;
}
function LinkFooter() { return <><span>[N] · N-вариант</span><span>© 2026 Имран Бадретдинов · RSS: <a href="/materials.xml">материалы</a> / <a href="/issues.xml">выпуски</a></span></>; }
