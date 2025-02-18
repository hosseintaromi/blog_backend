import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import 'reflect-metadata';
import { ROUTERS } from './router/router';
import logger from './common/logger';
import { AppDataSource } from './config/orm';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const setupMiddleware = (app: Express) => {
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use((req: Request, res: Response, next: NextFunction) => {
		res.setHeader('X-Content-Type-Options', 'nosniff');
		res.setHeader('X-Frame-Options', 'DENY');
		res.setHeader('X-XSS-Protection', '1; mode=block');
		next();
	});
};

const setupRoutes = (app: Express) => {
	ROUTERS.forEach((router) => app.use(router.router));
};

const initializeApp = async () => {
	console.log('object');
	try {
		setupMiddleware(app);

		await AppDataSource.initialize();
		logger.info('Database connected successfully');

		setupRoutes(app);

		app.listen(port, () => {
			logger.info(`Server is running on port ${port}`);
			logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
		});
	} catch (error) {
		logger.error('Error during initialization:', error);
		process.exit(1);
	}
};

initializeApp().catch((error) => {
	console.error('Failed to start application:', error);
	process.exit(1);
});
