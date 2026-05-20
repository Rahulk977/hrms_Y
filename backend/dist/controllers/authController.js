"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const mockDb_1 = require("../db/mockDb");
const login = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    const user = mockDb_1.users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }
    const { password: _, ...userData } = user;
    res.json({
        message: "Login successful",
        user: userData,
    });
};
exports.login = login;
