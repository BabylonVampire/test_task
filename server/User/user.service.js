import { UniversityService } from '../University/university.service.js';
import User from './entities/user.entity.js';
import University from '../University/entities/university.entity.js';

const universityService = new UniversityService();

export class UserService {
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
