import { UserService } from './user.service.js';
import { validationResult } from 'express-validator';

const userService = new UserService();

/**
 * Класс, представляющий контроллер для пользователей.
 */
export class UserController {
	/**
	 * Создает нового пользователя в базе данных.
	 * @async
	 * @param {Object} req - объект запроса.
	 * @param {Object} res - объект ответа.
	 * @param {Function} next - функция перехода к следующему обработчику.
	 */
	async createUser(req, res, next) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ message: errors.array()[0].msg });
			}
			const { email, name, universityId } = req.body;
			const user = await userService.createUser(
				email,
				name,
				universityId
			);
			res.json(user);
		} catch (error) {
			next(error);
		}
	}

	/**
	 * Получает пользователя по идентификатору.
	 * @async
	 * @param {Object} req - объект запроса.
	 * @param {Object} res - объект ответа.
	 * @param {Function} next - функция перехода к следующему обработчику.
	 */
	async getUserById(req, res, next) {
		try {
			const { id } = req.params;
			const user = await userService.getUserById(id);
			res.json(user);
		} catch (error) {
			next(error);
		}
	}

	/**
	 * Получает всех пользователей из базы данных с пагинацией и сортировкой.
	 * @async
	 * @param {Object} req - объект запроса.
	 * @param {Object} res - объект ответа.
	 * @param {Function} next - функция перехода к следующему обработчику.
	 */
	async getAllUsers(req, res, next) {
		try {
			let limit = parseInt(req.query.limit);
			let offset = parseInt(req.query.offset);
			let sort = req.query.sort;

			if (isNaN(limit) || limit < 1) limit = 10;
			if (limit > 50) limit = 50;
			if (isNaN(offset) || offset < 0) offset = 0;
			if (sort) {
				const match = sort.match(/^(-?)(\w+)$/);
				if (match) {
					const sign = match[1];
					const field = match[2];
					const validFields = ['email', 'name'];
					if (validFields.includes(field)) {
						const direction = sign === '-' ? 'DESC' : 'ASC';
						sort = [[field, direction]];
					} else {
						throw new Error('Неверное имя поля для сортировки');
					}
				} else {
					throw new Error('Неверный формат параметра сортировки');
				}
			} else {
				sort = [['name', 'ASC']];
			}

			const { users, totalCount } = await userService.getAllUsers(
				limit,
				offset,
				sort
			);

			const totalPages = Math.ceil(totalCount / limit);
			const page = Math.floor(offset / limit) + 1;
			const size = users.length;

			res.json({
				pagination: {
					totalPages,
					totalCount,
					page,
					size,
				},
				data: users,
			});
		} catch (error) {
			next(error);
		}
	}

	/**
	 * Обновляет пользователя по идентификатору.
	 * @async
	 * @param {Object} req - объект запроса.
	 * @param {Object} res - объект ответа.
	 * @param {Function} next - функция перехода к следующему обработчику.
	 */
	async updateUserById(req, res, next) {
		try {
			const { id } = req.params;
			const { email, name, universityId } = req.body;
			const user = await userService.updateUserById(
				id,
				email,
				name,
				universityId
			);
			res.json(user);
		} catch (error) {
			next(error);
		}
	}

	/**
	 * Удаляет пользователя по идентификатору.
	 * @async
	 * @param {Object} req - объект запроса.
	 * @param {Object} res - объект ответа.
	 * @param {Function} next - функция перехода к следующему обработчику.
	 */
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
