import { slugify } from "@/lib/slugify";
import { modulesFromSlugs } from "@/lib/modules-from-slugs";
import type { ModuleItem, StandardSectionKey } from "@/types";

export const TVR_SECTIONS: StandardSectionKey[] = ["dashboard", "master-creation", "manage", "report-search"];

const masterSlugs = ["cattle-master", "tvr-status", "tvr-approver"];
const manageSlugs = ["manage-cattle-price", "tvr-approval", "assigned-flo-for-loan"];
const reportSlugs = ["tvr-report"];

export const tvrSectionItems: Record<Exclude<StandardSectionKey, "dashboard">, ModuleItem[]> = {
  "master-creation": modulesFromSlugs(masterSlugs, ["cattle-master", "tvr-status"]),
  manage: modulesFromSlugs(manageSlugs, ["tvr-approval"]),
  "report-search": modulesFromSlugs(reportSlugs, ["tvr-report"]),
};

export function tvrSectionForSlug(slug: string): Exclude<StandardSectionKey, "dashboard"> {
  if (tvrSectionItems["report-search"].some((i) => slugify(i.title) === slug)) return "report-search";
  if (tvrSectionItems.manage.some((i) => slugify(i.title) === slug)) return "manage";
  return "master-creation";
}
