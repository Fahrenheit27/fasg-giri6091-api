//! Dealer (contratador del repositorio)
import { Task } from "./task.entity";

export interface ITaskRepository {
    create(task: Task): Promise<Task>;
    findAll(): Promise<Task[]>;
    findById(id: string): Promise<Task | null>;   
}


export const ITaskRepositoryToken = Symbol('ITaskRepository');