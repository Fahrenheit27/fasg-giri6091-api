// Capa de aplicación (caso de uso)
import { Inject, Injectable } from "@nestjs/common";
import type { ITaskRepository } from "../domain/task.repository.interface";
import { ITaskRepositoryToken } from "../domain/task.repository.interface";
import { Task } from "../domain/task.entity";

@Injectable()
export class CreateTaskUseCase {
    constructor(
        @Inject(ITaskRepositoryToken)
        private readonly taskRepository: ITaskRepository,
    ){ }

    async execute(title: string, description: string): Promise<Task> {
        const crypto = await import('crypto');  // Genera el ID
        const task = new Task(
            crypto.randomUUID(),
            title,
            description,
            'PENDING',
            new Date(),
        );

        return this.taskRepository.create(task);
    }


}

//! git remote add origin git@github.com:username/name-repository.git
//! git branch -M main
//! git add .
//! git commit -m "init: proyecto inicial y estructura limpia en el caso de uso task"
//! git push -u origin main