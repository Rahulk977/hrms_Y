"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.approveLeave = exports.applyLeave = exports.getLeaveBalance = exports.getLeaveRequests = void 0;
const mockDb_1 = require("../db/mockDb");
const getLeaveRequests = (req, res) => {
    res.json(mockDb_1.leaveRequests);
};
exports.getLeaveRequests = getLeaveRequests;
const getLeaveBalance = (req, res) => {
    const { email } = req.query;
    if (!email) {
        return res.status(400).json({ message: "Employee email is required" });
    }
    const emp = mockDb_1.employees.find(e => e.email.toLowerCase() === email.toLowerCase());
    if (!emp) {
        return res.status(404).json({ message: "Employee not found" });
    }
    const balance = mockDb_1.leaveBalances.find(b => b.employeeId === emp.id);
    res.json(balance || { employeeId: emp.id, casual: 0, sick: 0, earned: 0 });
};
exports.getLeaveBalance = getLeaveBalance;
const applyLeave = (req, res) => {
    const { employeeEmail, leaveType, startDate, endDate, reason } = req.body;
    if (!employeeEmail || !leaveType || !startDate || !endDate || !reason) {
        return res.status(400).json({ message: "Missing required leave parameters" });
    }
    const emp = mockDb_1.employees.find(e => e.email.toLowerCase() === employeeEmail.toLowerCase());
    if (!emp) {
        return res.status(404).json({ message: "Employee not found" });
    }
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    const balance = mockDb_1.leaveBalances.find((b) => b.employeeId === emp.id);
    if (balance) {
        const typeKey = leaveType.toLowerCase();
        if (typeKey !== "employeeId") {
            const remaining = balance[typeKey];
            if (remaining < diffDays) {
                return res.status(400).json({
                    message: `Insufficient leave balance. Requested: ${diffDays}, Remaining: ${remaining}`
                });
            }
        }
    }
    const newRequest = {
        id: `LR${String(mockDb_1.leaveRequests.length + 1).padStart(3, "0")}`,
        employeeId: emp.id,
        employeeName: `${emp.firstName} ${emp.lastName}`,
        leaveType: leaveType,
        startDate,
        endDate,
        daysCount: diffDays,
        reason,
        status: "Pending",
        createdAt: new Date().toISOString(),
    };
    mockDb_1.leaveRequests.push(newRequest);
    res.status(201).json({
        message: "Leave application submitted successfully",
        request: newRequest,
    });
};
exports.applyLeave = applyLeave;
const approveLeave = (req, res) => {
    const { id } = req.params;
    const { action } = req.body;
    const request = mockDb_1.leaveRequests.find((r) => r.id === id);
    if (!request) {
        return res.status(404).json({ message: "Leave request not found" });
    }
    if (request.status !== "Pending") {
        return res.status(400).json({ message: "Leave request has already been processed" });
    }
    if (action === "approve") {
        request.status = "Approved";
        const balance = mockDb_1.leaveBalances.find((b) => b.employeeId === request.employeeId);
        if (balance) {
            const typeKey = request.leaveType.toLowerCase();
            balance[typeKey] = Math.max(0, balance[typeKey] - request.daysCount);
        }
    }
    else if (action === "reject") {
        request.status = "Rejected";
    }
    else {
        return res.status(400).json({ message: "Invalid action, must be 'approve' or 'reject'" });
    }
    res.json({
        message: `Leave request ${action}d successfully`,
        request,
    });
};
exports.approveLeave = approveLeave;
