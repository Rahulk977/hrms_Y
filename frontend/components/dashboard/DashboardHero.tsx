"use client";

import type { AuthUser } from "@/types";
import type { CustomDashboard } from "@/lib/dashboard-storage";
import { DEFAULT_DASHBOARD_ID } from "@/lib/dashboard-storage";

type DashboardHeroProps = {
  user: AuthUser;
  activeId: string;
  customDashboards: CustomDashboard[];
  onSelectDashboard: (id: string) => void;
  onCreateClick: () => void;
  onEditClick: (dashboard: CustomDashboard) => void;
  onDeleteClick: (id: string) => void;
};

function greetingForHour(hour: number) {
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export function DashboardHero({
  user,
  activeId,
  customDashboards,
  onSelectDashboard,
  onCreateClick,
  onEditClick,
  onDeleteClick,
}: DashboardHeroProps) {
  const now = new Date();
  const greeting = greetingForHour(now.getHours());
  const dateLabel = now.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const activeCustom = customDashboards.find((d) => d.id === activeId);

  return (
    <header className="dashboard-hero">
      <div className="dashboard-hero__glow" aria-hidden />
      <div className="dashboard-hero__content">
        <div className="dashboard-hero__text">
          <span className="dashboard-hero__badge">Live HR Command Center</span>
          <h1>
            {greeting}, {user.displayName.split(" ")[0]}
          </h1>
          <p>
            {dateLabel} · {user.role} · Real-time workforce insights
          </p>
        </div>
        <div className="dashboard-hero__actions">
          <button type="button" className="dashboard-btn-ghost dashboard-btn-ghost--light" onClick={onCreateClick}>
            <span className="dashboard-btn-icon">+</span>
            Create your own dashboard
          </button>
          {activeCustom && (
            <>
              <button
                type="button"
                className="dashboard-btn-ghost dashboard-btn-ghost--light"
                onClick={() => onEditClick(activeCustom)}
              >
                Edit layout
              </button>
              <button
                type="button"
                className="dashboard-btn-ghost dashboard-btn-ghost--light dashboard-btn-danger"
                onClick={() => onDeleteClick(activeCustom.id)}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>

      <div className="dashboard-switcher" role="tablist" aria-label="Dashboard views">
        <button
          type="button"
          role="tab"
          aria-selected={activeId === DEFAULT_DASHBOARD_ID}
          className={activeId === DEFAULT_DASHBOARD_ID ? "is-active" : ""}
          onClick={() => onSelectDashboard(DEFAULT_DASHBOARD_ID)}
        >
          <span className="dashboard-switcher__dot" />
          Default HR Overview
        </button>
        {customDashboards.map((d) => (
          <button
            key={d.id}
            type="button"
            role="tab"
            aria-selected={activeId === d.id}
            className={activeId === d.id ? "is-active" : ""}
            onClick={() => onSelectDashboard(d.id)}
          >
            <span className="dashboard-switcher__dot" />
            {d.name}
          </button>
        ))}
      </div>
    </header>
  );
}
