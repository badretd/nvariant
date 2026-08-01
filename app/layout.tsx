import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Header, HashHighlight, Logo } from "@/components/ui";
import { siteDescription, siteName, siteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "N-вариант — цифровой журнал", template: `%s — ${siteName}` },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: "Редакция N-варианта", url: "/about" }],
  creator: "N-вариант",
  publisher: "N-вариант",
  category: "Культура",
  keywords: ["N-вариант", "N вариант", "N-вариант журнал", "журнал N-вариант", "цифровой журнал", "творческий журнал"],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: { url: "/", siteName, locale: "ru_RU", type: "website", title: "N-вариант — цифровой журнал", description: siteDescription },
  twitter: { card: "summary_large_image", title: "N-вариант — цифровой журнал", description: siteDescription },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru" suppressHydrationWarning><head>
    <link rel="icon" type="image/svg+xml" href="/brand/nvariant-logo-light.svg" media="(prefers-color-scheme: light)" />
    <link rel="icon" type="image/svg+xml" href="/brand/nvariant-logo-dark.svg" media="(prefers-color-scheme: dark)" />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: siteName, alternateName: ["N вариант", "N-Variant"], url: siteUrl, logo: `${siteUrl}/brand/nvariant-logo-light.svg` },
        { "@type": "WebSite", "@id": `${siteUrl}/#website`, url: siteUrl, name: siteName, alternateName: ["N вариант", "N-вариант журнал"], description: siteDescription, inLanguage: "ru-RU", publisher: { "@id": `${siteUrl}/#organization` }, potentialAction: { "@type": "SearchAction", target: { "@type": "EntryPoint", urlTemplate: `${siteUrl}/search?q={search_term_string}` }, "query-input": "required name=search_term_string" } },
      ],
    }).replace(/</g, "\\u003c") }} />
  </head><body><a className="skip-link" href="#main">К содержанию</a><Header /><HashHighlight />{children}<footer><LinkFooter /></footer><Analytics /></body></html>;
}
function LinkFooter() { return <><span className="footer-brand"><Logo /> N-вариант</span><span>© 2026 Имран Бадретдинов · RSS: <a href="/materials.xml">материалы</a> / <a href="/issues.xml">выпуски</a></span></>; }
