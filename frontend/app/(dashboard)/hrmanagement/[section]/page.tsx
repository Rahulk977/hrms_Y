"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { ModuleGrid } from "@/components/modules/ModuleGrid";
import { sectionItems } from "@/data/modules";
import { slugify } from "@/lib/slugify";
import type { SectionKey } from "@/types";

export default function SectionPage() {
  const params = useParams();
  const router = useRouter();

  const section = params.section as string;

  const isValidSection = useMemo(() => {
    return ["master", "manage", "report"].includes(section);
  }, [section]);

  const items = useMemo(() => {
    if (!isValidSection) return [];
    return sectionItems[section as Exclude<SectionKey, "dashboard">];
  }, [section, isValidSection]);

  if (!isValidSection) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h1 style={{ color: "var(--accent)" }}>404 - Section Not Found</h1>
        <p style={{ color: "var(--muted)", marginTop: "8px" }}>The selected HR Management section does not exist.</p>
        <button onClick={() => router.push("/hrmanagement")} style={{ marginTop: "16px" }}>
          Back to HR Console
        </button>
      </div>
    );
  }

  const handleSelectModule = (title: string) => {
    const slug = slugify(title);
    router.push(`/hrmanagement/${section}/${slug}`);
  };

  return <ModuleGrid items={items} onSelectModule={handleSelectModule} />;
}
