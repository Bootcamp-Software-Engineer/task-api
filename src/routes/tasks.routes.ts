import { Router } from "express";
import { tasksController } from "../controllers/tasks.controller.js";
import { validate } from "../middlewares/validate.js";
import { createTaskSchema, updateTaskSchema, idParamSchema } from "../schemas/task.schema.js";

export const tasksRouter = Router();

tasksRouter.get("/", tasksController.list);
tasksRouter.get("/:id", validate(idParamSchema, "params"), tasksController.get);
tasksRouter.post("/", validate(createTaskSchema), tasksController.create);
tasksRouter.patch("/:id", validate(idParamSchema, "params"), validate(updateTaskSchema), tasksController.update);
tasksRouter.delete("/:id", validate(idParamSchema, "params"), tasksController.remove);