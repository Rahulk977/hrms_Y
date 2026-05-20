"use client";

import { PROFILE_SECTIONS } from "@/data/profile";
import type { ProfileSectionId } from "@/types";

type Props = {
  activeSection: ProfileSectionId;
  itemCount: number;
  onSelectSection: (section: ProfileSectionId) => void;
};

export function ProfilePageHeader({ activeSection, itemCount, onSelectSection }: Props) {
  const active = PROFILE_SECTIONS.find((s) => s.id === activeSection);

  return (
    <div className="page-head">
      <div>
        <p>Profile</p>
        <h1>{active?.title ?? activeSection}</h1>
        <span className="page-subtitle">
          {itemCount} modules ready for {(active?.title ?? activeSection).toLowerCase()}.
        </span>
      </div>
      <div className="section-switcher">
        {PROFILE_SECTIONS.map((section) => (
          <button
            type="button"
            className={activeSection === section.id ? "current" : ""}
            key={section.id}
            onClick={() => onSelectSection(section.id)}
          >
            {section.title}
          </button>
        ))}
      </div>
    </div>
  );
}
