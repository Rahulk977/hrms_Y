"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmployee = exports.getEmployees = void 0;
const mockDb_1 = require("../db/mockDb");
const getEmployees = (req, res) => {
    res.json(mockDb_1.employees);
};
exports.getEmployees = getEmployees;
const createEmployee = (req, res) => {
    const { firstName, lastName, email, designation, department, branch, joinDate, salary } = req.body;
    if (!firstName || !lastName || !email || !designation || !department) {
        return res.status(400).json({ message: "Missing required employee details" });
    }
    const nextIdNum = mockDb_1.employees.length + 1;
    const newId = `EMP${String(nextIdNum).padStart(3, "0")}`;
    const newEmployee = {
        id: newId,
        firstName,
        lastName,
        email,
        designation,
        department,
        branch: branch || "Head Office",
        joinDate: joinDate || new Date().toISOString().split("T")[0],
        status: "Active",
        salary: Number(salary) || 30000,
    };
    mockDb_1.employees.push(newEmployee);
    mockDb_1.leaveBalances.push({
        employeeId: newId,
        casual: 12,
        sick: 8,
        earned: 15
    });
    res.status(201).json({
        message: "Employee entry created successfully",
        employee: newEmployee,
    });
};
exports.createEmployee = createEmployee;
