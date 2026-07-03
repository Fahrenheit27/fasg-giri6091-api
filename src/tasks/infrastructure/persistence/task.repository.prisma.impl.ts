import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";
import { ITaskRepository } from "../../domain/task.repository.interface";
import { Task } from "../../domain/task.entity";

@Injectable()
export class TaskRepositoryPrismaImpl implements ITaskRepository {

    constructor(private readonly prisma: PrismaService) {}

    // Mapper: objeto plano de Prisma → clase Task con todos sus métodos
    private toDomain(data: any): Task {
        return new Task(
            data.id,
            data.title,
            data.description ?? '',
            data.status as 'PENDING' | 'IN_PROGRESS' | 'COMPLETED',
            data.createdAt
        );
    }

    async create(task: Task): Promise<Task> {
        const created = await this.prisma.task.create({
            data: {
                title: task.title,
                description: task.description,
                status: task.status,
            }
        });
        return this.toDomain(created);  
    }

    async findAll(): Promise<Task[]> {
        const tasks = await this.prisma.task.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return tasks.map(t => this.toDomain(t)); 
    }

    async findById(id: number): Promise<Task | null> {
        const task = await this.prisma.task.findUnique({
            where: { id }
        });
        return task ? this.toDomain(task) : null;
    }

    async update(task: Task): Promise<Task> {
        const updated = await this.prisma.task.update({
            where: { id: task.id },
            data: {
                title: task.title,
                description: task.description,
                status: task.status,
            }
        });
        return this.toDomain(updated);  // ← mapper, no "as Task"
    }

    async delete(id: number): Promise<boolean> {
        try {
            await this.prisma.task.delete({ where: { id } });
            return true;
        } catch {
            return false;
        }
    }
}