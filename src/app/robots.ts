import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";

/**
 * robots.txt. Allows search crawlers AND major AI answer-engine crawlers
 * (SEO_GEO §4 — default: allow, so Morph is citable by ChatGPT, Perplexity,
 * Claude, Gemini/Google AI Overviews). Flip to `disallow` if the business
 * decides otherwise.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "OAI-SearchBot",
          "PerplexityBot",
          "ClaudeBot",
          "Claude-Web",
          "Google-Extended",
          "Applebot-Extended",
          "CCBot",
        ],
        allow: "/",
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
