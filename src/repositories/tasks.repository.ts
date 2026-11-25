import { randomUUID } from "node:crypto";
import type { Task, CreateTaskInput, UpdateTaskInput } from 
"../schemas/task.schema.js";
const tasks = new Map<string, Task>();

export const tasksRepository = {
findAll(): Task[] {
return [...tasks.values()];
},
findById(id: string): Task | undefined {
return tasks.get(id);
},
create(input: CreateTaskInput): Task {
const task: Task = {
id: randomUUID(),
title: input.title,
description: input.description,
done: false,
createdAt: new Date().toISOString(),
};
tasks.set(task.id, task);
return task;
},
update(id: string, input: UpdateTaskInput): Task | undefined {
const current = tasks.get(id);
if (!current) return undefined;
const updated: Task = { ...current, ...input };
tasks.set(id, updated);
return updated;
},
delete(id: string): boolean {
return tasks.delete(id);
},
};