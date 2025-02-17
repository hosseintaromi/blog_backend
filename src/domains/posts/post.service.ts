import { FindManyOptions } from 'typeorm';
import { PostRepository } from './post.repository';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { BaseError, ExistedError, NotFoundError } from '../../common/error/baseError';

const postRepo = new PostRepository();

export class PostService {
	async findAllPosts(options?: FindManyOptions<Post>) {
		return await postRepo.findAll(options);
	}

	async findOnePost(id: Post['id']) {
		const post = await postRepo.findOne(id);

		if (!post) throw new NotFoundError('post');

		return post;
	}

	async createPost(createPostDto: CreatePostDto) {
		const existedPost = await postRepo.findAll({ where: { title: createPostDto.title } });

		if (existedPost.length !== 0) throw new ExistedError('post');

		return await postRepo.create(createPostDto);
	}

	async updatePost(id: Post['id'], updatePostDto: UpdatePostDto) {
		const post = await postRepo.findOne(id);
		if (!post) throw new NotFoundError('post');

		return await postRepo.update(id, updatePostDto);
	}

	async deletePost(id: Post['id']) {
		const post = await postRepo.findOne(id);

		if (!post) throw new NotFoundError('post');

		return await postRepo.delete(id);
	}
}
