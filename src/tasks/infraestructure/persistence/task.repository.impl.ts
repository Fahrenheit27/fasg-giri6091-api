import { Task } from "../../domain/task.entity";
import { ITaskRepository } from "../../domain/task.repository.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TaskRepositoryImpl implements ITaskRepository {
    private tasks: Task[] = []; 
    
    async create(task: Task): Promise<Task> {
        this.tasks.push(task);
        return task;
    }

    async findAll(): Promise<Task[]> {
        return this.tasks;
    }

    async findById(id: string): Promise<Task | null> {
        return this.tasks.find(task => task.id === id) || null;
    }       
}

