import React from 'react';
import './Input.css';

const Input = ({ required, ...rest }) => {
	return (
		<input className={`input${!required ? '__required' : ''}`} {...rest} />
	);
};

export default Input;
