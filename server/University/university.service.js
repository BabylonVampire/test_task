/**
 * Класс, представляющий сервис для работы с университетами
 */
import User from '../User/entities/user.entity.js';
import University from './entities/university.entity.js';

export class UniversityService {
	/**
	 * Метод, создающий новый университет в базе данных
	 * @param {string} name - Название университета
	 * @returns {Promise<University>} Промис, возвращающий созданный университет
	 * @throws {Error} Ошибка, если университет с таким именем уже существует
	 */
	async createUniversity(name) {
		console.log(name);
		const candidate = await University.findOne({ where: { name } });
		if (candidate) {
			throw new Error('Университет с таким именем уже существует');
		}
		const university = await University.create({ name });
		return university;
	}

	/**
	 * Метод, возвращающий университет по идентификатору
	 * @param {string} id - Идентификатор университета
	 * @returns {Promise<University>} Промис, возвращающий университет
	 * @throws {Error} Ошибка, если университет с таким id не найден
	 */
	async getUniversityById(id) {
		const university = await University.findByPk(id);
		if (!university) {
			throw new Error('Университет с таким id не найден');
		}
		return university;
	}

	/**
	 * Метод, возвращающий список всех университетов
	 * @returns {Promise<Array<University>>} Промис, возвращающий массив университетов
	 */
	async getAllUniversities() {
		const universities = await University.findAll({
			order: [['usersCount', 'DESC']],
		});
		return universities;
	}

	/**
	 * Метод, обновляющий университет по идентификатору
	 * @param {string} id - Идентификатор университета
	 * @param {string} email - Электронная почта университета
	 * @param {string} name - Название университета
	 * @returns {Promise<University>} Промис, возвращающий обновленный университет
	 * @throws {Error} Ошибка, если университет с таким id не найден
	 */
	async updateUniversityById(id, email, name) {
		const university = await University.findByPk(id);
		if (!university) {
			throw new Error('Университет с таким id не найден');
		}
		const updatedUniversity = await University.update(
			{ email, name },
			{ where: { id: id }, returning: true, plain: true }
		);
		return updatedUniversity[1];
	}

	/**
	 * Метод, удаляющий университет по идентификатору
	 * @param {string} id - Идентификатор университета
	 * @returns {Promise<University>} Промис, возвращающий удаленный университет
	 * @throws {Error} Ошибка, если университет с таким id не найден
	 */
	async deleteUniversityById(id) {
		const university = await University.findByPk(id);
		if (!university) {
			throw new Error('Университет с таким id не найден');
		}
		await university.destroy();
		return university;
	}

	/**
	 * Метод, увеличивающий количество пользователей, связанных с университетом, на заданное число
	 * @param {string} universityId - Идентификатор университета
	 * @param {number} number - Число, на которое нужно увеличить количество пользователей
	 * @returns {Promise<University>} Промис, возвращающий обновленный университет
	 * @throws {Error} Ошибка, если университет с таким id не найден
	 */
	async incrementUsersCount(universityId, number) {
		const university = await University.findByPk(universityId);
		if (!university) {
			throw new Error('Университет с таким id не найден');
		}
		await university.increment('usersCount', { by: number });
		return university;
	}

	/**
	 * Метод, уменьшающий количество пользователей, связанных с университетом, на заданное число
	 * @param {string} universityId - Идентификатор университета
	 * @param {number} number - Число, на которое нужно уменьшить количество пользователей
	 * @returns {Promise<University>} Промис, возвращающий обновленный университет
	 * @throws {Error} Ошибка, если университет с таким id не найден
	 */
	async decrementUsersCount(universityId, number) {
		const university = await University.findByPk(universityId);
		if (!university) {
			throw new Error('Университет с таким id не найден');
		}
		await university.decrement('usersCount', { by: number });
		return university;
	}

	/**
	 * Метод, пересчитывающий количество пользователей, связанных с университетом, по данным из базы данных
	 * @param {string} universityId - Идентификатор университета
	 * @returns {Promise<University>} Промис, возвращающий обновленный университет
	 * @throws {Error} Ошибка, если университет с таким id не найден
	 */
	async recalculateUsersCount(universityId) {
		const university = await University.findByPk(universityId);
		if (!university) {
			throw new Error('Университет с таким id не найден');
		}
		const usersCount = await User.count({ where: { universityId } });
		await university.update({ usersCount });
		return university;
	}
}
