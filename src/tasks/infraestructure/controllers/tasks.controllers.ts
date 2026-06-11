import { Controller, Inject, Get } from "@nestjs/common"
import { CreateTaskUseCase } from "../../application/create.task.use.case"
import { ITaskRepositoryToken } from "../../domain/task.repository.interface"
import type { ITaskRepository } from "../../domain/task.repository.interface"

@Controller("tasks")
export class TasksController {
    
    constructor(
        private readonly createTaskUseCase: CreateTaskUseCase,
        @Inject(ITaskRepositoryToken) 
        private readonly taskRepositoryImpl: ITaskRepository
    ) {}

    @Get()
    async getAllTasks() {
        return await this.taskRepositoryImpl.findAll()
    }
}
