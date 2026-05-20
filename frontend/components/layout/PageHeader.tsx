"use client";

import { toSectionTitle } from "@/lib/sections";
import type { SectionKey } from "@/types";

type PageHeaderProps = {
  activeSection: Exclude<SectionKey, "dashboard">;
  itemCount: number;
  onSelectSection: (section: Exclude<SectionKey, "dashboard">) => void;
};

export function PageHeader({ activeSection, itemCount, onSelectSection }: PageHeaderProps) {
  return (
    <div className="page-head">
      <div>
        <p>Phase 1 HRMS</p>
        <h1>{toSectionTitle(activeSection)}</h1>
        <span className="page-subtitle">
          {itemCount} shortcuts ready for {toSectionTitle(activeSection).toLowerCase()}.
        </span>
      </div>
      <div className="section-switcher">
        {(["master", "manage", "report"] as const).map((section) => (
          <button
            type="button"
            className={activeSection === section ? "current" : ""}
            key={section}
            onClick={() => onSelectSection(section)}
          >
            {toSectionTitle(section)}
          </button>
        ))}
      </div>
    </div>
  );
}
