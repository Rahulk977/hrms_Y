"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./routes/auth"));
const employees_1 = __importDefault(require("./routes/employees"));
const attendance_1 = __importDefault(require("./routes/attendance"));
const leaves_1 = __importDefault(require("./routes/leaves"));
const dashboard_1 = __importDefault(require("./routes/dashboard"));
const logger_1 = require("./middleware/logger");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5001;
// Middleware
app.use((0, cors_1.default)({
    origin: "http://localhost:3000", // Allow local Next.js frontend
    credentials: true,
}));
app.use(express_1.default.json());
app.use(logger_1.logger);
// Routes
app.use("/api/auth", auth_1.default);
app.use("/api/employees", employees_1.default);
app.use("/api/attendance", attendance_1.default);
app.use("/api/leaves", leaves_1.default);
app.use("/api/dashboard", dashboard_1.default);
// Base route
app.get("/", (req, res) => {
    res.json({ message: "Subherp HRMS API Backend is running." });
});
// Start Server
app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
});
