import { Module } from "@nestjs/common";
import { TasksController } from "./../infrastructure/controllers/tasks.controllers";
import { CreateTaskUseCase } from "../application/create-task.use-case";
import { ITaskRepositoryToken } from "../domain/task.repository.interface";
import { TaskRepositoryImpl } from "@/../src/tasks/infrastructure/persistence/task.repository.impl";
import { GetTaskByIdUseCase } from "../application/get-task-by-id.use-case";
import { UpdateTaskUseCase } from "../application/update-task.use-case";
import { DeleteTaskUseCase } from "../application/delete-task.use-case";

@Module({
    controllers: [ TasksController ],
    providers: [
        CreateTaskUseCase,
        GetTaskByIdUseCase,
        UpdateTaskUseCase,
        DeleteTaskUseCase,
        {
            provide: ITaskRepositoryToken,
            useClass: TaskRepositoryImpl    // Cambiar si la DB cambia
        }
    ],
    exports: [ CreateTaskUseCase ]
})
export class TasksModule { }
