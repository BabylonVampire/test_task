import University from './entities/university.entity.js';

export class UniversityService {
	async createUniversity(name) {
		const candidate = await University.findOne({ where: { name } });
		if (candidate) {
			throw new Error('Университет с таким именем уже существует');
		}
		const university = await University.create({ email, name });
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
		const universities = await University.findAll();
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

	// Удаление пользователя по id
	async deleteUniversityById(id) {
		const university = await University.findByPk(id);
		if (!university) {
			throw new Error('Университет с таким id не найден');
		}
		await university.destroy();
		return university;
	}
}
