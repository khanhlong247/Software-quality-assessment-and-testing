import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import { pino } from "pino";

import errorHandler from "@/common/middleware/errorHandler";
import rateLimiter from "@/common/middleware/rateLimiter";
import requestLogger from "@/common/middleware/requestLogger";
import { env } from "@/common/utils/envConfig";

import { openAPIRouter } from "@/api-docs/openAPIRouter";
import { healthCheckRouter } from "@/api/healthCheck/healthCheckRouter";
import { userRouter } from "@/api/user/user.routes";
import { degreeRouter } from "./api/degree/degree.routes";
import { facultyRouter } from "./api/faculty/faculty.routes";
import { teacherRouter } from "./api/teacher/teacher.routes";
import { semesterRouter } from "./api/semester/semester.routes";
import { authRouter } from "./api/auth/auth.routes";
import { courseRouter } from "./api/course/course.routes";
import { classSectionRouter } from "./api/class_section/class_section.routes";

const logger = pino({ name: "server start" });
const app: Express = express();

// Set the application to trust the reverse proxy
app.set("trust proxy", true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());
// app.use(rateLimiter);

// Request logging
app.use(requestLogger);

// Routes
app.use("/health-check", healthCheckRouter);
app.use("/users", userRouter);
app.use("/degrees", degreeRouter);
app.use("/faculties", facultyRouter);
app.use("/teachers", teacherRouter);
app.use("/semesters", semesterRouter);
app.use("/courses", courseRouter);
app.use("/auth", authRouter);
app.use("/class-sections", classSectionRouter);


// Swagger UI
app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

export { app, logger };
