import { Model, DataTypes } from 'sequelize';
import db from '../../db.js';
import { v4 as uuidv4 } from 'uuid';

class University extends Model {
	id;
	name;
	usersCount;
}

University.init(
	{
		id: { type: DataTypes.UUID, defaultValue: uuidv4(), primaryKey: true },
		name: { type: DataTypes.STRING, allowNull: false },
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
