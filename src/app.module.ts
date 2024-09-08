import { Module } from '@nestjs/common';
// import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
@Module({
  imports: [
    // TasksModule,
    TypeOrmModule.forRoot({
      type:'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Ibrartechverx123',
      database: 'Nest Assignment 3',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    CategoryModule,
  ],
})
export class AppModule {}

