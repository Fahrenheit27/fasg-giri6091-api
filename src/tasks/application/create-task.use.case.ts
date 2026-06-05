// Capa de aplicación (caso de uso)
/*
import { Inject, Injectable } from "@nestjs/common";
import type { ITaskRepository } from "../domain/task.repository.interface";
import { ITaskRepositoryToken } from "../domain/task.repository.interface";
import { Task } from "../domain/task.entity";

@Injectable()
export class CreateTaskUseCase {
  constructor(
    @Inject(ITaskRepositoryToken)
    private readonly taskRepository: ITaskRepository,
  ) {}

  async execute(title: string, description: string) : Promise<Task> {
    const crypto = await import("crypto");
    const task = new Task(
      crypto.randomUUID(), 
      title, 
      description,
      'PENDING',
      new Date(),
    );

    return this.taskRepository.create(task);
    
  }
}**/

import { Inject, Injectable } from "@nestjs/common";
import type { ITaskRepository } from "../domain/task.repository.interface";
import { ITaskRepositoryToken } from "../domain/task.repository.interface";
import { Task } from "../domain/task.entity";
import { randomUUID } from "crypto"; // 👈 Importación limpia al inicio

@Injectable()
export class CreateTaskUseCase {
  constructor(
    @Inject(ITaskRepositoryToken)
    private readonly taskRepository: ITaskRepository,
  ) {}

  async execute(title: string, description: string): Promise<Task> {
    const task = new Task(
      randomUUID(), // 👈 Uso directo
      title, 
      description,
      'PENDING',
      new Date(),
    );

    await this.taskRepository.create(task);
    return task;
  }
}