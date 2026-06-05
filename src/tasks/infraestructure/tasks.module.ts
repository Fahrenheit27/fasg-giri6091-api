import { Module } from "@nestjs/common";
import { TaskController } from "./controllers/tasks.controller";
import { CreateTaskUseCase } from "../application/create-task.use.case";
import { TaskRepositoryImpl } from "./persistence/task.repository.impl";
import { ITaskRepositoryToken } from "../domain/task.repository.interface";
import { AppModule } from "../../app.module";

@Module({
    controllers: [TaskController],
    providers: [
        {
            provide: ITaskRepositoryToken,
            useClass: TaskRepositoryImpl,
        },
        CreateTaskUseCase,
    ],
    exports: [TaskController, CreateTaskUseCase],
})

export class TasksModule {}