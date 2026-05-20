"use client";

import { useRouter } from "next/navigation";

export default function HRManagementPage() {
  const router = useRouter();

  const sections = [
    {
      id: "master",
      title: "Master Configuration",
      desc: "Manage core configurations like locations, holiday schemes, shift timings, payroll setups, and leave policy definitions.",
      icon: "⚙️",
      color: "var(--brand)",
    },
    {
      id: "manage",
      title: "Management Modules",
      desc: "Perform daily operational actions like adding employee entries, updating rosters, manually checking attendance records, and reviewing balances.",
      icon: "📋",
      color: "var(--green)",
    },
    {
      id: "report",
      title: "Analytical Reports",
      desc: "Generate monthly attendance logs, sick leave metrics, previous year leave histories, branch summaries, and custom filters.",
      icon: "📊",
      color: "var(--amber)",
    },
  ];

  return (
    <div className="area-console">
      <div className="area-console__header">
        <h1 className="area-console__title">HR Management Console</h1>
        <p className="area-console__subtitle">
          Select a domain category below to configure organizational settings, manage daily employee metrics, or extract reports.
        </p>
      </div>

      <div className="module-list">
        {sections.map((sec) => (
          <article
            key={sec.id}
            className="module-list-item panel-card"
            onClick={() => router.push(`/hrmanagement/${sec.id}`)}
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
                router.push(`/hrmanagement/${sec.id}`);
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
