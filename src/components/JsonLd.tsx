/**
 * Renders a JSON-LD <script>. Server component — the structured data ships in
 * the SSR HTML so search + AI crawlers read it without executing JS.
 */
type JsonLdData = Record<string, unknown> | Record<string, unknown>[];

export function JsonLd({ data }: { data: JsonLdData }) {
  return (
    <script
      type="application/ld+json"
      // Data is built from typed, in-repo constants (no user input).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
