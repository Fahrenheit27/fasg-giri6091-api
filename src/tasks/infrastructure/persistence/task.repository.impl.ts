import { Task } from "@/tasks/domain/task.entity";
import { ITaskRepository } from "@/tasks/domain/task.repository.interface";
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
        return this.tasks.find( t => t.id == id) || null;
    }
    
    async update(updateTask: Task): Promise<Task> {
        const index = this.tasks.findIndex(t => t.id == updateTask.id);
        this.tasks[index] = updateTask;
        return updateTask;
    }

    async delete(id: string): Promise<boolean> {
        const index = this.tasks.findIndex(t => t.id == id);
        if (index === -1) return false;
        this.tasks.splice(index, 1);
        return true;
    }
}

//! npm i --save class-validator class-transformer

//! git add .
//! git commit -m "add: Configuración de los casos de uso para tareas"
//! git push