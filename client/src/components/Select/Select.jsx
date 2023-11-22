import React, { useState } from 'react';
import './Select.css';

const Select = ({ options, onChange, required, defaultValue }) => {
	const [selected, setSelected] = useState(defaultValue);
	const [showDropdown, setShowDropdown] = useState(false);

	const handleSelect = (option) => {
		setSelected(option);
		setShowDropdown(false);
	};

	const toggleDropdown = (e) => {
		e.preventDefault();
		setShowDropdown(!showDropdown);
	};

	return (
		<div className="select__container">
			<button
				className={`select__button${
					!required && !selected ? '__required' : ''
				}`}
				onClick={toggleDropdown}
			>
				{selected}
			</button>

			<ul
				className="select__list"
				style={{
					maxHeight: showDropdown
						? `${options.length * 1.5}lh`
						: '0lh',
					pointerEvents: showDropdown ? 'auto' : 'none',
				}}
			>
				{options.map((option) => (
					<li
						key={option}
						className="select__item"
						onClick={() => {
							if (onChange) onChange(option);
							handleSelect(option);
						}}
					>
						{option}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Select;
