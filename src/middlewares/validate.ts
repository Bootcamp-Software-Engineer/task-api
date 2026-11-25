import type { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod";
import { AppError } from "../errors/app-error.js";
type Source = "body" | "params";
export const validate =
(schema: ZodType, source: Source = "body") =>
(req: Request, _res: Response, next: NextFunction): void => {
const result = schema.safeParse(req[source]);
if (!result.success) {
const details = result.error.issues.map((i) => ({
field: i.path.join("."),
message: i.message,
}));
next(new AppError(400, "Dados inválidos", details));
return;
}
if (source === "body") req.body = result.data;
next();
};