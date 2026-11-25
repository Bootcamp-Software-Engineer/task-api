import { z } from "zod";

export const createTaskSchema = z.object({
title: z.string().trim().min(1, "O título é obrigatório").max(120),
description: z.string().trim().max(500).optional(),
});

export const updateTaskSchema = z.object({
title: z.string().trim().min(1).max(120).optional(),
description: z.string().trim().max(500).optional(),
done: z.boolean().optional(),
});

export const idParamSchema = z.object({
id: z.string().uuid("Identificador inválido"),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;

export interface Task {
id: string;
title: string;
description?: string;
done: boolean;
createdAt: string;
}