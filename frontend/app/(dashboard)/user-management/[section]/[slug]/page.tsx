"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { USER_SECTIONS, userSectionItems } from "@/data/user-management";
import { slugify } from "@/lib/slugify";
import { toUserSectionTitle } from "@/lib/user-sections";
import type { UserSectionKey } from "@/types";

export default function UserWorkspaceSlugPage() {
  const params = useParams();
  const router = useRouter();

  const section = params.section as string;
  const slug = params.slug as string;

  const isValidSection = USER_SECTIONS.includes(section as UserSectionKey);

  const moduleTitle = useMemo(() => {
    if (!isValidSection) return null;
    const items = userSectionItems[section as UserSectionKey];
    const match = items.find((item) => slugify(item.title) === slug);
    return match?.title ?? null;
  }, [section, slug, isValidSection]);

  if (!isValidSection) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h1 style={{ color: "var(--accent)" }}>404 - Section Not Found</h1>
        <button type="button" onClick={() => router.push("/user-management")} style={{ marginTop: "16px" }}>
          Back to User Console
        </button>
      </div>
    );
  }

  const sectionKey = section as UserSectionKey;
  const sectionLabel = toUserSectionTitle(sectionKey);
  const formattedTitle =
    moduleTitle ??
    slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "40px auto" }} className="panel-card">
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: "rgba(18, 109, 143, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px",
            border: "1px solid var(--brand)",
            color: "var(--brand)",
          }}
        >
          ⚙
        </div>
        <div>
          <span
            style={{
              fontSize: "12px",
              textTransform: "uppercase",
              color: "var(--muted)",
              fontWeight: 600,
              letterSpacing: "1px",
            }}
          >
            User Management / {sectionLabel}
          </span>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "var(--ink)", marginTop: "4px" }}>
            {formattedTitle}
          </h1>
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid var(--line)",
          borderBottom: "1px solid var(--line)",
          padding: "24px 0",
          margin: "24px 0",
        }}
      >
        <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--ink)", marginBottom: "8px" }}>
          Module Scheduled for Phase 2
        </h3>
        <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: "1.6" }}>
          This user administration workspace is defined inside our enterprise registry, but its mock data
          models and live components are slated for active development in the next rollout phase.
        </p>
        <div
          style={{
            marginTop: "16px",
            padding: "16px",
            background: "var(--paper)",
            borderRadius: "8px",
            fontSize: "13px",
            color: "var(--ink)",
            fontFamily: "monospace",
            border: "1px solid var(--line)",
          }}
        >
          <div>Target Route: /user-management/{section}/{slug}</div>
          <div>Status: Placeholder (Registry Approved)</div>
          <div>Scope: User &amp; access control</div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => router.push(`/user-management/${section}`)}
        style={{
          background: "var(--brand)",
          color: "#ffffff",
          padding: "10px 20px",
          border: 0,
          borderRadius: "8px",
          fontWeight: 600,
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        &larr; Back to {sectionLabel}
      </button>
    </div>
  );
}
