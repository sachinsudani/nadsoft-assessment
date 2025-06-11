import compression from "compression";
import cors from "cors";
import express, { Express } from "express";
import helmet from "helmet";
import { errorHandler } from "./middlewares/error.middleware";
import markRouter from "./routes/mark/v1/mark.routes";
import studentRouter from "./routes/student/v1/student.routes";

const app: Express = express();

app.use(cors());
app.use(helmet());
app.use(compression());

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use("/api/v1/student", studentRouter);
app.use("/api/v1/mark", markRouter);

app.use(errorHandler);

export { app };

