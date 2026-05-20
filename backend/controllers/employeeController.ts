import { Request, Response } from "express";
import { employees, leaveBalances } from "../db/mockDb";

export const getEmployees = (req: Request, res: Response) => {
  res.json(employees);
};

export const createEmployee = (req: Request, res: Response) => {
  const { firstName, lastName, email, designation, department, branch, joinDate, salary } = req.body;

  if (!firstName || !lastName || !email || !designation || !department) {
    return res.status(400).json({ message: "Missing required employee details" });
  }

  const nextIdNum = employees.length + 1;
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
    status: "Active" as const,
    salary: Number(salary) || 30000,
  };

  employees.push(newEmployee);

  leaveBalances.push({
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
