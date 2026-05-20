import { slugify } from "@/lib/slugify";
import type { ModuleItem, UserSectionKey } from "@/types";

export const USER_SECTIONS: UserSectionKey[] = ["master-creation", "report-search"];

const userMasterCreationItems: ModuleItem[] = [
  { title: "App Location Rights", description: "Configure application access by location and branch.", featured: true },
  { title: "Employee Status", description: "Manage active, inactive, and suspended employee states.", featured: true },
  { title: "User Privilege", description: "Assign roles, menus, and permission sets to users.", featured: true },
  { title: "Change User Password", description: "Reset or update credentials for system users." },
];

const userReportSearchItems: ModuleItem[] = [
  { title: "Log Report", description: "Audit login, logout, and critical user action logs.", featured: true },
];

export const userSectionItems: Record<UserSectionKey, ModuleItem[]> = {
  "master-creation": userMasterCreationItems,
  "report-search": userReportSearchItems,
};

export function userSectionForSlug(slug: string): UserSectionKey {
  if (userReportSearchItems.some((item) => slugify(item.title) === slug)) return "report-search";
  return "master-creation";
}
