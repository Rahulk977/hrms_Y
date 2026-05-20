"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.approveAttendance = exports.submitManualAttendance = exports.clockToggle = exports.getAttendanceLogs = void 0;
const mockDb_1 = require("../db/mockDb");
const getAttendanceLogs = (req, res) => {
    res.json(mockDb_1.attendances);
};
exports.getAttendanceLogs = getAttendanceLogs;
const clockToggle = (req, res) => {
    const { employeeEmail } = req.body;
    if (!employeeEmail) {
        return res.status(400).json({ message: "Employee email is required" });
    }
    const emp = mockDb_1.employees.find(e => e.email.toLowerCase() === employeeEmail.toLowerCase());
    if (!emp) {
        return res.status(404).json({ message: "Employee not found" });
    }
    const todayStr = new Date().toISOString().split("T")[0];
    const nowTime = new Date().toTimeString().slice(0, 5);
    const activeLog = mockDb_1.attendances.find((a) => a.employeeId === emp.id && a.date === todayStr && a.clockOut === null);
    if (activeLog) {
        activeLog.clockOut = nowTime;
        res.json({
            message: "Clocked out successfully",
            attendance: activeLog,
            type: "out"
        });
    }
    else {
        const newLog = {
            id: `ATT${String(mockDb_1.attendances.length + 1).padStart(3, "0")}`,
            employeeId: emp.id,
            employeeName: `${emp.firstName} ${emp.lastName}`,
            date: todayStr,
            clockIn: nowTime,
            clockOut: null,
            status: "Present",
            isManual: false,
        };
        mockDb_1.attendances.push(newLog);
        res.json({
            message: "Clocked in successfully",
            attendance: newLog,
            type: "in"
        });
    }
};
exports.clockToggle = clockToggle;
const submitManualAttendance = (req, res) => {
    const { employeeEmail, date, clockIn, clockOut } = req.body;
    if (!employeeEmail || !date || !clockIn) {
        return res.status(400).json({ message: "Email, date, and clock-in are required" });
    }
    const emp = mockDb_1.employees.find(e => e.email.toLowerCase() === employeeEmail.toLowerCase());
    if (!emp) {
        return res.status(404).json({ message: "Employee not found" });
    }
    const newLog = {
        id: `ATT${String(mockDb_1.attendances.length + 1).padStart(3, "0")}`,
        employeeId: emp.id,
        employeeName: `${emp.firstName} ${emp.lastName}`,
        date,
        clockIn,
        clockOut: clockOut || null,
        status: "Pending Approval",
        isManual: true,
    };
    mockDb_1.attendances.push(newLog);
    res.status(201).json({
        message: "Manual attendance approval request submitted",
        attendance: newLog,
    });
};
exports.submitManualAttendance = submitManualAttendance;
const approveAttendance = (req, res) => {
    const { id } = req.params;
    const { action } = req.body;
    const log = mockDb_1.attendances.find((a) => a.id === id);
    if (!log) {
        return res.status(404).json({ message: "Attendance record not found" });
    }
    if (action === "approve") {
        log.status = "Present";
    }
    else if (action === "reject") {
        log.status = "Absent";
    }
    else {
        return res.status(400).json({ message: "Invalid action, must be 'approve' or 'reject'" });
    }
    res.json({
        message: `Attendance log ${action}d successfully`,
        attendance: log,
    });
};
exports.approveAttendance = approveAttendance;
