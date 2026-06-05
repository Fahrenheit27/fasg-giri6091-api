import { Controller, Get, Inject} from "@nestjs/common";
import { CreateTaskUseCase } from "../../application/create-task.use.case";
import { ITaskRepository } from "../../domain/task.repository.interface";
import { ITaskRepositoryToken } from "../../domain/task.repository.interface";

@Controller('tasks')

export class TaskController {
    
    constructor(
        private readonly createTaskUseCase: CreateTaskUseCase,
        @Inject(ITaskRepositoryToken)
        private readonly taskRepository: ITaskRepository,
    ) {}

    @Get()
    async createTask() {
        return this.taskRepository.findAll();
    }
}