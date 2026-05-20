"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { ModuleGrid } from "@/components/modules/ModuleGrid";
import { USER_SECTIONS, userSectionItems } from "@/data/user-management";
import { slugify } from "@/lib/slugify";
import type { UserSectionKey } from "@/types";

export default function UserSectionPage() {
  const params = useParams();
  const router = useRouter();
  const section = params.section as string;

  const isValidSection = useMemo(
    () => USER_SECTIONS.includes(section as UserSectionKey),
    [section]
  );

  const items = useMemo(() => {
    if (!isValidSection) return [];
    return userSectionItems[section as UserSectionKey];
  }, [section, isValidSection]);

  if (!isValidSection) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h1 style={{ color: "var(--accent)" }}>404 - Section Not Found</h1>
        <p style={{ color: "var(--muted)", marginTop: "8px" }}>
          The selected User Management section does not exist.
        </p>
        <button type="button" onClick={() => router.push("/user-management")} style={{ marginTop: "16px" }}>
          Back to User Console
        </button>
      </div>
    );
  }

  const handleSelectModule = (title: string) => {
    router.push(`/user-management/${section}/${slugify(title)}`);
  };

  return <ModuleGrid items={items} onSelectModule={handleSelectModule} />;
}
