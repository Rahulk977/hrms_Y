import { Request, Response } from "express";
import { leaveRequests, leaveBalances, employees } from "../db/mockDb";

export const getLeaveRequests = (req: Request, res: Response) => {
  res.json(leaveRequests);
};

export const getLeaveBalance = (req: Request, res: Response) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ message: "Employee email is required" });
  }

  const emp = employees.find(e => e.email.toLowerCase() === (email as string).toLowerCase());
  if (!emp) {
    return res.status(404).json({ message: "Employee not found" });
  }

  const balance = leaveBalances.find(b => b.employeeId === emp.id);
  res.json(balance || { employeeId: emp.id, casual: 0, sick: 0, earned: 0 });
};

export const applyLeave = (req: Request, res: Response) => {
  const { employeeEmail, leaveType, startDate, endDate, reason } = req.body;

  if (!employeeEmail || !leaveType || !startDate || !endDate || !reason) {
    return res.status(400).json({ message: "Missing required leave parameters" });
  }

  const emp = employees.find(e => e.email.toLowerCase() === employeeEmail.toLowerCase());
  if (!emp) {
    return res.status(404).json({ message: "Employee not found" });
  }

  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

  const balance = leaveBalances.find((b) => b.employeeId === emp.id);
  if (balance) {
    const typeKey = leaveType.toLowerCase() as keyof typeof balance;
    if (typeKey !== "employeeId") {
      const remaining = balance[typeKey] as number;
      if (remaining < diffDays) {
        return res.status(400).json({
          message: `Insufficient leave balance. Requested: ${diffDays}, Remaining: ${remaining}`
        });
      }
    }
  }

  const newRequest = {
    id: `LR${String(leaveRequests.length + 1).padStart(3, "0")}`,
    employeeId: emp.id,
    employeeName: `${emp.firstName} ${emp.lastName}`,
    leaveType: leaveType as any,
    startDate,
    endDate,
    daysCount: diffDays,
    reason,
    status: "Pending" as const,
    createdAt: new Date().toISOString(),
  };

  leaveRequests.push(newRequest);
  res.status(201).json({
    message: "Leave application submitted successfully",
    request: newRequest,
  });
};

export const approveLeave = (req: Request, res: Response) => {
  const { id } = req.params;
  const { action } = req.body;

  const request = leaveRequests.find((r) => r.id === id);
  if (!request) {
    return res.status(404).json({ message: "Leave request not found" });
  }

  if (request.status !== "Pending") {
    return res.status(400).json({ message: "Leave request has already been processed" });
  }

  if (action === "approve") {
    request.status = "Approved";

    const balance = leaveBalances.find((b) => b.employeeId === request.employeeId);
    if (balance) {
      const typeKey = request.leaveType.toLowerCase() as Exclude<keyof typeof balance, "employeeId">;
      balance[typeKey] = Math.max(0, balance[typeKey] - request.daysCount);
    }
  } else if (action === "reject") {
    request.status = "Rejected";
  } else {
    return res.status(400).json({ message: "Invalid action, must be 'approve' or 'reject'" });
  }

  res.json({
    message: `Leave request ${action}d successfully`,
    request,
  });
};
