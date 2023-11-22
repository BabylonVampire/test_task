import { createAsyncThunk } from '@reduxjs/toolkit';
import { UsersAPI } from '../../api';

export const getUserById = createAsyncThunk(
	'users/getUserById',
	async (props, thunkAPI) => {
		try {
			return await UsersAPI.getUserById(props);
		} catch (error) {
			return thunkAPI.rejectWithValue({
				error: error,
			});
		}
	}
);
