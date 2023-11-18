import University from './entities/university.entity.js';
import User from '../User/entities/user.entity.js';

export class UniversityService {
	async createUniversity(name) {
		console.log(name);
		const candidate = await University.findOne({ where: { name } });
		if (candidate) {
			throw new Error('Университет с таким именем уже существует');
		}
		const university = await University.create({ name });
		return university;
	}

	async getUniversityById(id) {
		const university = await University.findByPk(id);
		if (!university) {
			throw new Error('Университет с таким id не найден');
		}
		return university;
	}

	async getAllUniversities() {
		const universities = await University.findAll({
			order: [['usersCount', 'DESC']],
		});
		return universities;
	}

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

	async deleteUniversityById(id) {
		const university = await University.findByPk(id);
		if (!university) {
			throw new Error('Университет с таким id не найден');
		}
		await university.destroy();
		return university;
	}

	async incrementUsersCount(universityId, number) {
		const university = await University.findByPk(universityId);
		if (!university) {
			throw new Error('Университет с таким id не найден');
		}
		await university.increment('usersCount', { by: number });
		return university;
	}

	async decrementUsersCount(universityId, number) {
		const university = await University.findByPk(universityId);
		if (!university) {
			throw new Error('Университет с таким id не найден');
		}
		await university.decrement('usersCount', { by: number });
		return university;
	}

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
