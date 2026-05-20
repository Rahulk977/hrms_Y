"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const validator_1 = require("../middleware/validator");
const router = (0, express_1.Router)();
router.post("/login", (0, validator_1.validateBody)(["email", "password"]), authController_1.login);
exports.default = router;
