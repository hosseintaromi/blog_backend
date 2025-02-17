import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Post } from './domains/posts/post.entity';
import { ROUTERS } from './router/router';
import logger from './common/logger';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Database configuration
export const AppDataSource = new DataSource({
	type: 'postgres',
	host: process.env.DB_HOST || 'localhost',
	port: parseInt(process.env.DB_PORT || '5432'),
	username: process.env.DB_USERNAME || 'postgres',
	password: process.env.DB_PASSWORD || 'postgres',
	database: process.env.DB_NAME || 'hossein_blog',
	entities: [Post],
	synchronize: process.env.NODE_ENV !== 'production',
	logging: process.env.NODE_ENV !== 'production'
});

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
	// logger.error('Failed to start application:', error);
	console.error('Failed to start application:', error);
	process.exit(1);
});
