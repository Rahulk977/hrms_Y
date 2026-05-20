"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStats = void 0;
const mockDb_1 = require("../db/mockDb");
const getStats = (req, res) => {
    const totalEmployees = mockDb_1.employees.length;
    const todayStr = new Date().toISOString().split("T")[0];
    const presentToday = mockDb_1.attendances.filter((a) => a.date === todayStr && a.status === "Present").length;
    const attendanceRate = totalEmployees > 0
        ? Math.round((presentToday / totalEmployees) * 100)
        : 100;
    const pendingLeaves = mockDb_1.leaveRequests.filter((r) => r.status === "Pending").length;
    const dashboardStats = [
        { label: "Employees", value: String(totalEmployees), trend: "+1 this month", tone: "sky" },
        { label: "Attendance Today", value: `${attendanceRate}%`, trend: `${presentToday} present today`, tone: "green" },
        { label: "Leave Requests", value: String(pendingLeaves), trend: `${pendingLeaves} need review`, tone: "amber" },
        { label: "Payroll Ready", value: "92%", trend: "May cycle ready", tone: "rose" },
    ];
    const weeklyMovement = [45, 62, 78, 55, 90, 80, 95];
    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const recentActivity = [
        `${pendingLeaves} leave requests pending administrative review`,
        "Branch holiday calendars synchronized",
        `${totalEmployees} total staff profiles cataloged`,
        "System security and session limits verified"
    ];
    const pendingTasksList = [];
    if (pendingLeaves > 0) {
        pendingTasksList.push(`Approve Leave Requests (${pendingLeaves} pending)`);
    }
    const pendingAttendanceApprovals = mockDb_1.attendances.filter(a => a.status === "Pending Approval").length;
    if (pendingAttendanceApprovals > 0) {
        pendingTasksList.push(`Approve Attendance Waiving (${pendingAttendanceApprovals} pending)`);
    }
    pendingTasksList.push("Review Monthly Payroll Entries");
    pendingTasksList.push("Synchronize Holiday Rosters");
    res.json({
        stats: dashboardStats,
        weeklyMovement,
        weekDays,
        recentActivity,
        pendingTasks: pendingTasksList,
    });
};
exports.getStats = getStats;
