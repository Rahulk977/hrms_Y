"use client";

import { useRouter } from "next/navigation";

const sections = [
  {
    id: "applications",
    title: "Applications",
    desc: "Submit leave, LWP, OD, reimbursement, grievance, and internal requisition requests.",
    icon: "▤",
    color: "var(--brand)",
  },
  {
    id: "approvals",
    title: "Approvals",
    desc: "Review and action pending PO, requisition, intent, OD, comp-off, and exit approvals.",
    icon: "✎",
    color: "var(--green)",
  },
  {
    id: "my-records",
    title: "My Records",
    desc: "View profile, calendar, attendance, leave balances, tax details, and resignation letters.",
    icon: "◴",
    color: "var(--amber)",
  },
];

export default function ProfilePage() {
  const router = useRouter();

  return (
    <div className="area-console">
      <div className="area-console__header">
        <h1 className="area-console__title">Employee Profile</h1>
        <p className="area-console__subtitle">
          Self-service for leave, attendance, claims, requisitions, tax, and personal HR requests.
        </p>
      </div>

      <div className="module-list">
        {sections.map((sec) => (
          <article
            key={sec.id}
            className="module-list-item panel-card"
            onClick={() => router.push(`/profile/${sec.id}`)}
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
                router.push(`/profile/${sec.id}`);
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
