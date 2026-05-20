import { Router } from "express";
import { login } from "../controllers/authController";
import { validateBody } from "../middleware/validator";

const router = Router();

router.post("/login", validateBody(["email", "password"]), login);

export default router;
