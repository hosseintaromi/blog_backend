import postRouter from '../domains/posts/post.router';
import userRouter from '../domains/users/user.router';

export const ROUTERS = [
	{
		router: postRouter
	},
	{
		router: userRouter
	}
];
