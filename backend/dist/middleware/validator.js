"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = void 0;
const validateBody = (requiredFields) => {
    return (req, res, next) => {
        const missing = requiredFields.filter((field) => {
            const val = req.body[field];
            return val === undefined || val === null || val === "";
        });
        if (missing.length > 0) {
            return res.status(400).json({
                message: `Missing required fields: ${missing.join(", ")}`,
            });
        }
        next();
    };
};
exports.validateBody = validateBody;
