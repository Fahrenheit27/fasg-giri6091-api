import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ITaskRepositoryToken } from "../domain/task.repository.interface";
import type { ITaskRepository } from "../domain/task.repository.interface";
import { Task } from "../domain/task.entity";
import { GetTaskByIdUseCase } from "./get-task-by-id.use-case";

@Injectable()
export class UpdateTaskUseCase {

    constructor(
        @Inject(ITaskRepositoryToken)
        private readonly taskRepository: ITaskRepository,
        private readonly getTaskByIdUseCase: GetTaskByIdUseCase
    ) { }

    async execute(id: string, updateData: Partial<Pick<Task, 'title' | 'description' | 'status'>>): Promise<Task> {
        const task = await this.getTaskByIdUseCase.execute(id);

        if (updateData.title != undefined) task.title = updateData.title;
        if (updateData.description != undefined) task.description = updateData.description;
        if (updateData.status != undefined) {
            if (updateData.status === 'COMPLETED')
                task.complete();
            else
                task.status = updateData.status;
        }
        return await this.taskRepository.update(task);
    }
}