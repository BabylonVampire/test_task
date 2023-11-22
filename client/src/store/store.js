import { combineReducers, configureStore } from '@reduxjs/toolkit';
import modalReducer from './reducers/ModalSlice';
import { usersReducer } from './reducers/usersSlice';

const rootReducer = combineReducers({
	modalReducer,
	users: usersReducer,
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
	});
};
