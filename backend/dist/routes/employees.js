"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employeeController_1 = require("../controllers/employeeController");
const validator_1 = require("../middleware/validator");
const router = (0, express_1.Router)();
router.get("/", employeeController_1.getEmployees);
router.post("/", (0, validator_1.validateBody)(["firstName", "lastName", "email", "designation", "department"]), employeeController_1.createEmployee);
exports.default = router;
