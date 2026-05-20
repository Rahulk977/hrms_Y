"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";
import {
  DEFAULT_DASHBOARD_ID,
  getActiveDashboardId,
  getCustomDashboards,
  saveCustomDashboard,
  deleteCustomDashboard,
  setActiveDashboardId,
  type CustomDashboard,
  type DashboardWidgetId,
} from "@/lib/dashboard-storage";
import { useAuth } from "@/hooks/useAuth";
import { StatGrid } from "./StatGrid";
import { WorkforceChart } from "./WorkforceChart";
import { BroadcastPanel } from "./BroadcastPanel";
import { PendingTasks } from "./PendingTasks";
import { ActivityPanel } from "./ActivityPanel";
import { DashboardHero } from "./DashboardHero";
import { CreateDashboardModal } from "./CreateDashboardModal";

type DashboardData = {
  stats?: Array<{ label: string; value: string; trend: string; tone: string }>;
  weeklyMovement?: number[];
  weekDays?: string[];
  recentActivity?: string[];
  pendingTasks?: string[];
};

const ALL_WIDGETS: DashboardWidgetId[] = ["stats", "chart", "broadcast", "tasks", "activity"];

function widgetsForActive(
  activeId: string,
  customDashboards: CustomDashboard[]
): DashboardWidgetId[] {
  if (activeId === DEFAULT_DASHBOARD_ID) return ALL_WIDGETS;
  const custom = customDashboards.find((d) => d.id === activeId);
  return custom?.widgets ?? ALL_WIDGETS;
}

export function Dashboard() {
  const { user } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [customDashboards, setCustomDashboards] = useState<CustomDashboard[]>([]);
  const [activeId, setActiveId] = useState(DEFAULT_DASHBOARD_ID);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDashboard, setEditingDashboard] = useState<CustomDashboard | null>(null);

  const refreshCustomList = useCallback(() => {
    setCustomDashboards(getCustomDashboards());
    setActiveId(getActiveDashboardId());
  }, []);

  useEffect(() => {
    refreshCustomList();
  }, [refreshCustomList]);

  useEffect(() => {
    api
      .getDashboardStats()
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading dashboard stats:", err);
        setLoading(false);
      });
  }, []);

  const handleSelectDashboard = (id: string) => {
    setActiveDashboardId(id);
    setActiveId(id);
  };

  const handleSaveDashboard = (dashboard: CustomDashboard) => {
    saveCustomDashboard(dashboard);
    setActiveDashboardId(dashboard.id);
    setActiveId(dashboard.id);
    refreshCustomList();
    setEditingDashboard(null);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this custom dashboard?")) return;
    deleteCustomDashboard(id);
    refreshCustomList();
    setActiveId(getActiveDashboardId());
  };

  const activeWidgets = widgetsForActive(activeId, customDashboards);
  const show = (id: DashboardWidgetId) => activeWidgets.includes(id);

  if (!user) return null;

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-loading">
          <div className="dashboard-loading__spinner" />
          <p>Loading live workforce analytics…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <DashboardHero
        user={user}
        activeId={activeId}
        customDashboards={customDashboards}
        onSelectDashboard={handleSelectDashboard}
        onCreateClick={() => {
          setEditingDashboard(null);
          setModalOpen(true);
        }}
        onEditClick={(d) => {
          setEditingDashboard(d);
          setModalOpen(true);
        }}
        onDeleteClick={handleDelete}
      />

      <div className="dashboard-view">
        {show("stats") && <StatGrid stats={data?.stats} />}
        {show("chart") && (
          <WorkforceChart
            weeklyMovement={data?.weeklyMovement}
            weekDays={data?.weekDays}
          />
        )}
        {show("broadcast") && <BroadcastPanel />}
        {show("tasks") && <PendingTasks tasks={data?.pendingTasks} />}
        {show("activity") && <ActivityPanel activities={data?.recentActivity} />}
      </div>

      <CreateDashboardModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingDashboard(null);
        }}
        onSave={handleSaveDashboard}
        editDashboard={editingDashboard}
      />
    </div>
  );
}
