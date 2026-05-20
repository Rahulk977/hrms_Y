export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  leaveType: "Casual" | "Sick" | "Earned";
  startDate: string;
  endDate: string;
  daysCount: number;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
  createdAt: string;
}

export interface LeaveBalance {
  employeeId: string;
  casual: number;
  sick: number;
  earned: number;
}
