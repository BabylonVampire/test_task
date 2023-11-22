import React, { useState } from 'react';
import { useUniversities, useUsers } from '../../hooks';
import { useAppDispatch } from '../../store/hooks/redux';
import { modalSlice } from '../../store/reducers/ModalSlice';
import Input from '../Input/Input';
import Select from '../Select/Select';
import './CreateUserForm.css';

const CreateUserForm = () => {
	const { createUser } = useUsers({ limit: 10, offset: 0, sort: 'name' });
	const { universities } = useUniversities();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [university, setUniversity] = useState('');

	const dispatch = useAppDispatch();
	const { changeModal } = modalSlice.actions;

	const handleCreateUser = (e) => {
		e.preventDefault();
		createUser({
			name,
			email,
			universityId: universities.find((uni) => uni.name === university)
				?.id,
		});
		dispatch(changeModal('none'));
	};

	return (
		<div className="create-user-form">
			<div className="create-user-form__title">Создание пользователя</div>
			<form
				onSubmit={handleCreateUser}
				className="create-user-form__form"
			>
				<Input
					onChange={(e) => setName(e.target.value)}
					required
					value={name}
					placeholder="Имя"
				/>
				<Input
					onChange={(e) => setEmail(e.target.value)}
					required
					value={email}
					placeholder="Email"
				/>
				{universities.length && (
					<Select
						options={universities.map(
							(university) => university.name
						)}
						onChange={setUniversity}
					/>
				)}
				<button
					type="submit"
					className={`create-user-form__submit-button${
						!university || !email || !name ? '__disabled' : ''
					}`}
				>
					Создать
				</button>
			</form>
		</div>
	);
};

export default CreateUserForm;
