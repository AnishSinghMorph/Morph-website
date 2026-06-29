/**
 * JSON-LD structured-data builders. Feeds both SEO and GEO (AI answer engines
 * lean on structured data to extract facts). Keep every asserted fact in sync
 * with visible on-page copy — never claim what isn't on the page (SEO_GEO §3).
 */
import { siteConfig } from "@/content/site";

/** Absolute URL helper against the configured production domain. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, siteConfig.url).toString();
}

/** Site-wide Organization. Injected once in the root layout. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    description: siteConfig.description,
    logo: absoluteUrl("/icons/logo.svg"), // TODO: real logo asset (Phase 1/5)
    ...(siteConfig.sameAs.length > 0 ? { sameAs: siteConfig.sameAs } : {}),
  } as const;
}

/** Site-wide WebSite node. */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "en",
    publisher: { "@id": absoluteUrl("/#organization") },
  } as const;
}
