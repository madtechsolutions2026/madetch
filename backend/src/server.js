import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "./config/environment.js";
import { apiLimiter } from "./middleware/rateLimiter.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

import healthRoutes from "./routes/health.routes.js";
import projectsRoutes from "./routes/projects.routes.js";
import contactRoutes from "./routes/contact.routes.js";

const app = express();

// Security and utility middleware
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// CORS configuration
app.use(
  cors({
    origin: [
      config.clientOrigin,
      "http://localhost:5173",
      "http://localhost:3000",
      "https://www.madtechsolutions.tech",
      "https://madtechsolutions.tech",
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Apply general API rate limiter to all API endpoints
app.use("/api", apiLimiter);

// API Routes
app.use("/api/health", healthRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/contact", contactRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "MadTech Solutions Express API Backend is active.",
    endpoints: {
      health: "/api/health",
      projects: "/api/projects",
      contact: "/api/contact (POST)",
    },
  });
});

// 404 & Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`=============================================`);
  console.log(`🚀 MadTech API Server running on port ${PORT}`);
  console.log(`🌐 Environment: ${config.nodeEnv}`);
  console.log(`🔗 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`=============================================`);
});

export default app;
