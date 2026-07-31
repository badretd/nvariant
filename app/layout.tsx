import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Header, HashHighlight, Logo } from "@/components/ui";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://n-variant.example"),
  title: { default: "N-вариант — цифровой журнал", template: "%s — N-вариант" },
  description: "N-вариант — цифровой журнал и архив творческих попыток.",
  alternates: { canonical: "/" },
  openGraph: { siteName: "N-вариант", locale: "ru_RU", type: "website", title: "N-вариант", description: "Цифровой журнал об идеях, ошибках и новых вариантах." },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru" suppressHydrationWarning><head>
    <link rel="icon" type="image/svg+xml" href="/brand/nvariant-logo-light.svg" media="(prefers-color-scheme: light)" />
    <link rel="icon" type="image/svg+xml" href="/brand/nvariant-logo-dark.svg" media="(prefers-color-scheme: dark)" />
  </head><body><a className="skip-link" href="#main">К содержанию</a><Header /><HashHighlight />{children}<footer><LinkFooter /></footer><Analytics /></body></html>;
}
function LinkFooter() { return <><span className="footer-brand"><Logo /> N-вариант</span><span>© 2026 Имран Бадретдинов · RSS: <a href="/materials.xml">материалы</a> / <a href="/issues.xml">выпуски</a></span></>; }
