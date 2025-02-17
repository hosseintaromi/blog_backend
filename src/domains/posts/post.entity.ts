import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Post {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column()
	title: string;

	@Column()
	description: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@Column({ default: true })
	active: boolean;
}
