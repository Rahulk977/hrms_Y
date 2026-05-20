"use client";

import { useRouter } from "next/navigation";
import type { StandardAreaConfig } from "@/lib/area-configs";
import { toStandardSectionTitle } from "@/lib/standard-section-title";

const META: Record<string, { icon: string; color: string; desc: string }> = {
  dashboard: { icon: "◴", color: "var(--brand)", desc: "Overview metrics and quick navigation." },
  "master-creation": { icon: "⚙️", color: "var(--green)", desc: "Configure masters and reference data." },
  manage: { icon: "📋", color: "var(--amber)", desc: "Daily operations and workflow actions." },
  "report-search": { icon: "📊", color: "var(--accent)", desc: "Reports and searchable analytics." },
};

export function AreaConsolePage({ config }: { config: StandardAreaConfig }) {
  const router = useRouter();
  return (
    <div className="area-console">
      <div className="area-console__header">
        <h1 className="area-console__title">{config.label} Console</h1>
        <p className="area-console__subtitle">{config.consoleSubtitle ?? "Select a category below."}</p>
      </div>
      <div className="module-list">
        {config.sections.map((sec) => {
          const m = META[sec];
          return (
            <article key={sec} className="module-list-item panel-card" onClick={() => router.push(`${config.prefix}/${sec}`)}>
              <div className="module-list-item__main">
                <span className="module-list-item__icon" aria-hidden>{m.icon}</span>
                <div><h2>{toStandardSectionTitle(sec)}</h2><p>{m.desc}</p></div>
              </div>
              <button type="button" className="module-list-item__action" style={{ color: m.color, borderColor: m.color }} onClick={(e) => { e.stopPropagation(); router.push(`${config.prefix}/${sec}`); }}>Explore Modules &raquo;</button>
            </article>
          );
        })}
      </div>
    </div>
  );
}
