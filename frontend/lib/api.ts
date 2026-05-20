const API_BASE_URL = "http://localhost:5001/api";

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API error: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export const api = {
  // Auth
  login: (email: string, password: string) =>
    apiFetch<{ user: any; message: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  // Dashboard
  getDashboardStats: () =>
    apiFetch<{
      stats: any[];
      weeklyMovement: number[];
      weekDays: string[];
      recentActivity: string[];
      pendingTasks: string[];
    }>("/dashboard/stats"),

  // Employees
  getEmployees: () => apiFetch<any[]>("/employees"),
  createEmployee: (employeeData: {
    firstName: string;
    lastName: string;
    email: string;
    designation: string;
    department: string;
    branch: string;
    joinDate: string;
    salary: number;
  }) =>
    apiFetch<any>("/employees", {
      method: "POST",
      body: JSON.stringify(employeeData),
    }),

  // Attendance
  getAttendanceLogs: () => apiFetch<any[]>("/attendance"),
  toggleClock: (employeeEmail: string) =>
    apiFetch<{ attendance: any; message: string; type: "in" | "out" }>("/attendance/clock-toggle", {
      method: "POST",
      body: JSON.stringify({ employeeEmail }),
    }),
  submitManualAttendance: (data: {
    employeeEmail: string;
    date: string;
    clockIn: string;
    clockOut?: string;
  }) =>
    apiFetch<any>("/attendance/manual-request", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  approveAttendance: (id: string, action: "approve" | "reject") =>
    apiFetch<any>(`/attendance/${id}/approve`, {
      method: "PATCH",
      body: JSON.stringify({ action }),
    }),

  // Leaves
  getLeaveRequests: () => apiFetch<any[]>("/leaves/requests"),
  getLeaveBalance: (email: string) =>
    apiFetch<{ casual: number; sick: number; earned: number }>(`/leaves/balance?email=${encodeURIComponent(email)}`),
  applyLeave: (data: {
    employeeEmail: string;
    leaveType: string;
    startDate: string;
    endDate: string;
    reason: string;
  }) =>
    apiFetch<any>("/leaves/apply", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  approveLeave: (id: string, action: "approve" | "reject") =>
    apiFetch<any>(`/leaves/requests/${id}/approve`, {
      method: "PATCH",
      body: JSON.stringify({ action }),
    }),
};
