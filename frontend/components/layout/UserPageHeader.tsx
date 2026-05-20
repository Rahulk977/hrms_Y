"use client";

import { toUserSectionTitle } from "@/lib/user-sections";
import type { UserSectionKey } from "@/types";

type Props = {
  activeSection: UserSectionKey;
  itemCount: number;
  onSelectSection: (section: UserSectionKey) => void;
};

export function UserPageHeader({ activeSection, itemCount, onSelectSection }: Props) {
  const sections: UserSectionKey[] = ["master-creation", "report-search"];
  return (
    <div className="page-head">
      <div>
        <p>User Management</p>
        <h1>{toUserSectionTitle(activeSection)}</h1>
        <span className="page-subtitle">{itemCount} modules ready for {toUserSectionTitle(activeSection).toLowerCase()}.</span>
      </div>
      <div className="section-switcher">
        {sections.map((section) => (
          <button type="button" className={activeSection === section ? "current" : ""} key={section} onClick={() => onSelectSection(section)}>
            {toUserSectionTitle(section)}
          </button>
        ))}
      </div>
    </div>
  );
}
