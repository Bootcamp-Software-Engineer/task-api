import { tasksRepository } from "../repositories/tasks.repository.js";
import { AppError } from "../errors/app-error.js";
import type { CreateTaskInput, UpdateTaskInput } from 
"../schemas/task.schema.js";
export const tasksService = {
list() {
return tasksRepository.findAll();
},
get(id: string) {
const task = tasksRepository.findById(id);
if (!task) throw new AppError(404, "Tarefa não encontrada");
return task;
},
create(input: CreateTaskInput) {
return tasksRepository.create(input);
},
update(id: string, input: UpdateTaskInput) {
const task = tasksRepository.update(id, input);
if (!task) throw new AppError(404, "Tarefa não encontrada");
return task;
},
remove(id: string) {
if (!tasksRepository.delete(id)) throw new AppError(404, "Tarefa não encontrada");
},
};