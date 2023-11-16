import { Router } from 'express';
import { UserController } from '../User/user.controller.js';
import { body, param } from 'express-validator';
const userRouter = new Router();

const userController = new UserController();

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

// Валидация и санитизация данных для получения пользователя по id
userRouter.get(
	'/:id',
	[param('id').custom((value) => uuidv4.validate(value))],
	userController.getUserById
);
// Получение всех пользователей
userRouter.get('/', userController.getAllUsers);

// Валидация и санитизация данных для обновления пользователя по id
userRouter.put(
	'/:id',
	[
		param('id').custom((value) => uuidv4.validate(value)),
		body('email')
			.isEmail()
			.withMessage('Введите корректный email')
			.normalizeEmail(),
		body('name').notEmpty().withMessage('Введите имя').trim().escape(),
	],
	userController.updateUserById
);

// Валидация и санитизация данных для удаления пользователя по id
userRouter.delete(
	'/:id',
	[param('id').custom((value) => uuidv4.validate(value))],
	userController.deleteUserById
);

export default userRouter;
