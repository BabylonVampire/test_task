import { UserService } from './user.service.js';
import { validationResult } from 'express-validator';

const userService = new UserService();

export class UserController {
	async createUser(req, res, next) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ message: errors.array()[0].msg });
			}
			const { email, name } = req.body;
			const user = await userService.createUser(email, name);
			res.json(user);
		} catch (error) {
			next(error);
		}
	}

	async getUserById(req, res, next) {
		try {
			const { id } = req.params;
			const user = await userService.getUserById(id);
			res.json(user);
		} catch (error) {
			next(error);
		}
	}

	async getAllUsers(req, res, next) {
		try {
			const users = await userService.getAllUsers();
			res.json(users);
		} catch (error) {
			next(error);
		}
	}

	async updateUserById(req, res, next) {
		try {
			const { id } = req.params;
			const { email, name } = req.body;
			const user = await userService.updateUserById(id, email, name);
			res.json(user);
		} catch (error) {
			next(error);
		}
	}

	async deleteUserById(req, res, next) {
		try {
			const { id } = req.params;
			const user = await userService.deleteUserById(id);
			res.json(user);
		} catch (error) {
			next(error);
		}
	}
}
