import { Model, DataTypes } from 'sequelize';
import db from '../../db.js';
import { v4 as uuidv4 } from 'uuid';
import University from '../../University/entities/university.entity.js';

class User extends Model {
	id;
	email;
	name;
	universityId;
}

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

University.hasMany(User, { as: 'users' }); // Университет имеет много пользователей
User.belongsTo(University, { as: 'university' }); // Пользователь принадлежит университету

export default User;
