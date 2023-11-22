import { createAsyncThunk } from '@reduxjs/toolkit';
import { UsersAPI } from '../../api';

export const createUser = createAsyncThunk(
	'users/createUser',
	async (props, thunkAPI) => {
		try {
			return await UsersAPI.createUser(props);
		} catch (error) {
			return thunkAPI.rejectWithValue({
				error: error,
			});
		}
	}
);
