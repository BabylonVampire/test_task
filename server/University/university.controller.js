/**
 * Класс, представляющий контроллер для работы с университетами
 */
import { validationResult } from 'express-validator';
import { UniversityService } from './university.service.js';

const universityService = new UniversityService();

export class UniversityController {
	/**
	 * Метод, создающий новый университет в базе данных
	 * @param {object} req - Объект запроса
	 * @param {object} res - Объект ответа
	 * @param {function} next - Функция, передающая управление следующему обработчику
	 */
	async createUniversity(req, res, next) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ message: errors.array()[0].msg });
			}
			const { name } = req.body;
			const university = await universityService.createUniversity(name);
			res.json(university);
		} catch (error) {
			next(error);
		}
	}

	/**
	 * Метод, возвращающий университет по идентификатору
	 * @param {object} req - Объект запроса
	 * @param {object} res - Объект ответа
	 * @param {function} next - Функция, передающая управление следующему обработчику
	 */
	async getUniversityById(req, res, next) {
		try {
			const { id } = req.params;
			const university = await universityService.getUniversityById(id);
			res.json(university);
		} catch (error) {
			next(error);
		}
	}

	/**
	 * Метод, возвращающий список всех университетов
	 * @param {object} req - Объект запроса
	 * @param {object} res - Объект ответа
	 * @param {function} next - Функция, передающая управление следующему обработчику
	 */
	async getAllUniversities(req, res, next) {
		try {
			const universities = await universityService.getAllUniversities();
			res.json(universities);
		} catch (error) {
			next(error);
		}
	}

	/**
	 * Метод, обновляющий университет по идентификатору
	 * @param {object} req - Объект запроса
	 * @param {object} res - Объект ответа
	 * @param {function} next - Функция, передающая управление следующему обработчику
	 */
	async updateUniversityById(req, res, next) {
		try {
			const { id } = req.params;
			const { name } = req.body;
			const university = await universityService.updateUniversityById(
				id,
				name
			);
			res.json(university);
		} catch (error) {
			next(error);
		}
	}

	/**
	 * Метод, удаляющий университет по идентификатору
	 * @param {object} req - Объект запроса
	 * @param {object} res - Объект ответа
	 * @param {function} next - Функция, передающая управление следующему обработчику
	 */
	async deleteUniversityById(req, res, next) {
		try {
			const { id } = req.params;
			const university = await universityService.deleteUniversityById(id);
			res.json(university);
		} catch (error) {
			next(error);
		}
	}
}
