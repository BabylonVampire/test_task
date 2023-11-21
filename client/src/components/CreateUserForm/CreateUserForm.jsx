import React, { useState } from 'react';
import { useUniversities, useUsers } from '../../hooks';
import Input from '../Input/Input';
import Select from '../Select/Select';
import './CreateUserForm.css';

const CreateUserForm = () => {
	const { createUser } = useUsers({ limit: 10, offset: 0, sort: 'name' });
	const { universities } = useUniversities();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [university, setUniversity] = useState('');

	const handleCreateUser = (e) => {
		e.preventDefault();
		// createUser({ name, email, universityId: '' });
		console.log(
			name,
			email,
			universities.find((uni) => uni.name === university)?.id
		);
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
					value={name}
					placeholder="Имя пользователя"
				/>
				<Input
					onChange={(e) => setEmail(e.target.value)}
					value={email}
					placeholder="Email пользователя"
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
					className="create-user-form__submit-button"
				>
					Создать
				</button>
			</form>
		</div>
	);
};

export default CreateUserForm;
