"use client";

import type { ModuleItem } from "@/types";
import { ModuleCard } from "./ModuleCard";
import { useMemo, useState } from "react";

type ModuleGridProps = {
  items: ModuleItem[];
  onSelectModule: (title: string) => void;
};

export function ModuleGrid({ items, onSelectModule }: ModuleGridProps) {
  const [filter, setFilter] = useState("");
  const [isGridView, setIsGridView] = useState(false);

  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      item.title.toLowerCase().includes(filter.toLowerCase())
    );
  }, [items, filter]);

  return (
    <section className="module-section">
      <div className="module-toolbar">
        <label>
          <span>⌕</span>
          <input
            placeholder="Filter phase 1 modules"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </label>
        <button onClick={() => setIsGridView((prev) => !prev)} style={{ transition: "all 0.15s ease" }}>
          {isGridView ? "List View" : "Grid View"}
        </button>
      </div>

      {isGridView ? (
        <div className="module-grid">
          {filteredItems.map((item, index) => (
            <ModuleCard index={index} item={item} key={item.title} onSelect={onSelectModule} />
          ))}
        </div>
      ) : (
        <div className="module-list" style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "16px" }}>
          {filteredItems.map((item, index) => (
            <article
              key={item.title}
              className="panel-card"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 24px",
                cursor: "pointer",
                transition: "transform 150ms ease, box-shadow 150ms ease",
              }}
              onClick={() => onSelectModule(item.title)}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <span
                  style={{
                    background: "var(--brand-dark)",
                    color: "#fff",
                    borderRadius: "6px",
                    width: "36px",
                    height: "36px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: 700,
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--ink)", margin: 0 }}>{item.title}</h3>
                  <p style={{ fontSize: "13px", color: "var(--muted)", margin: "4px 0 0 0" }}>
                    {item.description ?? "Open module workspace and related actions."}
                  </p>
                </div>
              </div>
              <button
                style={{
                  background: "transparent",
                  border: "1px solid var(--line)",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  color: "var(--brand)",
                  fontWeight: 600,
                  fontSize: "13px",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectModule(item.title);
                }}
              >
                Open &raquo;
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
