import { Module } from '@nestjs/common';
import { TaskModule } from './tasks/infraestructure/tasks.module';

@Module({
  imports: [
    TaskModule
  ],
})

export class AppModule {}
