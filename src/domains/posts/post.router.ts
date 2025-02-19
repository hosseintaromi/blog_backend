import { Router } from 'express';
import {
	createPostHandler,
	deletePostHandler,
	getAllPostsHandler,
	getPostByIdHandler,
	updatePostHandler
} from './post.controller';
import { authenticateToken } from '../../middlewares/auth.middleware';

const router = Router();

router.get('/posts', getAllPostsHandler);

router.get('/posts/:id', getPostByIdHandler);

router.post('/posts', authenticateToken, createPostHandler);

router.delete('/posts/:id', deletePostHandler);

router.put('/posts/:id', updatePostHandler);

export default router;
