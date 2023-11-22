import { createAsyncThunk } from '@reduxjs/toolkit';
import { UsersAPI } from '../../api';

export const getUsers = createAsyncThunk(
	'users/getUsers',
	async (props, thunkAPI) => {
		try {
			return await UsersAPI.getUsers(props);
		} catch (error) {
			return thunkAPI.rejectWithValue({
				error: error,
			});
		}
	}
);
