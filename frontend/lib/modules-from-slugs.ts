import type { ModuleItem } from "@/types";
import { titleFromSlug } from "@/lib/title-from-slug";

export function modulesFromSlugs(slugs: string[], featuredSlugs: string[] = []): ModuleItem[] {
  return slugs.map((slug) => ({
    title: titleFromSlug(slug),
    description: `Open ${titleFromSlug(slug).toLowerCase()} workspace.`,
    featured: featuredSlugs.includes(slug),
  }));
}
