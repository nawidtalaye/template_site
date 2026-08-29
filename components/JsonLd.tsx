/**
 * Renders one JSON-LD `@graph` document. Kept as a component so every page
 * emits structured data the same way and the serialisation is escaped once.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\u003c"),
      }}
    />
  );
}
