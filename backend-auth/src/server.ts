import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import adminRoutes from "./routes/admin";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Security middleware
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

// Remove or comment out all rate limiting middleware for development
// const apiLimiter = rateLimit({ ... });
// app.use(apiLimiter);
// app.use(limiter);
// app.use((req, res, next) => { next(); });

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Authentication service is running",
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error handling middleware
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("❌ Server error:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Authentication server running on port ${PORT}`);
  console.log(`📧 SMTP Host: ${process.env.SMTP_HOST}`);
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL}`);
  console.log(
    `🔐 JWT Secret: ${process.env.JWT_SECRET ? "Configured" : "Not configured"}`
  );
});
