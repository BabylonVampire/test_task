import { Router } from 'express';
import { body, param } from 'express-validator';
import { UniversityController } from './university.controller.js';

const universityRouter = new Router();

const universityController = new UniversityController();

/**
 * Создает новый университет в базе данных
 * @route POST /
 * @param {string} name - название университета
 * @returns {Object} 201 - объект созданного университета
 * @returns {Error} 400 - ошибка валидации
 * @returns {Error} 500 - ошибка сервера
 */
universityRouter.post(
	'/',
	[body('name').notEmpty().withMessage('Введите название').trim().escape()],
	universityController.createUniversity
);

/**
 * Получает университет по идентификатору
 * @route GET /:id
 * @param {string} id - идентификатор университета
 * @returns {Object} 200 - объект найденного университета
 * @returns {Error} 400 - ошибка валидации
 * @returns {Error} 404 - университет не найден
 * @returns {Error} 500 - ошибка сервера
 */
universityRouter.get(
	'/:id',
	[param('id').custom((value) => uuidv4.validate(value))],
	universityController.getUniversityById
);

/**
 * Получает все университеты из базы данных
 * @route GET /
 * @returns {Array<Object>} 200 - массив объектов университетов
 * @returns {Error} 500 - ошибка сервера
 */
universityRouter.get('/', universityController.getAllUniversities);

/**
 * Обновляет университет по идентификатору
 * @route PUT /:id
 * @param {string} id - идентификатор университета
 * @param {string} name - новое название университета
 * @returns {Object} 200 - объект обновленного университета
 * @returns {Error} 400 - ошибка валидации
 * @returns {Error} 404 - университет не найден
 * @returns {Error} 500 - ошибка сервера
 */
universityRouter.put(
	'/:id',
	[
		param('id').custom((value) => uuidv4.validate(value)),
		body('name').notEmpty().withMessage('Введите имя').trim().escape(),
	],
	universityController.updateUniversityById
);

/**
 * Удаляет университет по идентификатору
 * @route DELETE /:id
 * @param {string} id - идентификатор университета
 * @returns {Object} 200 - объект удаленного университета
 * @returns {Error} 400 - ошибка валидации
 * @returns {Error} 404 - университет не найден
 * @returns {Error} 500 - ошибка сервера
 */
universityRouter.delete(
	'/:id',
	[param('id').custom((value) => uuidv4.validate(value))],
	universityController.deleteUniversityById
);

export default universityRouter;
