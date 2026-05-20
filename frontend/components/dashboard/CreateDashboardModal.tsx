"use client";

import { useEffect, useState } from "react";
import {
  WIDGET_OPTIONS,
  type DashboardWidgetId,
  type CustomDashboard,
  createDashboardId,
} from "@/lib/dashboard-storage";

type CreateDashboardModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (dashboard: CustomDashboard) => void;
  editDashboard?: CustomDashboard | null;
};

export function CreateDashboardModal({
  open,
  onClose,
  onSave,
  editDashboard,
}: CreateDashboardModalProps) {
  const [name, setName] = useState("");
  const [widgets, setWidgets] = useState<DashboardWidgetId[]>([
    "stats",
    "chart",
    "tasks",
    "activity",
  ]);

  useEffect(() => {
    if (!open) return;
    setName(editDashboard?.name ?? "");
    setWidgets(editDashboard?.widgets ?? ["stats", "chart", "tasks", "activity"]);
  }, [open, editDashboard]);

  if (!open) return null;

  const toggleWidget = (id: DashboardWidgetId) => {
    setWidgets((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed || widgets.length === 0) return;

    onSave({
      id: editDashboard?.id ?? createDashboardId(),
      name: trimmed,
      widgets,
      createdAt: editDashboard?.createdAt ?? new Date().toISOString(),
    });
    onClose();
  };

  return (
    <div className="dashboard-modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="dashboard-modal"
        role="dialog"
        aria-labelledby="create-dashboard-title"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="dashboard-modal__header">
          <div>
            <p>Personalize</p>
            <h2 id="create-dashboard-title">
              {editDashboard ? "Edit dashboard" : "Create your own dashboard"}
            </h2>
          </div>
          <button type="button" className="dashboard-modal__close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="dashboard-modal__body">
          <label className="dashboard-modal__field">
            <span>Dashboard name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. HR Ops Command Center"
              required
              autoFocus
            />
          </label>

          <fieldset className="dashboard-modal__widgets">
            <legend>Choose widgets</legend>
            <div className="dashboard-widget-picker">
              {WIDGET_OPTIONS.map((opt) => (
                <label
                  key={opt.id}
                  className={`dashboard-widget-option ${widgets.includes(opt.id) ? "is-selected" : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={widgets.includes(opt.id)}
                    onChange={() => toggleWidget(opt.id)}
                  />
                  <span className="dashboard-widget-option__check" />
                  <div>
                    <strong>{opt.label}</strong>
                    <small>{opt.description}</small>
                  </div>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="dashboard-modal__actions">
            <button type="button" className="dashboard-btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="dashboard-btn-primary"
              disabled={!name.trim() || widgets.length === 0}
            >
              {editDashboard ? "Save changes" : "Create dashboard"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
