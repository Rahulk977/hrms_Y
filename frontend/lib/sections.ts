import type { SectionKey } from "@/types";

export function toSectionTitle(section: SectionKey) {
  if (section === "dashboard") return "Dashboard";
  if (section === "master") return "Master Creation";
  if (section === "manage") return "Manage";
  return "Report/Search";
}
