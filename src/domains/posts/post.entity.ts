import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Post {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column({ unique: true })
	title: string;

	@Column()
	description: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@Column({ default: true })
	active: boolean;

	@Column()
	userId: number;

	@ManyToOne(() => User, (user) => user.posts)
	@JoinColumn({ name: 'userId' })
	user: User;
}
