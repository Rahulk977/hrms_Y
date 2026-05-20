import type { StandardSectionKey } from "@/types";

export function toStandardSectionTitle(section: StandardSectionKey): string {
  if (section === "dashboard") return "Dashboard";
  if (section === "master-creation") return "Master Creation";
  if (section === "manage") return "Manage";
  return "Report / Search";
}
