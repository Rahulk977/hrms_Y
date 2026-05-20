"use client";

import { useRouter } from "next/navigation";
import type { StandardAreaConfig } from "@/lib/area-configs";
import { toStandardSectionTitle } from "@/lib/standard-section-title";

export function AreaDashboardOverview({ config }: { config: StandardAreaConfig }) {
  const router = useRouter();
  const highlights = [
    { label: "Open Items", value: "124", tone: "var(--brand)" },
    { label: "Pending", value: "18", tone: "var(--amber)" },
    { label: "Completed (MTD)", value: "892", tone: "var(--green)" },
    { label: "Success Rate", value: "96%", tone: "var(--accent)" },
  ];

  return (
    <div className="area-console">
      <div className="area-console__header">
        <p style={{ color: "var(--brand)", fontSize: "12px", fontWeight: 800, letterSpacing: "0.12em", margin: "0 0 8px", textTransform: "uppercase" }}>{config.label} Dashboard</p>
        <h1 className="area-console__title">Portfolio overview</h1>
        <p className="area-console__subtitle">Summary metrics and quick links to operational modules.</p>
      </div>
      <div style={{ display: "grid", gap: "16px", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", marginBottom: "28px" }}>
        {highlights.map((item) => (
          <article key={item.label} className="panel-card" style={{ padding: "20px" }}>
            <span style={{ color: "var(--muted)", fontSize: "13px", fontWeight: 600 }}>{item.label}</span>
            <strong style={{ display: "block", fontSize: "28px", color: item.tone, marginTop: "10px" }}>{item.value}</strong>
          </article>
        ))}
      </div>
      <div className="module-list">
        {config.listSections.map((sec) => (
          <article key={sec} className="module-list-item panel-card" onClick={() => router.push(`${config.prefix}/${sec}`)}>
            <div className="module-list-item__main">
              <span className="module-list-item__icon" aria-hidden>{sec === "master-creation" ? "⚙️" : sec === "manage" ? "📋" : "📊"}</span>
              <div><h2>{toStandardSectionTitle(sec)}</h2><p>Browse {toStandardSectionTitle(sec).toLowerCase()} modules.</p></div>
            </div>
            <button type="button" className="module-list-item__action">Open &raquo;</button>
          </article>
        ))}
      </div>
    </div>
  );
}
