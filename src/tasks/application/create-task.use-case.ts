// Capa de aplicación: Define la lógica de negocio para crear una tarea
import { Inject, Injectable } from "@nestjs/common";
import {Task} from "../domain/task.entity";
import * as taskRepositoryInterface from "../domain/task.repository.interface";


@Injectable()
export class CreateTaskUseCase{
    constructor(
        @Inject(taskRepositoryInterface.ITaskRepositoryToken)
        private readonly taskRepository: taskRepositoryInterface.ITaskRepository,
    ){}

    async execute(title: string, description: string): Promise<Task> {
        const task = new Task(
            0,
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