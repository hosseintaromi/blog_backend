import { FindManyOptions } from 'typeorm';
import { AppDataSource } from '../..';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

export class PostRepository {
	async findAll(options?: FindManyOptions<Post>) {
		return await AppDataSource.manager.find(Post, options);
	}

	async findOne(id: Post['id']) {
		return await AppDataSource.manager.findOneBy(Post, { id });
	}

	async create(createPostDto: CreatePostDto) {
		const newPost = AppDataSource.manager.create(Post, createPostDto);

		return await AppDataSource.manager.save(newPost);
	}

	async update(id: Post['id'], updatePostDto: UpdatePostDto) {
		return await AppDataSource.manager.update(Post, id, updatePostDto);
	}

	async delete(id: Post['id']) {
		return await AppDataSource.manager.softDelete(Post, id);
	}
}
