import { createAsyncThunk } from '@reduxjs/toolkit';
import { UsersAPI } from '../../api';

export const deleteUser = createAsyncThunk(
	'users/deleteUser',
	async (props, thunkAPI) => {
		try {
			return await UsersAPI.deleteUser(props);
		} catch (error) {
			return thunkAPI.rejectWithValue({
				error: error,
			});
		}
	}
);
