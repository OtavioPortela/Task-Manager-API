import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { TasksStatus } from './tasks-status.enum';


@Entity('tasks')
export class Task {
 
@PrimaryGeneratedColumn('uuid')
id: string;
 
@Column()
title: string;
 
@Column({ nullable: true })
description: string;
 
@Column({ type: 'enum', enum: TasksStatus, default: TasksStatus.OPEN })
status: TasksStatus;
 
@Column()
userId: string;
 
@ManyToOne(() => User, (user) => user.tasks, { onDelete: 'CASCADE' })
@JoinColumn({ name: 'userId' })
user: User;
 
@CreateDateColumn() 
createdAt: Date;

@UpdateDateColumn() 
updatedAt: Date;
}
