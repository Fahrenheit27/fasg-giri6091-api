import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ITaskRepositoryToken } from "../domain/task.repository.interface";
import type { ITaskRepository } from "../domain/task.repository.interface";


@Injectable()
export class DeleteTaskUseCase {

    constructor(
        @Inject(ITaskRepositoryToken) 
        private readonly taskRepository: ITaskRepository
    ) {}

    async execute(id: number): Promise<void> {  
        const deletedTask = await this.taskRepository.delete(id);
        if (!deletedTask) {
            throw new NotFoundException(`La tarea "${id}" no existe.`);
        } 
    }
}