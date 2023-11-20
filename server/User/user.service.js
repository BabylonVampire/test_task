import University from '../University/entities/university.entity.js';
import { UniversityService } from '../University/university.service.js';
import User from './entities/user.entity.js';

const universityService = new UniversityService();

/**
 * Класс, представляющий сервис для пользователей
 */
export class UserService {
	/**
	 * Создает нового пользователя в базе данных
	 * @async
	 * @param {string} email - электронная почта пользователя
	 * @param {string} name - имя пользователя
	 * @param {string} universityId - идентификатор университета, к которому принадлежит пользователь
	 * @returns {Object} - объект созданного пользователя
	 * @throws {Error} - ошибка, если пользователь с таким email уже существует или произошла ошибка при работе с базой данных
	 */
	async createUser(email, name, universityId) {
		const candidate = await User.findOne({ where: { email } });
		if (candidate) {
			throw new Error('Пользователь с таким email уже существует');
		}
		const user = await User.create({
			email,
			name,
			universityId: universityId || null,
		});
		if (universityId) {
			await universityService.incrementUsersCount(universityId, 1);
		}
		return user;
	}

	/**
	 * Получает пользователя по идентификатору
	 * @async
	 * @param {string} id - идентификатор пользователя
	 * @returns {Object} - объект найденного пользователя
	 * @throws {Error} - ошибка, если пользователь с таким id не найден или произошла ошибка при работе с базой данных
	 */
	async getUserById(id) {
		const user = await User.findByPk(id, {
			include: [
				{
					model: University,
					as: 'university',
				},
			],
		});
		if (!user) {
			throw new Error('Пользователь с таким id не найден');
		}
		return user;
	}

	/**
	 * Получает всех пользователей из базы данных с пагинацией и сортировкой
	 * @async
	 * @param {number} limit - максимальное количество пользователей на странице
	 * @param {number} offset - смещение от начала списка пользователей
	 * @param {Array<Array<string>>} sort - массив пар [поле, направление], по которым сортируются пользователи
	 * @returns {Object} - объект, содержащий массив пользователей и общее количество пользователей
	 * @throws {Error} - ошибка, если произошла ошибка при работе с базой данных
	 */
	async getAllUsers(limit, offset, sort) {
		const users = await User.findAll({
			limit,
			offset,
			order: sort,
			include: [
				{
					model: University,
					as: 'university',
				},
			],
		});
		const totalCount = await User.count();
		return { users, totalCount };
	}

	/**
	 * Обновляет пользователя по идентификатору
	 * @async
	 * @param {string} id - идентификатор пользователя
	 * @param {string} email - новая электронная почта пользователя
	 * @param {string} name - новое имя пользователя
	 * @param {string} universityId - новый идентификатор университета, к которому принадлежит пользователь
	 * @returns {Object} - объект обновленного пользователя
	 * @throws {Error} - ошибка, если пользователь с таким id не найден или произошла ошибка при работе с базой данных
	 */
	async updateUserById(id, email, name, universityId) {
		const user = await User.findByPk(id);
		if (!user) {
			throw new Error('Пользователь с таким id не найден');
		}
		if (universityId !== null) {
			await universityService.recalculateUsersCount(universityId);
		}
		if (user.universityId && universityId === null) {
			console.log(user.universityId, universityId);
			await universityService.decrementUsersCount(user.universityId);
		}
		const updatedUser = await User.update(
			{ email, name, universityId },
			{ where: { id: id }, returning: true, plain: true }
		);
		return updatedUser[1];
	}

	/**
	 * Удаляет пользователя по идентификатору
	 * @async
	 * @param {string} id - идентификатор пользователя
	 * @returns {Object} - объект удаленного пользователя
	 * @throws {Error} - ошибка, если пользователь с таким id не найден или произошла ошибка при работе с базой данных
	 */
	async deleteUserById(id) {
		const user = await User.findByPk(id);
		if (!user) {
			throw new Error('Пользователь с таким id не найден');
		}
		const universityId = user.universityId;
		if (universityId) {
			await universityService.decrementUsersCount(universityId, 1);
		}
		await user.destroy();
		return user;
	}
}
