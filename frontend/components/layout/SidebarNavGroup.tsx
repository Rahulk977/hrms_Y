"use client";

import { usePathname, useRouter } from "next/navigation";
import type { ModuleItem } from "@/types";

export type SidebarNavSection = { id: string; title: string; icon: string; items: ModuleItem[] };

export type SidebarNavGroupConfig = {
  areaId: string;
  label: string;
  icon: string;
  prefix: string;
  defaultOpenSection: string;
  ariaLabel: string;
  sections: SidebarNavSection[];
};

type SidebarNavGroupProps = {
  config: SidebarNavGroupConfig;
  expanded: boolean;
  openMenuId: string;
  activeSectionId: string | null;
  onToggleExpand: () => void;
  onOpenMenuChange: (sectionId: string) => void;
  onSelectSection: (sectionId: string) => void;
  onSelectModule: (sectionId: string, moduleTitle: string) => void;
};

export function SidebarNavGroup({
  config,
  expanded,
  openMenuId,
  activeSectionId,
  onToggleExpand,
  onOpenMenuChange,
  onSelectSection,
  onSelectModule,
}: SidebarNavGroupProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname.startsWith(config.prefix);

  return (
    <div className="nav-group">
      <div className={`nav-group-title ${isActive ? "active" : ""}`}>
        <button
          type="button"
          className="group-title"
          onClick={() => {
            router.push(config.prefix);
            if (!expanded) onToggleExpand();
          }}
        >
          <span className="nav-icon">{config.icon}</span>
          {config.label}
        </button>
        <button
          type="button"
          className="nav-chevron"
          aria-expanded={expanded}
          aria-label={`${expanded ? "Collapse" : "Expand"} ${config.label}`}
          onClick={onToggleExpand}
        >
          {expanded ? "⌄" : "›"}
        </button>
      </div>
      {expanded && (
        <div className="nav-group-children" role="group" aria-label={config.ariaLabel}>
          {config.sections.map((section) => {
            const sectionOpen = openMenuId === section.id;
            return (
              <div className="subgroup" key={section.id}>
                <div className={`subhead-row ${activeSectionId === section.id ? "selected" : ""}`}>
                  <button
                    type="button"
                    className="subhead"
                    onClick={() => {
                      onSelectSection(section.id);
                      if (!sectionOpen) onOpenMenuChange(section.id);
                    }}
                  >
                    <span className="nav-icon nav-icon--nested">{section.icon}</span>
                    {section.title}
                  </button>
                  <button
                    type="button"
                    className="nav-chevron nav-chevron--nested"
                    aria-expanded={sectionOpen}
                    aria-label={`${sectionOpen ? "Collapse" : "Expand"} ${section.title}`}
                    onClick={() => onOpenMenuChange(sectionOpen ? "" : section.id)}
                  >
                    {sectionOpen ? "⌄" : "‹"}
                  </button>
                </div>
                {sectionOpen && (
                  <div className="submenu">
                    {section.items.map((item) => (
                      <button
                        type="button"
                        key={item.title}
                        onClick={() => {
                          onSelectSection(section.id);
                          onSelectModule(section.id, item.title);
                        }}
                      >
                        <span className="submenu-bullet">›</span>
                        {item.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
