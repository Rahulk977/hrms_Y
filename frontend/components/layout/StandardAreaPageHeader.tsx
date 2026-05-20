"use client";

import type { StandardAreaConfig } from "@/lib/area-configs";
import { toStandardSectionTitle } from "@/lib/standard-section-title";
import type { StandardSectionKey } from "@/types";

type Props = {
  config: StandardAreaConfig;
  activeSection: Exclude<StandardSectionKey, "dashboard">;
  itemCount: number;
  onSelectSection: (section: StandardSectionKey) => void;
};

export function StandardAreaPageHeader({ config, activeSection, itemCount, onSelectSection }: Props) {
  return (
    <div className="page-head">
      <div>
        <p>{config.label}</p>
        <h1>{toStandardSectionTitle(activeSection)}</h1>
        <span className="page-subtitle">{itemCount} modules ready for {toStandardSectionTitle(activeSection).toLowerCase()}.</span>
      </div>
      <div className="section-switcher">
        {config.listSections.map((section) => (
          <button type="button" className={activeSection === section ? "current" : ""} key={section} onClick={() => onSelectSection(section)}>
            {toStandardSectionTitle(section)}
          </button>
        ))}
      </div>
    </div>
  );
}
