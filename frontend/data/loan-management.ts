import { slugify } from "@/lib/slugify";
import { modulesFromSlugs } from "@/lib/modules-from-slugs";
import type { ModuleItem, StandardSectionKey } from "@/types";

export const LOAN_SECTIONS: StandardSectionKey[] = ["dashboard", "master-creation", "manage", "report-search"];

const masterSlugs = [
  "loan-category", "loan-purpose", "add-marital-status", "loan-constitution", "loan-status",
  "delete-loan-application", "loan-document", "qualification", "add-branch-for-fortnightly-allow",
  "loan-experience", "residence-owner", "equifix-settings", "add-center-for-loan", "loan-industry",
  "loan-started-by", "allow-loan-product-for-co-applicant", "bank-account-type", "loan-itr",
  "loan-seasonality", "equifix-new-settings", "business-registration-details", "loan-marital",
  "admin-collection-rights", "business-type", "product-type", "add-education",
];
const manageSlugs = [
  "new-bank-transfer-approval", "manage-scheme", "death-data-for-insurance-claim", "manage-scheme-status",
  "insurance-claim-approved-disapproved", "dg-opening-balance-modification", "manage-dm-for-branch",
  "equifix-inquiry", "change-arrear-staff-loan-id", "manage-oh-ch-for-branch", "modify-amount",
  "manage-admin-for-loan-mailer", "modify-application", "cash-at-branch-confirmation-account",
  "application-delete", "delete-cash-at-branch",
];
const reportSlugs = [
  "summary-loan-report", "group-loan-approved-csv", "aeps-collection-report", "enquiry-report",
  "death-insurance-claim-report", "insurance-dashboard", "loan-report", "collection-arrear-staff-wise-report",
  "loan-report-with-count", "search-by-account-number-and-adhar-card", "online-loan-emi-report",
  "loan-report-csv", "collection-bank-transfer-branch-report", "qr-collection-report",
];

export const loanSectionItems: Record<Exclude<StandardSectionKey, "dashboard">, ModuleItem[]> = {
  "master-creation": modulesFromSlugs(masterSlugs, ["loan-category", "loan-purpose", "loan-status"]),
  manage: modulesFromSlugs(manageSlugs, ["manage-scheme", "modify-application"]),
  "report-search": modulesFromSlugs(reportSlugs, ["summary-loan-report", "loan-report"]),
};

export function loanSectionForSlug(slug: string): Exclude<StandardSectionKey, "dashboard"> {
  if (loanSectionItems["report-search"].some((i) => slugify(i.title) === slug)) return "report-search";
  if (loanSectionItems.manage.some((i) => slugify(i.title) === slug)) return "manage";
  return "master-creation";
}
