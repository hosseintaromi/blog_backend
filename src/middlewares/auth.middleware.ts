import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
	const token = req.header('Authorization')?.replace('Bearer ', '');
	if (!token) {
		res.status(403).send({ message: 'Access denied' });
		return;
	}

	try {
		const secretKey = process.env.JWT_SECRET_KEY || 'yourSecretKey';
		const decoded = jwt.verify(token, secretKey);
		(req as any).user = decoded;
		next();
	} catch (error) {
		res.status(400).send('Invalid token');
	}
};
