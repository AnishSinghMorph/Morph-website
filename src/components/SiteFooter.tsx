/**
 * PLACEHOLDER footer — replaced in Phase 1 with the Figma footer (links,
 * socials, big MORPH wordmark). Minimal for now; provides footer sitemap links.
 */
import Link from "next/link";
import { mainNav, siteConfig } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto flex max-w-[var(--container-max)] flex-col gap-6 px-[var(--margin-page)] py-10 text-sm text-muted">
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/" className="hover:text-fg">
                Home
              </Link>
            </li>
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-fg">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p>
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
      </div>
    </footer>
  );
}
