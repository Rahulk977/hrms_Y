"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { PROFILE_PREFIX, profileItems } from "@/data/profile";
import { slugify } from "@/lib/slugify";

export function ProfileSlugPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const title = useMemo(() => profileItems.find((i) => slugify(i.title) === slug)?.title ?? slug, [slug]);

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "40px auto" }} className="panel-card">
      <h1 style={{ fontSize: "24px" }}>👤 {title}</h1>
      <p style={{ color: "var(--muted)", margin: "16px 0" }}>Employee Profile — Phase 2 placeholder</p>
      <button type="button" onClick={() => router.push(PROFILE_PREFIX)} style={{ marginTop: "24px", background: "var(--brand)", color: "#fff", padding: "10px 20px", border: 0, borderRadius: "8px" }}>&larr; Back to Profile</button>
    </div>
  );
}
