import { createSlice } from '@reduxjs/toolkit';
import {
	createUser,
	getUserById,
	getUsers,
	updateUser,
	deleteUser,
} from '../services';

const initialState = {
	statuses: {
		createUser: {
			data: undefined,
			isLoading: false,
			isSuccess: false,
			error: undefined,
		},
		getUserById: {
			data: undefined,
			isLoading: false,
			isSuccess: false,
			error: undefined,
		},
		getAllUsers: {
			data: undefined,
			pagination: undefined,
			isLoading: false,
			isSuccess: false,
			error: undefined,
		},
		updateUserById: {
			data: undefined,
			isLoading: false,
			isSuccess: false,
			error: undefined,
		},
		deleteUserById: {
			data: undefined,
			isLoading: false,
			isSuccess: false,
			error: undefined,
		},
	},
};

export const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(createUser.pending, (state) => {
				state.statuses.createUser.isLoading = true;
				state.statuses.createUser.isSuccess = false;
				state.statuses.createUser.error = undefined;
				state.statuses.createUser.data = undefined;
			})
			.addCase(createUser.fulfilled, (state, action) => {
				state.statuses.createUser.isLoading = false;
				state.statuses.createUser.isSuccess = true;
				state.statuses.createUser.error = undefined;
				state.statuses.createUser.data = action.payload;
			})
			.addCase(createUser.rejected, (state, action) => {
				state.statuses.createUser.isLoading = false;
				state.statuses.createUser.isSuccess = false;
				state.statuses.createUser.error = action.payload;
				state.statuses.createUser.data = undefined;
			})
			.addCase(getUserById.pending, (state) => {
				state.statuses.getUserById.isLoading = true;
				state.statuses.getUserById.isSuccess = false;
				state.statuses.getUserById.error = undefined;
				state.statuses.getUserById.data = undefined;
			})
			.addCase(getUserById.fulfilled, (state, action) => {
				state.statuses.getUserById.isLoading = false;
				state.statuses.getUserById.isSuccess = true;
				state.statuses.getUserById.error = undefined;
				state.statuses.getUserById.data = action.payload;
			})
			.addCase(getUserById.rejected, (state, action) => {
				state.statuses.getUserById.isLoading = false;
				state.statuses.getUserById.isSuccess = false;
				state.statuses.getUserById.error = action.payload;
				state.statuses.getUserById.data = undefined;
			})
			.addCase(getUsers.pending, (state) => {
				state.statuses.getAllUsers.isLoading = true;
				state.statuses.getAllUsers.isSuccess = false;
				state.statuses.getAllUsers.error = undefined;
				state.statuses.getAllUsers.data = undefined;
				state.statuses.getAllUsers.pagination = undefined;
			})
			.addCase(getUsers.fulfilled, (state, action) => {
				state.statuses.getAllUsers.isLoading = false;
				state.statuses.getAllUsers.isSuccess = true;
				state.statuses.getAllUsers.error = undefined;
				state.statuses.getAllUsers.data = action.payload.data;
				state.statuses.getAllUsers.pagination =
					action.payload.pagination;
			})
			.addCase(getUsers.rejected, (state, action) => {
				state.statuses.getAllUsers.isLoading = false;
				state.statuses.getAllUsers.isSuccess = false;
				state.statuses.getAllUsers.error = action.payload;
				state.statuses.getAllUsers.data = undefined;
				state.statuses.getAllUsers.pagination = undefined;
			})
			.addCase(updateUser.pending, (state) => {
				state.statuses.updateUserById.isLoading = true;
				state.statuses.updateUserById.isSuccess = false;
				state.statuses.updateUserById.error = undefined;
				state.statuses.updateUserById.data = undefined;
			})
			.addCase(updateUser.fulfilled, (state, action) => {
				state.statuses.updateUserById.isLoading = false;
				state.statuses.updateUserById.isSuccess = true;
				state.statuses.updateUserById.error = undefined;
				state.statuses.updateUserById.data = action.payload;
			})
			.addCase(updateUser.rejected, (state, action) => {
				state.statuses.updateUserById.isLoading = false;
				state.statuses.updateUserById.isSuccess = false;
				state.statuses.updateUserById.error = action.payload;
				state.statuses.updateUserById.data = undefined;
			})
			.addCase(deleteUser.pending, (state) => {
				state.statuses.deleteUserById.isLoading = true;
				state.statuses.deleteUserById.isSuccess = false;
				state.statuses.deleteUserById.error = undefined;
				state.statuses.deleteUserById.data = undefined;
			})
			.addCase(deleteUser.fulfilled, (state, action) => {
				state.statuses.deleteUserById.isLoading = false;
				state.statuses.deleteUserById.isSuccess = true;
				state.statuses.deleteUserById.error = undefined;
				state.statuses.deleteUserById.data = action.payload;
			})
			.addCase(deleteUser.rejected, (state, action) => {
				state.statuses.deleteUserById.isLoading = false;
				state.statuses.deleteUserById.isSuccess = false;
				state.statuses.deleteUserById.error = action.payload;
				state.statuses.deleteUserById.data = undefined;
			});
	},
});

export const { actions: usersActions } = usersSlice;
export const { reducer: usersReducer } = usersSlice;
