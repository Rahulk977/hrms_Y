import { Router } from "express";
import { getEmployees, createEmployee } from "../controllers/employeeController";
import { validateBody } from "../middleware/validator";

const router = Router();

router.get("/", getEmployees);
router.post(
  "/",
  validateBody(["firstName", "lastName", "email", "designation", "department"]),
  createEmployee
);

export default router;
