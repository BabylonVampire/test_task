import React, { useState } from 'react';
import { useUniversities } from '../../hooks';
import { useAppDispatch } from '../../store/hooks/redux';
import { modalSlice } from '../../store/reducers/ModalSlice';
import Input from '../Input/Input';
import './CreateUniversityForm.css';

const CreateUniversityForm = () => {
	const { createUniversity } = useUniversities();
	const [name, setName] = useState('');

	const dispatch = useAppDispatch();
	const { changeModal } = modalSlice.actions;

	const handleCreateUniversity = (e) => {
		e.preventDefault();
		createUniversity({ name });
		dispatch(changeModal('none'));
	};
	return (
		<div className="create-university-form">
			<div className="create-university-form__title">
				Создание университета
			</div>
			<form
				onSubmit={handleCreateUniversity}
				className="create-university-form__form"
			>
				<Input
					onChange={(e) => setName(e.target.value)}
					required
					value={name}
					placeholder="Название"
				/>
				<button
					type="submit"
					className={`create-university-form__submit-button${
						!name ? '__disabled' : ''
					}`}
				>
					Создать
				</button>
			</form>
		</div>
	);
};

export default CreateUniversityForm;
