import { Router } from 'express';
import { getAllPostsHandler } from './post.controller';

const router = Router();

router.get('/posts', getAllPostsHandler);

export default router;
