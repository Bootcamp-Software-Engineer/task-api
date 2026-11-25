import type { Request, Response } from "express";
import { tasksService } from "../services/tasks.service.js";
export const tasksController = {
list(_req: Request, res: Response): void {
res.json(tasksService.list());
},
get(req: Request<{ id: string }>, res: Response): void {
res.json(tasksService.get(req.params.id));
},
create(req: Request, res: Response): void {
res.status(201).json(tasksService.create(req.body));
},
update(req: Request<{ id: string }>, res: Response): void {
res.json(tasksService.update(req.params.id, req.body));
},
remove(req: Request<{ id: string }>, res: Response): void {
tasksService.remove(req.params.id);
res.status(204).send();
},
};