import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
	[process.env.NODE_ENV || 'development']: {
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		dialect: 'postgres',
	},
};
export default dbConfig;
