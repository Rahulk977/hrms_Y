"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { AuthUser } from "@/types";

type LeaveManageWorkspaceProps = {
  onBack: () => void;
  user: AuthUser;
};

export function LeaveManageWorkspace({ onBack, user }: LeaveManageWorkspaceProps) {
  const [requests, setRequests] = useState<any[]>([]);
  const [balance, setBalance] = useState<{ casual: number; sick: number; earned: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Form State
  const [leaveType, setLeaveType] = useState("Casual");
  const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split("T")[0]);
  const [reason, setReason] = useState("");

  const isAdmin = user.role === "HR Admin";

  const loadData = () => {
    setLoading(true);
    Promise.all([
      api.getLeaveRequests(),
      api.getLeaveBalance(user.email)
    ])
      .then(([reqs, bal]) => {
        setRequests(reqs);
        setBalance(bal);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setSubmitting(true);

    if (!startDate || !endDate || !reason) {
      setError("Please fill out all fields.");
      setSubmitting(false);
      return;
    }

    try {
      await api.applyLeave({
        employeeEmail: user.email,
        leaveType,
        startDate,
        endDate,
        reason,
      });

      setMessage("Leave application submitted successfully!");
      setReason("");
      loadData();
    } catch (err: any) {
      setError(err.message || "Failed to submit leave application.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleProcessRequest = async (id: string, action: "approve" | "reject") => {
    setError("");
    setMessage("");
    try {
      await api.approveLeave(id, action);
      setMessage(`Leave request ${action}d successfully.`);
      loadData();
    } catch (err: any) {
      setError(err.message || `Failed to ${action} leave request.`);
    }
  };

  const pendingRequests = requests.filter(r => r.status === "Pending");
  const processedRequests = requests.filter(r => r.status !== "Pending");

  return (
    <div style={{ padding: "0 38px 44px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", margin: "24px 0" }}>
        <button onClick={onBack} className="primary" style={{ minHeight: "36px", padding: "0 14px" }}>
          ← Back to Modules
        </button>
        <h1 style={{ fontSize: "28px", fontWeight: "800", margin: 0 }}>Leave Workspace</h1>
      </div>

      <div style={{ display: "grid", gap: "24px", gridTemplateColumns: "1fr 1.5fr" }}>
        <div style={{ display: "grid", gap: "24px" }}>
          {/* Balance Cards */}
          <div className="panel-card" style={{ padding: "24px" }}>
            <h2 style={{ fontSize: "18px", marginBottom: "16px", color: "var(--brand)" }}>Time-Off Balances</h2>
            {loading ? (
              <div style={{ color: "var(--muted)" }}>Checking balances...</div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                <div style={{ background: "#edf6fb", padding: "12px", borderRadius: "6px", textAlign: "center", border: "1px solid var(--line)" }}>
                  <span style={{ display: "block", fontSize: "12px", color: "var(--muted)", fontWeight: "600" }}>CASUAL</span>
                  <strong style={{ display: "block", fontSize: "24px", color: "var(--brand)", marginTop: "4px" }}>{balance?.casual || 0}</strong>
                </div>
                <div style={{ background: "#edf6fb", padding: "12px", borderRadius: "6px", textAlign: "center", border: "1px solid var(--line)" }}>
                  <span style={{ display: "block", fontSize: "12px", color: "var(--muted)", fontWeight: "600" }}>SICK</span>
                  <strong style={{ display: "block", fontSize: "24px", color: "var(--brand)", marginTop: "4px" }}>{balance?.sick || 0}</strong>
                </div>
                <div style={{ background: "#edf6fb", padding: "12px", borderRadius: "6px", textAlign: "center", border: "1px solid var(--line)" }}>
                  <span style={{ display: "block", fontSize: "12px", color: "var(--muted)", fontWeight: "600" }}>EARNED</span>
                  <strong style={{ display: "block", fontSize: "24px", color: "var(--brand)", marginTop: "4px" }}>{balance?.earned || 0}</strong>
                </div>
              </div>
            )}
          </div>

          {/* Form to Apply */}
          <div className="panel-card" style={{ padding: "24px" }}>
            <h2 style={{ fontSize: "18px", marginBottom: "16px", color: "var(--brand)" }}>Request Time-Off</h2>
            <form onSubmit={handleApply} style={{ display: "grid", gap: "12px" }}>
              <label style={{ display: "flex", flexDirection: "column", fontSize: "13px", fontWeight: "600" }}>
                Leave Type
                <select 
                  value={leaveType} 
                  onChange={e => setLeaveType(e.target.value)}
                  style={{ padding: "8px", borderRadius: "6px", border: "1px solid var(--line)", background: "#f9fbfd", marginTop: "4px" }}
                >
                  <option value="Casual">Casual Leave</option>
                  <option value="Sick">Sick Leave</option>
                  <option value="Earned">Earned Leave</option>
                </select>
              </label>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <label style={{ display: "flex", flexDirection: "column", fontSize: "13px", fontWeight: "600" }}>
                  Start Date
                  <input 
                    type="date" 
                    value={startDate} 
                    onChange={e => setStartDate(e.target.value)}
                    style={{ padding: "8px", borderRadius: "6px", border: "1px solid var(--line)", background: "#f9fbfd", marginTop: "4px" }}
                  />
                </label>
                <label style={{ display: "flex", flexDirection: "column", fontSize: "13px", fontWeight: "600" }}>
                  End Date
                  <input 
                    type="date" 
                    value={endDate} 
                    onChange={e => setEndDate(e.target.value)}
                    style={{ padding: "8px", borderRadius: "6px", border: "1px solid var(--line)", background: "#f9fbfd", marginTop: "4px" }}
                  />
                </label>
              </div>

              <label style={{ display: "flex", flexDirection: "column", fontSize: "13px", fontWeight: "600" }}>
                Reason for Leave
                <textarea 
                  value={reason} 
                  onChange={e => setReason(e.target.value)}
                  placeholder="Provide context or explanation..."
                  style={{ padding: "8px", borderRadius: "6px", border: "1px solid var(--line)", background: "#f9fbfd", marginTop: "4px", minHeight: "60px", resize: "vertical" }}
                />
              </label>

              {error && <div style={{ color: "#b93657", fontSize: "13px", fontWeight: "600", marginTop: "8px" }}>{error}</div>}
              {message && <div style={{ color: "#21a67a", fontSize: "13px", fontWeight: "600", marginTop: "8px" }}>{message}</div>}

              <button type="submit" className="success" disabled={submitting} style={{ marginTop: "10px", minHeight: "40px" }}>
                {submitting ? "Submitting..." : "Apply"}
              </button>
            </form>
          </div>
        </div>

        <div style={{ display: "grid", gap: "24px" }}>
          {/* Admin Pending Requests review panel */}
          {isAdmin && (
            <div className="panel-card" style={{ padding: "24px" }}>
              <h2 style={{ fontSize: "18px", marginBottom: "16px", color: "var(--accent)" }}>
                Pending Approvals ({pendingRequests.length})
              </h2>

              {pendingRequests.length === 0 ? (
                <div style={{ color: "var(--muted)", padding: "10px 0" }}>No pending leave applications.</div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {pendingRequests.map((req) => (
                    <div 
                      key={req.id}
                      style={{
                        padding: "14px",
                        border: "1px solid rgba(228, 77, 106, 0.24)",
                        borderRadius: "8px",
                        background: "rgba(228, 77, 106, 0.05)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                      }}
                    >
                      <div>
                        <strong style={{ display: "block" }}>{req.employeeName}</strong>
                        <span style={{ fontSize: "12px", color: "var(--brand-dark)", fontWeight: "600" }}>
                          {req.leaveType} Leave • {req.daysCount} Days
                        </span>
                        <div style={{ fontSize: "12px", color: "var(--muted)", marginTop: "2px" }}>
                          {req.startDate} to {req.endDate}
                        </div>
                        <small style={{ display: "block", color: "var(--muted)", marginTop: "4px" }}>"{req.reason}"</small>
                      </div>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button 
                          onClick={() => handleProcessRequest(req.id, "approve")}
                          className="success"
                          style={{ minHeight: "30px", padding: "0 10px", fontSize: "12px" }}
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => handleProcessRequest(req.id, "reject")}
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

          {/* Applied list */}
          <div className="panel-card" style={{ padding: "24px", overflowY: "auto", maxHeight: "400px" }}>
            <h2 style={{ fontSize: "18px", marginBottom: "16px", color: "var(--brand)" }}>Roster Requests History</h2>

            {loading ? (
              <div style={{ color: "var(--muted)" }}>Loading roster history...</div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {processedRequests.length === 0 ? (
                  <div style={{ color: "var(--muted)" }}>No historical requests logs.</div>
                ) : (
                  processedRequests.map((req) => (
                    <div 
                      key={req.id} 
                      style={{ 
                        padding: "12px", 
                        border: "1px solid var(--line)", 
                        borderRadius: "8px", 
                        background: "rgba(255,255,255,0.4)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                      }}
                    >
                      <div>
                        <strong>{req.employeeName}</strong>
                        <div style={{ fontSize: "12px", color: "var(--muted)" }}>
                          {req.leaveType} Leave • {req.daysCount} Days ({req.startDate} to {req.endDate})
                        </div>
                      </div>
                      <div>
                        <span style={{
                          padding: "2px 8px",
                          borderRadius: "10px",
                          fontSize: "11px",
                          fontWeight: "700",
                          backgroundColor: req.status === "Approved" ? "rgba(33, 166, 122, 0.15)" : "rgba(228, 77, 106, 0.15)",
                          color: req.status === "Approved" ? "#13835f" : "#b93657"
                        }}>
                          {req.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
