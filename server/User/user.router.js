import { Router } from 'express';
import { UserController } from '../User/user.controller.js';
import { body, param } from 'express-validator';

const userRouter = new Router();

const userController = new UserController();

/**
 * Создает нового пользователя в базе данных
 * @route POST /
 * @param {string} email - электронная почта пользователя
 * @param {string} name - имя пользователя
 * @returns {Object} 201 - объект созданного пользователя
 * @returns {Error} 400 - ошибка валидации
 * @returns {Error} 500 - ошибка сервера
 */
userRouter.post(
	'/',
	[
		body('email')
			.isEmail()
			.withMessage('Введите корректный email')
			.normalizeEmail(),
		body('name').notEmpty().withMessage('Введите имя').trim().escape(),
	],
	userController.createUser
);

/**
 * Получает пользователя по идентификатору
 * @route GET /:id
 * @param {string} id - идентификатор пользователя
 * @returns {Object} 200 - объект найденного пользователя
 * @returns {Error} 400 - ошибка валидации
 * @returns {Error} 404 - пользователь не найден
 * @returns {Error} 500 - ошибка сервера
 */
userRouter.get(
	'/:id',
	[param('id').custom((value) => uuidv4.validate(value))],
	userController.getUserById
);

/**
 * Получает всех пользователей из базы данных
 * @route GET /
 * @returns {Array<Object>} 200 - массив объектов пользователей
 * @returns {Error} 500 - ошибка сервера
 */
userRouter.get('/', userController.getAllUsers);

/**
 * Обновляет пользователя по идентификатору
 * @route PUT /:id
 * @param {string} id - идентификатор пользователя
 * @param {string} email - новая электронная почта пользователя
 * @param {string} name - новое имя пользователя
 * @param {string} universityId - новый идентификатор университета, к которому принадлежит пользователь
 * @returns {Object} 200 - объект обновленного пользователя
 * @returns {Error} 400 - ошибка валидации
 * @returns {Error} 404 - пользователь не найден
 * @returns {Error} 500 - ошибка сервера
 */
userRouter.put(
	'/:id',
	[
		param('id').custom((value) => uuidv4.validate(value)),
		body('email')
			.isEmail()
			.withMessage('Введите корректный email')
			.normalizeEmail(),
		body('name').notEmpty().withMessage('Введите имя').trim().escape(),
		body('universityId').optional().isUUID(),
	],
	userController.updateUserById
);

/**
 * Удаляет пользователя по идентификатору
 * @route DELETE /:id
 * @param {string} id - идентификатор пользователя
 * @returns {Object} 200 - объект удаленного пользователя
 * @returns {Error} 400 - ошибка валидации
 * @returns {Error} 404 - пользователь не найден
 * @returns {Error} 500 - ошибка сервера
 */
userRouter.delete(
	'/:id',
	[param('id').custom((value) => uuidv4.validate(value))],
	userController.deleteUserById
);

export default userRouter;
