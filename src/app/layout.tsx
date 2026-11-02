import type { Metadata, Viewport } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { pagesUrl, site } from "@/lib/site";
import "./globals.css";

const serif = Fraunces({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const sans = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(pagesUrl),
  title: {
    default: `Handmade candles · ${site.fullName}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [...site.keywords],
  authors: [{ name: site.fullName, url: site.instagram }],
  creator: site.fullName,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.fullName} · handmade candles`,
    description: site.description,
    url: pagesUrl,
    siteName: site.fullName,
    locale: "en_US",
    images: [{ url: "/images/fruit-pour.jpg", alt: "Four handmade fruit candles from Cozy Corner by Honey" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.fullName} · handmade candles`,
    description: site.description,
    images: ["/images/fruit-pour.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f7f1ea",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <a className="skip" href="#content">
          Skip to content
        </a>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "OnlineStore",
            name: site.fullName,
            url: pagesUrl,
            description: site.description,
            image: `${pagesUrl}/images/fruit-pour.jpg`,
            sameAs: [site.instagram],
          }}
        />
        <Header />
        <main id="content">{children}</main>
        <Footer />
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </body>
    </html>
  );
}
