"use client";

import { useRouter } from "next/navigation";

export default function UserManagementPage() {
  const router = useRouter();

  const sections = [
    {
      id: "master-creation",
      title: "Master Creation",
      desc: "Configure app location rights, employee status, user privileges, and password policies for system users.",
      icon: "⚙️",
      color: "var(--brand)",
    },
    {
      id: "report-search",
      title: "Report / Search",
      desc: "Search and export user activity logs, login history, and administrative audit trails.",
      icon: "📊",
      color: "var(--amber)",
    },
  ];

  return (
    <div className="area-console">
      <div className="area-console__header">
        <h1 className="area-console__title">User Management Console</h1>
        <p className="area-console__subtitle">
          Manage user access, privileges, credentials, and audit reports across the organization.
        </p>
      </div>

      <div className="module-list">
        {sections.map((sec) => (
          <article
            key={sec.id}
            className="module-list-item panel-card"
            onClick={() => router.push(`/user-management/${sec.id}`)}
          >
            <div className="module-list-item__main">
              <span className="module-list-item__icon" aria-hidden>
                {sec.icon}
              </span>
              <div>
                <h2>{sec.title}</h2>
                <p>{sec.desc}</p>
              </div>
            </div>
            <button
              type="button"
              className="module-list-item__action"
              style={{ color: sec.color, borderColor: sec.color }}
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/user-management/${sec.id}`);
              }}
            >
              Explore Modules &raquo;
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
