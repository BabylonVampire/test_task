import React, { useState } from 'react';
import Input from '../Input/Input';
import './CreateUniversityForm.css';

const CreateUniversityForm = () => {
	const [name, setName] = useState('');

	const handleCreateUser = (e) => {
		e.preventDefault();
	};
	return (
		<div className="create-university-form">
			<div className="create-university-form__title">
				Создание университета
			</div>
			<form
				onSubmit={handleCreateUser}
				className="create-university-form__form"
			>
				<Input
					onChange={(e) => setName(e.target.value)}
					value={name}
					placeholder="Название университета"
				/>
				<button
					type="submit"
					className="create-university-form__submit-button"
				>
					Создать
				</button>
			</form>
		</div>
	);
};

export default CreateUniversityForm;
