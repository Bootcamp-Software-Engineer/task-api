import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app-error.js";
export function notFound(_req: Request, res: Response): void {
res.status(404).json({ error: { message: "Rota não encontrada" } });
}
export function errorHandler(err: unknown, _req: Request, res: Response, 
_next: NextFunction): void {
if (err instanceof AppError) {
res.status(err.status).json({ error: { message: err.message, details: 
err.details } });
return;
}
if (typeof err === "object" && err !== null && "type" in err && err.type 
=== "entity.parse.failed") {
res.status(400).json({ error: { message: "JSON inválido no corpo do pedido" } });
return;
}
console.error(err);
res.status(500).json({ error: { message: "Erro interno do servidor" } });
}