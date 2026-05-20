import { slugify } from "@/lib/slugify";
import { modulesFromSlugs } from "@/lib/modules-from-slugs";
import type { ModuleItem, StandardSectionKey } from "@/types";

export const LOS_SECTIONS: StandardSectionKey[] = ["dashboard", "master-creation", "manage", "report-search"];

const masterSlugs = ["add-fee-type", "add-address-status-type", "add-product-type", "add-address-type", "add-loan-product", "address-type", "add-document", "marital-status", "add-profession", "online-fee", "manage-center", "add-applicant-type", "add-levels", "manage-bank-branch", "add-insurance-company", "add-relation", "add-loan-type", "heading"];
const manageSlugs = ["approver-allocation-form-wise", "appeal-for-loan", "appeal-approval-for-loan", "loan-transfer", "center-allocation-for-loan-applicant", "loan-approval", "loan-disbursement", "change-approve", "loan-schedule"];
const reportSlugs = ["applicant-letters", "branch-manager-loan-application", "loan-transfer-report", "dashboard", "application", "daily-loan-collection-receive", "application-status", "loan-dashboard", "loan-detail"];

export const losSectionItems: Record<Exclude<StandardSectionKey, "dashboard">, ModuleItem[]> = {
  "master-creation": modulesFromSlugs(masterSlugs, ["add-loan-product", "add-loan-type"]),
  manage: modulesFromSlugs(manageSlugs, ["loan-approval", "loan-disbursement"]),
  "report-search": modulesFromSlugs(reportSlugs, ["loan-dashboard", "application-status"]),
};

export function losSectionForSlug(slug: string): Exclude<StandardSectionKey, "dashboard"> {
  if (losSectionItems["report-search"].some((i) => slugify(i.title) === slug)) return "report-search";
  if (losSectionItems.manage.some((i) => slugify(i.title) === slug)) return "manage";
  return "master-creation";
}
