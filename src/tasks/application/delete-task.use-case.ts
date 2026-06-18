import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ITaskRepositoryToken } from "../domain/task.repository.interface";
import type { ITaskRepository } from "../domain/task.repository.interface";

@Injectable()
export class DeleteTaskUseCase {

    constructor(
        @Inject(ITaskRepositoryToken)
        private readonly taskRepository: ITaskRepository
    ) { }

    async execute(id: string): Promise<void> {
        const deleted = await this.taskRepository.delete(id);
        if (!deleted)
            throw new NotFoundException(`La tarea ${id} no existe`);
    }

}