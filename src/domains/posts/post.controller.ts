import { PostService } from './post.service';

import { Request, Response } from 'express';

const postService = new PostService();

export const getAllPostsHandler = async (req: Request, res: Response) => {
	const posts = await postService.findAllPosts();

	res.send(posts);
};

export const getPostByIdHandler = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const post = await postService.findOnePost(+id);
		res.send(post);
	} catch (error) {
		res.status(500).send(error);
	}
};

export const createPostHandler = async (req: Request, res: Response) => {
	console.log((req as any).user.id);
	const createPostDto = { ...req.body, userId: (req as any).user.id };
	try {
		const createdPost = await postService.createPost(createPostDto);

		res.send(createdPost);
	} catch (error) {
		res.status(500).send(error);
	}
};

export const updatePostHandler = async (req: Request, res: Response) => {
	const updatePostDto = req.body;
	const { id } = req.params;
	try {
		const createdPost = await postService.updatePost(+id, updatePostDto);

		res.send(createdPost);
	} catch (error) {
		res.status(500).send(error);
	}
};

export const deletePostHandler = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const createdPost = await postService.deletePost(+id);

		res.status(201).send(createdPost);
	} catch (error) {
		res.status(500).send(error);
	}
};
