import React from 'react';
import './Input.css';

const Input = ({ required, placeholder, ...rest }) => {
	return (
		<input
			className={`input${required ? '__required' : ''}`}
			placeholder={`${required ? '* ' : ''}${placeholder || ''}`}
			{...rest}
		/>
	);
};

export default Input;
