import { slugify } from "@/lib/slugify";
import { modulesFromSlugs } from "@/lib/modules-from-slugs";
import type { ModuleItem, StandardSectionKey } from "@/types";

export const LMS_SECTIONS: StandardSectionKey[] = ["dashboard", "master-creation", "manage", "report-search"];

const masterSlugs = ["activity-type", "add-status", "add-list", "add-additional-details"];
const manageSlugs = ["branch-wise-assign-caller", "lead-transfer", "caller-assigned", "add-contact", "change-arrear-staff", "unassigned-staff", "change-call-agent"];
const reportSlugs = ["death-date-report", "mobile-no-update-report", "activity-report", "user-calling-report", "not-receive-emi", "calling-report"];

export const lmsSectionItems: Record<Exclude<StandardSectionKey, "dashboard">, ModuleItem[]> = {
  "master-creation": modulesFromSlugs(masterSlugs, ["activity-type", "add-list"]),
  manage: modulesFromSlugs(manageSlugs, ["lead-transfer", "caller-assigned"]),
  "report-search": modulesFromSlugs(reportSlugs, ["activity-report", "calling-report"]),
};

export function lmsSectionForSlug(slug: string): Exclude<StandardSectionKey, "dashboard"> {
  if (lmsSectionItems["report-search"].some((i) => slugify(i.title) === slug)) return "report-search";
  if (lmsSectionItems.manage.some((i) => slugify(i.title) === slug)) return "manage";
  return "master-creation";
}
