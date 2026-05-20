export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  designation: string;
  department: string;
  branch: string;
  joinDate: string;
  status: "Active" | "Inactive";
  salary: number;
}
