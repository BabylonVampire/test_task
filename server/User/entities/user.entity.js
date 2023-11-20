import { DataTypes, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import University from '../../University/entities/university.entity.js';
import db from '../../db.js';

/**
 * Класс, представляющий модель пользователя.
 * @extends Model
 */
class User extends Model {
	/**
	 * Идентификатор пользователя.
	 * @type {string}
	 */
	id;
	/**
	 * Электронная почта пользователя.
	 * @type {string}
	 */
	email;
	/**
	 * Имя пользователя.
	 * @type {string}
	 */
	name;
	/**
	 * Идентификатор университета, к которому принадлежит пользователь.
	 * @type {string}
	 */
	universityId;
}

/**
 * Инициализирует модель пользователя с атрибутами и опциями.
 * @param {Object} attributes - атрибуты модели.
 * @param {Object} options - опции модели.
 */
User.init(
	{
		id: { type: DataTypes.UUID, defaultValue: uuidv4(), primaryKey: true },
		email: { type: DataTypes.STRING, unique: true, allowNull: false },
		name: { type: DataTypes.STRING, allowNull: false },
		universityId: {
			type: DataTypes.UUID,
			allowNull: true,
			references: { model: University, key: 'id' },
		},
	},
	{
		sequelize: db,
		modelName: 'user',
	}
);

University.hasMany(User, { as: 'users' });
User.belongsTo(University, { as: 'university' });

export default User;
