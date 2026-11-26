import { prisma } from "../lib/prisma.js";
import type { Task, CreateTaskInput, UpdateTaskInput } from "../schemas/task.schema.js";

function toTask(row: {
id: string;
  title: string;
  description: string | null;
  done: boolean;
  createdAt: Date;
}): Task {
  return {
    id: row.id,
    title: row.title,
    description: row.description ?? undefined,
    done: row.done,
    createdAt: row.createdAt.toISOString(),
  };
}
export const tasksRepository = {
  async findAll(): Promise<Task[]> {
    const rows = await prisma.task.findMany({ orderBy: { createdAt: "desc" } 
});
    return rows.map(toTask);
  },
  async findById(id: string): Promise<Task | undefined> {
    const row = await prisma.task.findUnique({ where: { id } });
    return row ? toTask(row) : undefined;
  },
  async create(input: CreateTaskInput): Promise<Task> {
    const row = await prisma.task.create({ data: input });
    return toTask(row);
  },
  async update(id: string, input: UpdateTaskInput): Promise<Task | undefined> 
{
    const exists = await prisma.task.findUnique({ where: { id } });
    if (!exists) return undefined;
    const row = await prisma.task.update({ where: { id }, data: input });
    return toTask(row);
  },
  async delete(id: string): Promise<boolean> {
    const result = await prisma.task.deleteMany({ where: { id } });
    return result.count > 0;
  },
};