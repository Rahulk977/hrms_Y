"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { ModuleGrid } from "@/components/modules/ModuleGrid";
import { AreaDashboardOverview } from "@/components/areas/AreaDashboardOverview";
import type { StandardAreaConfig } from "@/lib/area-configs";
import { slugify } from "@/lib/slugify";
import type { StandardSectionKey } from "@/types";

export function AreaSectionPage({ config }: { config: StandardAreaConfig }) {
  const params = useParams();
  const router = useRouter();
  const section = params.section as string;
  const valid = useMemo(() => config.sections.includes(section as StandardSectionKey), [config.sections, section]);

  if (!valid) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h1 style={{ color: "var(--accent)" }}>404 - Section Not Found</h1>
        <button type="button" onClick={() => router.push(config.prefix)} style={{ marginTop: "16px" }}>Back</button>
      </div>
    );
  }
  if (section === "dashboard") return <AreaDashboardOverview config={config} />;
  const items = config.sectionItems[section as Exclude<StandardSectionKey, "dashboard">];
  return <ModuleGrid items={items} onSelectModule={(title) => router.push(`${config.prefix}/${section}/${slugify(title)}`)} />;
}
