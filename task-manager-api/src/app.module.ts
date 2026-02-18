import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { User } from './users/entities/user.entity';
import { Task } from './tasks/entities/task.entity';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    // Carregar o .env globalmente em toda a aplicação
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Configurar o TypeORM para se conectar ao banco de dados
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [User, Task],
        synchronize: true,
        logging: true,
      }),
    }),
    
    TasksModule,
    
    AuthModule],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
