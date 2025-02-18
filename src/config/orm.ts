import { DataSource, DataSourceOptions } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

const appDataSource: DataSourceOptions = {
	type: 'mysql',
	host: process.env.DB_HOST,
	port: 3306,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	synchronize: true,
	logging: false,
	entities: [__dirname + '/src/entity/**/*.ts']
};

export const AppDataSource = new DataSource(appDataSource);

export default appDataSource;
