"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { ModuleGrid } from "@/components/modules/ModuleGrid";
import { PROFILE_SECTIONS } from "@/data/profile";
import { slugify } from "@/lib/slugify";
import type { ProfileSectionId } from "@/types";

type ProfileSectionPageProps = {
  sectionId: ProfileSectionId;
};

export function ProfileSectionPage({ sectionId }: ProfileSectionPageProps) {
  const router = useRouter();

  const items = useMemo(() => {
    return PROFILE_SECTIONS.find((section) => section.id === sectionId)?.items ?? [];
  }, [sectionId]);

  return (
    <ModuleGrid
      items={items}
      onSelectModule={(title) => router.push(`/profile/${slugify(title)}`)}
    />
  );
}
