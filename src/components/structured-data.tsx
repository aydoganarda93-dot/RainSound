import type { JsonLd } from "@/lib/seo";

type StructuredDataProps = {
  data: JsonLd | JsonLd[];
};

export function StructuredData({ data }: StructuredDataProps) {
  const graph = Array.isArray(data) ? data : [data];

  if (graph.length === 0) {
    return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph.length === 1 ? graph[0] : graph),
      }}
    />
  );
}
