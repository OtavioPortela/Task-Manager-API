import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { User } from '../users/entities/user.entity';
import { Task } from '../tasks/entities/task.entity';
 
config();
 
const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Task],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
});

// Para o TypeORM CLI: este arquivo deve exportar UMA única instância de DataSource.
export default dataSource;