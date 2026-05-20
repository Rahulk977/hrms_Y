import { User } from "../models/User";
import { Employee } from "../models/Employee";
import { Attendance } from "../models/Attendance";
import { LeaveRequest, LeaveBalance } from "../models/Leave";

// Initial Data Seeds
export const users: User[] = [
  {
    displayName: "VIKAS",
    email: "vikas@subherp.com",
    role: "HR Admin",
    password: "vikas123",
  },
  {
    displayName: "Rahul Kumar",
    email: "rahul@subherp.com",
    role: "Employee",
    password: "user123",
  }
];

export const employees: Employee[] = [
  {
    id: "EMP001",
    firstName: "Vikas",
    lastName: "Sharma",
    email: "vikas@subherp.com",
    designation: "HR Director",
    department: "Human Resources",
    branch: "Mumbai Head Office",
    joinDate: "2023-01-15",
    status: "Active",
    salary: 95000,
  },
  {
    id: "EMP002",
    firstName: "Rahul",
    lastName: "Kumar",
    email: "rahul@subherp.com",
    designation: "Software Engineer",
    department: "Technology",
    branch: "Bangalore R&D",
    joinDate: "2024-03-10",
    status: "Active",
    salary: 75000,
  },
  {
    id: "EMP003",
    firstName: "Priya",
    lastName: "Patel",
    email: "priya@subherp.com",
    designation: "Product Manager",
    department: "Product Management",
    branch: "Mumbai Head Office",
    joinDate: "2023-08-22",
    status: "Active",
    salary: 85000,
  },
  {
    id: "EMP004",
    firstName: "Amit",
    lastName: "Singh",
    email: "amit@subherp.com",
    designation: "UI/UX Designer",
    department: "Technology",
    branch: "Delhi Branch",
    joinDate: "2024-01-05",
    status: "Active",
    salary: 60000,
  },
  {
    id: "EMP005",
    firstName: "Neha",
    lastName: "Gupta",
    email: "neha@subherp.com",
    designation: "HR Executive",
    department: "Human Resources",
    branch: "Mumbai Head Office",
    joinDate: "2024-05-02",
    status: "Active",
    salary: 40000,
  }
];

export const attendances: Attendance[] = [
  {
    id: "ATT001",
    employeeId: "EMP001",
    employeeName: "Vikas Sharma",
    date: "2026-05-19",
    clockIn: "09:15",
    clockOut: "18:05",
    status: "Present",
    isManual: false,
  },
  {
    id: "ATT002",
    employeeId: "EMP002",
    employeeName: "Rahul Kumar",
    date: "2026-05-19",
    clockIn: "09:30",
    clockOut: "18:00",
    status: "Present",
    isManual: false,
  },
  {
    id: "ATT003",
    employeeId: "EMP003",
    employeeName: "Priya Patel",
    date: "2026-05-19",
    clockIn: "09:05",
    clockOut: "17:50",
    status: "Present",
    isManual: false,
  },
  {
    id: "ATT004",
    employeeId: "EMP004",
    employeeName: "Amit Singh",
    date: "2026-05-18",
    clockIn: "09:45",
    clockOut: null,
    status: "Pending Approval",
    isManual: true,
  }
];

export const leaveRequests: LeaveRequest[] = [
  {
    id: "LR001",
    employeeId: "EMP002",
    employeeName: "Rahul Kumar",
    leaveType: "Casual",
    startDate: "2026-05-25",
    endDate: "2026-05-26",
    daysCount: 2,
    reason: "Family function",
    status: "Pending",
    createdAt: "2026-05-18T10:30:00Z",
  },
  {
    id: "LR002",
    employeeId: "EMP003",
    employeeName: "Priya Patel",
    leaveType: "Sick",
    startDate: "2026-05-10",
    endDate: "2026-05-11",
    daysCount: 2,
    reason: "High fever",
    status: "Approved",
    createdAt: "2026-05-09T08:15:00Z",
  }
];

export const leaveBalances: LeaveBalance[] = [
  { employeeId: "EMP001", casual: 10, sick: 8, earned: 15 },
  { employeeId: "EMP002", casual: 12, sick: 7, earned: 12 },
  { employeeId: "EMP003", casual: 8, sick: 6, earned: 14 },
  { employeeId: "EMP004", casual: 14, sick: 8, earned: 15 },
  { employeeId: "EMP005", casual: 15, sick: 8, earned: 15 }
];
