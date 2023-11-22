import { createAsyncThunk } from '@reduxjs/toolkit';
import { UsersAPI } from '../../api';

export const updateUser = createAsyncThunk(
	'users/updateUser',
	async (props, thunkAPI) => {
		try {
			return await UsersAPI.updateUser(props);
		} catch (error) {
			return thunkAPI.rejectWithValue({
				error: error,
			});
		}
	}
);
