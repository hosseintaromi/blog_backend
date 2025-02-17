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
		const post = postService.findOnePost(+id);

		res.send(post);
	} catch (error) {
		res.status(500).send(error);
	}
};
