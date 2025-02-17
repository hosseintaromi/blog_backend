import { FindManyOptions } from 'typeorm';
import { PostRepository } from './post.repository';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

const postRepo = new PostRepository();

export class PostService {
	async findAllPosts(options?: FindManyOptions<Post>) {
		return await postRepo.findAll(options);
	}

	async findOnePost(id: Post['id']) {
		const post = await postRepo.findOne(id);

		if (!post) return { message: `Post with id of ${id} not found`, status: false };

		return post;
	}

	async createPost(createPostDto: CreatePostDto) {
		return await postRepo.create(createPostDto);
	}

	async updatePost(id: Post['id'], updatePostDto: UpdatePostDto) {
		const post = await postRepo.findOne(id);

		if (!post) return { message: `Post with id of ${id} not found`, status: false };

		return await postRepo.update(id, updatePostDto);
	}

	async deletePost(id: Post['id']) {
		const post = await postRepo.findOne(id);

		if (!post) return { message: `Post with id of ${id} not found`, status: false };

		return await postRepo.delete(id);
	}
}
