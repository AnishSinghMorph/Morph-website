import type { Metadata, Viewport } from "next";
import { Exo, Manrope } from "next/font/google";
import "@/styles/globals.css";
import { siteConfig, defaultTitle } from "@/content/site";
import { organizationJsonLd, websiteJsonLd } from "@/lib/jsonld";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SmoothScroll } from "@/lib/lenis";

/** Display + UI typeface (Figma `190-33`). Self-hosted, no layout shift. */
const fontExo = Exo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-exo",
  display: "swap",
});

/**
 * Body placeholder for Fellix. Figma's body face is "Fellix-TRIAL" — Fellix is
 * commercial and not on Google Fonts. Manrope is a close free stand-in.
 * TODO: swap this one call for the licensed Fellix when supplied.
 */
const fontFellix = Manrope({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-fellix",
  display: "swap",
});

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: defaultTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    url: siteConfig.url,
    title: defaultTitle,
    description: siteConfig.description,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontExo.variable} ${fontFellix.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bg text-fg">
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <SmoothScroll>
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}
