import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	modal: 'none',
};

export const modalSlice = createSlice({
	name: 'modalMode',
	initialState,
	reducers: {
		changeModal(state, action) {
			state.modal = action.payload;
		},
	},
});

export default modalSlice.reducer;
