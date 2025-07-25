"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = __importDefault(require("./routes/auth"));
const admin_1 = __importDefault(require("./routes/admin"));
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5001;
// Security middleware
app.use((0, helmet_1.default)());
// CORS configuration
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
}));
// Remove or comment out all rate limiting middleware for development
// const apiLimiter = rateLimit({ ... });
// app.use(apiLimiter);
// app.use(limiter);
// app.use((req, res, next) => { next(); });
// Body parsing middleware
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "10mb" }));
// Health check endpoint
app.get("/health", (req, res) => {
    res.json({
        success: true,
        message: "Authentication service is running",
        timestamp: new Date().toISOString(),
    });
});
// Routes
app.use("/api/auth", auth_1.default);
app.use("/api/admin", admin_1.default);
// 404 handler
app.use("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error("❌ Server error:", err);
    res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
});
// Start server
app.listen(PORT, () => {
    console.log(`🚀 Authentication server running on port ${PORT}`);
    console.log(`📧 SMTP Host: ${process.env.SMTP_HOST}`);
    console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL}`);
    console.log(`🔐 JWT Secret: ${process.env.JWT_SECRET ? "Configured" : "Not configured"}`);
});
//# sourceMappingURL=server.js.map