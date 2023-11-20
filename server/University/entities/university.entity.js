import { DataTypes, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import db from '../../db.js';

/**
 * Класс, представляющий университет.
 * @extends Model
 */
class University extends Model {
	/**
	 * Идентификатор университета.
	 * @type {string}
	 */
	id;
	/**
	 * Название университета.
	 * @type {string}
	 */
	name;
	/**
	 * Количество пользователей, связанных с университетом.
	 * @type {number}
	 */
	usersCount;
}

University.init(
	{
		/**
		 * @property {DataTypes.UUID} id - Идентификатор университета.
		 */
		id: { type: DataTypes.UUID, defaultValue: uuidv4(), primaryKey: true },
		/**
		 * @property {DataTypes.STRING} name - Название университета.
		 */
		name: { type: DataTypes.STRING, allowNull: false },
		/**
		 * @property {DataTypes.INTEGER} usersCount - Количество пользователей, связанных с университетом.
		 */
		usersCount: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
	},
	{
		sequelize: db,
		modelName: 'university',
	}
);

export default University;
