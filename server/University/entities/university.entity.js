import { Model, DataTypes } from 'sequelize';
import db from '../../db.js';
import { v4 as uuidv4 } from 'uuid';

class University extends Model {
	id;
	name;
}

University.init(
	{
		id: { type: DataTypes.UUID, defaultValue: uuidv4(), primaryKey: true },
		name: { type: DataTypes.STRING, allowNull: false },
	},
	{
		sequelize: db,
		modelName: 'university',
	}
);

export default University;
