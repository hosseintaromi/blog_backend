import { DataSource, DataSourceOptions } from 'typeorm';
import dotenv from 'dotenv';
import { Post } from '../domains/posts/post.entity';
import { User } from '../domains/users/user.entity';

dotenv.config();

const appDataSourceOptions: DataSourceOptions = {
	type: 'postgres',
	host: process.env.DB_HOST || 'localhost',
	port: parseInt(process.env.DB_PORT || '5432'),
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	entities: [Post, User],
	synchronize: process.env.NODE_ENV !== 'production',
	logging: process.env.NODE_ENV !== 'production'
};

export const AppDataSource = new DataSource(appDataSourceOptions);

export default appDataSourceOptions;
