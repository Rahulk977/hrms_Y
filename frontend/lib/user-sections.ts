import type { UserSectionKey } from "@/types";

export function toUserSectionTitle(section: UserSectionKey): string {
  if (section === "master-creation") return "Master Creation";
  return "Report / Search";
}
