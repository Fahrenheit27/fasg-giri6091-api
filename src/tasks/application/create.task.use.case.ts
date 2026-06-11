import { Inject, Injectable } from "@nestjs/common"
import { ITaskRepositoryToken } from "../domain/task.repository.interface"
import type { ITaskRepository } from "../domain/task.repository.interface"
import { Task } from "../domain/task.entity"

@Injectable()
export class CreateTaskUseCase {
    
    constructor(
        @Inject(ITaskRepositoryToken) 
        private readonly taskRepository: ITaskRepository
    ) {}

    async execute(title: string, description: string): Promise<Task> {
        const { randomUUID } = await import('crypto')
        
        const task = new Task(
            randomUUID(),
            title,
            description,
            'PENDING',
            new Date()
        )

        return await this.taskRepository.create(task)
    }
}