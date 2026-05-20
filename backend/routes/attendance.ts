import { Router } from "express";
import {
  getAttendanceLogs,
  clockToggle,
  submitManualAttendance,
  approveAttendance,
} from "../controllers/attendanceController";
import { validateBody } from "../middleware/validator";

const router = Router();

router.get("/", getAttendanceLogs);
router.post("/clock-toggle", validateBody(["employeeEmail"]), clockToggle);
router.post(
  "/manual-request",
  validateBody(["employeeEmail", "date", "clockIn"]),
  submitManualAttendance
);
router.patch("/:id/approve", validateBody(["action"]), approveAttendance);

export default router;
