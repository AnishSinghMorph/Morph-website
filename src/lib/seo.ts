/**
 * Shared metadata helper (SEO_GEO §2). Every route builds its Metadata through
 * this so titles, canonicals, Open Graph and Twitter cards stay consistent.
 */
import type { Metadata } from "next";
import { siteConfig, defaultTitle } from "@/content/site";

type CreateMetadataInput = {
  title?: string;
  description?: string;
  /** Path-only canonical, e.g. "/experience-center" (defaults to "/"). */
  path?: string;
  ogImage?: string;
};

export function createMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  ogImage = siteConfig.ogImage,
}: CreateMetadataInput = {}): Metadata {
  const url = new URL(path, siteConfig.url).toString();

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      url,
      title: title ?? defaultTitle,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? defaultTitle,
      description,
      images: [ogImage],
    },
  };
}
