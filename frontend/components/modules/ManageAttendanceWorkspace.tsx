"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { AuthUser } from "@/types";

type ManageAttendanceWorkspaceProps = {
  onBack: () => void;
  user: AuthUser;
};

export function ManageAttendanceWorkspace({ onBack, user }: ManageAttendanceWorkspaceProps) {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [clockLoading, setClockLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Form State
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [clockIn, setClockIn] = useState("09:00");
  const [clockOut, setClockOut] = useState("18:00");

  const isAdmin = user.role === "HR Admin";

  const loadLogs = () => {
    api.getAttendanceLogs()
      .then(setLogs)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const handleClockToggle = async () => {
    setError("");
    setMessage("");
    setClockLoading(true);

    try {
      const res = await api.toggleClock(user.email);
      setMessage(res.message);
      loadLogs();
    } catch (err: any) {
      setError(err.message || "Failed to toggle clock state.");
    } finally {
      setClockLoading(false);
    }
  };

  const handleManualRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      await api.submitManualAttendance({
        employeeEmail: user.email,
        date,
        clockIn,
        clockOut,
      });

      setMessage("Manual attendance approval request submitted.");
      loadLogs();
    } catch (err: any) {
      setError(err.message || "Failed to submit request.");
    }
  };

  const handleApprove = async (id: string, action: "approve" | "reject") => {
    try {
      await api.approveAttendance(id, action);
      setMessage(`Attendance log ${action}d successfully.`);
      loadLogs();
    } catch (err: any) {
      setError(err.message || `Failed to ${action} attendance.`);
    }
  };

  // Filter logs
  const pendingApprovals = logs.filter(l => l.status === "Pending Approval");
  const regularLogs = logs.filter(l => l.status !== "Pending Approval");

  return (
    <div style={{ padding: "0 38px 44px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", margin: "24px 0" }}>
        <button onClick={onBack} className="primary" style={{ minHeight: "36px", padding: "0 14px" }}>
          ← Back to Modules
        </button>
        <h1 style={{ fontSize: "28px", fontWeight: "800", margin: 0 }}>Attendance Workspace</h1>
      </div>

      <div style={{ display: "grid", gap: "24px", gridTemplateColumns: "1fr 1.5fr" }}>
        <div style={{ display: "grid", gap: "24px" }}>
          {/* Quick clock action */}
          <div className="panel-card" style={{ padding: "24px", textAlign: "center" }}>
            <h2 style={{ fontSize: "18px", marginBottom: "8px", color: "var(--brand)" }}>Daily Log</h2>
            <p style={{ fontSize: "14px", color: "var(--muted)", marginBottom: "20px" }}>
              Check-in and checkout in real time using the active counter.
            </p>
            <button 
              onClick={handleClockToggle}
              disabled={clockLoading}
              className="primary"
              style={{
                width: "100%",
                minHeight: "50px",
                fontSize: "16px",
                fontWeight: "800",
                background: "linear-gradient(135deg, var(--brand-dark), var(--brand))",
                color: "#fff"
              }}
            >
              {clockLoading ? "Clocking..." : "Clock In / Clock Out"}
            </button>
          </div>

          {/* Request manual adjustments */}
          <div className="panel-card" style={{ padding: "24px" }}>
            <h2 style={{ fontSize: "18px", marginBottom: "16px", color: "var(--brand)" }}>Manual Adjustment</h2>
            <form onSubmit={handleManualRequest} style={{ display: "grid", gap: "12px" }}>
              <label style={{ display: "flex", flexDirection: "column", fontSize: "13px", fontWeight: "600" }}>
                Date
                <input 
                  type="date" 
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  style={{ padding: "8px", borderRadius: "6px", border: "1px solid var(--line)", background: "#f9fbfd", marginTop: "4px" }}
                />
              </label>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <label style={{ display: "flex", flexDirection: "column", fontSize: "13px", fontWeight: "600" }}>
                  Clock In Time
                  <input 
                    type="time" 
                    value={clockIn}
                    onChange={e => setClockIn(e.target.value)}
                    style={{ padding: "8px", borderRadius: "6px", border: "1px solid var(--line)", background: "#f9fbfd", marginTop: "4px" }}
                  />
                </label>
                <label style={{ display: "flex", flexDirection: "column", fontSize: "13px", fontWeight: "600" }}>
                  Clock Out Time
                  <input 
                    type="time" 
                    value={clockOut}
                    onChange={e => setClockOut(e.target.value)}
                    style={{ padding: "8px", borderRadius: "6px", border: "1px solid var(--line)", background: "#f9fbfd", marginTop: "4px" }}
                  />
                </label>
              </div>

              {error && <div style={{ color: "#b93657", fontSize: "13px", fontWeight: "600", marginTop: "8px" }}>{error}</div>}
              {message && <div style={{ color: "#21a67a", fontSize: "13px", fontWeight: "600", marginTop: "8px" }}>{message}</div>}

              <button type="submit" className="success" style={{ marginTop: "10px", minHeight: "40px" }}>
                Submit Request
              </button>
            </form>
          </div>
        </div>

        <div style={{ display: "grid", gap: "24px" }}>
          {/* Admin Pending approvals list */}
          {isAdmin && (
            <div className="panel-card" style={{ padding: "24px" }}>
              <h2 style={{ fontSize: "18px", marginBottom: "16px", color: "var(--accent)" }}>
                Pending Adjustments ({pendingApprovals.length})
              </h2>

              {pendingApprovals.length === 0 ? (
                <div style={{ color: "var(--muted)", padding: "10px 0" }}>No pending manual logs require approval.</div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {pendingApprovals.map((req) => (
                    <div 
                      key={req.id}
                      style={{
                        padding: "12px",
                        border: "1px solid rgba(228, 77, 106, 0.24)",
                        borderRadius: "8px",
                        background: "rgba(228, 77, 106, 0.05)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                      }}
                    >
                      <div>
                        <strong>{req.employeeName}</strong>
                        <div style={{ fontSize: "12px", color: "var(--muted)", marginTop: "2px" }}>
                          Requested Date: {req.date} ({req.clockIn} - {req.clockOut || "Present"})
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button 
                          onClick={() => handleApprove(req.id, "approve")}
                          className="success"
                          style={{ minHeight: "30px", padding: "0 10px", fontSize: "12px" }}
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => handleApprove(req.id, "reject")}
                          style={{ minHeight: "30px", padding: "0 10px", fontSize: "12px", background: "#fff1f3", border: "1px solid rgba(228, 77, 106, 0.18)", color: "#b93657" }}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Logs Table */}
          <div className="panel-card" style={{ padding: "24px", overflowY: "auto", maxHeight: "400px" }}>
            <h2 style={{ fontSize: "18px", marginBottom: "16px", color: "var(--brand)" }}>Roster Logs</h2>

            {loading ? (
              <div style={{ color: "var(--muted)" }}>Loading records...</div>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--line)" }}>
                    <th style={{ padding: "10px 6px", fontSize: "13px", fontWeight: "700" }}>Name</th>
                    <th style={{ padding: "10px 6px", fontSize: "13px", fontWeight: "700" }}>Date</th>
                    <th style={{ padding: "10px 6px", fontSize: "13px", fontWeight: "700" }}>In</th>
                    <th style={{ padding: "10px 6px", fontSize: "13px", fontWeight: "700" }}>Out</th>
                    <th style={{ padding: "10px 6px", fontSize: "13px", fontWeight: "700" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {regularLogs.map((log) => (
                    <tr key={log.id} style={{ borderBottom: "1px solid var(--line)" }}>
                      <td style={{ padding: "10px 6px", fontSize: "13px" }}>
                        {log.employeeName}
                        {log.isManual && <small style={{ display: "block", color: "var(--brand)", fontSize: "10px" }}>(adjusted)</small>}
                      </td>
                      <td style={{ padding: "10px 6px", fontSize: "13px" }}>{log.date}</td>
                      <td style={{ padding: "10px 6px", fontSize: "13px" }}>{log.clockIn}</td>
                      <td style={{ padding: "10px 6px", fontSize: "13px" }}>{log.clockOut || "--:--"}</td>
                      <td style={{ padding: "10px 6px", fontSize: "13px" }}>
                        <span style={{
                          padding: "2px 6px",
                          borderRadius: "10px",
                          fontSize: "11px",
                          fontWeight: "700",
                          backgroundColor: log.status === "Present" ? "rgba(33, 166, 122, 0.15)" : "rgba(228, 77, 106, 0.15)",
                          color: log.status === "Present" ? "#13835f" : "#b93657"
                        }}>
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
