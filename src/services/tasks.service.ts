import { tasksRepository } from "../repositories/tasks.repository.js";
import { AppError } from "../errors/app-error.js";
import type { CreateTaskInput, UpdateTaskInput } from "../schemas/task.schema.js";

export const tasksService = {
list() {
return tasksRepository.findAll();
},
async get(id: string) {
const task = await tasksRepository.findById(id);
if (!task) throw new AppError(404, "Tarefa não encontrada");
return task;
},
create(input: CreateTaskInput) {
return tasksRepository.create(input);
},
async update(id: string, input: UpdateTaskInput) {
const task = await tasksRepository.update(id, input);
if (!task) throw new AppError(404, "Tarefa não encontrada");
return task;
},
async remove(id: string) {
if (!(await tasksRepository.delete(id))) throw new AppError(404, "Tarefa não encontrada");
},
};