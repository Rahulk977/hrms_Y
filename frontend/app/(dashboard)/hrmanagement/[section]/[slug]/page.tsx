"use client";

import { useParams, useRouter } from "next/navigation";
import { EmployeeEntryWorkspace } from "@/components/modules/EmployeeEntryWorkspace";
import { ManageAttendanceWorkspace } from "@/components/modules/ManageAttendanceWorkspace";
import { LeaveManageWorkspace } from "@/components/modules/LeaveManageWorkspace";
import { useAuth } from "@/hooks/useAuth";

export default function WorkspaceSlugPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();

  const section = params.section as string;
  const slug = params.slug as string;

  if (!user) {
    return null;
  }

  // Route matches
  if (slug === "employee-entry") {
    return <EmployeeEntryWorkspace onBack={() => router.push(`/hrmanagement/${section}`)} />;
  }

  if (slug === "manage-attendance") {
    return (
      <ManageAttendanceWorkspace 
        onBack={() => router.push(`/hrmanagement/${section}`)} 
        user={user} 
      />
    );
  }

  if (
    slug === "manual-leave-manage" || 
    slug === "leave-entitlements" || 
    slug === "carry-forward-opening-leaves"
  ) {
    return (
      <LeaveManageWorkspace 
        onBack={() => router.push(`/hrmanagement/${section}`)} 
        user={user} 
      />
    );
  }

  // Fallback: Phase 2 placeholder screen
  const formattedTitle = slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "40px auto" }} className="panel-card">
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
        <div 
          style={{ 
            width: "56px", 
            height: "56px", 
            borderRadius: "50%", 
            background: "rgba(244, 166, 42, 0.1)", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            fontSize: "24px",
            border: "1px solid var(--amber)",
            color: "var(--amber)"
          }}
        >
          ⚙️
        </div>
        <div>
          <span style={{ fontSize: "12px", textTransform: "uppercase", color: "var(--muted)", fontWeight: 600, letterSpacing: "1px" }}>
            HR Management / {section}
          </span>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "var(--ink)", marginTop: "4px" }}>
            {formattedTitle}
          </h1>
        </div>
      </div>

      <div style={{ borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", padding: "24px 0", margin: "24px 0" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--ink)", marginBottom: "8px" }}>
          Module Scheduled for Phase 2
        </h3>
        <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: "1.6" }}>
          This operation workspace is defined inside our enterprise registry, but its mock data models and live components are slated for active development in **Phase 2** of the ERP portal rollout.
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
            border: "1px solid var(--line)"
          }}
        >
          <div>Target Route: /hrmanagement/{section}/{slug}</div>
          <div>Status: Placeholder (Registry Approved)</div>
          <div>Scope: Read-Only Schema Mock</div>
        </div>
      </div>

      <button 
        onClick={() => router.push(`/hrmanagement/${section}`)}
        style={{
          background: "var(--brand)",
          color: "#ffffff",
          padding: "10px 20px",
          border: 0,
          borderRadius: "8px",
          fontWeight: 600,
          cursor: "pointer",
          fontSize: "14px"
        }}
      >
        &larr; Back to {section.charAt(0).toUpperCase() + section.slice(1)} Modules
      </button>
    </div>
  );
}
