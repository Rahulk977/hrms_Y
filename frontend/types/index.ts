export type SectionKey = "dashboard" | "master" | "manage" | "report";

export type UserSectionKey = "master-creation" | "report-search";

export type StandardSectionKey = "dashboard" | "master-creation" | "manage" | "report-search";

export type ProfileSectionId = "applications" | "approvals" | "my-records";

export type ModuleItem = {
  title: string;
  description?: string;
  featured?: boolean;
};

export type NavItem = {
  label: string;
  icon: string;
};

export type AuthUser = {
  displayName: string;
  email: string;
  role: string;
};
