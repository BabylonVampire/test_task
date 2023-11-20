import dotenv from 'dotenv';
import express from 'express';
import sequelize from './db.js';
import cors from 'cors';
import router from './routes/index.js';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use('/api', router);

const start = async () => {
	try {
		await sequelize.authenticate();
		await sequelize.sync();
		app.listen(PORT, () =>
			console.log(`Server has been started on port ${PORT}`)
		);
	} catch (error) {
		console.error(error);
	}
};

start();
