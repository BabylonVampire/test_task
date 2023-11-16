import User from './entities/user.entity.js';

export class UserService {
	// Создание пользователя по email и имени
	async createUser(email, name) {
		const candidate = await User.findOne({ where: { email } });
		if (candidate) {
			throw new Error('Пользователь с таким email уже существует');
		}
		const user = await User.create({ email, name });
		return user;
	}

	// Получение пользователя по id
	async getUserById(id) {
		const user = await User.findByPk(id);
		if (!user) {
			throw new Error('Пользователь с таким id не найден');
		}
		return user;
	}

	// Получение всех пользователей
	async getAllUsers() {
		const users = await User.findAll();
		return users;
	}

	// Обновление пользователя по id
	async updateUserById(id, email, name) {
		const user = await User.findByPk(id);
		if (!user) {
			throw new Error('Пользователь с таким id не найден');
		}
		const updatedUser = await User.update(
			{ email, name },
			{ where: { id: id }, returning: true, plain: true }
		);
		return updatedUser[1];
	}

	// Удаление пользователя по id
	async deleteUserById(id) {
		const user = await User.findByPk(id);
		if (!user) {
			throw new Error('Пользователь с таким id не найден');
		}
		await user.destroy();
		return user;
	}
}
