import { slugify } from "@/lib/slugify";
import { modulesFromSlugs } from "@/lib/modules-from-slugs";
import type { ModuleItem, ProfileSectionId } from "@/types";

export const PROFILE_PREFIX = "/profile";

export type ProfileSection = { id: ProfileSectionId; title: string; icon: string; items: ModuleItem[] };

const applicationsSlugs = ["apply-od", "apply-lwp", "apply-short-leave", "apply-leave", "apply-c-off", "grievance", "reimbursement-form", "requisition"];
const approvalsSlugs = ["po-approval", "requisition-approval", "intent-approval", "od-approval", "c-off-approval", "exit-approval"];
const myRecordsSlugs = ["profile", "calendar", "view-applied-claim", "employees-daily-report", "attendance-register", "take-attendance", "leave-details", "daily-report", "tax-details", "resignation-letters"];

export const PROFILE_SECTIONS: ProfileSection[] = [
  { id: "applications", title: "Applications", icon: "▤", items: modulesFromSlugs(applicationsSlugs, ["apply-leave"]) },
  { id: "approvals", title: "Approvals", icon: "✎", items: modulesFromSlugs(approvalsSlugs) },
  { id: "my-records", title: "My Records", icon: "◴", items: modulesFromSlugs(myRecordsSlugs, ["profile", "calendar"]) },
];

export const profileItems = PROFILE_SECTIONS.flatMap((s) => s.items);

export function profileSectionForSlug(slug: string): ProfileSectionId {
  for (const section of PROFILE_SECTIONS) {
    if (section.items.some((item) => slugify(item.title) === slug)) return section.id;
  }
  return "applications";
}
