import { Router } from "express";
import {
  getLeaveRequests,
  getLeaveBalance,
  applyLeave,
  approveLeave,
} from "../controllers/leaveController";
import { validateBody } from "../middleware/validator";

const router = Router();

router.get("/requests", getLeaveRequests);
router.get("/balance", getLeaveBalance);
router.post(
  "/apply",
  validateBody(["employeeEmail", "leaveType", "startDate", "endDate", "reason"]),
  applyLeave
);
router.patch("/requests/:id/approve", validateBody(["action"]), approveLeave);

export default router;
