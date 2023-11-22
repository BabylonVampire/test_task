export const getCreateUserStatus = (state) => state.users.statuses.createUser;
export const getGetUserByIdStatus = (state) => state.users.statuses.getUserById;
export const getGetUsersStatus = (state) => state.users.statuses.getAllUsers;
export const getUpdateUserStatus = (state) =>
	state.users.statuses.updateUserById;
export const getDeleteUserStatus = (state) =>
	state.users.statuses.deleteUserById;
