//! Dealer (contratador del repositorio)
import { Task } from "./task.entity";

export interface ITaskRepository {
    create(task: Task): Promise<void>;
    findAll(): Promise<Task[]>;
    findById(id: string): Promise<Task | null>;   
}

// Token para la inyección de dependencias
export const ITaskRepositoryToken = Symbol('ITaskRepository');
