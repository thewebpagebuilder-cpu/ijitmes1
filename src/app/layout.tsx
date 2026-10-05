import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { BackToTop, PageTransition, ScrollProgress } from "@/components/motion";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ijitmes.com"),
  title: {
    default: "IJITMES | Engineering & Science Research Journal",
    template: "%s | IJITMES",
  },
  description:
    "International Journal of Innovative Technologies and Modern Trends in Engineering and Science — a peer-reviewed, open-access research journal.",
  keywords: [
    "engineering journal",
    "science journal",
    "open access research",
    "peer reviewed journal",
    "IJITMES",
  ],
  icons: {
    icon: "/images/logo.jpg",
    apple: "/images/logo.jpg",
  },
  openGraph: {
    type: "website",
    siteName: "IJITMES",
    title: "IJITMES | Engineering & Science Research Journal",
    description: "Peer-reviewed, open-access research across engineering, technology and applied science.",
    images: [{ url: "/images/logo.jpg", width: 1080, height: 1080, alt: "IJITMES logo" }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#a5174e",
};

const themeBootstrap = `(function(){try{var t=localStorage.getItem('ijitmes-theme');
document.documentElement.dataset.theme=(t==='classic')?'classic':'signature';}catch(e){
document.documentElement.dataset.theme='signature';}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="signature">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body>
        <a className="skipLink" href="#main-content">Skip to main content</a>
        <ScrollProgress />
        <SiteHeader />
        <main id="main-content">
          <PageTransition>{children}</PageTransition>
        </main>
        <SiteFooter />
        <BackToTop />
      </body>
    </html>
  );
}
