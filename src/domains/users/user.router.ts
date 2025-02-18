import { Router } from 'express';
import {
	registerHandler,
	loginHandler,
	forgetPasswordHandler,
	getUserListHandler,
	getUserInfoHandler
} from './user.controller';
import { authenticateToken } from '../../middlewares/auth.middleware';

const router = Router();

router.post('/register', registerHandler);
router.post('/login', loginHandler);
router.post('/forget-password', forgetPasswordHandler);
router.get('/users', authenticateToken, getUserListHandler);
router.get('/user/:userId', authenticateToken, getUserInfoHandler);

export default router;
