export type DashboardWidgetId =
  | "stats"
  | "chart"
  | "broadcast"
  | "tasks"
  | "activity";

export type CustomDashboard = {
  id: string;
  name: string;
  widgets: DashboardWidgetId[];
  createdAt: string;
};

const STORAGE_KEY = "subherp_custom_dashboards";
const ACTIVE_KEY = "subherp_active_dashboard_id";

export const DEFAULT_DASHBOARD_ID = "default";

export const WIDGET_OPTIONS: { id: DashboardWidgetId; label: string; description: string }[] = [
  { id: "stats", label: "KPI Cards", description: "Employees, attendance, leaves, payroll" },
  { id: "chart", label: "Workforce Chart", description: "Weekly HR movement bars" },
  { id: "broadcast", label: "Broadcast", description: "Team messages panel" },
  { id: "tasks", label: "Pending Tasks", description: "Approvals and action items" },
  { id: "activity", label: "Activity Feed", description: "Recent operational events" },
];

export function getCustomDashboards(): CustomDashboard[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CustomDashboard[]) : [];
  } catch {
    return [];
  }
}

export function saveCustomDashboard(dashboard: CustomDashboard): void {
  const list = getCustomDashboards();
  const idx = list.findIndex((d) => d.id === dashboard.id);
  if (idx >= 0) list[idx] = dashboard;
  else list.push(dashboard);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function deleteCustomDashboard(id: string): void {
  const list = getCustomDashboards().filter((d) => d.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  if (getActiveDashboardId() === id) {
    setActiveDashboardId(DEFAULT_DASHBOARD_ID);
  }
}

export function getActiveDashboardId(): string {
  if (typeof window === "undefined") return DEFAULT_DASHBOARD_ID;
  return localStorage.getItem(ACTIVE_KEY) || DEFAULT_DASHBOARD_ID;
}

export function setActiveDashboardId(id: string): void {
  localStorage.setItem(ACTIVE_KEY, id);
}

export function createDashboardId(): string {
  return `dash_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}
