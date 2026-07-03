import { Module } from '@nestjs/common';
import { TaskModule } from './tasks/infrastructure/tasks.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    TaskModule
  ],
})
export class AppModule {}