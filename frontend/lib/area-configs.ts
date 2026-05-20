import { LMS_SECTIONS, lmsSectionForSlug, lmsSectionItems } from "@/data/lms";
import { LOS_SECTIONS, losSectionForSlug, losSectionItems } from "@/data/los-management";
import { LOAN_SECTIONS, loanSectionForSlug, loanSectionItems } from "@/data/loan-management";
import { TVR_SECTIONS, tvrSectionForSlug, tvrSectionItems } from "@/data/tvr-management";
import { USER_SECTIONS, userSectionForSlug, userSectionItems } from "@/data/user-management";
import type { ModuleItem, StandardSectionKey, UserSectionKey } from "@/types";

export type StandardAreaConfig = {
  id: string;
  label: string;
  prefix: string;
  icon: string;
  consoleTitle: string;
  consoleSubtitle: string;
  sections: StandardSectionKey[];
  sectionItems: Record<Exclude<StandardSectionKey, "dashboard">, ModuleItem[]>;
  sectionForSlug: (slug: string) => Exclude<StandardSectionKey, "dashboard">;
  listSections: readonly Exclude<StandardSectionKey, "dashboard">[];
};

export type UserAreaConfig = {
  id: string;
  label: string;
  prefix: string;
  icon: string;
  consoleTitle: string;
  consoleSubtitle: string;
  sections: UserSectionKey[];
  sectionItems: Record<UserSectionKey, ModuleItem[]>;
  sectionForSlug: (slug: string) => UserSectionKey;
  listSections: readonly UserSectionKey[];
};

export const LOAN_AREA: StandardAreaConfig = {
  id: "loan",
  label: "Loan Management",
  prefix: "/loan-management",
  icon: "▥",
  consoleTitle: "Loan Management Console",
  consoleSubtitle: "Manage loan masters, daily operations, portfolio dashboard, and analytical reports.",
  sections: LOAN_SECTIONS,
  sectionItems: loanSectionItems,
  sectionForSlug: loanSectionForSlug,
  listSections: ["master-creation", "manage", "report-search"],
};

export const LMS_AREA: StandardAreaConfig = {
  id: "lms",
  label: "LMS",
  prefix: "/lms",
  icon: "◫",
  consoleTitle: "LMS Console",
  consoleSubtitle: "Lead management, caller assignment, contact tracking, and calling analytics.",
  sections: LMS_SECTIONS,
  sectionItems: lmsSectionItems,
  sectionForSlug: lmsSectionForSlug,
  listSections: ["master-creation", "manage", "report-search"],
};

export const LOS_AREA: StandardAreaConfig = {
  id: "los",
  label: "LOS Management",
  prefix: "/los-management",
  icon: "▧",
  consoleTitle: "LOS Management Console",
  consoleSubtitle: "Loan origination masters, approvals, disbursements, and application reporting.",
  sections: LOS_SECTIONS,
  sectionItems: losSectionItems,
  sectionForSlug: losSectionForSlug,
  listSections: ["master-creation", "manage", "report-search"],
};

export const TVR_AREA: StandardAreaConfig = {
  id: "tvr",
  label: "TVR Management",
  prefix: "/tvr-management",
  icon: "◩",
  consoleTitle: "TVR Management Console",
  consoleSubtitle: "Technical verification, cattle valuation, approvals, and TVR reporting.",
  sections: TVR_SECTIONS,
  sectionItems: tvrSectionItems,
  sectionForSlug: tvrSectionForSlug,
  listSections: ["master-creation", "manage", "report-search"],
};

export const USER_AREA: UserAreaConfig = {
  id: "user",
  label: "User Management",
  prefix: "/user-management",
  icon: "⚙",
  consoleTitle: "User Management Console",
  consoleSubtitle: "Manage user access, privileges, credentials, and audit reports across the organization.",
  sections: USER_SECTIONS,
  sectionItems: userSectionItems,
  sectionForSlug: userSectionForSlug,
  listSections: ["master-creation", "report-search"],
};

export const STANDARD_NAV_AREAS: StandardAreaConfig[] = [LOAN_AREA, LMS_AREA, LOS_AREA, TVR_AREA];

export function getStandardAreaFromPath(pathname: string): StandardAreaConfig | null {
  return STANDARD_NAV_AREAS.find((a) => pathname.startsWith(a.prefix)) ?? null;
}

export function getActiveStandardSection(
  pathname: string,
  area: StandardAreaConfig
): StandardSectionKey | null {
  if (!pathname.startsWith(area.prefix)) return null;
  if (pathname.includes("report-search")) return "report-search";
  if (pathname.includes("master-creation")) return "master-creation";
  if (pathname.includes("/manage")) return "manage";
  if (pathname.includes("/dashboard")) return "dashboard";
  return null;
}
