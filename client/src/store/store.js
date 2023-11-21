import { combineReducers, configureStore } from '@reduxjs/toolkit';
import modalReducer from './reducers/ModalSlice';

const rootReducer = combineReducers({
	modalReducer,
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
	});
};
