export interface Attendance {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  clockIn: string;
  clockOut: string | null;
  status: "Present" | "Absent" | "Late" | "Pending Approval";
  isManual: boolean;
}
