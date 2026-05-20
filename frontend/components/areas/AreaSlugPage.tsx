"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import type { StandardAreaConfig } from "@/lib/area-configs";
import { slugify } from "@/lib/slugify";
import { toStandardSectionTitle } from "@/lib/standard-section-title";
import type { StandardSectionKey } from "@/types";

export function AreaSlugPage({ config, emoji = "📄" }: { config: StandardAreaConfig; emoji?: string }) {
  const params = useParams();
  const router = useRouter();
  const section = params.section as string;
  const slug = params.slug as string;
  const valid = config.sections.includes(section as StandardSectionKey) && section !== "dashboard";

  const title = useMemo(() => {
    if (!valid) return null;
    const items = config.sectionItems[section as Exclude<StandardSectionKey, "dashboard">];
    return items.find((i) => slugify(i.title) === slug)?.title ?? slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  }, [config, section, slug, valid]);

  if (!valid || !title) {
    return <div style={{ padding: "40px", textAlign: "center" }}><button type="button" onClick={() => router.push(config.prefix)}>Back</button></div>;
  }

  const sectionLabel = toStandardSectionTitle(section as StandardSectionKey);
  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "40px auto" }} className="panel-card">
      <h1 style={{ fontSize: "24px" }}>{emoji} {title}</h1>
      <p style={{ color: "var(--muted)", margin: "16px 0" }}>{config.label} / {sectionLabel} — Phase 2 placeholder</p>
      <button type="button" onClick={() => router.push(`${config.prefix}/${section}`)} style={{ marginTop: "24px", background: "var(--brand)", color: "#fff", padding: "10px 20px", border: 0, borderRadius: "8px" }}>&larr; Back to {sectionLabel}</button>
    </div>
  );
}
