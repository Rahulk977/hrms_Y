import { sectionItems } from "@/data/modules";
import { PROFILE_PREFIX, PROFILE_SECTIONS, profileSectionForSlug } from "@/data/profile";
import { lmsSectionItems } from "@/data/lms";
import { loanSectionItems } from "@/data/loan-management";
import { losSectionItems } from "@/data/los-management";
import { tvrSectionItems } from "@/data/tvr-management";
import { userSectionItems } from "@/data/user-management";
import type { SidebarNavGroupConfig } from "@/components/layout/SidebarNavGroup";
import { toSectionTitle } from "@/lib/sections";
import { toStandardSectionTitle } from "@/lib/standard-section-title";
import { toUserSectionTitle } from "@/lib/user-sections";

export const HR_SIDEBAR: SidebarNavGroupConfig = {
  areaId: "hr", label: "HR Management", icon: "▦", prefix: "/hrmanagement",
  defaultOpenSection: "master", ariaLabel: "HR Management submenu",
  sections: [
    { id: "master", title: toSectionTitle("master"), icon: "⚙", items: sectionItems.master },
    { id: "manage", title: toSectionTitle("manage"), icon: "▤", items: sectionItems.manage },
    { id: "report", title: toSectionTitle("report"), icon: "✎", items: sectionItems.report },
  ],
};

export const USER_SIDEBAR: SidebarNavGroupConfig = {
  areaId: "user", label: "User Management", icon: "⚙", prefix: "/user-management",
  defaultOpenSection: "master-creation", ariaLabel: "User Management submenu",
  sections: [
    { id: "master-creation", title: toUserSectionTitle("master-creation"), icon: "⚙", items: userSectionItems["master-creation"] },
    { id: "report-search", title: toUserSectionTitle("report-search"), icon: "✎", items: userSectionItems["report-search"] },
  ],
};

function stdSidebar(id: string, label: string, icon: string, prefix: string, items: typeof loanSectionItems): SidebarNavGroupConfig {
  return {
    areaId: id, label, icon, prefix, defaultOpenSection: "master-creation", ariaLabel: `${label} submenu`,
    sections: [
      { id: "master-creation", title: toStandardSectionTitle("master-creation"), icon: "⚙", items: items["master-creation"] },
      { id: "manage", title: toStandardSectionTitle("manage"), icon: "▤", items: items.manage },
      { id: "report-search", title: toStandardSectionTitle("report-search"), icon: "✎", items: items["report-search"] },
    ],
  };
}

export const LOAN_SIDEBAR = stdSidebar("loan", "Loan Management", "▥", "/loan-management", loanSectionItems);
export const LMS_SIDEBAR = stdSidebar("lms", "LMS", "◫", "/lms", lmsSectionItems);
export const LOS_SIDEBAR = stdSidebar("los", "LOS Management", "▧", "/los-management", losSectionItems);
export const TVR_SIDEBAR = stdSidebar("tvr", "TVR Management", "◩", "/tvr-management", tvrSectionItems);

export const PROFILE_SIDEBAR: SidebarNavGroupConfig = {
  areaId: "profile", label: "Profile", icon: "▱", prefix: PROFILE_PREFIX,
  defaultOpenSection: "applications", ariaLabel: "Profile submenu",
  sections: PROFILE_SECTIONS.map((s) => ({ id: s.id, title: s.title, icon: s.icon, items: s.items })),
};

export const ALL_SIDEBAR_AREAS = [HR_SIDEBAR, USER_SIDEBAR, LOAN_SIDEBAR, LMS_SIDEBAR, LOS_SIDEBAR, TVR_SIDEBAR, PROFILE_SIDEBAR];

export function getSidebarAreaFromPath(pathname: string) {
  return ALL_SIDEBAR_AREAS.find((a) => pathname.startsWith(a.prefix)) ?? null;
}

export function getActiveSidebarSectionId(pathname: string, config: SidebarNavGroupConfig): string | null {
  if (!pathname.startsWith(config.prefix)) return null;
  if (config.areaId === "hr") {
    if (pathname.includes("/manage")) return "manage";
    if (pathname.includes("/report")) return "report";
    if (pathname.includes("/master")) return "master";
    return null;
  }
  if (config.areaId === "profile") {
    const sectionSlug = pathname.slice(config.prefix.length).split("/").filter(Boolean)[0];
    if (sectionSlug === "applications" || sectionSlug === "approvals" || sectionSlug === "my-records") {
      return sectionSlug;
    }
    return sectionSlug ? profileSectionForSlug(sectionSlug) : null;
  }
  if (pathname.includes("report-search")) return "report-search";
  if (pathname.includes("master-creation")) return "master-creation";
  if (pathname.includes("/manage")) return "manage";
  return null;
}
