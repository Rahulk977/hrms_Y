"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

type EmployeeEntryWorkspaceProps = {
  onBack: () => void;
};

export function EmployeeEntryWorkspace({ onBack }: EmployeeEntryWorkspaceProps) {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Form State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const [branch, setBranch] = useState("Mumbai Head Office");
  const [joinDate, setJoinDate] = useState(new Date().toISOString().split("T")[0]);
  const [salary, setSalary] = useState("50000");

  const loadEmployees = () => {
    api.getEmployees()
      .then(setEmployees)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setSubmitting(true);

    if (!firstName || !lastName || !email || !designation || !department) {
      setError("Please fill out all required fields.");
      setSubmitting(false);
      return;
    }

    try {
      await api.createEmployee({
        firstName,
        lastName,
        email,
        designation,
        department,
        branch,
        joinDate,
        salary: Number(salary) || 0,
      });

      setMessage("Employee registered successfully!");
      // Reset Form
      setFirstName("");
      setLastName("");
      setEmail("");
      setDesignation("");
      setDepartment("");
      setSalary("50000");
      // Reload list
      loadEmployees();
    } catch (err: any) {
      setError(err.message || "Failed to create employee.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ padding: "0 38px 44px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", margin: "24px 0" }}>
        <button onClick={onBack} className="primary" style={{ minHeight: "36px", padding: "0 14px" }}>
          ← Back to Modules
        </button>
        <h1 style={{ fontSize: "28px", fontWeight: "800", margin: 0 }}>Employee Entry</h1>
      </div>

      <div style={{ display: "grid", gap: "24px", gridTemplateColumns: "1fr 1.2fr" }}>
        {/* Form panel */}
        <div className="panel-card" style={{ padding: "24px" }}>
          <h2 style={{ fontSize: "18px", marginBottom: "16px", color: "var(--brand)" }}>Add New Employee</h2>
          
          <form onSubmit={handleSubmit} style={{ display: "grid", gap: "12px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <label style={{ display: "flex", flexDirection: "column", fontSize: "13px", fontWeight: "600" }}>
                First Name *
                <input 
                  type="text" 
                  value={firstName} 
                  onChange={e => setFirstName(e.target.value)}
                  style={{ padding: "8px", borderRadius: "6px", border: "1px solid var(--line)", background: "#f9fbfd", marginTop: "4px" }}
                  placeholder="John"
                />
              </label>
              <label style={{ display: "flex", flexDirection: "column", fontSize: "13px", fontWeight: "600" }}>
                Last Name *
                <input 
                  type="text" 
                  value={lastName} 
                  onChange={e => setLastName(e.target.value)}
                  style={{ padding: "8px", borderRadius: "6px", border: "1px solid var(--line)", background: "#f9fbfd", marginTop: "4px" }}
                  placeholder="Doe"
                />
              </label>
            </div>

            <label style={{ display: "flex", flexDirection: "column", fontSize: "13px", fontWeight: "600" }}>
              Email address *
              <input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)}
                style={{ padding: "8px", borderRadius: "6px", border: "1px solid var(--line)", background: "#f9fbfd", marginTop: "4px" }}
                placeholder="john.doe@subherp.com"
              />
            </label>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <label style={{ display: "flex", flexDirection: "column", fontSize: "13px", fontWeight: "600" }}>
                Designation *
                <input 
                  type="text" 
                  value={designation} 
                  onChange={e => setDesignation(e.target.value)}
                  style={{ padding: "8px", borderRadius: "6px", border: "1px solid var(--line)", background: "#f9fbfd", marginTop: "4px" }}
                  placeholder="Software Engineer"
                />
              </label>
              <label style={{ display: "flex", flexDirection: "column", fontSize: "13px", fontWeight: "600" }}>
                Department *
                <input 
                  type="text" 
                  value={department} 
                  onChange={e => setDepartment(e.target.value)}
                  style={{ padding: "8px", borderRadius: "6px", border: "1px solid var(--line)", background: "#f9fbfd", marginTop: "4px" }}
                  placeholder="Technology"
                />
              </label>
            </div>

            <label style={{ display: "flex", flexDirection: "column", fontSize: "13px", fontWeight: "600" }}>
              Branch office
              <select 
                value={branch} 
                onChange={e => setBranch(e.target.value)}
                style={{ padding: "8px", borderRadius: "6px", border: "1px solid var(--line)", background: "#f9fbfd", marginTop: "4px" }}
              >
                <option value="Mumbai Head Office">Mumbai Head Office</option>
                <option value="Bangalore R&D">Bangalore R&D</option>
                <option value="Delhi Branch">Delhi Branch</option>
              </select>
            </label>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <label style={{ display: "flex", flexDirection: "column", fontSize: "13px", fontWeight: "600" }}>
                Join Date
                <input 
                  type="date" 
                  value={joinDate} 
                  onChange={e => setJoinDate(e.target.value)}
                  style={{ padding: "8px", borderRadius: "6px", border: "1px solid var(--line)", background: "#f9fbfd", marginTop: "4px" }}
                />
              </label>
              <label style={{ display: "flex", flexDirection: "column", fontSize: "13px", fontWeight: "600" }}>
                Monthly Salary (INR)
                <input 
                  type="number" 
                  value={salary} 
                  onChange={e => setSalary(e.target.value)}
                  style={{ padding: "8px", borderRadius: "6px", border: "1px solid var(--line)", background: "#f9fbfd", marginTop: "4px" }}
                />
              </label>
            </div>

            {error && <div style={{ color: "#b93657", fontSize: "13px", fontWeight: "600", marginTop: "8px" }}>{error}</div>}
            {message && <div style={{ color: "#21a67a", fontSize: "13px", fontWeight: "600", marginTop: "8px" }}>{message}</div>}

            <button 
              type="submit" 
              className="success" 
              disabled={submitting} 
              style={{ marginTop: "16px", minHeight: "40px" }}
            >
              {submitting ? "Submitting..." : "Register Employee"}
            </button>
          </form>
        </div>

        {/* Directory List panel */}
        <div className="panel-card" style={{ padding: "24px", overflowY: "auto", maxHeight: "550px" }}>
          <h2 style={{ fontSize: "18px", marginBottom: "16px", color: "var(--brand)" }}>Active Directory ({employees.length})</h2>

          {loading ? (
            <div style={{ color: "var(--muted)" }}>Loading employee files...</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {employees.map((emp) => (
                <div 
                  key={emp.id} 
                  style={{ 
                    padding: "12px 14px", 
                    borderRadius: "8px", 
                    border: "1px solid var(--line)", 
                    background: "rgba(255,255,255,0.4)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <div>
                    <strong style={{ display: "block", color: "var(--ink)", fontSize: "14px" }}>
                      {emp.firstName} {emp.lastName} <span style={{ fontSize: "11px", color: "var(--muted)", fontWeight: "normal" }}>({emp.id})</span>
                    </strong>
                    <span style={{ fontSize: "12px", color: "var(--muted)" }}>{emp.designation} • {emp.department}</span>
                    <small style={{ display: "block", color: "var(--muted)", fontSize: "11px", marginTop: "2px" }}>{emp.email}</small>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ 
                      display: "inline-block", 
                      padding: "2px 8px", 
                      borderRadius: "10px", 
                      fontSize: "10px", 
                      fontWeight: "700",
                      background: "rgba(33, 166, 122, 0.15)", 
                      color: "#13835f" 
                    }}>
                      {emp.status}
                    </span>
                    <span style={{ display: "block", fontSize: "12px", fontWeight: "700", marginTop: "4px", color: "var(--brand-dark)" }}>
                      ₹{emp.salary.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
