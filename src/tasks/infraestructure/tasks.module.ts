import { Module } from '@nestjs/common'
import { TasksController } from './controllers/tasks.controllers'
import { TaskRepositoryImpl } from './persistence/task.repository.impl'
import { CreateTaskUseCase } from '../application/create.task.use.case'
import { ITaskRepositoryToken } from '../domain/task.repository.interface'

@Module({
    controllers: [TasksController],
    providers: [
        CreateTaskUseCase,
        {
            provide: ITaskRepositoryToken,
            useClass: TaskRepositoryImpl
        }
    ],
    exports: [CreateTaskUseCase]
})
export class TaskModule {}
