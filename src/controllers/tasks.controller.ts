import type { Request, Response } from "express";
import { tasksService } from "../services/tasks.service.js";

export const tasksController = {
async list(_req: Request, res: Response): Promise<void> {
res.json(await tasksService.list());
},
async get(req: Request<{ id: string }>, res: Response): Promise<void> {
res.json(await tasksService.get(req.params.id));
},
async create(req: Request, res: Response): Promise<void> {
res.status(201).json(await tasksService.create(req.body));
},
async update(req: Request<{ id: string }>, res: Response): Promise<void> {
res.json(await tasksService.update(req.params.id, req.body));
},
async remove(req: Request<{ id: string }>, res: Response): Promise<void> {
await tasksService.remove(req.params.id);
res.status(204).send();
},
};