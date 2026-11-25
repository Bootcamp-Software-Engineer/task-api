import express from "express";
import { tasksRouter } from "./routes/tasks.routes.js";
import { notFound, errorHandler } from "./middlewares/error-handler.js";
export const app = express();
app.use(express.json());
app.get("/health", (_req, res) => {
res.json({ status: "ok" });
});
app.use("/tasks", tasksRouter);
app.use(notFound);
app.use(errorHandler);